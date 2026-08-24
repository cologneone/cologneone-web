---
layout: ../../layouts/Notiz.astro
titel: Node-RED auf Venus OS darf fast nirgends schreiben
kurz: Ein Flow, der eine Datei anlegen will, scheitert lautlos — er läuft als eigener Benutzer mit sehr wenig Rechten. Es gibt genau einen Ort, der funktioniert und Updates übersteht.
meta_titel: Venus OS — wo Node-RED Dateien ablegen darf
meta_beschreibung: Node-RED läuft auf Venus OS als Benutzer nodered und darf nicht nach /data schreiben. Der einzige beschreibbare Ort, der auch Firmware-Updates übersteht.
stand: 2026-08
tags:
  - Victron
  - Node-RED
---

Ein Flow soll eine CSV mitschreiben oder eine Konfiguration ablegen. Der Pfad sieht
vernünftig aus, der Ordner existiert — und es passiert nichts. Keine Fehlermeldung im
Debug-Fenster, keine Datei.

Grund: Node-RED läuft auf Venus OS als eigener Benutzer **`nodered`**, und der darf
nach `/data/` nicht schreiben. Nur unterhalb von

```
/data/home/nodered/.node-red/
```

hat er freie Hand.

Zwei Dinge folgen daraus:

**Alles, was Flows ablegen, gehört dorthin** — Messreihen, Konfigurationsdateien,
Zustände. Man kann sich beliebige Unterordner anlegen, solange sie darunter liegen.

**Und `/data` ist die richtige Ebene**, weil sie Firmware-Updates übersteht. Das
Wurzeldateisystem nicht: Was außerhalb von `/data` liegt, ist nach dem nächsten Update
weg.

Wer den Fehler nicht kennt, sucht ihn im Flow. Er steckt aber im Dateisystem — und
zwar auf eine Weise, die keine Fehlermeldung produziert, sondern nur schweigt.
