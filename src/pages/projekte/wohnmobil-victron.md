---
layout: ../../layouts/Projekt.astro
titel: Die Energieanlage – Victron und Cerbo GX im Flair
kurz: 560 Ah Lithium, ein Wechselrichter, zwei Solarregler, drei Ladebooster und ein Cerbo GX, der alles zusammenhält. Mit Fotos aus den Fächern – und dem Abend, an dem beide Booster nicht luden.
meta_titel: Victron-Anlage im Wohnmobil mit Cerbo GX – Aufbau, Verkabelung, Praxis
meta_beschreibung: MultiPlus-II, zwei SmartSolar MPPT, drei Ladebooster, 560 Ah LiFePO4 und ein Victron Cerbo GX im Wohnmobil. Lynx-Verteiler mit selbst nachgerüsteten Sicherungen, Querschnitte, Sicherungsplan und die Fehlersuche, die einen ganzen Abend gekostet hat.
bild: /bilder/victron/flair-berge.jpg
status: Laufend
stand: 2026-08
tags:
  - Victron
  - Cerbo GX
  - Node-RED
  - Wohnmobil
---

<figure>
  <img src="/bilder/victron/flair-berge.jpg" alt="Niesmann+Bischoff Flair 6000 auf einem Schotterplatz vor einem Karstberg in Kroatien" />
  <figcaption>Darum geht der ganze Aufwand: ein paar Tage stehen, wo es schön ist, ohne Landstrom und ohne Rechnen.</figcaption>
</figure>

Das Energiesystem im Fahrzeug läuft auf Victron-Komponenten, mit einem **Cerbo GX**
als Kopf der Anlage. Das Ziel war nie die maximale Ausbaustufe, sondern ein System,
das ich verstehe, im Zweifel selbst reparieren kann und dessen Zustand jederzeit
ablesbar ist, auch wenn ich gerade nicht daneben stehe.

Diese Seite ist die Übersicht: was drin ist, wie es zusammenhängt und was ich dabei
gelernt habe. Die Details, bei denen es richtig interessant wurde, stehen in eigenen
Beiträgen.

## Was verbaut ist

| Aufgabe | Gerät | Wozu das gut ist |
|---|---|---|
| Landstrom und 230 V an Bord | MultiPlus-II 12/3000/120-32 | Lädt an der Säule und macht aus 12 V wieder 230 V, beides im selben Kasten |
| Strom vom Dach | zwei SmartSolar MPPT 100/30 | Zwei Dachbereiche getrennt, damit ein verschattetes Panel nicht das andere mitzieht |
| Strom vom Motor | zwei Orion XS 12/12-50 | Laden die Wohnraumbatterie während der Fahrt, je 50 A |
| Starterbatterie nachladen | ein Orion-Tr Smart 12/12-30 | Lädt in die andere Richtung, dazu unten mehr |
| Speicher | zwei LiFePO4 mit je 280 Ah | Zusammen 560 Ah bei 12,8 V, jede mit eigenem BMS |
| Der Zähler | BMV-712 Smart | Zählt Amperestunden rein und raus, statt nur Spannung zu raten |
| Der Kopf | Cerbo GX mit Node-RED | Sammelt alles ein, zeigt es an und schaltet, wo es nötig ist |

Dazu Tankgeber für Frisch- und Grauwasser, ein Ultraschallsensor am Dieseltank,
Temperaturfühler im Fahrzeug und eine Handvoll Funkschaltaktoren für Licht und
Verbraucher.

Eine Zahl, die im Winter zählt: **Unter 5 °C wird nicht geladen.** Das Datenblatt
erlaubt 0 °C, aber das BMS kennt die Zelltemperatur nur ungefähr. Und eine
LiFePO4-Zelle, die man kalt lädt, nimmt dauerhaft Schaden, ohne dass man es merkt.
Fünf Grad Sicherheitsabstand kosten im Alltag praktisch nichts.

## Das Technikfach

