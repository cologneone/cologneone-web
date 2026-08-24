---
layout: ../../layouts/Notiz.astro
titel: DeviceOffReason ist eine Bitmaske, keine Zahl
kurz: Warum ein Vergleich auf Gleichheit falsch ist, sobald zwei Abschaltgründe gleichzeitig anliegen — und wie die Bits belegt sind.
meta_titel: Victron DeviceOffReason — Bitmaske richtig auswerten
meta_beschreibung: Der Abschaltgrund eines Victron-Ladegeräts ist eine Bitmaske aus dem VE.Direct-HEX-Protokoll. Bit-Tabelle und der Fehler, der die Motorerkennung aussetzen lässt.
stand: 2026-08
tags:
  - Victron
  - Node-RED
---

Victron-Ladegeräte melden über `DeviceOffReason`, warum sie gerade nichts tun. Der
Wert kommt aus dem VE.Direct-HEX-Protokoll, Register `0x0207` — und er ist eine
**Bitmaske**, keine Aufzählung.

| Bit | Wert | Bedeutung |
|---|---|---|
| 0 | 1 | keine Eingangsspannung |
| 2 | 4 | Softwareschalter aus |
| 3 | 8 | Fernsteuereingang, etwa D+ inaktiv |
| 4 | 16 | interner Grund |
| 5 | 32 | Pay-as-you-go |
| 6 | 64 | BMS |
| 7 | 128 | Motorabschalterkennung |
| 8 | 256 | Fehler |

Das Naheliegende ist deshalb falsch:

```js
if (reason === 8) { /* Motor steht */ }     // funktioniert nur zufaellig
```

Sobald ein zweiter Grund dazukommt — etwa fehlende Eingangsspannung —, steht dort
`9`, und der Vergleich schlägt fehl. Richtig ist die Prüfung auf das einzelne Bit:

```js
const dPlusAktiv = (reason & 8) === 0;      // Bit 3 nicht gesetzt = Motor laeuft
```

Bei mir stand die falsche Variante eine Weile im Flow. Die Folge war unauffällig und
deshalb ärgerlich: Die Motorerkennung funktionierte im Normalfall und setzte immer
genau dann aus, wenn zusätzlich etwas anderes anlag.
