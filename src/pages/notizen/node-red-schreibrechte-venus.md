---
layout: ../../layouts/Notiz.astro
titel: Node-RED auf Venus OS darf fast nirgends schreiben
kurz: Ein Ablauf, der eine Datei anlegen will, scheitert lautlos — er läuft als eigener Benutzer mit sehr wenig Rechten. Es gibt genau einen Ort, der funktioniert und Updates übersteht.
meta_titel: Venus OS — wo Node-RED Dateien ablegen darf
meta_beschreibung: Node-RED läuft auf Venus OS als Benutzer nodered und darf nicht nach /data schreiben. Der einzige beschreibbare Ort, der auch Firmware-Updates übersteht.
stand: 2026-08
tags:
  - Victron
  - Node-RED
---

**Worum es geht:** **Venus OS** ist das Betriebssystem der GX-Geräte von Victron —
Cerbo GX, Ekrano GX und Verwandte. In der Ausbaustufe „large" bringt es **Node-RED**
mit: eine grafische Umgebung, in der man Abläufe zusammensteckt, ohne ein Programm zu
schreiben. Damit lassen sich Messwerte protokollieren, Relais schalten oder eigene
Sensoren einbinden.

Sobald ein solcher Ablauf aber eine **Datei** anlegen will — eine Messreihe als CSV,
eine Konfiguration, einen gespeicherten Zustand —, kommt die Überraschung.

## Das Symptom

Der Pfad sieht vernünftig aus, der Ordner existiert — und es passiert nichts. Keine
Fehlermeldung im Debug-Fenster, keine Datei. Nur Schweigen.

## Die Ursache

Node-RED läuft auf Venus OS als eigener Benutzer namens **`nodered`**, und der hat
sehr wenig Rechte. Insbesondere darf er **nicht** direkt nach `/data/` schreiben, was
der naheliegende Ort wäre. Freie Hand hat er nur unterhalb von

```
/data/home/nodered/.node-red/
```

Dort kann man sich beliebige Unterordner anlegen.

## Zwei Dinge, die daraus folgen

**Alles, was Abläufe ablegen, gehört dorthin** — Messreihen, Konfigurationsdateien,
Zustände.

**Und `/data` ist die richtige Ebene**, weil sie Firmware-Updates übersteht. Der Rest
des Dateisystems nicht: Was außerhalb von `/data` liegt, ist nach dem nächsten Update
weg. Das ist der Grund, warum man den Umweg über den langen Pfad geht, statt sich
einen bequemeren Ort zu suchen.

Wer den Fehler nicht kennt, sucht ihn im Ablauf. Er steckt aber im Dateisystem — und
zwar auf eine Weise, die keine Fehlermeldung produziert, sondern einfach nichts tut.
