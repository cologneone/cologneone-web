---
layout: ../../layouts/Notiz.astro
titel: Volle Balken heißen nichts
kurz: Der Mobilfunkempfang zeigt Bestwerte, und trotzdem lädt keine Seite. Die Zahl, die überall angezeigt wird, ist die am wenigsten aussagekräftige von allen.
meta_titel: LTE und 5G im Wohnmobil – warum RSSI nichts über die Verbindung sagt
meta_beschreibung: Volle Signalbalken bei unbrauchbarer Verbindung. Warum SINR und RSRQ die entscheidenden Werte sind und woran man eine überlastete Funkzelle erkennt.
stand: 2026-08
tags:
  - Netzwerk
  - Wohnmobil
---

**Worum es geht:** Wer im Wohnmobil, Boot oder Ferienhaus über Mobilfunk ins Internet
geht, schaut irgendwann auf die Empfangsanzeige, die Balken am Handy oder die
Signalwerte in der Oberfläche des Routers. Die Zahl dahinter heißt **RSSI**, und sie
ist die am wenigsten aussagekräftige von allen.

RSSI sagt nur, wie **laut** der Sendemast zu hören ist. Nicht, ob man ihn
**versteht**.

## Ein Beispiel aus der Praxis

In Kroatien und Italien standen mehrfach Werte an wie:

```
RSSI  −58 dBm     →  nach jeder Anzeige "sehr gut"
SINR   −1 dB      →  unbrauchbar
```

Übersetzt: Der Mast ist laut zu hören. Alle anderen Teilnehmer in der Zelle aber
auch. Das Nutzsignal geht im Rest unter. Die Zelle ist schlicht überlastet.

## Die Werte, auf die es ankommt

- **RSSI** – wie viel Leistung ankommt. Beantwortet nur: Ist überhaupt etwas da?
- **SINR** – Verhältnis von Nutzsignal zu Störung und Rauschen. Das ist der Wert, der
  über die tatsächliche Geschwindigkeit entscheidet. Grob: über 20 dB sehr gut, unter
  0 dB praktisch unbrauchbar.
- **RSRQ** – die Qualität des empfangenen Referenzsignals. Fällt mit der Auslastung
  der Zelle und ist deshalb ein guter Frühwarnwert.

Die meisten Router zeigen alle drei an, nur eben nicht auf der Startseite.

## Was hilft – und was nicht

Gegen eine überlastete Zelle hilft **nichts**, was man am eigenen Gerät einstellen
kann: keine andere Antenne, kein Neustart, kein festgesetztes Frequenzband. Nur ein
anderer Standort oder eine andere Zelle. Ein paar hundert Meter weiter kann alles
anders sein, und auf einem vollen Campingplatz reicht es manchmal schon, bis zum
Abend zu warten.

**Wer Mobilfunk beurteilen will, schaut auf SINR und RSRQ.** RSSI beantwortet nur die
Frage, ob überhaupt etwas da ist.
