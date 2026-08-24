---
layout: ../../layouts/Projekt.astro
titel: Mopeka-Dieselgeber am Cerbo GX — und warum er falsch rechnet
kurz: Ein Ultraschallsensor am Dieseltank, ausgelesen vom Cerbo GX. Zwei Überraschungen — jede vierte Messung ist unbrauchbar, und der Treiber rechnet Diesel mit den Koeffizienten von Benzin.
meta_titel: Mopeka Dieseltank am Victron Cerbo GX — Kalibrierung und Ausfälle
meta_beschreibung: Mopeka Pro Ultraschallsensor am Dieseltank im Victron Cerbo GX — warum der Venus-OS-Treiber Diesel mit den Benzin-Koeffizienten rechnet, was die Temperaturkompensation wirklich tut und wie man 27 Prozent unbrauchbare Messungen abfängt.
status: Laufend
stand: 2026-08
tags:
  - Bluetooth
  - Victron
  - Node-RED
  - Wohnmobil
---

**Kurz vorweg, damit die Sache nicht verrückter klingt als sie ist:** Ich habe nicht
aus Spaß einen Ultraschallsensor unter meinen Dieseltank geklebt. Es gab zwei Gründe.

**Erstens ist es nicht mehr der Serientank.** Verbaut ist ein
**Goldschmitt-Ersatztank** (Art. 05.100) für das Basisfahrzeug — deutlich größer als
das Original. Auf dem Papier fasst er 135 Liter, tatsächlich sind es **139**. Ein
größerer Tank verschiebt aber alles, was man über Reichweite zu wissen glaubt: Die
Nadel im Armaturenbrett gehört zum Serientank, nicht zu diesem hier.

**Zweitens ist der originale Tankgeber eine Sackgasse.** Er sitzt weiterhin im Tank
und tut, was er soll — er bewegt die Nadel im Cockpit. Aber sein Wert kommt nirgendwo
digital heraus. Er erreicht den **Cerbo GX** nicht, das kleine Steuergerät, bei dem
im Fahrzeug alle anderen Werte zusammenlaufen: Batterie, Solar, Wasser, Gas. Damit
lässt er sich weder protokollieren noch für eine Reichweitenrechnung verwenden noch
aus der Ferne ansehen.

Eine Nadel im Fahrerhaus beantwortet die Frage „ist noch was drin?". Sie beantwortet
nicht die Frage, die man auf einer Reise tatsächlich hat: **Wie weit komme ich noch,
und wie viel habe ich seit der letzten Tankstelle wirklich verbraucht?**

Deshalb der zweite Sensor.

## Was da klebt

Am Tank sitzt ein **Mopeka Pro** — ein Ultraschallsensor, der von außen an den
Tankboden geklebt wird und die Füllhöhe misst, ohne dass irgendwo ein Loch gebohrt
oder ein Geber getauscht werden muss. Er funkt per Bluetooth, läuft mit einer
Knopfzelle und wird von Venus OS, dem Betriebssystem des Cerbo, ab Werk unterstützt:
Sensor anlernen, Tankform eintragen, fertig. So weit die Theorie.

In der Praxis sprang die Anzeige regelmäßig auf 0 %, und die angezeigte Restmenge
passte nicht zu dem, was beim Tanken tatsächlich hineinging. Beides hatte eine
Ursache, und keine davon war die, die ich zuerst vermutet hatte.

## Überraschung 1: Jede vierte Messung ist Müll

Über **32 Stunden** mitgeschrieben, jede Messung mit ihrem Qualitätswert: rund
**27 % der Messungen kamen mit `Quality 0`** — der Sensor sagt selbst, dass er dem
Wert nicht traut.

Der naheliegende Verdacht war die Funkstrecke. Der ist falsch: Am selben
Bluetooth-Baustein hängt die Gasflasche, und die liefert zuverlässig. Es liegt also
nicht an der Übertragung, sondern an der **Messung selbst** — am Ultraschall in der
Flüssigkeit. Verdächtig sind die Ankopplung des Sensors an den Tankboden und das Gel
darunter.

Wichtig ist, was daraus folgt: **Ein Ausfall ist kein Fehler, sondern ein
Betriebszustand.** Ein Tanksensor, der viermal am Tag kurz nichts sieht, darf nicht
viermal am Tag 0 % melden — sonst ist jede Verbrauchsauswertung wertlos und jeder
Alarm ein Fehlalarm.

Zwei Schutzschichten fangen das ab:

1. **Qualitätsfilter und Median.** Werte mit `Quality 0` fliegen raus, aus den
   letzten fünf gültigen wird der Median gebildet. Ein einzelner Ausreißer kommt
   damit nie durch.
2. **Ein zweiter, virtueller Tank**, der bei Ausfall den letzten guten Wert bis zu
   zwei Stunden hält, statt auf 0 zu springen. Angezeigt wird im Cockpit dieser
   Tank, nicht der rohe.

Das ist keine Schönfärberei: Nach zwei Stunden ohne gültige Messung fällt auch der
gefilterte Wert weg. Nur eben nicht nach zwanzig Sekunden.

