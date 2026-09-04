---
layout: ../../layouts/Projekt.astro
titel: Ein anderer Tank, und die Tankuhr ist blind
kurz: Im Flair steckt ein Goldschmitt-Austauschtank, und der Originalgeber misst darin praktisch nichts. Der Versuch, den Dieselvorrat trotzdem in dasselbe System zu holen, in dem auch Wasser, Gas und Batterie stehen.
meta_titel: Mopeka Dieseltank am Victron Cerbo GX – Kalibrierung und Ausfälle
meta_beschreibung: Mopeka Pro Ultraschallsensor am Dieseltank im Victron Cerbo GX – warum der Venus-OS-Treiber Diesel mit den Benzin-Koeffizienten rechnet, was die Temperaturkompensation wirklich tut und wie man 27 Prozent unbrauchbare Messungen abfängt.
bild: /bilder/rotarex/cerbo-tanks.png
rang: 4
status: Laufend
stand: 2026-08
tags:
  - Bluetooth
  - Victron
  - Node-RED
  - Wohnmobil
---

Eine Tankuhr ist das Selbstverständlichste am ganzen Fahrzeug. Bei diesem hier ist
sie nutzlos, und daran ist nichts kaputt.

**Der Grund ist der Tank.** Im Flair sitzt kein Serientank mehr, sondern ein
**Goldschmitt-Ersatztank** (Art. 05.100) für das Basisfahrzeug, deutlich größer als
das Original: auf dem Papier 135 Liter, tatsächlich **139**. Wer den Tank tauscht,
tauscht damit auch alles, was das Fahrzeug über seine Reichweite zu wissen glaubt.

Der Originalgeber steckt darin weiter, nur passt er nicht mehr. Er sitzt
**unterhalb der Diesellinie**, sein Messbereich beginnt erst bei etwa 70 Litern.
Alles darüber sieht er schlicht nicht: Ein randvoller Tank steht im Cockpit auf halb
und bleibt dort, bis der Stand tatsächlich in seinen Bereich gefallen ist. Darunter
ist die Anzeige eher ein Schätzeisen als eine Messung.

Die Nadel bewegt sich also, sie sagt nur nichts. Und ihr Wert kommt nirgendwo
digital heraus: Er erreicht den **Cerbo GX** nicht, das Steuergerät, bei dem im
Fahrzeug alle anderen Werte zusammenlaufen.

Damit stehen zwei Dinge im Weg. Erstens die Frage, die man auf einer Reise
tatsächlich hat: **Wie weit komme ich noch, und wie viel ist seit der letzten
Tankstelle wirklich durchgelaufen?** Zweitens der Bruch im System: Wasser, Gas,
Batterie und Solar stehen längst an einer Stelle, ablesbar auch aus der Ferne.
Ausgerechnet der Diesel fehlte, und ein Wert, den man woanders suchen muss, ist ein
Wert, den man nicht anschaut.

Deshalb der zweite Sensor.

## Was da klebt

Am Tank sitzt ein **Mopeka Pro**, ein Ultraschallsensor, der von außen an den
Tankboden geklebt wird und die Füllhöhe misst, ohne dass irgendwo ein Loch gebohrt
oder ein Geber getauscht werden muss. Er funkt per Bluetooth, läuft mit einer
Knopfzelle und wird von Venus OS, dem Betriebssystem des Cerbo, ab Werk unterstützt:
Sensor anlernen, Tankform eintragen, fertig. So weit die Theorie.

In der Praxis sprang die Anzeige regelmäßig auf 0 %, und die angezeigte Restmenge
passte nicht zu dem, was beim Tanken tatsächlich hineinging. Beides hatte eine
Ursache, und keine davon war die, die ich zuerst vermutet hatte.

## Überraschung 1: Jede vierte Messung ist Müll

Über **32 Stunden** mitgeschrieben, jede Messung mit ihrem Qualitätswert: rund
**27 % der Messungen kamen mit `Quality 0`**. Der Sensor sagt selbst, dass er dem
Wert nicht traut.

Der naheliegende Verdacht war die Funkstrecke. Der ist falsch: Am selben
Bluetooth-Baustein hängt die Gastankflasche, und die liefert zuverlässig. Es liegt also
nicht an der Übertragung, sondern an der **Messung selbst**, am Ultraschall in der
Flüssigkeit. Verdächtig sind die Ankopplung des Sensors an den Tankboden und das Gel
darunter.

Wichtig ist, was daraus folgt: **Ein Ausfall ist kein Fehler, sondern ein
Betriebszustand.** Ein Tanksensor, der viermal am Tag kurz nichts sieht, darf nicht
viermal am Tag 0 % melden. Sonst ist jede Verbrauchsauswertung wertlos und jeder
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
Quelltext des Treibers geschaut habe: `victronenergy/dbus-ble-sensors`, Datei
`src/mopeka.c`.

