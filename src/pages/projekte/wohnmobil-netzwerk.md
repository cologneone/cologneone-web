---
layout: ../../layouts/Projekt.astro
titel: Internet im Wohnmobil – sechs Fallen, die dich offline lassen
kurz: 5G-Router mit zwei SIM-Karten und Campingplatz-WLAN. Die Technik ist der einfache Teil – die Fallen sind es nicht, und die meisten zeigen dir währenddessen „verbunden" an.
meta_titel: Internet im Wohnmobil – Router-Fallen, die niemand erwähnt
meta_beschreibung: Campingplatz-WLAN, 5G-Failover und zwei SIM-Karten im Wohnmobil mit einem Teltonika RUTX50. Dazu der Einbau der Panorama-Dachantenne mit dem richtigen Kabelsatz. Warum ein Platz mit demselben Subnetz dein Routing zerlegt, warum die Anmeldeseite nicht lädt und warum volle Balken nichts bedeuten.
rang: 4
status: Laufend
bild: /bilder/netzwerk/router-front.jpg
stand: 2026-08
tags:
  - Netzwerk
  - Wohnmobil
  - Router
---

**Der Aufbau, um den es geht:** Im Fahrzeug sitzt ein **Teltonika RUTX50**, ein
5G-Router für den Dauerbetrieb, mit zwei SIM-Kartenplätzen, vier LAN-Buchsen und
eigenem WLAN. Er spannt das Bordnetz auf, in dem alles hängt, was im Wohnmobil ins
Internet will oder untereinander redet: Laptop, Fernseher, die Steuerung der
Energieanlage, ein paar Funkschalter.

<figure>
  <img src="/bilder/netzwerk/router-front.jpg" alt="Frontblende eines Teltonika RUTX50 mit zwei SIM-Schächten, vier LAN-Buchsen und 3G/4G/5G-Anzeigen" />
  <figcaption>Zwei SIM-Schächte nebeneinander, vier LAN-Buchsen, darüber die Anzeigen für 3G, 4G und 5G. Der Kippschalter links gehört nicht zum Router, sondern trennt ihn vom Bordnetz.</figcaption>
</figure>

Die gewünschte Reihenfolge ist banal: **Campingplatz-WLAN, wenn es taugt – sonst
SIM 1 – sonst SIM 2.** Fällt eines aus, übernimmt das nächste. Fachbegriff dafür ist
*Failover*; der Router prüft dazu im Sekundentakt, ob über den gerade aktiven Weg
überhaupt noch etwas nach draußen geht.

Das einzurichten ist eine Nachmittagsaufgabe. Der Rest dieses Textes handelt davon,
was danach passiert ist. Alle sechs Punkte haben echte Zeit gekostet, und fünf davon
haben eines gemeinsam: **Während sie auftreten, sagen dir sämtliche Anzeigen, dass
alles in Ordnung ist.**

<figure>
  <img src="/bilder/netzwerk/router-einbau.jpg" alt="Der Router im Klappfach hinter der originalen Wohnmobil-Bedienung, daneben Kabelbäume und ein Schaltmodul" />
  <figcaption>Der Einbauort: ein totes Klappfach vorne hinter der originalen Bedieneinheit. Lüftungsöffnungen mussten nachgerüstet werden, das Fach kühlt auch nachts nicht aus.</figcaption>
</figure>

## 5G steht dran. Ankommen muss es trotzdem

Bevor es zu den Fallen geht, das Bauteil, das am meisten gebracht hat und in keiner
Anleitung vorkommt: **die Dachantenne.**

Ab Werk hat der Router kurze Stabantennen. Auf einem Schreibtisch reicht das. In
einem Wohnmobil steckt der Router in einem geschlossenen Fach hinter einer
Bedieneinheit, ringsum Metall, Kabelbäume und Möbel. Das ist ungefähr die
schlechteste Position, die man einem Funkgerät zumuten kann. Nach oben aufs Dach
verlegt, hat dieselbe SIM in derselben Zelle plötzlich Empfang, wo vorher nichts war.
Verbaut ist eine **Panorama-Dachantenne**, die alles mitbringt, was der Router
braucht: **vier Wege für 5G und LTE, zwei fürs WLAN und einen für GPS.**

**Und hier die Falle, an der man Geld und einen Nachmittag verliert:** Es gibt zwei
Kabelsätze. Der eine hat **30 cm**, der andere **einen Meter**, und sie haben nicht
dieselben Stecker. Wer den falschen erwischt, kommt entweder nicht bis zum Router
oder bekommt die Stecker nicht angeschraubt. Deshalb die Antenne **gleich mit dem
passenden Satz für den RUTX50 kaufen**, nicht Antenne und Kabel getrennt
zusammensuchen.

