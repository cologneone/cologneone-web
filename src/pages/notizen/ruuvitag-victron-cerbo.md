---
layout: ../../layouts/Notiz.astro
titel: RuuviTag im Victron Cerbo, ganz ohne Bastelei
kurz: Temperatur und Luftfeuchte im Wohnmobil messen, ohne ein Kabel zu ziehen und ohne Node-RED. Venus OS erkennt die Funksensoren von selbst. Es gibt genau drei Dinge, die man dabei wissen sollte.
meta_titel: RuuviTag am Victron Cerbo GX einbinden – ohne Treiber und ohne Node-RED
meta_beschreibung: Bluetooth-Temperatursensoren in einem Victron GX-Gerät. Wo der Menüpunkt liegt, was der Sensortyp bewirkt, warum der Cerbo vor kontinuierlichem Scannen warnt und woran man einen virtuellen Fühler erkennt. Mit Screenshots aus Venus OS.
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

**Es gibt nichts zu bauen.** Venus OS, die Software auf dem GX-Gerät, liest
Bluetooth-Sensoren von Haus aus. Der bekannteste davon ist der **RuuviTag**, ein
finnischer Sensor in der Größe eines Flaschendeckels: Knopfzelle drin, Temperatur,
Luftfeuchte und Luftdruck raus. Er funkt einfach alle paar Sekunden in die Gegend,
ohne Anmeldung, ohne Konto, ohne App-Zwang.

<figure>
  <img src="/bilder/victron/ruuvi-bluetooth-sensoren.png" alt="Menü Bluetooth-Sensoren in Venus OS mit einem Mopeka-Tanksensor und fünf RuuviTags, alle eingeschaltet" />
  <figcaption>Einstellungen → Integrationen → Bluetooth-Sensoren. Jeder Sensor in Reichweite steht hier von allein, ein Schalter je Gerät. Die Kennungen sind unkenntlich gemacht, sonst sieht es genau so aus.</figcaption>
</figure>

Der Ablauf:

1. Sensor auspacken, Lasche aus dem Batteriefach ziehen, er sendet ab sofort.
2. Am GX-Gerät unter **Einstellungen → Integrationen → Bluetooth-Sensoren** die
   Sensoren einschalten. In älteren Venus-Versionen lag der Punkt woanders, aber er
   hieß immer so ähnlich.
3. Jeder Sensor in Reichweite taucht in der Liste auf. Umlegen, fertig.

Das war es. **Kein Treiber, kein Node-RED, keine zusätzliche Hardware.** Danach ist
der Sensor ein Gerät wie jedes andere: Er steht im Menü, er steht im VRM-Portal, man
kann Alarmschwellen darauf setzen und ihn in eigenen Abläufen verwenden.

Der Vollständigkeit halber: In derselben Liste tauchen auch Ultraschall-Tanksensoren
von Mopeka auf. Wer schon einen davon im Tank hat, hat den Weg für die
Temperaturfühler längst offen.

## Namen geben, sonst wird es unübersichtlich

Ab Werk heißt jeder Sensor nach seiner Funkkennung, etwa „Ruuvi 7F22". Bei fünf
Stück im Fahrzeug ist das unbrauchbar. Unter **Einstellungen → Geräte → [Sensor] →
Gerät** lässt sich der Name frei setzen: Innen, Kühlschrank, Kühlbox, Technik,
Aussen.

Eine Ebene daneben, unter **Setup → Typ**, steht die zweite Einstellung, die man
gemacht haben sollte:

<figure>
  <img src="/bilder/victron/ruuvi-typ.png" alt="Auswahl des Sensortyps in Venus OS: Battery, Fridge, Generic, Room, Outdoor, Water Heater, Freezer" />
  <figcaption>Sieben Typen zur Auswahl. Der Sensor misst zwar in jedem Fall dasselbe, aber das GX-Gerät weiß danach, worum es sich handelt, und ordnet ihn entsprechend ein.</figcaption>
</figure>

**Battery, Fridge, Generic, Room, Outdoor, Water Heater, Freezer.** Der Messwert
ändert sich dadurch nicht, die Einordnung schon. Ein Fühler, der als *Fridge*
eingetragen ist, gehört sichtbar zum Kühlschrank und nicht in dieselbe Schublade wie
der draußen am Aufbau. Das klingt nach Kosmetik und ist der Unterschied zwischen
einer Liste, die man liest, und einer, die man überfliegt.

## Was der Cerbo über die Knopfzelle verrät

Das ist der Punkt, den ich selbst unterschätzt hatte. Auf der Geräteseite steht
nicht nur der Messwert, sondern auch die **Spannung der Knopfzelle**, samt eigener
Statusbewertung:

<figure>
  <img src="/bilder/victron/ruuvi-geraet.png" alt="Geräteseite eines RuuviTags in Venus OS mit Status, Temperatur, Luftfeuchtigkeit und Sensor-Batteriespannung 3,08 Volt" />
  <figcaption>24 °C, 87 % Luftfeuchte und 3,08 V in der Zelle, bewertet mit „Ok". Die verbaute CR2477 hat 3,0 V Nennspannung; deutlich darunter wird es Zeit für eine neue.</figcaption>
</figure>

Damit erledigt sich die schlimmste Sorge bei Funksensoren von allein: Man merkt es,
**bevor** die Zelle leer ist, und nicht erst, wenn ein Wert seit drei Tagen derselbe
ist. Wer mag, hängt einen Alarm daran.

## Die drei Dinge, die man wissen sollte

**Erstens: Scannen kostet WLAN.** Ganz oben im Menü steht die Warnung
„Kontinuierliches Scannen kann den Wi-Fi-Betrieb stören". Die ist keine Floskel.
Bluetooth und 2,4-GHz-WLAN teilen sich dasselbe Frequenzband, und in vielen
Geräten sitzen beide in derselben Funkeinheit. Wer dauerhaft scannen lässt, statt nur regelmäßig kurz
hinzuhören, kann sich damit eine wacklige WLAN-Verbindung einhandeln und sucht die
Ursache danach beim Router. Für einmal Einrichten anschalten, danach wieder
zurückstellen.

**Zweitens: Bluetooth mag keine Metallwände.** Der Sensor im Kühlschrank meldet sich
zuverlässig, der im hintersten Stauraum eines Fahrzeugs mit Aluaufbau vielleicht
nicht. Das probiert man aus, bevor man den Deckel zuschraubt.

**Drittens: Ein Fühler in der Liste ist womöglich gar keiner.** Ein GX-Gerät kann
auch **virtuelle Temperatursensoren** führen, also Werte, die irgendein anderes Gerät
im Netzwerk hineinschreibt. Bei mir ist das der Router im Fahrzeug, der seine eigene
Gehäusetemperatur meldet und mit rund 70 °C zwischen lauter Wohnraumwerten steht. Auf
den ersten Blick sieht das nach einem sehr dringenden Problem aus. Wenn in der
Temperaturliste also ein Wert steht, der unmöglich erscheint, ist die erste Frage
nicht „welcher Sensor ist kaputt", sondern **„ist das überhaupt ein Sensor"**.

Wie das bei mir im Fahrzeug aussieht und wo die fünf Sensoren sitzen, steht auf der
Seite zur [Energieanlage](/projekte/wohnmobil-victron).