## Überraschung 2: Diesel wird wie Benzin gerechnet

Die zweite Sache habe ich erst gefunden, als ich aufgehört habe zu raten und in den
Quelltext des Treibers geschaut habe — `victronenergy/dbus-ble-sensors`, Datei
`src/mopeka.c`.

Beim **Hardware-Typ 12** („universal", also dem Sensor, der für beliebige
Flüssigkeiten verkauft wird) steht im Code `coefs = NULL`. Es gibt also keinen
sensorspezifischen Koeffizientensatz. Stattdessen entscheidet der in der Oberfläche
eingestellte **FluidType**, welche Kurve benutzt wird — und dort teilen sich
`FLUID_TYPE_GASOLINE` und `FLUID_TYPE_DIESEL` **denselben** Satz.

Gerechnet wird so:

```
scale(T) = c0 + c1·T + c2·T²        mit T = Temperatur + 40
c = { 0.7373417462, -0.001978229885, 0.00000202162 }

Höhe [cm] = RawValue · scale(T) / 10
```

Zwei Dinge stehen damit fest, und eines davon widerlegt meine eigene frühere Annahme:

- **Die Temperatur wird sehr wohl kompensiert**, sogar quadratisch. Ich hatte vorher
  behauptet, der Sensor rechne ohne Temperaturkorrektur mit einer festen
  Schallgeschwindigkeit für Propan. Das war schlicht falsch, und ich lasse es hier
  stehen, weil die Fehlannahme im Netz kursiert.
- **Die Kurve ist die von Benzin.** Schall läuft in Diesel messbar anders als in
  Benzin. Wer „Diesel" einstellt, bekommt trotzdem die Benzin-Kurve — und damit eine
  systematische Abweichung, die keine Einstellung in der Oberfläche behebt.

## Was das praktisch bedeutet

Der Sensor ist damit nicht unbrauchbar, aber er ist **kein absoluter Messgeber**. Er
misst eine Höhe, und diese Höhe hat einen systematischen Faktor drin, den man nicht
wegkonfigurieren kann.

Der Ausweg ist derselbe wie bei jeder krummen Messkette: **gegen die Wirklichkeit
kalibrieren.** Bei jedem Tanken die tatsächlich getankte Menge und den Rohwert davor
und danach notieren. Nach ein paar Tankungen hat man eine eigene Kennlinie, die den
Faktor mitschluckt — und ab dann stimmt die Restmenge, obwohl die zugrunde liegende
Rechnung falsch bleibt.

Genau das läuft hier: Bei jedem Tanken werden Menge und Kilometerstand über eine
kleine Handyseite eingetragen — nicht an der Zapfsäule, das darf auch Stunden später
passieren. Daraus entsteht ein Restmengenmodell, das nicht auf der Herstellerkurve
beruht, sondern auf dem, was wirklich in den Tank gepasst hat. Es rechnet die
Restmenge aus der letzten Volltankung minus gefahrener Strecke mal Verbrauch — und
lässt den Sensor nur dann korrigierend eingreifen, wenn er eine Reihe von
Plausibilitätsprüfungen besteht: gute Signalqualität, genug gültige Werte, Fahrzeug
steht, Neigung unter zwei Grad.

Die Neigung ist dabei kein Beiwerk. Der Tank liegt quer im Fahrzeug, und schon wenige
Grad Schräglage — ein Stellplatz mit Gefälle genügt — verschieben den
Ultraschallweg messbar.

Als Ausgangswert dient ein gemessener Verbrauch von **12,63 l/100 km**, sauber von
randvoll bis randvoll über 2376 km ermittelt.

## Was noch offen ist

- Genügend Tankungen für eine belastbare eigene Kennlinie — das dauert eine Saison
- Die Ankopplung des Sensors am Tankboden noch einmal ansehen; 27 % Ausfall ist viel
- Ein Vergleich mit dem Werksgeber über den ganzen Bereich, nicht nur im oberen Drittel

## Stolpersteine für Nachbauer

- Der Qualitätswert des Sensors ist die wichtigste Information überhaupt. Wer ihn
  ignoriert, baut auf Rauschen.
- Ein Tanksensor sollte bei Ausfall halten, nicht auf 0 springen. Sonst ruiniert ein
  einzelner Aussetzer jede Verbrauchsstatistik.
- Der eingestellte Flüssigkeitstyp ändert bei diesem Sensor weniger, als man denkt.
  Für die Genauigkeit ist die eigene Kalibrierung entscheidend, nicht die Auswahl im
  Menü.
- Wer wissen will, was wirklich gerechnet wird, kommt am Quelltext nicht vorbei. Er
  liegt offen, und in diesem Fall stand die Antwort in einer einzigen Zeile.

## Dank und Einordnung

Der Treiber ist quelloffen — ohne das wäre die zweite Erkenntnis nicht möglich
gewesen. Das Projekt steht in keiner Verbindung zu Mopeka oder Victron Energy und
liest ausschließlich die eigene Hardware aus.