Das meiste davon sitzt in einem einzigen Fach unter der Sitzbank. Wer dort zum ersten
Mal die Klappe aufmacht, sieht erst mal gar nichts. Deshalb hier zwei Aufnahmen, in
denen man sich zurechtfinden kann.

<figure>
  <img src="/bilder/victron/technikfach-gesamt.jpg" alt="Technikfach mit Lynx-Verteiler, MultiPlus-II, beschrifteten Kabeln und den beiden 280-Ah-Batterien" />
  <figcaption>Die Gesamtaufnahme: oben links der Lynx, rechts der MultiPlus-II, unten die beiden 280-Ah-Batterien. Jedes Kabel trägt ein Schild: „Bordnetz", „Ladeverteiler", „Multiplus Ltg 1+", „Haupt Masse". Das ist der Unterschied zwischen einer Anlage, die man versteht, und einer, die man beim nächsten Mal wieder auseinandernehmen muss.</figcaption>
</figure>

<figure>
  <img src="/bilder/victron/technikfach.jpg" alt="Blick ins Technikfach mit zwei SmartSolar MPPT, Cerbo GX, Ladeverteiler und Votronic-Sicherungsverteilern" />
  <figcaption>Rechts die beiden SmartSolar MPPT 100/30, links unten der Cerbo GX, darüber der Ladeverteiler. In der Mitte die beiden Votronic-Verteiler und oben das originale Kontroll- und Verteilungsmodul des Fahrzeugs. Alt und neu liegen hier buchstäblich nebeneinander.</figcaption>
</figure>

Genau das ist der Punkt, den man an einem gewachsenen Wohnmobil sieht und der in
keinem Katalogfoto vorkommt: **Die Victron-Anlage ersetzt die Werksinstallation
nicht, sie löst sie stückweise ab.** Das Fahrzeug ist von **1998**; die originale
Verteilung darin ist ein **CBE-Modul, Modell M 2005** – das ist die Typbezeichnung des
Herstellers, kein Baujahr. Aufgedruckt ist der Name des Wohnmobilherstellers, gebaut
hat es CBE.

Und dieses Modul ist der Grund, warum die Verkabelung heute so aussieht, wie sie
aussieht: **Auf seiner Platine ist ein Steckplatz defekt.** Eine Reparatur wäre
unwirtschaftlich gewesen: Die Einheit ist alt, Ersatzteile sind es auch. Also sind
mehrere Stromkreise auf die neue Verteilung umgezogen, die aus dem Victron-Block
gespeist wird. Der schwarze Votronic-Plusverteiler unten im nächsten Bild ist genau
das: die Kreise, die das Originalmodul nicht mehr sicher tragen konnte.

Das ist die realistische Reihenfolge bei einem älteren Fahrzeug. Man reißt nicht die
ganze Werkselektrik heraus, sondern übernimmt sie Kreis für Kreis, immer dann, wenn
ein Stück davon aufgibt.

<figure>
  <img src="/bilder/victron/cbe-modul.jpg" alt="Originales CBE-Kontroll- und Verteilungsmodul Mod. M 2005 mit Flachsicherungen, rechts angeschnitten ein SmartSolar-Laderegler" />
  <figcaption>Dasselbe Fach von der anderen Seite: oben das originale CBE-Kontroll- und Verteilungsmodul „Mod. M 2005" mit seinen Flachsicherungen, rechts angeschnitten einer der SmartSolar-Laderegler. Unten links der Votronic-Plusverteiler, der die Kreise übernommen hat, die über den defekten Steckplatz des CBE-Moduls liefen.</figcaption>
</figure>

## Der Punkt, an dem alles zusammenläuft

<figure>
  <img src="/bilder/victron/technikfach-lynx.jpg" alt="Victron Lynx Power In 1000 im Technikfach, links daneben der rote Batterietrennschalter" />
  <figcaption>Der Lynx Power In 1000 mit den vier Plusabgängen. Der rote Drehknopf links ist der Batteriehauptschalter. Er trennt die ganze Anlage, nicht nur einen Zweig.</figcaption>
</figure>

