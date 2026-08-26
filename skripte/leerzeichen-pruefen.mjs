/**
 * Prueft die gebauten Seiten auf zusammengeklebte Woerter.
 *
 * Version: 1.0.0 (2026-08-26)
 *
 * Hintergrund: Astro entfernt beim Minifizieren einen Zeilenumbruch, wenn er
 * genau an einer Tag-Grenze steht. Aus
 *
 *     seit <strong>1993</strong>
 *     im Rettungsdienst
 *
 * wird dann "1993im Rettungsdienst". Im Quelltext sieht alles richtig aus,
 * in der ausgelieferten Seite klebt es zusammen.
 *
 * Regel fuer den Quelltext: Ein Zeilenumbruch darf nie unmittelbar an einer
 * Tag-Grenze stehen. Das Leerzeichen gehoert auf dieselbe Zeile wie das Tag.
 *
 * Dieses Skript laeuft nach jedem Build und bricht ab, wenn es etwas findet.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const TAGS = 'strong|em|b|i|a|code|abbr';
const NACH = new RegExp(`</(${TAGS})>(?=[A-Za-zÄÖÜäöüß0-9])`, 'g');
const VOR = new RegExp(`[A-Za-zÄÖÜäöüß0-9](?=<(${TAGS})[ >])`, 'g');

function htmlDateien(ordner) {
  return readdirSync(ordner).flatMap((eintrag) => {
    const pfad = join(ordner, eintrag);
    if (statSync(pfad).isDirectory()) return htmlDateien(pfad);
    return pfad.endsWith('.html') ? [pfad] : [];
  });
}

let funde = 0;

for (const datei of htmlDateien('dist')) {
  const inhalt = readFileSync(datei, 'utf8');
  for (const regel of [NACH, VOR]) {
    regel.lastIndex = 0;
    let treffer;
    while ((treffer = regel.exec(inhalt)) !== null) {
      const von = Math.max(0, treffer.index - 40);
      const stelle = inhalt.slice(von, treffer.index + 40).replace(/\s+/g, ' ');
      console.error(`  ${datei}\n    …${stelle}…`);
      funde++;
    }
  }
}

if (funde > 0) {
  console.error(`\nFEHLER: ${funde} zusammengeklebte Stelle(n) gefunden.`);
  console.error('Das Leerzeichen gehoert auf dieselbe Zeile wie das Tag.\n');
  process.exit(1);
}

console.log('Leerzeichen-Pruefung: sauber');
