# cologneone-web

Quellcode der Website **[cologneone.de](https://cologneone.de)** — statisch gebaut mit
[Astro](https://astro.build), veröffentlicht über GitHub Pages.

## Wie das Ganze läuft

1. Änderung im Zweig `main` (hier im Browser oder lokal).
2. GitHub Actions baut die Seite automatisch (`.github/workflows/deploy.yml`).
3. Das Ergebnis landet auf GitHub Pages und ist unter cologneone.de erreichbar.

Es gibt keinen FTP-Upload und keinen Server, der gepflegt werden müsste.

## Neues Projekt anlegen

Eine neue Markdown-Datei in `src/pages/projekte/` anlegen, z. B. `solaranlage.md`:

```markdown
---
layout: ../../layouts/Projekt.astro
titel: Titel des Projekts
kurz: Ein Satz, der auf der Übersicht erscheint.
status: Laufend        # oder: Abgeschlossen
stand: 2026-09         # Format JJJJ-MM, bestimmt die Sortierung
tags:
  - Schlagwort
---

Ab hier ganz normaler Text in Markdown.
```

Übersichtsseite und Startseite ziehen den Eintrag automatisch — nichts weiter zu tun.

Bilder kommen nach `public/bilder/` und werden im Text als
`![Bildbeschreibung](/bilder/dateiname.jpg)` eingebunden.

## Aufbau

```
src/
  layouts/Base.astro       Grundgerüst (Kopf, Navigation, Fuß)
  layouts/Projekt.astro    Rahmen für einzelne Projektseiten
  pages/index.astro        Startseite
  pages/projekte/          Übersicht + je eine Markdown-Datei pro Projekt
  pages/ueber.astro        Über-Seite
  pages/impressum.astro    Impressum (Pflichtangaben noch ausstehend)
  pages/datenschutz.astro  Datenschutzerklärung
  styles/global.css        gesamtes Styling, hell und dunkel
public/
  CNAME                    verknüpft die Seite mit cologneone.de — nicht löschen
  favicon.svg              Icon im Browsertab
```

## Lokal entwickeln (optional)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Ergebnis liegt in dist/
```

## Offene Punkte

- [ ] Impressum mit echten Pflichtangaben füllen (§ 5 DDG)
- [ ] Über-Seite schreiben
- [ ] Projektseiten mit Inhalt füllen
