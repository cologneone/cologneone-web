---
layout: ../../layouts/Projekt.astro
titel: Die neue TravelMate 2.0 lässt sich doch auslesen
kurz: Beim Vorgängersystem war der Füllstand leicht auszulesen, beim neuen nicht mehr. Deshalb bleiben viele bei der alten Generation. Hier steht, wie die Alugas TravelMate 2.0 trotzdem im Cerbo GX landet.
meta_titel: Alugas TravelMate / Rotarex DIMES im Victron Cerbo GX auslesen
meta_beschreibung: Gasfüllstand einer Alugas TravelMate 2.0 per Bluetooth auslesen – Rotarex DIMES WAVE / SRG-1-WAVE über BlueZ, D-Bus und Node-RED im Victron Cerbo GX.
bild: /bilder/rotarex/gaskasten.jpg
rang: 3
status: Fertig
stand: 2026-08
tags:
  - Bluetooth
  - Victron
  - Node-RED
  - Wohnmobil
---

Unter Campern ist das ein bekanntes Ärgernis. Die **Alugas TravelMate 2.0** ist die
aktuelle Gastankflasche, und ihr Füllstand ist über ein Bluetooth-Modul von Rotarex
zu haben – DIMES WAVE, im BLE-Scan als `SRG-1-WAVE`. Nur eben abgeschottet: Die
Werte gibt es in der Hersteller-App und sonst nirgends.

Beim Vorgängersystem war das anders. Dessen Geber ließ sich ohne großen Aufwand in
die eigene Anlage holen, und genau deshalb greifen bis heute viele zur älteren
Generation, obwohl sie eigentlich die neue haben wollen. Wer die 2.0 kauft, bekommt
die bessere Flasche und verliert die Anbindung.

**Beides geht.** Der Füllstand der 2.0 steht hier im **Victron Cerbo GX**, dem
Steuergerät, bei dem im Fahrzeug alles zusammenläuft. Als ganz normale Tankanzeige
neben Frischwasser, Grauwasser und Diesel, aktualisiert alle 15 Minuten. Wie das
geht, steht weiter unten, und der Code liegt offen.

<figure>
  <img src="/bilder/rotarex/cerbo-tanks.png" alt="Füllstandsanzeige im Cerbo GX mit fünf Tanks: Frischwasser, Grauwasser, Diesel, Diesel gefiltert und LPG bei 25 Prozent" />
  <figcaption>Das Ziel: LPG als vollwertiger Tank in der GX-Oberfläche, gleichberechtigt neben Wasser und Diesel. Hier 25 %, also noch 5 von 21 Litern.</figcaption>
</figure>

