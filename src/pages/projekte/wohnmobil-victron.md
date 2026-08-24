---
layout: ../../layouts/Projekt.astro
titel: Die Energieanlage — Victron und Cerbo GX im Flair
kurz: Wechselrichter, zwei Solarregler, drei Ladebooster, LiFePO4 und ein Cerbo GX als Kopf der Anlage. Kein Maximalausbau, sondern eine Anlage, die man versteht.
meta_titel: Victron-Energieanlage im Wohnmobil mit Cerbo GX — Aufbau und Praxis
meta_beschreibung: MultiPlus-II, zwei SmartSolar MPPT, drei Ladebooster, LiFePO4 und ein Victron Cerbo GX im Wohnmobil — Aufbau, Zusammenspiel und die Erfahrungen aus dem Betrieb.
status: Laufend
stand: 2026-08
tags:
  - Victron
  - Cerbo GX
  - Node-RED
  - Wohnmobil
---

Das Energiesystem im Fahrzeug läuft auf Victron-Komponenten, mit einem **Cerbo GX**
als Kopf der Anlage. Das Ziel war nie die maximale Ausbaustufe, sondern ein System,
das ich verstehe, im Zweifel selbst reparieren kann und dessen Zustand jederzeit
ablesbar ist — auch dann, wenn ich gerade nicht daneben stehe.

Diese Seite ist die Übersicht. Die Details, bei denen es interessant wurde, stehen in
eigenen Beiträgen.

## Was verbaut ist

| Aufgabe | Gerät |
|---|---|
| Wechselrichter und Landstromlader | MultiPlus-II 12/3000/120-32 |
| Solar | zwei SmartSolar MPPT 100/30, getrennt nach Dachbereich |
| Laden während der Fahrt | zwei Orion XS 12/12-50 |
| Rückladung der Starterbatterie | ein Orion-Tr Smart 12/12-30 |
| Batteriewächter | BMV-712 Smart, Zweiteingang auf der Starterbatterie |
| Speicher | LiFePO4 mit eigenem BMS |
| Kopf der Anlage | Cerbo GX mit Node-RED |

Dazu Tankgeber für Frisch- und Grauwasser, ein Ultraschallsensor am Dieseltank,
Temperaturfühler im Fahrzeug und eine Handvoll Funkschaltaktoren für Licht und
Verbraucher.

## Wie die Teile zusammenspielen

Die meisten Geräte hängen per Kabel am Cerbo und melden sich von selbst. Drei Dinge
tun das **nicht** und mussten dazugebaut werden:

- Die **Gasflasche** funkt nur per Bluetooth und in einem undokumentierten Protokoll —
  [wie sie trotzdem im Cerbo landet](/projekte/travelmate-bluetooth).
- Der **Dieselgeber** liefert brauchbare Werte nur mit Filter, und der Treiber rechnet
  anders, als die Oberfläche vermuten lässt —
  [was dahintersteckt](/projekte/mopeka-diesel).
- Der **Ladebooster für die Starterbatterie** hat keinen Datenanschluss. Er wird über
  ein Relais des Cerbo geschaltet und über sein Bluetooth-Werbepaket mitgelesen.

Die Logik dafür liegt in Node-RED auf dem Cerbo selbst — ein Tab je Aufgabe, jeder
für sich importierbar und mit eigener Änderungshistorie.

## Drei Dinge, die ich vorher gern gewusst hätte

**Ein Ausfall ist ein Betriebszustand, kein Fehler.** Ein Sensor, der kurz nichts
sieht, darf nicht 0 melden. Halten, markieren, weiterlaufen — sonst ist jede
Auswertung wertlos und jeder Alarm einer zu viel.

**Feste Adressen in Automatisierungen sind eine Zeitbombe.** Sie funktionieren, bis
sich das Netz ändert, und dann fällt still eine Hälfte der Anlage aus. Was auf dem
Cerbo läuft und den Cerbo meint, spricht ihn lokal an, nicht über seine LAN-Adresse.

**Ohne Lebenszeichen verstummt die Datenquelle.** Victrons MQTT-Broker stellt das
Senden ein, wenn ihn niemand regelmäßig anstupst. Das sieht aus wie ein kaputter
Sensor und ist keiner —
[die Kurzfassung dazu](/notizen/victron-mqtt-keepalive).

## Was noch offen ist

- Fotos vom Aufbau: Ladeverteiler, Sicherungen, Batteriefach
- Querschnitte und Absicherung dokumentieren, damit es nachvollziehbar wird
- Solarertrag und Verbrauch über eine ganze Saison, nicht über ein paar Wochen
- Der ehrliche Abschnitt „was ich anders machen würde" — den schreibe ich, wenn die
  erste lange Reise damit durch ist
