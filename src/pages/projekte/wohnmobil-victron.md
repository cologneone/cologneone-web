---
layout: ../../layouts/Projekt.astro
titel: Die Energieanlage — Victron und Cerbo GX im Flair
kurz: 560 Ah Lithium, ein Wechselrichter, zwei Solarregler, drei Ladebooster und ein Cerbo GX, der alles zusammenhält. Mit Fotos aus den Fächern — und dem Abend, an dem beide Booster nicht luden.
meta_titel: Victron-Anlage im Wohnmobil mit Cerbo GX — Aufbau, Verkabelung, Praxis
meta_beschreibung: MultiPlus-II, zwei SmartSolar MPPT, drei Ladebooster, 560 Ah LiFePO4 und ein Victron Cerbo GX im Wohnmobil. Lynx-Verteiler mit selbst nachgerüsteten Sicherungen, Querschnitte, Sicherungsplan und die Fehlersuche, die einen ganzen Abend gekostet hat.
bild: /bilder/victron/boosterfach.jpg
status: Laufend
stand: 2026-08
tags:
  - Victron
  - Cerbo GX
  - Node-RED
  - Wohnmobil
---

Das Energiesystem im Fahrzeug läuft auf Victron-Komponenten, mit einem **Cerbo GX**
als Kopf der Anlage. Das Ziel war nie die maximale Ausbaustufe, sondern ein System,
das ich verstehe, im Zweifel selbst reparieren kann und dessen Zustand jederzeit
ablesbar ist — auch dann, wenn ich gerade nicht daneben stehe.

Diese Seite ist die Übersicht: was drin ist, wie es zusammenhängt und was ich dabei
gelernt habe. Die Details, bei denen es richtig interessant wurde, stehen in eigenen
Beiträgen.

## Was verbaut ist

| Aufgabe | Gerät | Wozu das gut ist |
|---|---|---|
| Landstrom und 230 V an Bord | MultiPlus-II 12/3000/120-32 | Lädt an der Säule und macht aus 12 V wieder 230 V — beides im selben Kasten |
| Strom vom Dach | zwei SmartSolar MPPT 100/30 | Zwei Dachbereiche getrennt, damit ein verschattetes Panel nicht das andere mitzieht |
| Strom vom Motor | zwei Orion XS 12/12-50 | Laden die Wohnraumbatterie während der Fahrt, je 50 A |
| Starterbatterie nachladen | ein Orion-Tr Smart 12/12-30 | Lädt in die andere Richtung — dazu unten mehr |
| Speicher | zwei LiFePO4 mit je 280 Ah | Zusammen 560 Ah bei 12,8 V, jede mit eigenem BMS |
| Der Zähler | BMV-712 Smart | Zählt Amperestunden rein und raus, statt nur Spannung zu raten |
| Der Kopf | Cerbo GX mit Node-RED | Sammelt alles ein, zeigt es an und schaltet, wo es nötig ist |

Dazu Tankgeber für Frisch- und Grauwasser, ein Ultraschallsensor am Dieseltank,
Temperaturfühler im Fahrzeug und eine Handvoll Funkschaltaktoren für Licht und
Verbraucher.

Eine Zahl, die im Winter zählt: **Unter 5 °C wird nicht geladen.** Das Datenblatt
erlaubt 0 °C, aber das BMS kennt die Zelltemperatur nur ungefähr — und eine
LiFePO4-Zelle, die man kalt lädt, nimmt dauerhaft Schaden, ohne dass man es merkt.
Fünf Grad Sicherheitsabstand kosten im Alltag praktisch nichts.

## Der Punkt, an dem alles zusammenläuft

<figure>
  <img src="/bilder/victron/technikfach-lynx.jpg" alt="Victron Lynx Power In 1000 im Technikfach, links daneben der rote Batterietrennschalter" />
  <figcaption>Der Lynx Power In 1000 mit den vier Plusabgängen. Der rote Drehknopf links ist der Batterietrennschalter in der Lichtmaschinenleitung — der spielt später noch eine Hauptrolle.</figcaption>
