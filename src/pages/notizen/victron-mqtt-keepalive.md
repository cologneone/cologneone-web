---
layout: ../../layouts/Notiz.astro
titel: Victrons MQTT verstummt ohne Lebenszeichen
kurz: Alle Werte stehen still, die Sensoren sind aber in Ordnung. Der Broker hat schlicht aufgehört zu senden, weil ihn niemand angestupst hat.
meta_titel: Victron MQTT keepalive — warum alle Werte einfrieren
meta_beschreibung: Der MQTT-Broker im Victron GX-Gerät stellt das Senden ein, wenn nicht mindestens jede Minute ein Keepalive kommt. Sieht aus wie ein Sensorausfall, ist keiner.
stand: 2026-08
tags:
  - Victron
  - MQTT
---

Symptom: Sämtliche Werte aus dem GX-Gerät stehen still. Nicht einer, sondern alle.
Die Geräte selbst sind in Ordnung, die Oberfläche zeigt aktuelle Zahlen — nur über
MQTT kommt nichts mehr.

Ursache: Victrons Broker sendet die `N/`-Topics nur, solange ihn jemand am Leben
hält. Ohne

```
R/<portal-id>/keepalive
```

**mindestens einmal pro Minute** stellt er das Senden ein. Kein Fehler, keine Meldung,
keine Trennung der Verbindung — die Topics hören einfach auf.

Bei mir übernimmt das ein Timer, der alle 30 Sekunden feuert. Der Haken daran: Dieser
eine unscheinbare Knoten hält die MQTT-Versorgung **sämtlicher** Automatisierungen
aufrecht. Wer den Tab abschaltet, in dem er zufällig liegt, legt nebenbei alles
andere still.

Wenn also alle Werte gleichzeitig einfrieren, ist die erste Frage nicht „welcher
Sensor ist kaputt", sondern „**wer schickt eigentlich das Lebenszeichen, und läuft
der noch?**"