Der Meter ist dabei kein Luxus, sondern auch keine Reserve. **Antenne und Router muss
man zusammen planen**, nicht nacheinander: Der Router muss dorthin, wo das Kabel
hinreicht. Verlängern kann man zwar, aber jeder zusätzliche Meter Koaxkabel kostet
bei diesen Frequenzen spürbar Signal. Kurz ist besser als bequem.

### Was ich beim Montieren gelernt habe

<figure>
  <img src="/bilder/netzwerk/antenne-durchfuehrung.jpg" alt="Blick von innen an die Decke, eine selbst zugeschnittene Edelstahlplatte als Gegenhalter, darin die verschraubte Gewindedurchführung der Dachantenne mit dem schwarzen Kabelbündel" />
  <figcaption>Die Stelle, an der es tatsächlich knifflig wird. Die Platte ist selbst zugeschnitten, weil das vorhandene Loch von innen zu groß war. Darin sitzt die Gewindeverlängerung, gekontert mit der Mutter, und daraus kommt das Kabelbündel.</figcaption>
</figure>

**Sie klebt genau einmal.** Die Antenne sitzt auf einer vollflächigen Klebefläche.
Das ist gut so, aber es heißt eben auch: einmal aufgesetzt, ist die Entscheidung
gefallen. Also vorher trocken auflegen, ausrichten, anzeichnen, Fläche gründlich
reinigen. Und erst dann.

**Abstand zu allem, was oben sonst noch steht.** Bei mir sitzt sie vorne rechts, mit
Luft zu den übrigen Aufbauten. Alles, was daneben in die Höhe ragt, steht der Antenne
im Weg.

**Man braucht fast immer eine Gewindeverlängerung.** Das Gewinde am Antennenfuß ist
für dünnere Dächer gedacht als das Sandwich eines Wohnmobils. Ich habe mir eine
passende Verlängerung in Durchmesser und Länge bestellt, und die war schneller da als
das Originalteil.

**Ein altes Loch ist ein Geschenk und ein Problem zugleich.** Bei mir steckte an der
Stelle eine schlechte Radioantenne. Das erspart das Bohren, aber die Öffnung war von
innen zu groß, um darin etwas zu kontern. Die Lösung war eine kleine, selbst
zugeschnittene **Edelstahlplatte**, gegen die die Verschraubung zieht. Abgedichtet ist
das Ganze mit **Dekasil**, dem Zeug, mit dem im Wohnmobilbau ohnehin alles geklebt und
gedichtet wird.

## 1. Der Campingplatz benutzt dasselbe Subnetz wie du

Der teuerste Fund. Jedes Heimnetz benutzt private Adressen, meist irgendetwas mit
`192.168.x.y`. Ein Platz in Italien vergab genau denselben Bereich, den mein eigenes
Netz benutzte, mitsamt derselben Adresse für den Zugang nach draußen. Damit sollte
der Router Pakete an eine Adresse schicken, die er selbst war.

Das Routing brach zusammen. Die Oberfläche meldete durchgehend „verbunden", das
WLAN-Signal war ausgezeichnet, und nichts funktionierte.

Die Lehre: **Wähle für dein eigenes Netz einen Bereich, den kein Hersteller und kein
Platzbetreiber als Standard benutzt.** Nicht `192.168.0.x`, nicht `.1.x`, nicht
`.50.x`, nicht `.178.x`. Das sind die Werkseinstellungen der gängigen Router und
damit genau die, auf die du unterwegs triffst. Nimm irgendetwas Krummes aus der
Mitte des Bereichs. Umgestellt ist das in fünf Minuten, gefunden hätte ich es
sonst nie.

Und wenn jemals „der Router sagt verbunden, aber nichts geht" gilt, ist der erste
Blick nicht auf die Signalstärke, sondern auf die eigene IP-Adresse im Platznetz.
Steht dort dein eigener Bereich, hast du die Ursache in zehn Sekunden.

## 2. Der Umzug lässt Nachzügler zurück

Das Subnetz zu wechseln ist schnell gemacht, und genau deshalb übersieht man den
zweiten Teil. Alles, was seine Adresse per DHCP bekommt, zieht von allein mit. Alles,
was eine **feste Adresse im Gerät** eingetragen hat, bleibt im alten Bereich zurück
und meldet sich nie wieder.

Bei mir traf es einen Schaltaktor für die Beleuchtung. Die Kopplung der Wohnraumlichter
war tot, und der Hauptschalter schickte seine Befehle stattdessen hinaus ins Platznetz
– irgendwohin. Aufgefallen ist das erst Tage später.

