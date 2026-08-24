---
layout: ../../layouts/Notiz.astro
titel: Volle Balken heißen nichts
kurz: RSSI −58 dBm sieht hervorragend aus. Bei einem SINR von −1 ist die Leitung trotzdem unbrauchbar, und keine Einstellung hilft dagegen.
meta_titel: LTE im Wohnmobil — warum RSSI nichts über die Verbindung sagt
meta_beschreibung: Volle Signalbalken bei unbrauchbarer Verbindung. Warum SINR und RSRQ die entscheidenden Werte sind und woran man eine überlastete Funkzelle erkennt.
stand: 2026-08
tags:
  - Netzwerk
  - Wohnmobil
---

Die Zahl, die überall angezeigt wird, ist **RSSI** — und sie ist die am wenigsten
aussagekräftige von allen. Sie sagt nur, wie *laut* der Sendemast zu hören ist. Nicht,
ob man ihn *versteht*.

In Kroatien und Italien standen mehrfach Werte an wie:

```
RSSI  −58 dBm     →  nach jeder Anzeige "sehr gut"
SINR   −1 dB      →  unbrauchbar
```

Übersetzt: Der Mast ist laut zu hören. Alle anderen Teilnehmer aber auch. Die Zelle
ist überlastet, das Nutzsignal geht im Rest unter.

Dagegen hilft nichts, was man am eigenen Gerät einstellen kann — keine andere Antenne,
kein Neustart, kein Band-Lock. Nur ein anderer Standort oder eine andere Zelle. Ein
paar hundert Meter weiter kann alles anders sein.

**Wer Mobilfunk beurteilen will, schaut auf SINR und RSRQ.** RSSI beantwortet die
Frage, ob überhaupt etwas da ist. Die beiden anderen beantworten die Frage, ob man
damit arbeiten kann.
