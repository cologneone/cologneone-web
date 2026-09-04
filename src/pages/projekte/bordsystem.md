---
layout: ../../layouts/Projekt.astro
titel: Das Bordsystem auf dem Handy
kurz: Ein eigenes Bedienbild für Batterie, Tanks, Licht, Klima und Ladebooster. Gebaut in Node-RED auf dem Cerbo GX, ohne zusätzliche Hardware, ohne Cloud, im eigenen WLAN erreichbar.
meta_titel: Eigene Bedienoberfläche im Wohnmobil mit Node-RED auf dem Cerbo GX
meta_beschreibung: Sechs selbst gebaute Bedienseiten für Tanks, Temperaturen, Licht, Klimaanlage, Solar, MultiPlus und Ladebooster. Sie laufen auf dem Victron Cerbo GX selbst, ohne Cloud und ohne zusätzlichen Rechner, und sind im Fahrzeug-WLAN mit dem Telefon erreichbar.
bild: /bilder/bordsystem/vorschau.jpg
rang: 2
status: Fertig
stand: 2026-09
tags:
  - Victron
  - Cerbo GX
  - Node-RED
  - Wohnmobil
---

Im Wohnmobil hängt eine GX Touch, und daneben liegt ein Tablet mit der
Victron-Oberfläche. Beide zeigen das meiste von dem, was hier zählt: Batterie, Solar,
Wechselrichter, Tanks, Temperaturen. Das ist gut gemacht, und ehrlicherweise fehlt
inhaltlich wenig.

<figure class="hochformat">
  <img src="/bilder/bordsystem/uebersicht-hell.png" alt="Übersichtsseite auf dem Telefon mit MultiPlus-Zustand, 99 Prozent Batterie, den Quellen Landstrom, Solar und Lichtmaschine sowie den Verbrauchern" />
  <figcaption>Die Eingangstür: der Zustand des MultiPlus im Klartext, darunter die Batterie, dann woher der Strom kommt und wohin er geht.</figcaption>
</figure>

Warum dann noch etwas Eigenes? Weil „das meiste" nicht dasselbe ist wie „so, wie ich
es brauche". Die Reihenfolge ist vorgegeben, die Gewichtung auch, und manches war nie
dabei. Die Klimaanlage zum Beispiel lief immer über einen eigenen Weg, und die
Gasheizung soll später dazukommen, sobald die Frage nach dem Thermostat geklärt ist.

Diese Seiten sind also der Versuch, eigene Prioritäten zu setzen und alles an eine
Stelle zu holen. Sie laufen auf dem Cerbo GX selbst, im eigenen WLAN, und werden mit
dem Telefon aufgerufen, das ohnehin in der Tasche steckt. Der eigentliche Gewinn
liegt dabei woanders als in der Technik: Was oben steht und wie es aussieht,
entscheide ich.

## Wo das läuft

Auf dem [Cerbo GX](/projekte/wohnmobil-victron) läuft ohnehin Node-RED. Die Seiten
sind dort ein paar zusätzliche Abläufe: einer liefert die Seite, einer liefert die
Werte als JSON, einer nimmt Schaltbefehle entgegen. Kein zusätzlicher Rechner, kein
Server, kein Dienst im Internet.

Dahinter steckt keine Sparsamkeit, sondern Erfahrung. [Der Router im
Fahrzeug](/projekte/wohnmobil-netzwerk) steht selten ohne Verbindung da, aber
vorkommen kann es immer. Und grundsätzlich gilt: Ein Bordsystem muss ohne Hilfe von
außen laufen. Was ohne Internet nicht funktioniert, taugt im Wohnmobil nicht. Alles, was diese Seiten brauchen, liegt im Fahrzeug: die Werte, die
Schriftarten, die Symbole, die Zeichnungen. Es wird nichts nachgeladen.

## Die Seiten

**Übersicht** ist die Eingangstür. Oben der Zustand des MultiPlus im Klartext statt
als Zahlencode, darunter die Batterie, dann *woher* der Strom kommt und *wohin* er
geht. Die Aufteilung ist Absicht: Die häufigste Frage im Wohnmobil ist nicht „wie
viel Volt", sondern „reicht das noch".

