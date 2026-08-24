---
layout: ../../layouts/Projekt.astro
titel: Alugas TravelMate 2.0 über Bluetooth im Cerbo GX sichtbar machen
kurz: Den Füllstand einer Alugas TravelMate 2.0 im Cerbo GX anzeigen — ohne die Hersteller-App, direkt über BlueZ und Node-RED.
meta_titel: Alugas TravelMate / Rotarex DIMES im Victron Cerbo GX auslesen
meta_beschreibung: Gasfüllstand einer Alugas TravelMate 2.0 per Bluetooth auslesen — Rotarex DIMES WAVE / SRG-1-WAVE über BlueZ, D-Bus und Node-RED im Victron Cerbo GX.
bild: /bilder/rotarex/cerbo-tanks.png
status: Fertig
stand: 2026-08
tags:
  - Bluetooth
  - Victron
  - Node-RED
  - Wohnmobil
---

Die Alugas TravelMate 2.0 meldet ihren Füllstand über ein Bluetooth-Modul von
Rotarex (DIMES WAVE, im BLE-Scan als `SRG-1-WAVE`). Die Hersteller-App zeigt
den Wert an — aber eben nur dort, auf dem Handy, wenn man danebensteht.
Naheliegende Frage: Wie kommt der Wert dahin, wo die anderen Bordwerte auch
stehen, nämlich in den **Victron Cerbo GX**? Das ist das kleine Steuergerät, bei dem
im Fahrzeug alles zusammenläuft — Batterie, Solar, Frisch- und Grauwasser, Diesel.
Nur eben bisher nicht das Gas.

Antwort: Er steht jetzt dort. Als ganz normale Tankanzeige neben Frischwasser,
Grauwasser und Diesel, aktualisiert alle 15 Minuten.

<figure>
  <img src="/bilder/rotarex/cerbo-tanks.png" alt="Füllstandsanzeige im Cerbo GX mit vier Tanks, LPG bei 61 Prozent" />
  <figcaption>Das Ziel: LPG als vollwertiger Tank in der GX-Oberfläche — 61 %, 13 von 21 Litern.</figcaption>
</figure>

