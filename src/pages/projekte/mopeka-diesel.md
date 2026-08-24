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

Am Dieseltank sitzt ein **Mopeka Pro** — ein Ultraschallsensor, der von außen an den
Tankboden geklebt wird und die Füllhöhe misst, ohne dass irgendwo ein Loch gebohrt
werden muss. Venus OS bringt die Unterstützung mit: Sensor anlernen, Tankform
eintragen, fertig. So weit die Theorie.

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

Genau das läuft hier: Die Tankungen werden erfasst, und aus ihnen entsteht ein
Restmengenmodell, das nicht auf der Herstellerkurve beruht, sondern auf dem, was
wirklich in den Tank gepasst hat.

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
