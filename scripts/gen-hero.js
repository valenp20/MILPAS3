const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Buscar automáticamente el archivo fuente en la carpeta docs (acepta JPG/PNG/WebP, mayúsculas/minúsculas)
const docsDir = path.join(__dirname, '..', 'docs');
function findInputFile() {
  const files = fs.readdirSync(docsDir);
  const re = /^fondo[-_ ]?1\.(jpe?g|png|webp|tiff?)$/i;
  for (const f of files) {
    if (re.test(f)) return path.join(docsDir, f);
  }
  // Aceptar también FONDO1.* sin guion
  const re2 = /^fondo1\.(jpe?g|png|webp|tiff?)$/i;
  for (const f of files) {
    if (re2.test(f)) return path.join(docsDir, f);
  }
  return null;
}

const inputPath = findInputFile();
const outDir = path.join(__dirname, '..', 'docs', 'images');

const sizes = [480, 768, 1024, 1440, 1920];

async function ensureOut() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
}

async function generate() {
  if (!fs.existsSync(inputPath)) {
    console.error('Error: no se encontró', inputPath);
    console.error('Coloca el archivo original en docs/fondo-1.jpg y vuelve a ejecutar `npm run gen-hero`.');
    process.exit(1);
  }

  await ensureOut();

  for (const w of sizes) {
    const jpgOut = path.join(outDir, `fondo-${w}.jpg`);
    const webpOut = path.join(outDir, `fondo-${w}.webp`);

    console.log(`Generando ${jpgOut} (${w}px)`);
    await sharp(inputPath)
      .resize({ width: w })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpgOut);

    console.log(`Generando ${webpOut} (${w}px)`);
    await sharp(inputPath)
      .resize({ width: w })
      .webp({ quality: 75 })
      .toFile(webpOut);
  }

  // Generar una copia optimizada completa (1920) con _large
  const largeJpg = path.join(outDir, `fondo-1920-large.jpg`);
  await sharp(inputPath).resize({ width: 1920 }).jpeg({ quality: 85, mozjpeg: true }).toFile(largeJpg);

  console.log('Generación completada en', outDir);
}

generate().catch(err => {
  console.error('Error en generación:', err);
  process.exit(1);
});