Beim **Hardware-Typ 12** („universal", also dem Sensor, der für beliebige
Flüssigkeiten verkauft wird) steht im Code `coefs = NULL`. Es gibt also keinen
sensorspezifischen Koeffizientensatz. Stattdessen entscheidet der in der Oberfläche
eingestellte **FluidType**, welche Kurve benutzt wird. Und dort teilen sich
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
  Benzin. Wer „Diesel" einstellt, bekommt trotzdem die Benzin-Kurve, und damit eine
  systematische Abweichung, die keine Einstellung in der Oberfläche behebt.

## Was das praktisch bedeutet

Der Sensor ist damit nicht unbrauchbar, aber er ist **kein absoluter Messgeber**. Er
misst eine Höhe, und diese Höhe hat einen systematischen Faktor drin, den man nicht
wegkonfigurieren kann.

Der Ausweg ist derselbe wie bei jeder krummen Messkette: **gegen die Wirklichkeit
kalibrieren.** Bei jedem Tanken die tatsächlich getankte Menge und den Rohwert davor
und danach notieren. Nach ein paar Tankungen hat man eine eigene Kennlinie, die den
Faktor mitschluckt, und ab dann stimmt die Restmenge, obwohl die zugrunde liegende
Rechnung falsch bleibt.

Genau das läuft hier: Bei jedem Tanken werden Menge und Kilometerstand über eine
kleine Handyseite eingetragen, nicht an der Zapfsäule, das darf auch Stunden später
passieren. Daraus entsteht ein Restmengenmodell, das nicht auf der Herstellerkurve
beruht, sondern auf dem, was wirklich in den Tank gepasst hat. Es rechnet die
Restmenge aus der letzten Volltankung minus gefahrener Strecke mal Verbrauch, und
lässt den Sensor nur dann korrigierend eingreifen, wenn er eine Reihe von
Plausibilitätsprüfungen besteht: gute Signalqualität, genug gültige Werte, Fahrzeug
steht, Neigung unter zwei Grad.

Die Neigung ist dabei kein Beiwerk. Der Tank liegt quer im Fahrzeug, und schon wenige
Grad Schräglage – ein Stellplatz mit Gefälle genügt – verschieben den
Ultraschallweg messbar.

Als Ausgangswert dient ein gemessener Verbrauch von **12,63 l/100 km**, sauber von
randvoll bis randvoll über 2376 km ermittelt.

## Würde ich ihn wieder kaufen? Nein

Damit niemand aus dieser Seite den falschen Schluss zieht: **Ich rate vom Nachkaufen
ab.** Der Sensor hängt hier, er liefert, und mit den beiden Filterstufen ist das
Ergebnis brauchbar. Aber er ist nicht die Lösung, für die ich ihn gehalten habe.

Drei Gründe, alle weiter oben ausführlich:

**Jede vierte Messung ist unbrauchbar**, und daran ändert keine Einstellung etwas.
Die Ursache liegt in der Ankopplung an den Tankboden, nicht in einem Parameter.

**Die Rechnung dahinter stimmt nicht.** Diesel bekommt die Kurve von Benzin, und das
lässt sich in der Oberfläche nicht abstellen.

**Die eigentliche Arbeit leistet am Ende nicht der Sensor**, sondern das
Restmengenmodell aus Tankungen und Kilometern. Der Sensor darf nur noch korrigierend
eingreifen, wenn er eine Reihe von Plausibilitätsprüfungen besteht. Ein Messgerät,
das man derart einhegen muss, ist eher eine zweite Meinung als ein Messgerät.

Und ganz konkret, weil das die häufigste Kombination sein dürfte: **Wer einen
Goldschmitt-Ersatztank fährt, ob im Ducato oder auf einem anderen Basisfahrzeug,
lässt es besser.** Genau an diesem Tank bekomme ich die Ankopplung nicht zuverlässig
hin, und das ist kein exotischer Einzelfall.

Fair bleiben muss man trotzdem. Mopeka ist mit Gasflaschen groß geworden, und ein
Stahlzylinder mit dickem, glattem Boden ist eine andere Aufgabe als ein großer
Kunststoff-Ersatztank unter einem Fahrzeugboden. Beurteilen kann ich hier meinen
Dieseltank, nicht das ganze Unternehmen.

**Und was stattdessen?** Daran arbeite ich. Eine Messung, die nicht davon abhängt,
wie gut ein Sensor von außen an den Tankboden gekoppelt ist, wäre der naheliegende
Weg. Solange nichts Besseres steht, bleibt der Mopeka drin, denn er ist nun einmal
da, und ein gefilterter Wert schlägt immer noch die Nadel im Cockpit, die unterhalb
von 70 Litern anfängt zu raten. Wenn es so weit ist, steht es hier.

## Was noch offen ist

- Eine andere Messmethode für den Dieseltank, die ohne Ankopplung von außen auskommt
- Genügend Tankungen für eine belastbare eigene Kennlinie, das dauert eine Saison
- Kalibrierpunkte im unteren Tankbereich, wo bisher am wenigsten Messungen liegen

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

Der Treiber ist quelloffen. Ohne das wäre die zweite Erkenntnis nicht möglich
gewesen. Das Projekt steht in keiner Verbindung zu Mopeka oder Victron Energy und
liest ausschließlich die eigene Hardware aus.
