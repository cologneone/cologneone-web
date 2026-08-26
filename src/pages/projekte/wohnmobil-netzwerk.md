---
layout: ../../layouts/Projekt.astro
titel: Internet im Wohnmobil, wenn das Handy längst aufgegeben hat
kurz: Ein 5G-Router und eine Dachantenne, mehr ist es nicht. Was verbaut ist, warum es diese Teile geworden sind, wo ich sie herhabe – und die sechs Fallen, die mich am meisten Zeit gekostet haben.
meta_titel: Internet im Wohnmobil mit Teltonika RUTX50 und Panorama-Dachantenne
meta_beschreibung: 5G-Router, Dachantenne, zwei SIM-Karten und Campingplatz-WLAN im Wohnmobil. Welche Teile verbaut sind, warum es der Teltonika RUTX50 wurde, worauf man beim Kabelsatz der Antenne achten muss und welche sechs Fallen einen offline lassen, während alle Anzeigen "verbunden" melden.
rang: 4
status: Laufend
bild: /bilder/netzwerk/router-front.jpg
stand: 2026-08
tags:
  - Netzwerk
  - Wohnmobil
  - Router
---

**Worum es geht:** Unterwegs zuverlässig online sein, ohne dass es davon abhängt, was
der Campingplatz anbietet, und ohne dass ein Handy als Hotspot herhalten muss. Hier
steht, was dafür im Fahrzeug steckt, warum es genau diese Teile geworden sind, wo ich
sie herhabe und was ich auf dem Weg dahin gelernt habe.

## Was verbaut ist

Zwei Teile, mehr ist es nicht.

- Ein **Teltonika RUTX50**, ein 5G-Router für den Dauerbetrieb: zwei
  SIM-Kartenplätze, vier LAN-Buchsen, eigenes WLAN, Versorgung aus dem 12-V-Bordnetz.
- Eine **Panorama-Dachantenne**, in der sieben Antennen in einem flachen Gehäuse
  stecken. Zu der weiter unten mehr, denn sie ist der unterschätzte Teil.

Der Router spannt das Bordnetz auf, in dem alles hängt, was im Wohnmobil ins Internet
will oder untereinander redet: Laptop, Fernseher, die Steuerung der Energieanlage, ein
paar Funkschalter.

<figure>
  <img src="/bilder/netzwerk/router-front.jpg" alt="Frontblende eines Teltonika RUTX50 mit zwei SIM-Schächten, vier LAN-Buchsen und 3G/4G/5G-Anzeigen" />
  <figcaption>Zwei SIM-Schächte nebeneinander, vier LAN-Buchsen, darüber die Anzeigen für 3G, 4G und 5G. Der Kippschalter links gehört nicht zum Router, sondern trennt ihn vom Bordnetz.</figcaption>
</figure>

<figure>
  <img src="/bilder/netzwerk/router-einbau.jpg" alt="Der Router im Klappfach hinter der originalen Wohnmobil-Bedienung, daneben Kabelbäume und ein Schaltmodul" />
  <figcaption>Der Einbauort: ein totes Klappfach vorne hinter der originalen Bedieneinheit. Lüftungsöffnungen mussten nachgerüstet werden, das Fach kühlt auch nachts nicht aus.</figcaption>
</figure>

## Warum überhaupt ein Router, es gibt doch Handys

Die ehrliche Alternative heißt Hotspot am Handy. Das funktioniert, bis es das nicht
mehr tut, und dann aus vier Gründen gleichzeitig.

**Das Handy geht mit.** Wer damit zum Brötchenholen läuft, nimmt das halbe Wohnmobil
mit offline – auch alles, was man aus der Ferne sehen möchte, während man weg ist.

**Ein Handy kann kein Campingplatz-WLAN weiterreichen.** Der Router kann das
Platz-WLAN als Zugang nach draußen benutzen und trotzdem sein eigenes Netz aufspannen.
Alle Geräte an Bord bleiben, wo sie sind, und merken vom Wechsel nichts.

**Ein Handy hat keinen Antennenanschluss.** Und daran hängt am Ende alles: **Mit der
Dachantenne hat der Router noch brauchbares Netz, wenn das Handy längst aufgegeben
hat.** Das ist kein Gefühl, das erlebt man auf jedem einsamen Stellplatz aufs Neue.

