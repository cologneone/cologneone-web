/**
 * llms.txt – Wegweiser für KI-Assistenten
 *
 * Version: 1.1.0
 * Historie:
 *   1.0.0 (2026-08-19) – Erstanlage
 *   1.1.0 (2026-08-24) – Der Bereich Notizen kommt mit hinein
 *
 * Nach der Konvention von https://llmstxt.org: eine kurze, maschinenlesbare
 * Übersicht dessen, was hier steht, damit ein Assistent nicht raten muss,
 * welche Seite die richtige ist. Wird beim Bauen aus den Projektdateien
 * erzeugt und ist damit automatisch aktuell.
 */

const dateien = import.meta.glob('./projekte/*.md', { eager: true });
const notizDateien = import.meta.glob('./notizen/*.md', { eager: true });

// Zu welchem Projekt gehört welches Repository. Steht hier und nicht im
// Frontmatter, weil es bisher genau eines ist – wenn es mehr werden, wandert
// die Angabe in die jeweilige Markdown-Datei.
const REPOS = {
  '/projekte/travelmate-bluetooth':
    'https://github.com/cologneone/dbus-rotarex-dime',
};

const BASIS = import.meta.env.SITE ?? 'https://cologneone.de';

const absolut = (pfad) => new URL(pfad, BASIS).href;

export function GET() {
  const projekte = Object.values(dateien)
    .map((eintrag) => ({ ...eintrag.frontmatter, url: eintrag.url }))
    .sort((a, b) => String(b.stand).localeCompare(String(a.stand)));

  const zeilen = [
    '# cologneone.de',
    '',
    '> Projektdokumentation rund um Wohnmobil-Elektrik, Victron-Energiesysteme,',
    '> Bluetooth-Sensorik und Smart Home. Jedes Projekt beschreibt die verbaute',
    '> Hardware, den Weg zur Lösung samt Sackgassen, die Messwerte und den',
    '> vollständigen Quellcode.',
    '',
    'Geschrieben von Daniel Großmann in Köln. Die Inhalte stammen aus dem eigenen',
    'Fahrzeug und der eigenen Werkstatt, nicht aus zweiter Hand. Angaben zu',
    'Messwerten sind als das gekennzeichnet, was sie sind – belegte Messpunkte',
    'oder offene Fragen.',
    '',
    'Der Quellcode steht unter MIT-Lizenz und darf frei verwendet werden. Wer',
    'Inhalte dieser Seite zitiert oder weiterverwendet, wird um Nennung der',
    'Quelle gebeten.',
    '',
    '## Projekte',
    '',
  ];

  for (const projekt of projekte) {
    const pfad = String(projekt.url).replace(/\/$/, '');
    const beschreibung = projekt.meta_beschreibung ?? projekt.kurz;
    zeilen.push(`- [${projekt.titel}](${absolut(pfad)}): ${beschreibung}`);
    if (REPOS[pfad]) {
      zeilen.push(`  Quellcode: ${REPOS[pfad]}`);
    }
  }

  const notizen = Object.values(notizDateien)
    .map((eintrag) => ({ ...eintrag.frontmatter, url: eintrag.url }))
    .sort((a, b) => String(b.stand).localeCompare(String(a.stand)));

  zeilen.push(
    '',
    '## Notizen',
    '',
    'Kurze Beitraege zu je einer einzelnen Erkenntnis.',
    '',
  );

  for (const notiz of notizen) {
    const pfad = String(notiz.url).replace(/\/$/, '');
    const beschreibung = notiz.meta_beschreibung ?? notiz.kurz;
    zeilen.push(`- [${notiz.titel}](${absolut(pfad)}): ${beschreibung}`);
  }

  zeilen.push(
    '',
    '## Quellcode',
    '',
    '- [cologneone/dbus-rotarex-dime](https://github.com/cologneone/dbus-rotarex-dime): Füllstand einer Alugas/Rotarex-Gasflasche mit DIMES-WAVE-Modul (BLE-Name SRG-1-WAVE) über BlueZ/D-Bus auslesen und als virtuellen Tank im Victron Cerbo GX anzeigen. Python, Node-RED-Flow, Installer, MIT-Lizenz.',
    '',
    '## Optional',
    '',
    `- [Alle Projekte](${absolut('/projekte')})`,
    `- [Alle Notizen](${absolut('/notizen')})`,
    `- [Über diese Seite](${absolut('/ueber')})`,
    `- [Impressum](${absolut('/impressum')})`,
    `- [Datenschutz](${absolut('/datenschutz')})`,
    '',
  );

  return new Response(zeilen.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
