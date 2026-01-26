const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la raíz del proyecto (MILPAS3)
const staticRoot = path.join(__dirname, '../..');

app.use(cors());
app.use(express.json());
app.use(express.static(staticRoot));

// Archivo de productos dentro de backend/data
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const BANNER_FILE = path.join(__dirname, '..', 'banner.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    if (!raw || !raw.trim()) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error leyendo productos:', err);
    return [];
  }
}

function writeProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error escribiendo productos:', err);
    return false;
  }
}

app.get('/api/products', (req, res) => {
  const products = readProducts();
  const safe = products.map(({ id, name, image, category }) => ({ id, name, image, category }));
  res.json(safe);
});

app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  const { id, name, image, category } = product;
  res.json({ id, name, image, category });
});

// Agregar un nuevo producto (se guarda en backend/data/products.json)
app.post('/api/products', (req, res) => {
  const products = readProducts();
  const { name, image, category } = req.body || {};

  if (!name) {
    return res.status(400).json({ error: 'El campo "name" es obligatorio' });
  }

  const nextId = products.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;
  const newProduct = {
    id: nextId,
    name: String(name),
    image: image || '',
    category: category || ''
  };

  products.push(newProduct);
  const ok = writeProducts(products);
  if (!ok) return res.status(500).json({ error: 'No se pudo guardar el producto' });

  res.status(201).json(newProduct);
});

// Actualizar un producto existente (PUT parcial)
app.put('/api/products/:id', (req, res) => {
  const products = readProducts();
  const id = String(req.params.id);
  const idx = products.findIndex(p => String(p.id) === id);
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const body = req.body || {};
  // Campos permitidos para actualizar (sin price)
  const fields = ['name', 'image', 'category'];
  fields.forEach(f => {
    if (body[f] !== undefined) {
      products[idx][f] = body[f];
    }
  });

  const ok = writeProducts(products);
  if (!ok) return res.status(500).json({ error: 'No se pudo guardar el producto' });

  const { id: pid, name, image, category } = products[idx];
  res.json({ id: pid, name, image, category });
});

// Eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const products = readProducts();
  const id = String(req.params.id);
  const idx = products.findIndex(p => String(p.id) === id);
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const deleted = products.splice(idx, 1);
  const ok = writeProducts(products);
  if (!ok) return res.status(500).json({ error: 'No se pudo eliminar el producto' });

  res.json({ message: 'Producto eliminado', deleted: deleted[0] });
});

// Servir el panel admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin.html'));
});

// Ruta corta para que `/pagina.html` sirva `pagina/pagina.html`
app.get('/pagina.html', (req, res) => {
  res.sendFile(path.join(staticRoot, 'pagina', 'pagina.html'));
});

// Endpoint para actualizar banner.json (archivo en la raíz del proyecto)
app.put('/api/banner', (req, res) => {
  const body = req.body;
  if (!body || !Array.isArray(body)) {
    return res.status(400).json({ error: 'Se espera un array con entradas de banner' });
  }
  try {
    fs.writeFileSync(BANNER_FILE, JSON.stringify(body, null, 2), 'utf8');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error escribiendo banner.json:', err);
    return res.status(500).json({ error: 'No se pudo guardar banner.json' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor (backend) escuchando en http://localhost:${PORT}`);
});
