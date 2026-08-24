---
layout: ../../layouts/Notiz.astro
titel: DeviceOffReason ist eine Bitmaske, keine Zahl
kurz: Victron-Ladegeräte melden, warum sie gerade nicht laden. Wer diesen Wert wie eine normale Zahl behandelt, baut sich einen Fehler ein, der nur manchmal auftritt.
meta_titel: Victron DeviceOffReason — Bitmaske richtig auswerten
meta_beschreibung: Der Abschaltgrund eines Victron-Ladegeräts ist eine Bitmaske aus dem VE.Direct-Protokoll. Bit-Tabelle, Codebeispiel und der Fehler, der die Motorerkennung aussetzen lässt.
stand: 2026-08
tags:
  - Victron
  - Node-RED
---

**Worum es geht:** Victron-Ladegeräte — Solarregler, Ladebooster, DC-DC-Wandler —
melden über den Wert `DeviceOffReason`, warum sie gerade nichts tun. Der Wert taucht
überall dort auf, wo man die Geräte ausliest: in Node-RED, in Home Assistant, per
MQTT oder direkt über VE.Direct. Wer eine Automatik baut, die zum Beispiel erkennen
soll, ob der Motor läuft, greift genau danach.

Und genau da liegt die Falle: **Es ist keine Aufzählung, sondern eine Bitmaske.**

## Was das heißt

Eine Bitmaske ist eine Zahl, in der jedes Bit für sich eine eigene Ja/Nein-Aussage
trägt. Es kann also **mehr als ein Grund gleichzeitig** anliegen, und die Zahl ist
dann deren Summe. Der Wert stammt aus dem VE.Direct-Protokoll, Register `0x0207`:

| Bit | Wert | Bedeutung |
|---|---|---|
| 0 | 1 | keine Eingangsspannung |
| 2 | 4 | Softwareschalter aus |
| 3 | 8 | Fernsteuereingang, etwa D+ inaktiv (Motor steht) |
| 4 | 16 | interner Grund |
| 5 | 32 | Pay-as-you-go |
| 6 | 64 | BMS |
| 7 | 128 | Motorabschalterkennung |
| 8 | 256 | Fehler |

## Der Fehler

Das Naheliegende ist falsch — in beide Richtungen:

```js
if (reason === 0) { /* Motor laeuft */ }    // genau so stand es bei mir im Flow
if (reason === 8) { /* Motor steht  */ }    // dieselbe Falle, andersherum
```

Solange wirklich nur ein einziger Grund anliegen kann, geht das gut. Kommt ein zweiter
dazu — etwa Bit 0, „keine Eingangsspannung", weil ein Trennschalter aus war —, steht
dort `1` statt `0`, und der laufende Motor wird nie erkannt. Richtig ist die Prüfung
auf das einzelne Bit:

```js
const dPlusAktiv = (reason & 8) === 0;      // Bit 3 nicht gesetzt = Motor laeuft
```

Der Operator `&` blendet alle anderen Bits aus und beantwortet nur die eine Frage:
Ist dieses eine Bit gesetzt?

## Warum das so ärgerlich ist

Die Folge war unauffällig und deshalb besonders lästig: Die Motorerkennung
funktionierte im Normalfall tadellos und setzte immer genau dann aus, wenn zusätzlich
noch etwas anderes anlag — also ausgerechnet dann, wenn wirklich etwas nicht stimmte.

Dieselbe Falle steckt in vielen Statuswerten von Victron-Geräten. Wenn in einer
Dokumentation eine Tabelle mit Bit-Nummern steht, ist es eine Bitmaske.