</figure>

Alles Dicke trifft sich an einer Stelle: dem **Lynx Power In 1000**. Der ist ab Werk
eine reine Sammelschiene *ohne* Sicherungen — vier Abgänge, alle direkt auf dem
Batterieplus. Ich habe ihn selbst auf Sicherungen umgebaut.

Die Regel für die Querschnitte ist im ganzen Fahrzeug dieselbe und leicht zu merken:

- **50 mm²** für alles Dicke — Batterien, MultiPlus, Lichtmaschine, Ladeverteiler
- **16 mm²** für alles Dünnere — Bordversorgung, Booster, Solar

Und der Satz, der beim Sicherungenaussuchen wirklich hilft: **Eine Sicherung schützt
die Leitung, nicht das Gerät.** Sie muss also zum Kabel passen, nicht zum
Verbraucher. Dahinter kommt die Staffelung: 200 A im Lynx, davor 60 A im
Ladeverteiler, davor 60 A am Booster. Fliegt etwas, fliegt es an der richtigen
Stelle — und nicht die große Sicherung, die die halbe Anlage mitnimmt.

> **Ein Fehler, den ich fast gemacht hätte:** Empfohlen war mir zuerst eine
> Class-T-Sicherung an der Batterie — die teure Variante mit sehr hohem
> Schaltvermögen. Erst als das Batteriedatenblatt auf dem Tisch lag, war klar, dass
> das nicht nötig ist: Zwei parallele Blöcke liefern im Kurzschluss rund 1700 A in
> der Spitze, und die verbauten MEGA-Sicherungen schalten bis 2000 A sicher ab. Die
> Empfehlung wurde zurückgezogen. Merke: erst das Datenblatt, dann die Bestellung.

## Drei Ladebooster — und einer lädt rückwärts

<figure>
  <img src="/bilder/victron/boosterfach.jpg" alt="Boosterfach mit zwei Orion XS 12/12-50 und einem Orion-Tr Smart 12/12-30, darunter Ladeverteiler und Lichtmaschinenverteiler" />
  <figcaption>Booster 1 und 2 (Orion XS) laden während der Fahrt die Wohnraumbatterie, Booster 3 (Orion-Tr Smart, rechts) lädt in die Gegenrichtung. Unten links der Eingang von der Lichtmaschine, rechts der Ladeverteiler.</figcaption>
</figure>

**Booster 1 und 2** machen das Erwartbare: Sie holen sich Strom von der
Lichtmaschine und laden damit die Wohnraumbatterie. Zusammen bis zu 100 A. Sie
hängen per Datenkabel am Cerbo und wissen selbst, wann sie dürfen — über **D+**,
also das Signal, das im Fahrzeug sagt „der Motor läuft".

**Booster 3 lädt in die andere Richtung**: aus der Wohnraumbatterie zurück in die
**Starterbatterie**. Das klingt verkehrt herum, ist aber der praktischste Booster von
allen. Denn die Wohnraumbatterie hat 560 Ah, Solar auf dem Dach und drei Ladewege —
die geht so schnell nicht leer. Liegenbleiben tut man an der *Starterbatterie*, und
die hängt bei den meisten Fahrzeugen einfach nur da und entlädt sich still vor sich
hin.

Dieser dritte Booster hat keinen Datenanschluss. Er wird über ein **Relais des
Cerbo** geschaltet, und alle Schwellenwerte liegen nicht im Gerät, sondern in einem
Node-RED-Ablauf auf dem Cerbo. Ein alter Aufkleber am Gehäuse behauptet noch etwas
anderes — der gehört abgemacht.

## Der Abend, an dem beide Booster nicht luden

Motor lief, beide Orion XS meldeten: nichts. Das kostete einen ganzen Abend, und
die Reihenfolge, die am Ende geholfen hat, steht hier, damit sie jemandem Zeit spart:

1. **Eingangsspannung ansehen.** Was sieht der Booster an seinem Eingang? Steht dort
   bei laufendem Motor nahezu null, muss man im Gerät gar nicht weitersuchen.