Konsequenz seitdem: **Feste Adressen werden ausschließlich am Router als
DHCP-Reservierung vergeben, nie im Gerät selbst.** Dann zieht wirklich alles mit.

## 3. Die Anmeldeseite lädt nicht – und schuld ist dein eigener Schutz

Klassiker auf jedem zweiten Platz. Du verbindest dich mit dem WLAN, die Vorschaltseite
soll kommen, und es passiert: nichts. Kein Fehler, keine Meldung, nur eine leere Seite.

Die Ursache ist wunderbar absurd. Ein Captive Portal kapert die DNS-Antworten und
liefert für jede beliebige Domain eine private Adresse zurück, damit dein Browser bei
ihm landet. Das ist **exakt die Signatur eines DNS-Rebinding-Angriffs**. Also wirft
der Schutzmechanismus im Router die Antworten weg, und die Anmeldeseite lädt nie.

Der Schutz tut genau das, wofür er gebaut wurde. Nur im falschen Moment.

Wer es von Hand löst, schaltet die Rebind-Protection kurz aus, meldet sich an und
schaltet sie wieder ein. Wer es öfter braucht, automatisiert das. Bei mir erledigt
ein kleines Skript genau dieses Zeitfenster.

## 4. Volle Balken heißen nichts

RSSI ist die Zahl, die überall angezeigt wird, und sie ist die am wenigsten
aussagekräftige. In Kroatien und Italien standen mehrfach **−58 dBm** an – nach jeder
Anzeige „sehr gut" – bei einem **SINR von −1**.

Übersetzt: Der Sendemast ist laut zu hören, aber alle anderen auch. Die Zelle ist
überlastet. Dagegen hilft keine Einstellung, kein Antennenwechsel und kein Neustart.
Nur ein anderer Standort oder eine andere Zelle. [Die Kurzfassung dazu
hier](/notizen/volle-balken-heissen-nichts).

**Wer Mobilfunk beurteilen will, schaut auf SINR und RSRQ, nicht auf die Balken.**

## 5. Der Router nummeriert deine Prioritäten selbst um

Der unangenehmste Fund, weil er still ist. Sobald ein Weg nach draußen dazukommt oder
abgeschaltet wird, schreibt die Router-Firmware ihre Konfiguration neu und vergibt die
Prioritäten in Entstehungsreihenfolge, nicht in der, die du eingestellt hast.

Ergebnis an einem Tag: Das Camping-WLAN war mit −54 dBm verbunden und stand auf
Priorität 3, die SIM-Karte auf 1. Der Router blieb auf schwachem Mobilfunk sitzen,
obwohl bestes WLAN danebenlag. **Kein Logeintrag, keine Warnung, keine Auffälligkeit
in der Oberfläche.**

Der ehrlichste Test ist nicht die Konfigurationsseite, sondern die tatsächlich aktive
Route. Ein Blick darauf sagt dir in einer Zeile, worüber dein Datenverkehr wirklich
läuft.

## 6. Zwei SIM-Karten sind nicht zwei Verbindungen

Zwei SIM-Schächte heißt nicht zwei gleichzeitige Verbindungen: Beide Karten teilen
sich **ein Funkmodul**, es kann immer nur **eine** aktiv sein. Der Wechsel ist ein
Umschaltvorgang mit Abbruch, kein Failover im eigentlichen Sinn. Und wenn die
Umschaltautomatik nicht ausdrücklich aktiviert ist, existiert die dritte Stufe
deiner schönen Ausfallkette nur auf dem Papier.

Dazu ein Sonderfall, den keine Automatik erkennt: **aufgebrauchtes Roaming-Volumen.**
Die Verbindung fällt nicht aus, sie wird nur langsam. Kein Ping schlägt fehl, kein
Auslöser greift, kein Failover passiert. Hier muss man von Hand ran.

## Was ich daraus mitgenommen habe

Reisenetzwerke scheitern selten daran, dass etwas kaputtgeht. Sie scheitern daran,
dass etwas **anders ist als angenommen**: ein fremdes Netz mit deinen Adressen, ein
Schutz, der im falschen Moment greift, eine Priorität, die dir jemand hinter dem
Rücken umsortiert hat.

Deshalb ist die wichtigste Diagnose nicht „geht es?", sondern „**worüber** geht es
gerade, und mit welcher Adresse?". Diese beiden Fragen decken fünf der sechs Punkte
oben in unter einer Minute auf.

## Was noch offen ist

- Eine kompakte Checkliste für den ersten Abend auf einem neuen Platz
- Automatische Erkennung, wenn das Platznetz mit dem eigenen kollidiert
- Erfahrungswerte, wie oft die Umschaltung zwischen den SIMs im Ausland wirklich hilft
