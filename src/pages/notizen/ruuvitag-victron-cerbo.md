---
layout: ../../layouts/Notiz.astro
titel: RuuviTag im Victron Cerbo, ganz ohne Bastelei
kurz: Temperatur und Luftfeuchte im Wohnmobil messen, ohne ein Kabel zu ziehen und ohne Node-RED. Venus OS erkennt die Funksensoren von selbst. Die einzige Falle ist ein Fühler, der in Wahrheit gar keiner ist.
meta_titel: RuuviTag am Victron Cerbo GX einbinden – ohne Treiber und ohne Node-RED
meta_beschreibung: Wie Temperatur- und Luftfeuchtesensoren per Bluetooth in einem Victron GX-Gerät landen. Venus OS bringt die Unterstützung mit, es muss nur eingeschaltet werden. Dazu, was die Sensoren im Wohnmobil wirklich bringen und woran man einen virtuellen Fühler erkennt.
stand: 2026-08
tags:
  - Victron
  - Cerbo GX
  - Sensorik
---

**Worum es geht:** In vielen Wohnmobilen und Booten sitzt ein **GX-Gerät von
Victron**, zum Beispiel ein Cerbo GX. Das ist der kleine Rechner, bei dem
Batteriewächter, Solarregler und Tankgeber zusammenlaufen und der die Werte anzeigt.
Was dort standardmäßig fehlt, ist die schlichteste Angabe überhaupt: **Wie warm ist
es eigentlich?** Im Wohnraum, im Kühlschrank, im Fach mit den Batterien.

Der Cerbo hat zwar Eingänge für Temperaturfühler, aber die wollen alle ein Kabel. Und
ein Kabel vom Kühlschrank bis unter die Sitzbank zu ziehen, ist in einem fertig
ausgebauten Fahrzeug eine Nachmittagsbeschäftigung mit ungewissem Ausgang.

## Die kurze Antwort

**Es gibt nichts zu bauen.** Venus OS, die Software auf dem GX-Gerät, kann
Bluetooth-Sensoren von Haus aus lesen. Der bekannteste davon ist der **RuuviTag**,
ein finnischer Sensor in der Größe eines Flaschendeckels: Knopfzelle drin,
Temperatur, Luftfeuchte und Luftdruck raus. Er funkt einfach alle paar Sekunden in
die Gegend, ohne Anmeldung, ohne Konto, ohne App-Zwang.

Der Ablauf ist entsprechend kurz:

1. Sensor auspacken, Lasche aus dem Batteriefach ziehen, er sendet ab sofort.
2. Am GX-Gerät in den Einstellungen die **Bluetooth-Sensoren** einschalten. Wo genau
   der Punkt liegt, hat sich zwischen den Firmwareversionen ein paar Mal verschoben,
   er heißt aber immer so ähnlich.
3. In der Liste taucht jeder Sensor in Reichweite von allein auf. Man aktiviert ihn
   und gibt ihm einen Namen.

Das war es. **Kein Treiber, kein Node-RED, keine zusätzliche Hardware.** Danach ist
der Sensor ein Gerät wie jedes andere: Er steht im Menü, er steht im VRM-Portal, man
kann Alarmschwellen darauf setzen und ihn in eigenen Abläufen verwenden.

Der Vollständigkeit halber: Dieselbe Bluetooth-Unterstützung liest auch
Ultraschall-Tanksensoren von Mopeka. Wer also ohnehin schon einen davon im Tank hat,
hat den Weg für die Temperaturfühler bereits offen.

## Was das im Alltag bringt

Der offensichtliche Nutzen ist der langweiligste: Man sieht die Innentemperatur.
Interessanter sind die anderen drei.

**Der Kühlschrank.** Man sieht, ob er arbeitet, ohne ihn aufzumachen. Jedes Öffnen
kostet genau die Kälte, die man gerade prüfen wollte. Ein älterer
Absorberkühlschrank ist ohnehin kein Präzisionsgerät, und ob er morgens bei 6 °C
steht oder bei 10, entscheidet sich vor dem Frühstück und nicht danach.

**Das Technikfach.** Dort sitzen Wechselrichter, Laderegler und die Batterien, und
dort wird es wärmer als überall sonst. Zehn Grad über Außentemperatur sind an einem
milden Tag harmlos, auf einem Stellplatz ohne Schatten im Hochsommer wird daraus eine
andere Zahl. Lithiumzellen mögen Hitze ähnlich wenig wie Kälte, und ein Wert, den man
nie gemessen hat, ist keine Beruhigung, sondern nur eine Vermutung.

**Draußen.** Temperatur und Luftfeuchte am tatsächlichen Standort, nicht die der
nächstgelegenen Wetterstation.

## Die Falle: ein Fühler, der keiner ist

Sobald der erste Sensor eingebunden ist, entsteht im GX-Gerät eine Liste mit
Temperaturen, und in dieser Liste sehen alle Einträge gleich aus. Sie sind es aber
nicht.

Ein GX-Gerät kann nämlich auch **virtuelle Temperatursensoren** führen: Werte, die
irgendein anderes Gerät im Netzwerk hineinschreibt. Bei mir ist das der Router im
Fahrzeug, der seine eigene Gehäusetemperatur meldet. Der steht mit rund 70 °C
zwischen lauter Wohnraumwerten und sieht auf den ersten Blick nach einem sehr
dringenden Problem aus.

**Merke:** Wenn in der Temperaturliste ein Wert steht, der unmöglich erscheint, ist
die erste Frage nicht „welcher Sensor ist kaputt", sondern „ist das überhaupt ein
Sensor".

## Der Preis

Zwei Dinge gehören dazu, sonst wäre es zu schön.

**Reichweite.** Bluetooth mag keine Metallwände. Der Sensor im Kühlschrank meldet
sich zuverlässig, der im hintersten Stauraum eines Fahrzeugs mit Aluaufbau
möglicherweise nicht. Das probiert man aus, bevor man den Deckel zuschraubt.

**Die Knopfzelle.** Sie hält je nach Sendetakt ein bis zwei Jahre. Und wenn sie leer
ist, meldet sich niemand ab: Der Wert wird einfach nicht mehr neu, sondern nur alt.
Hier gilt dieselbe Regel wie für jeden anderen Geber an Bord: **Ein Sensor, der
nichts mehr sagt, ist kein Sensor, der 0 °C misst.** Wer Alarme auf so einen Wert
setzt, sollte das Alter des Werts mitprüfen und nicht nur seine Höhe.

Wie das bei mir im Fahrzeug aussieht und wo die fünf Sensoren sitzen, steht auf der
Seite zur [Energieanlage](/projekte/wohnmobil-victron).