2. **Den Abschaltgrund lesen — als Bitmaske.** Victron meldet nicht *einen* Grund,
   sondern alle gleichzeitig, als Summe von Zweierpotenzen. `1` heißt „keine
   Eingangsspannung", `8` heißt „D+ fehlt". Stehen beide an, steht dort `9` — und
   wer auf Gleichheit prüft, findet nichts. [Die Kurzfassung dazu
   hier](/notizen/deviceoffreason-bitmaske).
3. **Wenn keine Eingangsspannung ankommt, ist die Ursache mechanisch.**

Genau so war es: Der **Batterietrennschalter** in der Lichtmaschinenleitung — der
rote Drehknopf auf dem Foto weiter oben — stand auf aus. Kein Defekt, kein Bauteil,
ein Schalter.

Ehrlicherweise gehört dazu, was ich vorher falsch vermutet hatte: eine lose oder
korrodierte Hochstromverbindung, samt Sorge vor Wärmeentwicklung. Das war überzogen,
und es hätte mir früher auffallen können — 41 Minuten völlig ruhiger Spannungsverlauf
sprachen dagegen. **Eine wackelnde Verbindung erzeugt Rauschen. Eine ausgeschaltete
Verbindung erzeugt Stille.** Wer im Log nur eine glatte Linie sieht, sucht am
falschen Ende.

Damit dieser Zustand nicht wieder tagelang unbemerkt bleibt, [schickt der Router im
Fahrzeug](/projekte/wohnmobil-netzwerk) heute eine SMS, sobald der Motor läuft und
beide Booster am Eingang unter 5 V melden.

## Sicherung 13 ist die wichtigste Zeile im Fahrzeug

<figure>
  <img src="/bilder/victron/sicherungsplan.jpg" alt="Beschrifteter Sicherungsplan mit den Kreisen 01 bis 14" />
  <figcaption>Vierzehn Kreise, einmal ordentlich beschriftet. Die Stunde, die das gekostet hat, war die bestinvestierte am ganzen Fahrzeug.</figcaption>
</figure>

Der Sicherungsplan sieht harmlos aus, bis man Nummer 13 liest: **„Zuleitung WC /
Cerbo GX — 3 A."** Die WC-Spülung und das Gehirn der ganzen Anlage hängen am selben
Kreis. Wer die Spülung stromlos macht, macht den Cerbo stromlos — und damit
Messwerte, Automatik und Fernzugriff.

Das ist kein Baufehler, sondern eine gewachsene Belegung. Aber es ist die Art von
Zusammenhang, die man kennen muss, bevor man an einem Regentag „mal eben" eine
Sicherung zieht. Deshalb steht sie hier so deutlich.

Der zweite Grund, warum diese Tafel hier steht: **Beschriften.** Vierzehn schwarze
Schildchen an der Klappe haben mehr Fehlersuchzeit gespart als jedes Messgerät. Wer
gerade an seiner Anlage baut, sollte das einplanen, solange er noch weiß, was wohin
geht.

## Die Zahl, auf die es ankommt

<figure>
  <img src="/bilder/victron/bmv-712.jpg" alt="Victron BMV-712 Batteriewächter zeigt 77,2 Prozent Ladezustand" />
  <figcaption>77,2 %. Diese Zahl ist gezählt, nicht geschätzt — und das ist der Unterschied.</figcaption>
</figure>

Bei Blei konnte man aus der Ruhespannung noch grob auf den Füllstand schließen. Bei
**LiFePO4 funktioniert das nicht mehr**: Die Spannung ist zwischen etwa 20 und 80 %
nahezu flach. Zwei Zehntelvolt Unterschied trennen dort ein Drittel der Kapazität.
Wer nach dem Voltmeter geht, rät.

Deshalb der **BMV-712**: ein Shunt in der Minusleitung, der jede Amperestunde zählt,
die rein- und rausgeht. Das ist der Unterschied zwischen einer gemessenen und einer
geschätzten Anzeige — und der Grund, warum man morgens weiß, ob der Kaffee noch
drin ist.

