---
layout: ../../layouts/Notiz.astro
titel: Am iPhone hilft der zweite Versuch
kurz: Safari lehnt das selbstsignierte Zertifikat des Cerbo erst ab. Ruft man dieselbe Adresse noch einmal auf, ist man drin. Ich hatte daraus geschlossen, es gehe gar nicht.
meta_titel: Cerbo GX Zertifikat am iPhone – Safari lässt erst beim zweiten Versuch durch
meta_beschreibung: Safari weigert sich beim ersten Aufruf der Weboberfläche eines Victron GX-Geräts mit selbstsigniertem Zertifikat. Beim zweiten Aufruf derselben internen Adresse klappt es. Dazu, warum das Zertifikat überhaupt aneckt.
stand: 2026-08
tags:
  - Victron
  - Cerbo GX
---

**Worum es geht:** Ein Cerbo GX bringt eine eigene Weboberfläche mit, in der
Ausbaustufe „large" zusätzlich Node-RED. Erreichbar ist das über die Adresse des
Geräts im heimischen Netz, per HTTPS. Das Zertifikat dafür stellt das Gerät sich
selbst aus.

Vom Rechner ist das kein Problem: Warnung wegklicken, weiter. Am iPhone sieht es
zunächst aus, als ginge es gar nicht. Safari zeigt „Trotzdem öffnen" an und lädt
danach doch nichts.

## Was hilft

**Dieselbe Adresse einfach noch einmal aufrufen.** Beim zweiten Anlauf über die
interne IP kommt man durch.

Das klingt zu banal, um es aufzuschreiben. Aber wer es einmal versucht, die Meldung
sieht und dann aufhört, hält das Gerät für unerreichbar. Genau so ist es mir
gegangen.

## Warum es überhaupt hakt

Das mitgelieferte Zertifikat verletzt zwei Regeln, die Apple seit iOS 13 durchsetzt:

- Es hat keinen `subjectAltName`. Der Rechnername steht nur im veralteten
  `CN`-Feld, und das wertet iOS nicht mehr aus.
- Es läuft rund tausend Jahre. Apple akzeptiert höchstens 398 Tage.

Jede der beiden Regeln allein reicht für die Warnung. Deshalb wirkt der erste
Versuch wie eine Sackgasse.

## Bequemer bleibt das VRM-Portal

Wer die Endpunkte ohnehin von unterwegs braucht, nimmt Victrons Fernzugriff über
`vrm.victronenergy.com`. Gleiches Gerät, gültiges Zertifikat, keine Warnung.

Ein Nebeneffekt, den man kennen sollte, wenn man eigene Seiten auf dem Cerbo baut:
**VRM setzt einen Präfix vor jeden Pfad.** Eine Seite, die ihre Daten von `/status`
holt, geht direkt aufgerufen. Über VRM läuft jeder Aufruf ins Leere. Wer das
vermeiden will, baut die Pfade relativ zur aktuellen Adresse statt absolut.

## Korrektur

Hier stand vorher, es gebe keinen Weg außer VRM, und „Trotzdem öffnen" sei
wirkungslos. Das war zu absolut. Es wirkt, nur eben nicht beim ersten Anlauf.
