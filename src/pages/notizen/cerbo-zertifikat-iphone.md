---
layout: ../../layouts/Notiz.astro
titel: Das iPhone akzeptiert das Zertifikat des Cerbo nicht — und lässt sich nicht überreden
kurz: Safari bietet „Trotzdem öffnen" an und hält sich nicht daran. Es liegt nicht am Browser, sondern an zwei Regeln, die das Zertifikat beide verletzt.
meta_titel: Cerbo GX Zertifikat am iPhone — warum Safari nicht durchlässt
meta_beschreibung: Das selbstsignierte Zertifikat eines Victron GX-Geräts hat keinen subjectAltName und läuft weit über 398 Tage. iOS lehnt beides ab. Der Umweg über das VRM-Portal funktioniert.
stand: 2026-08
tags:
  - Victron
  - Cerbo GX
---

Vom Rechner aus geht es: Warnung wegklicken, Node-RED auf dem GX-Gerät öffnen, fertig.
Vom iPhone aus nicht. Safari zeigt brav „Trotzdem öffnen" an — und lädt danach doch
nichts.

Das liegt nicht am Browser und auch nicht an einer Einstellung, die man übersehen hat.
Das mitgelieferte selbstsignierte Zertifikat verletzt **zwei** Regeln, die Apple seit
iOS 13 durchsetzt:

- Es hat **keinen `subjectAltName`**. Der Name steht nur im veralteten
  `CN`-Feld, und das wertet iOS nicht mehr aus.
- Es läuft **rund tausend Jahre**. Apple akzeptiert höchstens 398 Tage.

Jede der beiden Regeln allein reicht zur Ablehnung. Und es gibt für sie keinen
Ausnahmeschalter in den Einstellungen — anders als bei einem abgelaufenen oder
unbekannten Zertifikat, das man noch durchwinken kann.

Der Umweg, der ohne Basteln funktioniert: **das VRM-Portal.** Über
`vrm.victronenergy.com` erreicht das Handy dieselben Endpunkte des GX-Geräts, nur
eben über ein gültiges Zertifikat. Kein Zertifikatstausch, kein Profil, kein
Herumfummeln am Gerät.