> **Code auf GitHub:** [cologneone/dbus-rotarex-dime](https://github.com/cologneone/dbus-rotarex-dime)
> – Installationsskript, Auslese-Script und der fertige Node-RED-Flow, MIT-Lizenz.

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
liest, kommt das Handy nicht dran, und umgekehrt. Da der Abruf nur alle 15
Minuten für wenige Sekunden läuft, stört das im Alltag nicht.

> **Nicht Teil der Messung**, auch wenn es auf dem Foto danach aussieht: das
> blaue Gehäuse direkt am Ventil. Das ist der Crash-Sensor der
> **GOK Caramatic SafeDrive 30 mbar**, einer Sicherheits-Gasdruck-Regelanlage
> (1,5 kg/h, Anschluss G.12 KLF × RVS 10/8). Sie sperrt die Gaszufuhr bei einem
> Unfall ab und ist der Grund, warum während der Fahrt geheizt werden darf.
> Der silberne Topf mit dem gelben Aufkleber daneben ist der eigentliche Regler.

<figure>
  <img src="/bilder/rotarex/druckregler.jpg" alt="Gasdruckregler GOK Caramatic SafeDrive mit blauem Crash-Sensor am Ventil der Gastankflasche" />
  <figcaption>Der GOK Caramatic SafeDrive am Multiventil: blau der Crash-Sensor, silbern der Regler.</figcaption>
</figure>

### Wo Anzeige und Sendebox sitzen – und warum nicht im Gaskasten

<figure>
  <img src="/bilder/rotarex/ble-box.jpg" alt="Rotarex DIMES-Anzeige und schwarze WAVE-Sendebox auf dem Deckel des Gaskastens unter der Sitzbank, daneben die gasdicht verschlossene Kabeldurchführung" />
  <figcaption>Unter der Sitzbank, oben auf dem Gaskasten: rund die DIMES-Anzeige mit ihren 43 %, links die schwarze WAVE-Sendebox am Klettband. Der weiße Klumpen rechts daneben ist die gasdicht verschlossene Kabeldurchführung.</figcaption>
</figure>

Der Gaskasten sitzt bei diesem Fahrzeug **unter der Sitzbank**. Anzeige und
Sendebox habe ich bewusst **nicht hineingebaut**, sondern obenauf gesetzt, also
außerhalb des Gaskastens, aber noch unter der Bank.

Das hat zwei Gründe. Erstens ist ein Gaskasten kein Ort für Elektronik: Er ist nach
außen belüftet, dort steht bei jedem Wetter Feuchtigkeit, und alles, was Funken
schlagen könnte, hat darin nichts verloren. Zweitens will man an eine
batteriebetriebene Sendebox gelegentlich heran, ohne erst die Flasche losschnallen
zu müssen.

Die dafür nötige Kabeldurchführung ist **gasdicht verschlossen**: auf dem Foto der
weiße Klumpen. Das ist kein Schönheitsfehler, sondern der Punkt, an dem die ganze
Sache steht oder fällt: Ein Gaskasten muss nach innen dicht sein, sonst ist er
sinnlos. Wer diesen Weg nachbaut, sollte genau diese Stelle sorgfältig machen und
danach kontrollieren.

## Warum das nicht einfach ging

Ein BLE-Scan findet die Flasche sofort: Gerät `SRG-1-WAVE`, dazu eine
übersichtliche GATT-Struktur mit einer Characteristic, die verdächtig nach
Füllstand aussieht. Nur: Jeder Leseversuch darauf endet mit

```
ATT error: 0x80
```

Das ist ein herstellerspezifischer Fehler, zu dem es keine Dokumentation gibt.
Auch Pairing ändert nichts. Die App verlangt beim ersten Verbinden einen PIN,
der auf dem Typenschild der Bluetooth-Box steht. Nur schaltet dieser PIN
offensichtlich etwas frei, das man erst schreiben muss, bevor man lesen darf.

Wohin und in welchem Format, stand nirgends.

## Die Sackgasse

Zuerst der naheliegende Weg: PIN auf die Write-Characteristics der beworbenen
Service schreiben, in allen plausiblen Kodierungen: ASCII, UInt16 in beiden
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
> anderen Service** geschrieben – nicht auf die, die den Füllstand anbietet.
> Danach ist der Read sofort erfolgreich.

Die vollständige Zuordnung der UUIDs steht im Repository. Die gerätespezifischen
Angaben – MAC-Adresse, PIN, Seriennummer – stehen bewusst nicht hier: Die
findet jeder auf dem Typenschild seiner eigenen Box.

## Wie es jetzt läuft

Ein Python-Script spricht direkt über **BlueZ/D-Bus** mit der Flasche, ohne
`bleak`, ohne `gatttool`. Auf dem Venus OS des Cerbo ist das der Weg des
geringsten Widerstands. **Node-RED** ruft es alle 15 Minuten auf und schreibt
das Ergebnis in einen virtuellen Tank-Service.

<figure>
  <img src="/bilder/rotarex/nodered-flow.png" alt="Node-RED-Flow mit Poll-Timer, Auslese-Node, Parser und virtuellem Tank" />
  <figcaption>Der ganze Flow: Timer, Script-Aufruf, Parser, MQTT und der virtuelle Tank. Unten die Statuszeile mit dem aktuellen Wert.</figcaption>
</figure>

Auf dem Cerbo liegt dabei kein Sonderfall mehr: Der `exec`-Node ruft genau das
Script auf, das auch im Repository steht. MAC und PIN stehen nicht im Flow,
sondern in einer Konfigurationsdatei daneben. So lässt sich der Flow
exportieren und zeigen, ohne Zugangsdaten mitzuliefern.

Der Cerbo sieht davon nichts Besonderes. Für ihn ist es schlicht ein
Tanksensor, der über Node-RED angebunden ist:

<figure>
  <img src="/bilder/rotarex/cerbo-lpg-geraet.png" alt="Gerätedetails im Cerbo: Verbindung Node-RED, Produkt Virtual tank sensor" />
  <figcaption>Aus Sicht des Cerbo ein ganz normaler Tanksensor, Herkunft: Node-RED.</figcaption>
</figure>

In den Einstellungen bekommt der Tank die Daten der 11-kg-Flasche: 21 Liter
Kapazität, Flüssigkeitstyp LPG. Damit rechnet die Oberfläche den Prozentwert
selbständig in Liter um.

<figure>
  <img src="/bilder/rotarex/cerbo-lpg-setup.png" alt="Tank-Einstellungen im Cerbo: Kapazität 21 Liter, Flüssigkeitstyp LPG" />
  <figcaption>Einmal eingestellt: 21 Liter, Typ LPG.</figcaption>
</figure>

> **Vorsicht, hier steckt eine Falle:** „Einmal eingestellt" stimmt so nicht
> ganz. Der Flow schickt Kapazität und Flüssigkeitstyp bei *jedem* Abruf mit –
> was in der Cerbo-Oberfläche eingetragen ist, wird also spätestens nach 15
> Minuten wieder überschrieben. Bei meiner 11-kg-Flasche fällt das nicht auf,
> weil beide Werte dasselbe sagen. Wer eine andere Flaschengröße hat, trägt sie
> im Funktionsknoten des Flows ein und nicht in den Einstellungen, oder nimmt
> die beiden Felder dort heraus und pflegt sie im Cerbo.

Jeder **erfolgreiche** Abruf landet zusätzlich als Zeile in einer CSV:
Zeitstempel in UTC, Rohwert, Prozent, Batteriestand des Senders. Fehlversuche
stehen bewusst nicht drin: Eine Historie voller Lücken mit leeren Werten
verzerrt jede spätere Verbrauchsauswertung.

<figure>
  <img src="/bilder/rotarex/cerbo-kurzansicht.png" alt="Kurzübersicht des Cerbo mit Batterie, Frischwasser, Abwasser und LPG" />
  <figcaption>In der Kurzübersicht steht der Gasvorrat jetzt gleichberechtigt neben Batterie und Wasser.</figcaption>
</figure>

## Kalibrierung

Der Rohwert ist ein einzelnes Byte. Nach bisherigem Stand entspricht er direkt
dem Prozentwert. In den vorliegenden Messpunkten war weder ein Offset noch
eine Kurve nötig.

Belegt ist das durch zwei unabhängige Beobachtungen: einen Messpunkt außerhalb
der oberen Sättigung (Rohwert 78 bei App-Anzeige 78 %) und einen zeitnahen
Vergleich. Die App meldete 60 %, der Cerbo zwei Minuten zuvor 61 %, genau das,
was der 15-Minuten-Takt erwarten lässt.

<figure class="hochformat">
  <img src="/bilder/rotarex/app-trend.png" alt="Rotarex-App mit 60 Prozent Füllstand und fallendem Trenddiagramm" />
  <figcaption>Die Hersteller-App zur selben Zeit: 60 %. Das Trenddiagramm zeigt schön den gleichmäßigen Verbrauch.</figcaption>
</figure>

Dazu sind zwei weitere Punkte gekommen, beide deutlich weiter unten. Am
24. August stand die Flasche bei **26 %**, am 26. August bei **12 %**, und beide
Male zeigten App und Cerbo dasselbe. Damit ist die Zuordnung nicht mehr nur im
oberen Mittelfeld belegt, sondern **über die ganze Spanne von 78 bis 12 %** – und
gerade der untere Bereich ist der, auf den es ankommt, wenn man wissen will, ob
das Gas noch reicht.

Zwei Einschränkungen bleiben. Am oberen Ende ist die Auflösung mager: Die App
fasst alles zwischen 94 und 100 % einfach als „voll“ zusammen. Und das letzte
Stück unterhalb von 12 % ist weiter unbelegt, dafür muss die Flasche erst einmal
wirklich leer werden. Für die Frage, die man unterwegs tatsächlich hat, ist der
geprüfte Bereich damit aber abgedeckt.

## Was noch offen ist

- Auswertung der Verbrauchsdaten über eine ganze Saison

## Stolpersteine für Nachbauer

- BlueZ verliert das Geräteobjekt zwischen Verbindungen, wenn kein Scan läuft.
- `le-connection-abort-by-local` tritt auf, wenn man direkt nach dem Stoppen der
  Discovery verbindet. Eine kurze Pause hilft.
- `dbus_fast` will ein `bytearray`, keine Python-Liste.
- Die Ausgabe des Node-RED-`exec`-Node kann mehrzeilig sein. Beim Parsen immer
  nur die letzte Zeile als JSON behandeln.
- Node-RED läuft als Benutzer `nodered` und darf nicht nach `/data/` schreiben:
  Script, Konfiguration und Historie gehören nach `/data/home/nodered/.node-red/`.
- Nur eine Bluetooth-Verbindung gleichzeitig: Läuft gerade der Abruf, meldet die
  Hersteller-App einen Verbindungsfehler. Deshalb trennt das Script am Ende
  immer, auch wenn unterwegs etwas schiefgeht.
- BlueZ-Aufrufe haben keine eigene Zeitgrenze. Ist das Modul außer Reichweite
  oder hält jemand anderes die Verbindung, bleibt `Connect()` einfach stehen,
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
