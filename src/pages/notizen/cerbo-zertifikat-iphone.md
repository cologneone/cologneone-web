---
layout: ../../layouts/Notiz.astro
titel: Das iPhone akzeptiert das Zertifikat des Cerbo nicht – und lässt sich nicht überreden
kurz: Am Rechner klickt man die Warnung weg und ist drin. Am iPhone nicht. Es liegt nicht am Browser, sondern an zwei Regeln, die das Zertifikat beide verletzt.
meta_titel: Cerbo GX Zertifikat am iPhone – warum Safari nicht durchlässt
meta_beschreibung: Das selbstsignierte Zertifikat eines Victron GX-Geräts hat keinen subjectAltName und läuft weit über 398 Tage. iOS lehnt beides ab. Der Umweg über das VRM-Portal funktioniert.
stand: 2026-08
tags:
  - Victron
  - Cerbo GX
---

**Worum es geht:** Ein **Cerbo GX** – der Rechner im Herzen einer Victron-Anlage –
bringt eine eigene Weboberfläche mit, und in der „large"-Firmware zusätzlich
**Node-RED**, mit dem man eigene Abläufe und kleine Webseiten baut. Erreichbar ist
das über die Adresse des Geräts im heimischen Netz, per HTTPS.

Das Zertifikat dafür stellt das Gerät sich selbst aus. Vom Rechner aus ist das kein
Problem: Warnung wegklicken, weiter. **Vom iPhone aus schon.** Safari zeigt brav
„Trotzdem öffnen" an – und lädt danach doch nichts.

## Warum das kein Browserproblem ist

Es liegt nicht am Browser und auch nicht an einer Einstellung, die man übersehen hat.
Das mitgelieferte Zertifikat verletzt **zwei** Regeln, die Apple seit iOS 13
durchsetzt:

- Es hat **keinen `subjectAltName`**. Der Rechnername steht nur im veralteten
  `CN`-Feld, und das wertet iOS nicht mehr aus.
- Es läuft **rund tausend Jahre**. Apple akzeptiert höchstens 398 Tage.

Jede der beiden Regeln allein reicht zur Ablehnung. Und für keine von beiden gibt es
einen Ausnahmeschalter – anders als bei einem bloß abgelaufenen oder unbekannten
Zertifikat, das man noch durchwinken kann. Die Schaltfläche „Trotzdem öffnen"
erscheint zwar, hat aber keine Wirkung.

## Der Weg, der funktioniert

**Das VRM-Portal.** Victrons eigener Fernzugriff unter `vrm.victronenergy.com`
erreicht dieselben Endpunkte des GX-Geräts – nur eben über ein gültiges Zertifikat,
gegen das das iPhone nichts hat. Kein Zertifikatstausch, kein Konfigurationsprofil,
kein Herumfummeln am Gerät.

Ein Nebeneffekt, den man kennen sollte, wenn man eigene Seiten auf dem Cerbo baut:
**VRM setzt einen Präfix vor jeden Pfad.** Eine Seite, die ihre Daten von `/status`
holt, geht direkt aufgerufen – über VRM läuft jeder Aufruf ins Leere. Wer das
vermeiden will, baut die Pfade relativ zur aktuellen Adresse statt absolut. Genau
daran ist meine erste Fassung gescheitert.