Alles Dicke trifft sich an einer Stelle: dem **Lynx Power In 1000**. Der ist ab Werk
eine reine Sammelschiene *ohne* Sicherungen: vier Abgänge, alle direkt auf dem
Batterieplus. Ich habe ihn selbst auf Sicherungen umgebaut.

Die Regel für die Querschnitte ist im ganzen Fahrzeug dieselbe und leicht zu merken:

- **50 mm²** für alles Dicke: Batterien, MultiPlus, Lichtmaschine, Ladeverteiler
- **16 mm²** für alles Dünnere: Bordversorgung, Booster, Solar

Und der Satz, der beim Sicherungenaussuchen wirklich hilft: **Eine Sicherung schützt
die Leitung, nicht das Gerät.** Sie muss also zum Kabel passen, nicht zum
Verbraucher. Deshalb steht am Lynx überall 200 A, wo 50 mm² liegt, und nur dort
60 A, wo es dünner wird:

| Weg | Querschnitt | Sicherung |
|---|---|---|
| Batterie 1 zum Lynx | 50 mm² | 200 A |
| Batterie 2 zum Lynx | 50 mm² | 200 A |
| MultiPlus-II, Leitung 1 | 50 mm² | 200 A |
| MultiPlus-II, Leitung 2 | 50 mm² | 200 A |
| Ladeverteiler (Solar und Booster) | 50 mm² | 200 A |
| Bordnetz | 16 mm² | 60 A |

Beide Batterien hängen **einzeln** am Lynx, jede mit eigenem Kabel und eigener
Sicherung – nicht in Reihe durchgeschleift. Der MultiPlus ebenso doppelt, weil ein
3000-VA-Wechselrichter im Spitzenfall Ströme zieht, die eine einzelne Leitung nicht
sinnvoll trägt.

Dahinter kommt die Staffelung: 200 A im Lynx, davor 60 A im Ladeverteiler, davor
60 A am Booster. Fliegt etwas, fliegt es an der richtigen Stelle – und nicht die
große Sicherung, die die halbe Anlage mitnimmt.

<figure>
  <img src="/bilder/victron/lynx-offen.jpg" alt="Geöffneter Lynx Power In: vier Bolzen, darunter je eine Sicherung zur gemeinsamen Sammelschiene" />
  <figcaption>Der Lynx ohne Deckel. Hier wird der Umbau erst verständlich. Unten die durchgehende Sammelschiene, darüber je Abgang ein eigener Bolzen, und dazwischen die Sicherung. Ab Werk sind die vier Bolzen einfach nur miteinander verbunden.</figcaption>
</figure>

> **Ein Fehler, den ich fast gemacht hätte:** Empfohlen war mir zuerst eine
> Class-T-Sicherung an der Batterie – die teure Variante mit sehr hohem
> Schaltvermögen. Erst als das Batteriedatenblatt auf dem Tisch lag, war klar, dass
> das nicht nötig ist: Zwei parallele Blöcke liefern im Kurzschluss rund 1700 A in
> der Spitze, und die verbauten MEGA-Sicherungen schalten bis 2000 A sicher ab. Die
> Empfehlung wurde zurückgezogen. Merke: erst das Datenblatt, dann die Bestellung.

## Drei Ladebooster – und einer lädt rückwärts

<figure>
  <img src="/bilder/victron/boosterfach.jpg" alt="Boosterfach mit zwei Orion XS 12/12-50 und einem Orion-Tr Smart 12/12-30, darunter Ladeverteiler und Lichtmaschinenverteiler" />
  <figcaption>Booster 1 und 2 (Orion XS) laden während der Fahrt die Wohnraumbatterie, Booster 3 (Orion-Tr Smart, rechts) lädt in die Gegenrichtung. Unten links der Eingang von der Lichtmaschine, rechts der Ladeverteiler.</figcaption>
</figure>

**Booster 1 und 2** machen das Erwartbare: Sie holen sich Strom von der
Lichtmaschine und laden damit die Wohnraumbatterie. Zusammen bis zu 100 A. Sie
hängen per Datenkabel am Cerbo und wissen selbst, wann sie dürfen, nämlich über **D+**,
also das Signal, das im Fahrzeug sagt „der Motor läuft".