> **Code auf GitHub:** [cologneone/dbus-rotarex-dime](https://github.com/cologneone/dbus-rotarex-dime)
> — Installationsskript, Auslese-Script und der fertige Node-RED-Flow, MIT-Lizenz.

## Die Hardware

Im Gaskasten steht eine **Alugas TravelMate 2.0**, eine wiederbefüllbare
Alu-Gastankflasche mit elektronischem Multiventil.

<figure>
  <img src="/bilder/rotarex/gaskasten.jpg" alt="Alugas TravelMate 2.0 eingebaut im Gaskasten des Wohnmobils" />
  <figcaption>Die TravelMate 2.0 im Gaskasten, festgezurrt und angeschlossen.</figcaption>
</figure>

Die Füllstandsmessung besteht aus **drei Teilen**, und nur der dritte hat mit
Bluetooth zu tun:

1. **Der Sensor im Multiventil.** Er greift den Stand des Schwimmers magnetisch
   ab und gehört zum Ventil, ist also kein Zubehör.
2. **Die digitale Anzeige.** Sie ersetzt das analoge Zeigerinstrument am
   Multiventil und wird per Kabel mit dem Sensor verbunden.
3. **Die WAVE-BLE-Einheit von Rotarex.** Eine schwarze Sendebox mit einem Meter
   Anschlusskabel und Klett-Halter, die an die Anzeige gesteckt wird. Sie läuft
   mit zwei AAA-Batterien und funkt den Wert per Bluetooth Low Energy. Dieser
   Teil muss **separat gekauft** werden.

Eine Eigenheit der Sendebox, die für dieses Projekt wichtig ist: Sie lässt
**immer nur eine Bluetooth-Verbindung gleichzeitig** zu. Wenn der Cerbo gerade
liest, kommt das Handy nicht dran — und umgekehrt. Da der Abruf nur alle 15
Minuten für wenige Sekunden läuft, stört das im Alltag nicht.

> **Nicht Teil der Messung**, auch wenn es auf dem Foto danach aussieht: das
> blaue Gehäuse direkt am Ventil. Das ist der Crash-Sensor der
> **GOK Caramatic SafeDrive 30 mbar**, einer Sicherheits-Gasdruck-Regelanlage
> (1,5 kg/h, Anschluss G.12 KLF × RVS 10/8). Sie sperrt die Gaszufuhr bei einem
> Unfall ab und ist der Grund, warum während der Fahrt geheizt werden darf.
> Der silberne Topf mit dem gelben Aufkleber daneben ist der eigentliche Regler.

<figure>
  <img src="/bilder/rotarex/druckregler.jpg" alt="Gasdruckregler GOK Caramatic SafeDrive mit blauem Crash-Sensor am Ventil der Gasflasche" />
  <figcaption>Der GOK Caramatic SafeDrive am Multiventil — blau der Crash-Sensor, silbern der Regler. Fotos von Sensor, Anzeige und BLE-Box folgen.</figcaption>
</figure>

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

Ein Python-Script spricht direkt über **BlueZ/D-Bus** mit der Flasche — ohne
`bleak`, ohne `gatttool`. Auf dem Venus OS des Cerbo ist das der Weg des
geringsten Widerstands. **Node-RED** ruft es alle 15 Minuten auf und schreibt
das Ergebnis in einen virtuellen Tank-Service.

<figure>
  <img src="/bilder/rotarex/nodered-flow.png" alt="Node-RED-Flow mit Poll-Timer, Auslese-Node, Parser und virtuellem Tank" />
  <figcaption>Der ganze Flow: Timer, Script-Aufruf, Parser, MQTT und der virtuelle Tank. Unten die Statuszeile mit dem aktuellen Wert.</figcaption>
</figure>

Auf dem Cerbo liegt dabei kein Sonderfall mehr: Der `exec`-Node ruft genau das
Script auf, das auch im Repository steht. MAC und PIN stehen nicht im Flow,
sondern in einer Konfigurationsdatei daneben — so lässt sich der Flow
exportieren und zeigen, ohne Zugangsdaten mitzuliefern.

Der Cerbo sieht davon nichts Besonderes — für ihn ist es schlicht ein
Tanksensor, der über Node-RED angebunden ist:

<figure>
  <img src="/bilder/rotarex/cerbo-lpg-geraet.png" alt="Gerätedetails im Cerbo: Verbindung Node-RED, Produkt Virtual tank sensor" />
  <figcaption>Aus Sicht des Cerbo ein ganz normaler Tanksensor — Herkunft: Node-RED.</figcaption>
</figure>

In den Einstellungen bekommt der Tank die Daten der 11-kg-Flasche: 21 Liter
Kapazität, Flüssigkeitstyp LPG. Damit rechnet die Oberfläche den Prozentwert
selbständig in Liter um.

<figure>
  <img src="/bilder/rotarex/cerbo-lpg-setup.png" alt="Tank-Einstellungen im Cerbo: Kapazität 21 Liter, Flüssigkeitstyp LPG" />
  <figcaption>Einmal eingestellt: 21 Liter, Typ LPG.</figcaption>
</figure>

> **Vorsicht, hier steckt eine Falle:** „Einmal eingestellt" stimmt so nicht
> ganz. Der Flow schickt Kapazität und Flüssigkeitstyp bei *jedem* Abruf mit —
> was in der Cerbo-Oberfläche eingetragen ist, wird also spätestens nach 15
> Minuten wieder überschrieben. Bei meiner 11-kg-Flasche fällt das nicht auf,
> weil beide Werte dasselbe sagen. Wer eine andere Flaschengröße hat, trägt sie
> im Funktionsknoten des Flows ein und nicht in den Einstellungen — oder nimmt
> die beiden Felder dort heraus und pflegt sie im Cerbo.

Jeder **erfolgreiche** Abruf landet zusätzlich als Zeile in einer CSV —
Zeitstempel in UTC, Rohwert, Prozent, Batteriestand des Senders. Fehlversuche
stehen bewusst nicht drin: Eine Historie voller Lücken mit leeren Werten
verzerrt jede spätere Verbrauchsauswertung.

<figure>
  <img src="/bilder/rotarex/cerbo-kurzansicht.png" alt="Kurzübersicht des Cerbo mit Batterie, Frischwasser, Abwasser und LPG" />
  <figcaption>In der Kurzübersicht steht der Gasvorrat jetzt gleichberechtigt neben Batterie und Wasser.</figcaption>
</figure>

## Kalibrierung

Der Rohwert ist ein einzelnes Byte. Nach bisherigem Stand entspricht er direkt
dem Prozentwert — in den vorliegenden Messpunkten war weder ein Offset noch
eine Kurve nötig.

Belegt ist das durch zwei unabhängige Beobachtungen: einen Messpunkt außerhalb
der oberen Sättigung (Rohwert 78 bei App-Anzeige 78 %) und einen zeitnahen
Vergleich. Die App meldete 60 %, der Cerbo zwei Minuten zuvor 61 % — genau das,
was der 15-Minuten-Takt erwarten lässt.

<figure class="hochformat">
  <img src="/bilder/rotarex/app-trend.png" alt="Rotarex-App mit 60 Prozent Füllstand und fallendem Trenddiagramm" />
  <figcaption>Die Hersteller-App zur selben Zeit: 60 %. Das Trenddiagramm zeigt schön den gleichmäßigen Verbrauch.</figcaption>
</figure>

Zwei Punkte im oberen Mittelfeld sind allerdings kein Beweis für den ganzen
Bereich. Unten fehlen Referenzwerte schlicht deshalb, weil die Flasche dafür
erst leer werden muss. Und am oberen Ende ist die Auflösung ohnehin mager — die
App fasst alles zwischen 94 und 100 % einfach als „voll“ zusammen. Ob die
Zuordnung über den ganzen Bereich linear bleibt, wird sich über den Verbrauch
der nächsten Monate zeigen.

## Was noch offen ist

- Fotos von Sensor, Anzeige und BLE-Box
- Kalibrierpunkte im unteren Drittel — dafür muss die Flasche erst mal leer werden
- Auswertung der Verbrauchsdaten über eine ganze Saison

## Stolpersteine für Nachbauer

- BlueZ verliert das Geräteobjekt zwischen Verbindungen, wenn kein Scan läuft.
- `le-connection-abort-by-local` tritt auf, wenn man direkt nach dem Stoppen der
  Discovery verbindet — eine kurze Pause hilft.
- `dbus_fast` will ein `bytearray`, keine Python-Liste.
- Die Ausgabe des Node-RED-`exec`-Node kann mehrzeilig sein. Beim Parsen immer
  nur die letzte Zeile als JSON behandeln.
- Node-RED läuft als Benutzer `nodered` und darf nicht nach `/data/` schreiben —
  Script, Konfiguration und Historie gehören nach `/data/home/nodered/.node-red/`.
- Nur eine Bluetooth-Verbindung gleichzeitig: Läuft gerade der Abruf, meldet die
  Hersteller-App einen Verbindungsfehler. Deshalb trennt das Script am Ende
  immer, auch wenn unterwegs etwas schiefgeht.
- BlueZ-Aufrufe haben keine eigene Zeitgrenze. Ist das Modul außer Reichweite
  oder hält jemand anderes die Verbindung, bleibt `Connect()` einfach stehen —
  hier gemessen einmal elf Minuten. Das Script bricht deshalb nach 85 Sekunden
  von selbst ab und meldet `timeout`, statt vom `exec`-Node ohne Ausgabe
  abgeschossen zu werden.

## Dank

Die entscheidende Vorarbeit zum GATT-Protokoll kam aus dem
[Pekaway-Forum](https://forum.pekaway.de/t/rotarex-dimes-srg-gas-level/1069).
Ohne den dortigen Thread hätte die Suche deutlich länger gedauert.

Das Projekt steht in keiner Verbindung zu Rotarex, SRG Schulz + Rackow
Gastechnik, GOK oder Victron Energy. Es liest ausschließlich die eigene Hardware
aus, es wird nichts verändert oder umgangen.
