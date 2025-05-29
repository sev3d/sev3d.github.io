const fs = require('fs');

const input = fs.readFileSync('album id.txt', 'utf-8');

// Sépare chaque bloc d'album
const blocks = input.split(/Titre : /).filter(b => b.trim());

// Prépare la sortie
const results = [];

blocks.forEach(block => {
  const titleMatch = block.match(/^([^\n]+)/);
  const photoMatch = block.match(/Photos\s*:\s*(\d+)/);
  const idMatch = block.match(/ID\s*:\s*([^\n]+)/);

  if (titleMatch && photoMatch && idMatch) {
    const title = titleMatch[1].trim();
    const photos = parseInt(photoMatch[1], 10);
    const id = idMatch[1].trim();

    if (photos > 30) {
      results.push(`'${id}', // ${title}`);
    }
  }
});

// Affiche la liste finale
console.log(results.join('\n'));