**Booster 3 lädt in die andere Richtung**: aus der Wohnraumbatterie zurück in die
**Starterbatterie**. Das klingt verkehrt herum, ist aber der praktischste Booster von
allen. Denn die Wohnraumbatterie hat 560 Ah, Solar auf dem Dach und drei Ladewege.
Die geht so schnell nicht leer. Liegenbleiben tut man an der *Starterbatterie*, und
die hängt bei den meisten Fahrzeugen einfach nur da und entlädt sich still vor sich
hin.

Dieser dritte Booster hat keinen Datenanschluss. Er wird über ein **Relais des
Cerbo** geschaltet, und alle Schwellenwerte liegen nicht im Gerät, sondern in einem
Node-RED-Ablauf auf dem Cerbo. Ein alter Aufkleber am Gehäuse behauptet noch etwas
anderes. Der gehört abgemacht.

## Der Flow, der Booster 3 steuert

Booster 3 hat keinen Datenanschluss und **keine eigenen Schwellenwerte mehr**: Die
sind bewusst aus dem Gerät heraus und in den Cerbo hinein gewandert. Er kann nur noch
eins: an oder aus, geschaltet über **Relais 1** des Cerbo. Alles, was entscheidet
*wann*, steckt in einem Node-RED-Ablauf.

Der Grund dafür ist praktisch. Ein Ladebooster kennt nur seine eigenen zwei Klemmen.
Er weiß nicht, wie voll die Wohnraumbatterie ist, ob der Motor läuft oder ob die
Starterbatterie gerade in Not ist. Der Cerbo weiß das alles – also gehört die
Entscheidung dorthin.

<figure>
  <img src="/bilder/victron/motor-flow.png" alt="Node-RED-Flow mit Keepalive, drei MQTT-Eingängen, Logikfunktion, Relaisschaltung und Diagnose-Endpunkt" />
  <figcaption>Der Tab „Motor → Relay 1". Links kommen die Messwerte herein, in der Mitte fällt die Entscheidung, rechts wird geschaltet und geprüft. Oben links der Zeitgeber, an dem mehr hängt, als sein Name verrät.</figcaption>
</figure>

### Wie der Cerbo merkt, dass der Motor läuft

Das ist der Teil, der mich am meisten Zeit gekostet hat – und die Lösung braucht
**kein einziges zusätzliches Kabel**.

**D+** ist eine alte Bekannte aus der Fahrzeugelektrik: eine Klemme, die nur dann
Spannung führt, wenn die Lichtmaschine dreht. Früher hing daran die
Ladekontrollleuchte im Cockpit. Sie ist damit das ehrlichste „der Motor läuft"-Signal,
das ein Fahrzeug hat, ehrlicher als die Zündung, denn die steht auch beim
Radiohören an.

An den Cerbo geht dieses Signal aber gar nicht. Es liegt an den **Fernsteuereingängen
von Booster 1 und 2**. Dort gehört es hin, denn sie sollen ja nur bei laufendem
Motor laden. Und genau da wird es abgegriffen:

Beide Orion XS melden über ihr Datenkabel einen Wert namens **`DeviceOffReason`** –
„warum ich gerade nicht lade". Ist darin das Bit für „Fernsteuereingang inaktiv"
gesetzt, liegt kein D+ an, also steht der Motor. Ist es nicht gesetzt, läuft er.
Der Cerbo fragt also nicht das Fahrzeug, sondern die beiden Booster – die wissen es
ohnehin schon.

```js
const BIT_REMOTE = 8;                        // Bit 3 = Fernsteuereingang (D+)
const dPlusAktiv = (reason & BIT_REMOTE) === 0;
```