Ein Nebeneffekt, der oft übersehen wird: Der BMV hat einen **zweiten
Spannungseingang**, und der liegt hier auf der **Starterbatterie**. Damit hat der
Cerbo ohne weitere Hardware auch deren Spannung — genau die Größe, die die
Rückladeautomatik von Booster 3 braucht.

## Wie die Teile zusammenspielen

<figure>
  <img src="/bilder/victron/cerbo-gx.jpg" alt="Victron Cerbo GX mit angeschlossenen VE.Direct-, VE.Bus- und Netzwerkkabeln" />
  <figcaption>Der Cerbo GX. Alles, was ein Kabel hat, meldet sich hier von selbst — der Rest musste dazugebaut werden.</figcaption>
</figure>

Die meisten Geräte hängen per Kabel am Cerbo und tauchen ohne Zutun in der
Oberfläche auf. **Drei Dinge tun das nicht** und mussten dazugebaut werden:

- Die **Gasflasche** funkt nur per Bluetooth, und zwar in einem undokumentierten
  Protokoll — [wie sie trotzdem im Cerbo landet](/projekte/travelmate-bluetooth).
- Der **Dieselgeber** liefert brauchbare Werte nur mit Filter, und der Treiber
  rechnet anders, als die Oberfläche vermuten lässt —
  [was dahintersteckt](/projekte/mopeka-diesel).
- Der **Booster für die Starterbatterie** hat keinen Datenanschluss und wird über ein
  Relais geschaltet.

Die Logik dafür liegt in Node-RED auf dem Cerbo selbst — ein Tab je Aufgabe, jeder
für sich importierbar und mit eigener Änderungshistorie. Node-RED ist bei Victron
Teil der „large"-Firmware, kostet also nichts extra und läuft direkt auf dem Gerät.

## Drei Dinge, die ich vorher gern gewusst hätte

**Ein Ausfall ist ein Betriebszustand, kein Fehler.** Ein Sensor, der kurz nichts
sieht, darf nicht 0 melden. Halten, markieren, weiterlaufen — sonst ist jede
Auswertung wertlos und jeder Alarm einer zu viel.

**Feste Adressen in Automatisierungen sind eine Zeitbombe.** Sie funktionieren, bis
sich das Netz ändert, und dann fällt still die halbe Anlage aus. Genau das ist
passiert; acht Stunden lang ist es niemandem aufgefallen. Was auf dem Cerbo läuft und
den Cerbo meint, spricht ihn seither lokal an und nicht über seine Netzwerkadresse.

**Ohne Lebenszeichen verstummt die Datenquelle.** Victrons MQTT-Schnittstelle stellt
das Senden ein, wenn ihr niemand regelmäßig ein Signal schickt. Das sieht aus wie ein
kaputter Sensor und ist keiner —
[die Kurzfassung dazu](/notizen/victron-mqtt-keepalive).

## Was noch offen ist

- Den Aufdruck einer Sicherung im Lynx ablesen — auf dem Foto nicht sicher lesbar,
  und geraten wird hier nichts
- Fotos vom Batteriefach und vom Ladeverteiler aus der Nähe
- Solarertrag und Verbrauch über eine ganze Saison, nicht über ein paar Wochen
- Ein kleines Display fürs Fahrerhaus: Dieselstand, Ladezustand, Boosterströme. Das
  Gerät ist da, die Anbindung fehlt noch
- Der ehrliche Abschnitt „was ich anders machen würde" — den schreibe ich, wenn die
  erste lange Reise damit durch ist

## Einordnung

Das ist eine gewachsene Anlage in einem gebrauchten Fahrzeug, kein Musterbau aus dem
Katalog. Sie steht in keiner Verbindung zu Victron Energy; alle Angaben stammen aus
dem eigenen Fahrzeug. Wer nachbaut, prüft Querschnitte und Absicherung an seiner
eigenen Anlage — und im Zweifel bei jemandem, der es beruflich macht.