**Und er ist ein richtiges Gerät.** Zwei SIM-Karten mit automatischer Umschaltung,
Dauerbetrieb an 12 V, und ein Betriebssystem, in das man hineinkommt. Alles, was auf
dieser Seite an Automatik vorkommt, gibt es nur, weil auf dem Router eigene Skripte
laufen dürfen.

## Würde ich ihn wieder kaufen? Ja, aber die eSIM-Version

Sofort. Mit genau einer Einschränkung: Ich würde die **eSIM-Variante** nehmen.

Den RUTX50 gibt es auch mit fest eingebauter eSIM, zusätzlich zu den beiden
Kartenschächten. Der Unterschied zeigt sich im Ausland: Ein Datenpaket eines örtlichen
Anbieters bucht man damit am Bildschirm, statt einen Laden zu suchen, eine Karte zu
kaufen und sie einzulegen. Wer ein paar Wochen in einem Land unterwegs ist, in dem das
eigene Roaming teuer wird oder nach ein paar Gigabyte kriecht, spart sich damit einen
halben Urlaubsnachmittag. Und beide Kartenschächte bleiben trotzdem frei für das, was
man ohnehin dabeihat.

## 5G steht dran. Ankommen muss es trotzdem

Ab Werk hat der Router kurze Stabantennen. Auf einem Schreibtisch reicht das. In
einem Wohnmobil steckt der Router in einem geschlossenen Fach hinter einer
Bedieneinheit, ringsum Metall, Kabelbäume und Möbel. Das ist ungefähr die
schlechteste Position, die man einem Funkgerät zumuten kann. Oben auf dem Dach hat
dieselbe SIM in derselben Zelle plötzlich Empfang, wo vorher nichts war.

Verbaut ist eine **Panorama-Dachantenne der Serie LGMDM4-6-60-24-58**, weiß, flach,
180 mm im Durchmesser und 81 mm hoch. Unter der Haube sitzen **sieben Antennen in
einer**:

| Wofür | Elemente | Gewinn |
|---|---|---|
| 5G und LTE | 4 | bis 9 dBi |
| WLAN (2,4 und 5 GHz) | 2 | 9 dBi |
| GPS und GNSS | 1 | mit 26 dB Vorverstärker |

Der GPS-Teil ist dabei kein Beiwerk: Er ist der Grund, warum der Router seine Position
sauber kennt, ohne dass dafür noch etwas Zusätzliches aufs Dach müsste.

> **Der Fehler, den man erst abends merkt:** Zwei der sieben Elemente sind fürs WLAN.
> Wer beide WLAN-Anschlüsse des Routers mit aufs Dach nimmt, funkt sein eigenes Netz
> von außen gegen einen Aufbau aus Alu und Isolierung. Das Ergebnis ist hervorragendes
> WLAN auf dem Stellplatz und drinnen fast keins. **Mindestens eine WLAN-Antenne
> gehört nach innen.** Die sinnvolle Aufteilung ist eine oben für die Reichweite zum
> Campingplatz-WLAN und eine drinnen für die eigenen Geräte.

### Die Falle: es gibt zwei Kabelsätze

Hier verliert man Geld und einen Nachmittag, wenn man nicht aufpasst. Dieselbe Antenne
gibt es mit unterschiedlichen Kabelsätzen, und der Unterschied ist keine Kleinigkeit.

Der richtige Satz für einen Teltonika bringt **1 m Kabel, ab Werk mit genau den
Steckern bestückt, die der Router hat**: vier SMA für 5G und LTE, zwei **RP**-SMA fürs
WLAN, einer SMA für GPS. Damit schraubt man sieben Stecker an und ist fertig. Der
andere Satz ist kürzer und hat diese Bestückung nicht, dann braucht man Adapter oder
Zwischenkabel, und man merkt es genau in dem Moment, in dem man auf dem Dach steht.

Also **die Antenne gleich mit dem passenden Satz kaufen** statt Antenne und Kabel
getrennt zusammenzusuchen. Passend ist sie damit für RUTX50, RUTX14, RUTX12, RUTM51
und RUTM54, abwärts auch für die älteren RUT-Modelle.

Der Meter ist dabei kein Puffer, sondern die Vorgabe: **Antenne und Router muss man
zusammen planen**, nicht nacheinander. Der Router gehört dorthin, wo das Kabel
hinreicht. Es gibt fertige Verlängerungssätze bis 7,5 m, aber jeder zusätzliche Meter
Koaxkabel kostet bei diesen Frequenzen Signal. Kurz ist besser als bequem.

