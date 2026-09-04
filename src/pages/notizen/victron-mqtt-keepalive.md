---
layout: ../../layouts/Notiz.astro
titel: Victrons MQTT verstummt ohne Lebenszeichen
kurz: Alle Werte stehen still, die Sensoren sind aber in Ordnung. Der Datenkanal hat schlicht aufgehört zu senden, weil ihn niemand angestupst hat.
meta_titel: Victron MQTT keepalive – warum plötzlich alle Werte einfrieren
meta_beschreibung: Der MQTT-Broker im Victron GX-Gerät stellt das Senden ein, wenn nicht mindestens jede Minute ein Keepalive kommt. Sieht aus wie ein Sensorausfall, ist keiner.
stand: 2026-08
tags:
  - Victron
  - MQTT
---

**Worum es geht:** In vielen Wohnmobilen und Booten sitzt ein GX-Gerät von
Victron – ein Cerbo GX zum Beispiel. Das ist der kleine Rechner, bei dem
Batteriewächter, Solarregler, Wechselrichter und Tankgeber zusammenlaufen. Wer
darauf aufbaut, holt sich die Werte meist über MQTT heraus: eine Art
Nachrichtendienst, bei dem man Themen abonniert und laufend neue Werte zugeschickt
bekommt. Node-RED, Home Assistant und eigene Skripte machen es genau so.

Und dieser Nachrichtendienst hat eine Eigenheit, die einen einen halben Abend kosten
kann.

## Das Symptom

Sämtliche Werte aus dem GX-Gerät stehen still. Nicht einer – alle. Die Geräte
selbst sind in Ordnung, das Display am Cerbo zeigt aktuelle Zahlen, nur über MQTT
kommt nichts mehr an. Keine Fehlermeldung, keine Trennung der Verbindung. Die
Meldungen hören einfach auf.

## Die Ursache

Victrons MQTT-Dienst sendet nur, solange ihn jemand am Leben hält. Ohne die
Nachricht

```
R/<portal-id>/keepalive
```

**mindestens einmal pro Minute** stellt er das Senden ein. Die `<portal-id>` ist die
Kennung des eigenen Geräts, die in jedem Thema vorkommt.

Gewollt ist das so: Ein GX-Gerät soll nicht dauerhaft Daten in die
Gegend funken, wenn niemand zuhört. Nur merkt man davon nichts, bis alles steht.

## Was daraus folgt

Bei mir schickt ein Zeitgeber alle 30 Sekunden dieses Lebenszeichen. Der Haken: Dieser
eine unscheinbare Knoten hält die Datenversorgung sämtlicher Automatisierungen
aufrecht. Wer den Ablauf abschaltet, in dem er zufällig liegt, legt nebenbei alles
andere still: Tankanzeige, Motorautomatik, Protokolle.

**Wenn also alle Werte gleichzeitig einfrieren, ist die erste Frage nicht „welcher
Sensor ist kaputt", sondern „wer schickt eigentlich das Lebenszeichen, und läuft der
noch?"**
