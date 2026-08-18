---
layout: ../../layouts/Projekt.astro
titel: Gasflasche per Bluetooth auslesen
kurz: Den Füllstand einer Alugas TravelMate 2.0 im Cerbo GX anzeigen — ohne die Hersteller-App, direkt über BlueZ und Node-RED.
status: Laufend
stand: 2026-08
tags:
  - Bluetooth
  - Victron
  - Node-RED
  - Wohnmobil
---

Die Alugas TravelMate 2.0 meldet ihren Füllstand über ein Bluetooth-Modul von
Rotarex (DIMES SRG-1-WAVE). Die Hersteller-App zeigt den Wert an — aber eben nur
dort, auf dem Handy, wenn man danebensteht. Naheliegende Frage: Wie kommt der
Wert dahin, wo die anderen Bordwerte auch stehen, nämlich in den **Cerbo GX**?

Antwort: Er steht jetzt dort. Als ganz normale Tankanzeige neben Wasser und
Abwasser, aktualisiert alle 15 Minuten.

> **Code auf GitHub:** [cologneone/dbus-rotarex-dime](https://github.com/cologneone/dbus-rotarex-dime)
> — Installationsskript, Auslese-Script und der fertige Node-RED-Flow, MIT-Lizenz.

## Warum das nicht einfach ging

Ein BLE-Scan findet die Flasche sofort: Gerät `SRG-1-WAVE`, dazu eine
übersichtliche GATT-Struktur mit einer Characteristic, die verdächtig nach
Füllstand aussieht. Nur: Jeder Leseversuch darauf endet mit

```
ATT error: 0x80
```

Das ist ein herstellerspezifischer Fehler, zu dem es keine Dokumentation gibt.
Auch Pairing ändert nichts. Die App verlangt beim ersten Verbinden einen PIN,
der auf dem Typenschild der Bluetooth-Box steht — nur schaltet dieser PIN
offensichtlich etwas frei, das man erst schreiben muss, bevor man lesen darf.

Wohin und in welchem Format, stand nirgends.

## Die Sackgasse

Zuerst der naheliegende Weg: PIN auf die Write-Characteristics der beworbenen
Service schreiben, in allen plausiblen Kodierungen — ASCII, UInt16 in beiden
Byte-Reihenfolgen, BCD, BCD rückwärts. Eine der Characteristics akzeptierte
ausschließlich exakt zwei Bytes, was nach fester PIN-Länge roch. Keine Variante
hat den Read freigeschaltet.

Dazu kam eine wacklige Verbindung: BlueZ verliert das Geräteobjekt zwischen zwei
Aufrufen, wenn währenddessen kein Scan läuft. Jeder Versuch brauchte also erst
einmal einen Discovery-Durchlauf.

## Der Durchbruch

Statt weiter zu raten: der App beim Arbeiten zusehen. Offizielle Rotarex-App auf
einem Android-Tablet, **Bluetooth-HCI-Snoop-Log** eingeschaltet, einmal normal
verbinden, Mitschnitt auswerten.

Damit war es in zehn Minuten klar:

> Der PIN wird als **reiner ASCII-Text** auf eine Characteristic einer **ganz
> anderen Service** geschrieben — nicht auf die, die den Füllstand anbietet.
> Danach ist der Read sofort erfolgreich.

Die vollständige Zuordnung der UUIDs steht im Repository. Die gerätespezifischen
Angaben — MAC-Adresse, PIN, Seriennummer — stehen bewusst nicht hier: Die
findet jeder auf dem Typenschild seiner eigenen Box.

## Wie es jetzt läuft

- Ein Python-Script spricht direkt über **BlueZ/D-Bus** mit der Flasche —
  ohne `bleak`, ohne `gatttool`. Auf dem Venus OS des Cerbo ist das der Weg
  des geringsten Widerstands.
- **Node-RED** ruft es alle 15 Minuten auf und schreibt das Ergebnis in einen
  virtuellen Tank-Service (`node-red-contrib-victron`, FluidType LPG, 21 Liter
  für die 11-kg-Flasche).
- Der Cerbo zeigt das als Tank „LPG“ an, VRM übernimmt es mit.
- Jeder Abruf landet zusätzlich als Zeile in einer CSV — Zeitstempel, Rohwert,
  Prozent, Batteriestand. Damit lässt sich der Verbrauch später auswerten.

## Kalibrierung

Der Rohwert ist ein einzelnes Byte und entspricht direkt dem Prozentwert. Kein
Offset, keine Kurve. Bestätigt an einem echten Messpunkt außerhalb der oberen
Sättigung: Rohwert 78, App-Anzeige 78 %.

Am oberen Ende ist die Auflösung allerdings mager — die App fasst alles zwischen
94 und 100 % einfach als „voll“ zusammen. Weitere Referenzpunkte über den
Verbrauch der nächsten Monate werden zeigen, ob das über den ganzen Bereich so
linear bleibt.

## Was noch offen ist

- Deinstallations-Script
- Screenshots von Cerbo-Anzeige und Node-RED-Flow im Repository
- Kalibrierpunkte im unteren Drittel — dafür muss die Flasche erst mal leer werden

## Stolpersteine für Nachbauer

- BlueZ verliert das Geräteobjekt zwischen Verbindungen, wenn kein Scan läuft.
- `le-connection-abort-by-local` tritt auf, wenn man direkt nach dem Stoppen der
  Discovery verbindet — eine kurze Pause hilft.
- `dbus_fast` will ein `bytearray`, keine Python-Liste.
- Die Ausgabe des Node-RED-`exec`-Node kann mehrzeilig sein. Beim Parsen immer
  nur die letzte Zeile als JSON behandeln.

## Dank

Die entscheidende Vorarbeit zum GATT-Protokoll kam aus dem
[Pekaway-Forum](https://forum.pekaway.de/t/rotarex-dimes-srg-gas-level/1069).
Ohne den dortigen Thread hätte die Suche deutlich länger gedauert.

Das Projekt steht in keiner Verbindung zu Rotarex, SRG Schulz + Rackow
Gastechnik oder Victron Energy. Es liest ausschließlich die eigene Hardware aus,
es wird nichts verändert oder umgangen.