**Und hier steckte lange ein Fehler drin.** Die erste Fassung prüfte auf
`reason === 0`, also „gar kein Abschaltgrund = Motor läuft". Das geht gut, solange
wirklich nur ein einziger Grund anliegen kann. Kam ein zweiter dazu – etwa Bit 0,
„keine Eingangsspannung", weil ein Trennschalter aus war –, stand dort `1` statt `0`,
und der laufende Motor wurde nie erkannt. `DeviceOffReason` ist eine **Bitmaske**,
keine Aufzählung; [die Kurzfassung dazu hier](/notizen/deviceoffreason-bitmaske).

Dazu eine zweite Absicherung, die genauso wichtig ist: **Meldungen, die älter als
fünf Minuten sind, gelten als ungültig** und werden als „Motor aus" gewertet. Ein
eingefrorener Messwert soll nicht dazu führen, dass der Cerbo stundenlang glaubt, es
werde noch gefahren.

### Was der Flow entscheidet

Vier Regeln in dieser Reihenfolge. Die erste, die zutrifft, gewinnt:

| Vorrang | Bedingung | Relais | Warum |
|---|---|---|---|
| 1 | Motor läuft (D+ aktiv) | **aus** | Während der Fahrt lädt die Lichtmaschine über Booster 1 und 2. Ein dritter Verbraucher am selben Netz wäre nur Gegenverkehr. Gleichzeitig geht die Motorvorwärmung aus |
| 2 | Starterbatterie unter 12,2 V | **ein** | Notfall. Endet erst wieder oberhalb von 13,0 V |
| 3 | Ladezustand der Bordbatterie unter 80 % | aus | Die Bordbatterie hat Vorrang. Wieder frei ab 85 % |
| 4 | sonst | ein | Normalbetrieb: Es ist Strom übrig, die Starterbatterie darf mittrinken |

Zwei Details, die den Unterschied zwischen „funktioniert" und „funktioniert auch im
Dauerbetrieb" ausmachen:

**Überall Hysterese.** Aus bei 80 %, wieder ein erst ab 85 %. Aus bei 13,0 V, wieder
ein erst unter 12,2 V. Ohne diesen Abstand klappert das Relais genau an der Schwelle
im Sekundentakt.

**Ein unbekannter Ladezustand gilt als gesperrt.** Kommt gerade kein Wert an, wird
nicht geladen. Im Zweifel wird die Bordbatterie geschont – nicht optimistisch
weitergemacht.

### Schalten mit Bedacht

- **AUS wirkt sofort, EIN erst nach 30 Sekunden.** Wackelt D+ beim Anlassen kurz, soll
  das Relais nicht mitzappeln. In die sichere Richtung darf es sofort, in die andere
  muss es sich gedulden.
- **Nach dem Schalten wird nachgeprüft**, ob das Relais wirklich steht, wo es stehen
  soll. Senden ist nicht dasselbe wie geschaltet haben.
- Ein Fehler beim Abschalten der Motorvorwärmung wird abgefangen und legt den Rest
  des Ablaufs nicht lahm.

### Der unscheinbare Knoten oben links

Im selben Tab sitzt der Zeitgeber, der alle 30 Sekunden das
[MQTT-Lebenszeichen](/notizen/victron-mqtt-keepalive) schickt. **Ohne ihn verstummen
sämtliche Messwerte im ganzen Haus**: Dieselgeber, virtueller Tank, Wasserflow,
alles. Wer diesen Tab zum Testen deaktiviert, legt nebenbei die halbe Anlage still
und sucht den Fehler danach an der falschen Stelle.

Sauber wäre er in einem eigenen Tab. Er steht hier, weil dieser Tab historisch der
erste war, und bleibt vorerst, weil ein Umzug genau die Art von Änderung ist, die
man nicht kurz vor einer Reise macht.

### Diagnose statt Raten

Der Flow bietet unter `/motor/status` eine Antwort im Klartext an: Motorzustand,
Ladezustand, Starterspannung, dazu je Booster den Spannungsverlauf am Eingang und
den Zeitpunkt, an dem dort zuletzt mehr als 5 V anlagen.