**Sensoren** hat zwei Ansichten. Unter *Tanks* stehen Frischwasser, Grauwasser, Gas
und Diesel nebeneinander, vier Geber ganz unterschiedlicher Bauart, gleich
dargestellt. Unter *Temperaturen* die Fühler, die tatsächlich etwas entscheiden:
innen, außen, Kühlbox, Kühlschrank.

<div class="bildpaar">
  <figure>
    <img src="/bilder/bordsystem/sensoren-tanks-hell.png" alt="Tankansicht mit Frischwasser 98 Prozent, Grauwasser 0 Prozent, Gas 92 Prozent und Diesel 66 Prozent, darunter der Hinweis Dieselgeber stumm" />
    <figcaption>Vier Geber unterschiedlicher Bauart, gleich dargestellt. Unten der Hinweis, dass der Dieselgeber gerade nichts Brauchbares liefert.</figcaption>
  </figure>
  <figure>
    <img src="/bilder/bordsystem/sensoren-temperaturen-hell.png" alt="Temperaturansicht mit Werten für innen, außen, Kühlbox und Kühlschrank" />
    <figcaption>Die Fühler, die im Alltag wirklich eine Entscheidung auslösen.</figcaption>
  </figure>
</div>

Auf dem ersten Bild steht ein Hinweis, den die meisten Anzeigen verschweigen würden:
**Dieselgeber stumm**. Der Ultraschallgeber am Dieseltank liefert regelmäßig
unbrauchbare Messungen, und in dieser Zeit läuft die Anzeige auf einem gerechneten
Wert weiter. Die Seite sagt genau das, statt einen Wert zu zeigen, als sei er
gemessen. [Woran das liegt, steht auf einer eigenen Seite](/projekte/mopeka-diesel).
Eine Anzeige, die im Zweifel schweigt, ist mir lieber als eine, die sich etwas
ausdenkt.

**Schalter** fasst zusammen, was über Funkrelais hängt: die vier Lichtkreise mit
Dimmer, Kühlbox, Kühlschrank, Klimaanlage, Gasheizung, Außensteckdose. Die Wattzahl
steht daneben, damit man sieht, was ein vergessenes Licht kostet.

<figure class="hochformat">
  <img src="/bilder/bordsystem/schalter-hell.png" alt="Schalterseite mit vier Lichtkreisen samt Dimmer sowie Kühlbox, Klimaanlage, Kühlschrank und Gasheizung, jeweils mit Wattangabe" />
  <figcaption>Alles, was über ein Funkrelais hängt, an einer Stelle. Die Wattzahl daneben macht aus einem Schalter eine Entscheidung.</figcaption>
</figure>

**Klima** bedient die Gree-Anlage direkt über das Fahrzeugnetz: Sollwert,
Betriebsart, Lüfterstufe. Die Anlage kann Cloud, aber sie muss nicht.

<figure class="hochformat">
  <img src="/bilder/bordsystem/klima-hell.png" alt="Klimaseite mit Sollwert, Betriebsart und Lüfterstufe der Klimaanlage" />
  <figcaption>Die Klimaanlage über das eigene Netz statt über die Cloud des Herstellers.</figcaption>
</figure>

**Solar** zeigt beide Laderegler getrennt: gerade jetzt, der Tagesverlauf, und die
letzten dreißig Tage als Balken. Die dreißig Tage sind die einzige Ansicht, die
wirklich etwas verrät. Ein einzelner Tag sagt bloß, ob die Sonne schien.

<figure class="hochformat">
  <img src="/bilder/bordsystem/solar-30-tage-hell.png" alt="Solarertrag beider Laderegler über dreißig Tage als Balkendiagramm" />
  <figcaption>Dreißig Tage nebeneinander. Erst über diesen Zeitraum sieht man, was die Anlage wirklich leistet.</figcaption>
</figure>

**MultiPlus** ist die Seite für den Stellplatz: Betriebsart umschalten und vor allem
die Landstrom-Grenze setzen. 3, 6, 10 oder 16 Ampere, je nachdem, was an der Säule
steht.

<figure class="hochformat">
  <img src="/bilder/bordsystem/multiplus-hell.png" alt="MultiPlus-Seite mit Betriebsart und der einstellbaren Landstrom-Grenze von 3, 6, 10 oder 16 Ampere" />
  <figcaption>Die wichtigste Einstellung nach dem Einstöpseln, und sie ist genau zwei Fingertipps entfernt.</figcaption>
</figure>