### Was ich beim Montieren gelernt habe

<figure>
  <img src="/bilder/netzwerk/antenne-durchfuehrung.jpg" alt="Blick von innen an die Decke, eine selbst zugeschnittene Edelstahlplatte als Gegenhalter, darin die verschraubte Gewindedurchführung der Dachantenne mit dem schwarzen Kabelbündel" />
  <figcaption>Die Stelle, an der es tatsächlich knifflig wird. Die Platte ist selbst zugeschnitten, weil das vorhandene Loch von innen zu groß war. Darin sitzt die Gewindeverlängerung, gekontert mit der M18-Mutter, und daraus kommt das Kabelbündel.</figcaption>
</figure>

**Sie klebt genau einmal.** Die Antenne sitzt auf einem wasserdichten Klebepad, das
die ganze Fläche trägt. Das ist gut so, aber es heißt eben auch: einmal aufgesetzt,
ist die Entscheidung gefallen. Also vorher trocken auflegen, ausrichten, anzeichnen,
Fläche gründlich reinigen. Und erst dann.

**Abstand zu allem, was oben sonst noch steht.** Bei mir sitzt sie vorne rechts, mit
Luft zu den übrigen Aufbauten. Alles, was daneben in die Höhe ragt, steht der Antenne
im Weg.

**Man braucht fast immer eine Gewindeverlängerung.** Die Antenne wird durch ein
**19-mm-Loch** gesteckt und mit einer **M18-Mutter** gekontert. Das serienmäßige
Gewinde ist für dünnere Dächer gedacht als das isolierte Sandwich eines Wohnmobils.
Panorama hat dafür eine 70-mm-Verlängerung im Programm, ich habe mir stattdessen eine
in Durchmesser und Länge passende bestellt. Die war schneller da als das Originalteil.

**Ein altes Loch ist ein Geschenk und ein Problem zugleich.** Bei mir steckte an der
Stelle eine schlechte Radioantenne. Das erspart das Bohren, aber die Öffnung war von
innen zu groß, um die Mutter irgendwo dagegen zu kontern. Die Lösung war eine kleine,
selbst zugeschnittene **Edelstahlplatte**, gegen die die Verschraubung zieht.
Abgedichtet ist das Ganze mit **Dekasil**, dem Zeug, mit dem im Wohnmobilbau ohnehin
alles geklebt und gedichtet wird.

## Wo ich das Zeug herhabe

Router und Antenne sind von **Antennentechnik Dietz**. Das steht hier, weil die Frage
sonst als Erstes kommt, und weil dort jemand sitzt, der die Sachen wirklich kennt: Zu
den Antennen und den Routern gibt es Videos, in denen der Kram erklärt und montiert
wird, statt nur Datenblätter abzuschreiben. Genau daher weiß ich auch von der Sache
mit den zwei Kabelsätzen.

Ich bekomme dafür nichts, und es gibt hier keine Provisionslinks. Das ist einfach der
Laden, bei dem es gekauft ist und bei dem ich wieder kaufen würde.

## Wie wir überhaupt ins Internet kommen

Jetzt der eigentliche Betrieb, und der ist banaler, als es klingt. Es gibt drei Wege
nach draußen, und sie haben eine feste Reihenfolge:

1. **Campingplatz-WLAN**, wenn es taugt. Kostet kein Datenvolumen.
2. **SIM 1**, die deutsche Hauptkarte.
3. **SIM 2** als Reserve.

Fällt der aktive Weg aus, übernimmt der nächste. Der Fachbegriff dafür ist
*Failover*. Damit das nicht erst auffällt, wenn man selbst etwas anklickt, prüft der
Router im Sekundentakt, ob über den gerade aktiven Weg überhaupt noch etwas nach
draußen geht: Drei Fehlschläge hintereinander, und er schaltet um. Ein Ausfall ist
damit nach rund **neun Sekunden** erkannt.

Das alles einzurichten ist eine Nachmittagsaufgabe.

## Und jetzt die Stolperfallen

Der Rest dieser Seite handelt davon, was **nach** dem Nachmittag passiert ist. Sechs
Punkte, alle haben echte Zeit gekostet, und fünf davon haben eines gemeinsam:
**Während sie auftreten, sagen dir sämtliche Anzeigen, dass alles in Ordnung ist.**

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