Der letzte Wert klingt unscheinbar und ist Gold wert: Wackelt man an einer Sicherung
oder einer Klemme und es kommt für einen Sekundenbruchteil Spannung an, sieht man das
danach, auch wenn man in dem Moment gar nicht auf den Bildschirm geschaut hat. Genau
diese Antwort holt sich auch der [Router](/projekte/wohnmobil-netzwerk) alle paar
Minuten ab, um im Ernstfall eine SMS zu schicken.

### Vielleicht wird ein Repo daraus

Der Ablauf ist nichts fahrzeugspezifisch Gebasteltes mehr, sondern beantwortet eine
Frage, die viele haben: **Wie erkenne ich im Cerbo zuverlässig, dass der Motor läuft,
ohne ein zusätzliches Kabel zu ziehen – und wie schalte ich damit etwas?** Die
Bausteine dafür – Bitmaske statt Gleichheit, Altersprüfung der Messwerte, Hysterese,
Puffer beim Einschalten, Prüfung nach dem Schalten – sind übertragbar.

Der Gasflaschen-Teil dieser Seite liegt schon
[als eigenes Repository](https://github.com/cologneone/dbus-rotarex-dime) mit
Installationsskript und Lizenz. Für den Motor-Flow wäre dasselbe naheliegend: der Tab
als importierbare Datei, die Schwellen sauber oben als Konstanten, eine ehrliche
Liesmich-Datei dazu, was er tut und was er ausdrücklich nicht tut. Steht auf der
Liste – noch nicht gemacht.

## Der Abend, an dem beide Booster nicht luden

Motor lief, beide Orion XS meldeten: nichts. Das kostete einen ganzen Abend, und
die Reihenfolge, die am Ende geholfen hat, steht hier, damit sie jemandem Zeit spart:

1. **Eingangsspannung ansehen.** Was sieht der Booster an seinem Eingang? Steht dort
   bei laufendem Motor nahezu null, muss man im Gerät gar nicht weitersuchen.
2. **Den Abschaltgrund lesen – als Bitmaske.** Victron meldet nicht *einen* Grund,
   sondern alle gleichzeitig, als Summe von Zweierpotenzen. `1` heißt „keine
   Eingangsspannung", `8` heißt „D+ fehlt". Stehen beide an, steht dort `9`. Und
   wer auf Gleichheit prüft, findet nichts. [Die Kurzfassung dazu
   hier](/notizen/deviceoffreason-bitmaske).
3. **Wenn keine Eingangsspannung ankommt, ist die Ursache mechanisch.**

Genau so war es: Der **Trennschalter in der Zuleitung von der Lichtmaschine** stand
auf aus. Kein Defekt, kein Bauteil, ein Schalter – und zwar nicht der große rote
Hauptschalter vom Foto weiter oben, sondern ein eigener, der nur diesen einen Zweig
abklemmt. Die Wohnraumbatterie versorgte deshalb alles weiter wie gewohnt, im
Fahrzeug war nichts auffällig. Unterbrochen war nur der Weg vom Motor zu den
Boostern.

Ehrlicherweise gehört dazu, was ich vorher falsch vermutet hatte: eine lose oder
korrodierte Hochstromverbindung, samt Sorge vor Wärmeentwicklung. Das war überzogen,
und es hätte mir früher auffallen können: 41 Minuten völlig ruhiger Spannungsverlauf
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
Cerbo GX – 3 A."** Die WC-Spülung und das Gehirn der ganzen Anlage hängen am selben
Kreis. Wer die Spülung stromlos macht, macht den Cerbo stromlos – und damit
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
  <figcaption>77,2 %. Diese Zahl ist gezählt, nicht geschätzt – und das ist der Unterschied.</figcaption>
</figure>

Bei Blei konnte man aus der Ruhespannung noch grob auf den Füllstand schließen. Bei
**LiFePO4 funktioniert das nicht mehr**: Die Spannung ist zwischen etwa 20 und 80 %
nahezu flach. Zwei Zehntelvolt Unterschied trennen dort ein Drittel der Kapazität.
Wer nach dem Voltmeter geht, rät.

Deshalb der **BMV-712**: ein Shunt in der Minusleitung, der jede Amperestunde zählt,
die rein- und rausgeht. Das ist der Unterschied zwischen einer gemessenen und einer
geschätzten Anzeige, und der Grund, warum man morgens weiß, ob der Kaffee noch
drin ist.

Ein Nebeneffekt, der oft übersehen wird: Der BMV hat einen **zweiten
Spannungseingang**, und der liegt hier auf der **Starterbatterie**. Damit hat der
Cerbo ohne weitere Hardware auch deren Spannung, genau die Größe, die die
Rückladeautomatik von Booster 3 braucht.

## Wie die Teile zusammenspielen

<figure>
  <img src="/bilder/victron/cerbo-gx.jpg" alt="Victron Cerbo GX mit angeschlossenen VE.Direct-, VE.Bus- und Netzwerkkabeln" />
  <figcaption>Der Cerbo GX. Alles, was ein Kabel hat, meldet sich hier von selbst – der Rest musste dazugebaut werden.</figcaption>
</figure>

Die meisten Geräte hängen per Kabel am Cerbo und tauchen ohne Zutun in der
Oberfläche auf. **Drei Dinge tun das nicht** und mussten dazugebaut werden:

- Die **Gasflasche** funkt nur per Bluetooth, und zwar in einem undokumentierten
  Protokoll – [wie sie trotzdem im Cerbo landet](/projekte/travelmate-bluetooth).
- Der **Dieselgeber** liefert brauchbare Werte nur mit Filter, und der Treiber
  rechnet anders, als die Oberfläche vermuten lässt –
  [was dahintersteckt](/projekte/mopeka-diesel).
- Der **Booster für die Starterbatterie** hat keinen Datenanschluss und wird über ein
  Relais geschaltet.

Die Logik dafür liegt in Node-RED auf dem Cerbo selbst: ein Tab je Aufgabe, jeder
für sich importierbar und mit eigener Änderungshistorie. Node-RED ist bei Victron
Teil der „large"-Firmware, kostet also nichts extra und läuft direkt auf dem Gerät.

## Drei Dinge, die ich vorher gern gewusst hätte

**Ein Ausfall ist ein Betriebszustand, kein Fehler.** Ein Sensor, der kurz nichts
sieht, darf nicht 0 melden. Halten, markieren, weiterlaufen – sonst ist jede
Auswertung wertlos und jeder Alarm einer zu viel.

**Feste Adressen in Automatisierungen sind eine Zeitbombe.** Sie funktionieren, bis
sich das Netz ändert, und dann fällt still die halbe Anlage aus. Genau das ist
passiert; acht Stunden lang ist es niemandem aufgefallen. Was auf dem Cerbo läuft und
den Cerbo meint, spricht ihn seither lokal an und nicht über seine Netzwerkadresse.

**Ohne Lebenszeichen verstummt die Datenquelle.** Victrons MQTT-Schnittstelle stellt
das Senden ein, wenn ihr niemand regelmäßig ein Signal schickt. Das sieht aus wie ein
kaputter Sensor und ist keiner –
[die Kurzfassung dazu](/notizen/victron-mqtt-keepalive).

## Was noch offen ist

- Fotos vom Batteriefach und vom Ladeverteiler aus der Nähe
- Solarertrag und Verbrauch über eine ganze Saison, nicht über ein paar Wochen
- Ein kleines Display fürs Fahrerhaus: Dieselstand, Ladezustand, Boosterströme. Das
  Gerät ist da, die Anbindung fehlt noch
- Der ehrliche Abschnitt „was ich anders machen würde" – den schreibe ich, wenn die
  erste lange Reise damit durch ist

## Einordnung

Das ist eine gewachsene Anlage in einem gebrauchten Fahrzeug, kein Musterbau aus dem
Katalog. Sie steht in keiner Verbindung zu Victron Energy; alle Angaben stammen aus
dem eigenen Fahrzeug. Wer nachbaut, prüft Querschnitte und Absicherung an seiner
eigenen Anlage, und im Zweifel bei jemandem, der es beruflich macht.