**Ladebooster** vergleicht die beiden Booster an der Lichtmaschine: jetzt, auf der
letzten Fahrt, und über alle aufgezeichneten Fahrten. Der Vergleich war der
eigentliche Anlass. Zwei baugleiche Geräte an derselben Lichtmaschine sollten
ungefähr dasselbe liefern. Tun sie nicht, und das sieht man erst, wenn man es
nebeneinanderlegt.

<figure class="hochformat">
  <img src="/bilder/bordsystem/booster-fahrten-hell.png" alt="Vergleich der beiden Ladebooster über alle aufgezeichneten Fahrten" />
  <figcaption>Zwei baugleiche Geräte, dieselbe Lichtmaschine, über alle aufgezeichneten Fahrten übereinandergelegt.</figcaption>
</figure>

## Tag und Nacht

Die Seiten haben zwei Farbfassungen. Nachts im dunklen Wohnmobil ist eine helle Seite
ein Schlag ins Gesicht, draußen in der Sonne ist eine dunkle Seite unlesbar. Beides
kommt vor, also gibt es beides.

<div class="bildpaar">
  <figure>
    <img src="/bilder/bordsystem/uebersicht-hell.png" alt="Übersichtsseite in der hellen Farbfassung" />
    <figcaption>Tagfassung.</figcaption>
  </figure>
  <figure>
    <img src="/bilder/bordsystem/uebersicht-dunkel.png" alt="Dieselbe Übersichtsseite mit denselben Werten in der dunklen Farbfassung" />
    <figcaption>Nachtfassung. Dieselbe Seite, dieselben Werte, ein Satz Farbnamen mit zwei Belegungen.</figcaption>
  </figure>
</div>

Es gibt genau *einen* Satz Farbnamen und zwei Belegungen dafür. Keine Seite erfindet
eine eigene Farbe. Das klingt nach Kleinigkeit, war aber die Arbeit: In den
Einzelseiten steckten neunundvierzig fest eingetragene Farbwerte, die alle heraus
mussten, bevor das Umschalten überhaupt funktionieren konnte.

Drei Zustände: Ohne eigene Wahl folgt die Seite der Einstellung des Geräts, sonst
gilt, was oben im Kopf gewählt wurde. Das Skript, das darüber entscheidet, muss ganz
oben im Kopf der Seite stehen. Steht es weiter unten, sieht man beim Öffnen für einen
Wimpernschlag die falsche Farbe aufblitzen. Nachts merkt man das sofort.

## Was dabei hängen geblieben ist

**Ein ankommender Wert ist noch kein richtiger Wert.** Der MQTT-Broker im Cerbo
schickt jede Minute alles noch einmal, was jemand abonniert hat. Wer daraus schließt,
ein Gerät melde sich gerade, irrt. Jeder Wert trägt hier ein Alter mit sich, und die
Seiten rechnen damit.

**Die günstige Lösung ist die, die keine neue Schicht braucht.** Es gab bei jedem
Schritt die Möglichkeit, noch einen Dienst, noch einen Rechner, noch eine Datenbank
danebenzustellen. Nichts davon steht jetzt im Fahrzeug, und genau deshalb läuft es
auch dann, wenn der Platz kein Netz hat.

**Was bei Ausfall nur ärgert, darf am Netz hängen. Was bei Ausfall gefährlich wird,
nicht.** Licht und Kühlbox schalten über WLAN-Relais. Alles, was mit der
Lichtmaschine, dem Starter oder der Gasanlage zu tun hat, hängt an fest verdrahteter
Logik im Cerbo.

## Was das nicht ist

Kein Produkt, keine App, nichts zum Herunterladen. Die Seiten sind auf genau dieses
Fahrzeug zugeschnitten, auf seine Geber, seine Tankgrößen, seine Kalibrierwerte.
Vieles davon ist über Wochen ausgelitert und nachgemessen worden und gilt nur hier.

Wer so etwas nachbauen will: Die Bausteine sind Node-RED, der MQTT-Zugang des Cerbo
und Geduld. Der Rest ist Kleinarbeit an der eigenen Anlage.

## Einordnung

Privates Projekt am eigenen Fahrzeug. Es besteht keine Verbindung zu
Niesmann + Bischoff, Victron Energy oder einem anderen genannten Hersteller, und
keine der Firmen hat damit etwas zu tun. Genannte Marken gehören ihren Inhabern.
