# 📋 Sistema de Gestión de Productos - MILPAS3

## 🎯 ¿Qué es esto?

Este es un formulario HTML interactivo diseñado para agilizar el proceso de agregar nuevos productos al archivo `docs/products.json`. El formulario genera automáticamente el código JSON con el formato correcto, listo para ser copiado y pegado.

## 🚀 Cómo Acceder al Formulario

Tienes tres opciones para usar el formulario:

### Opción 1: GitHub Pages (Recomendado)
Si el repositorio tiene GitHub Pages habilitado:
```
https://valenp20.github.io/MILPAS3/admin/agregar-producto.html
```

### Opción 2: HTML Preview
Usa el servicio htmlpreview.github.io para ver el archivo directamente:
```
https://htmlpreview.github.io/?https://github.com/valenp20/MILPAS3/blob/main/admin/agregar-producto.html
```

### Opción 3: Localmente
1. Clona el repositorio
2. Abre el archivo `admin/agregar-producto.html` en tu navegador web favorito
3. No requiere servidor web, funciona directamente desde el sistema de archivos

## 📖 Instrucciones de Uso

### Paso 1: Abrir el Formulario
Accede al formulario usando cualquiera de las opciones mencionadas arriba.

### Paso 2: Completar los Campos

El formulario incluye los siguientes campos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **ID del Producto** | Se genera automáticamente (inicio en 17) | `17` |
| **Nombre del Producto** | Nombre completo del producto | `Leche Unidos Azucarada` |
| **Ruta de la Imagen** | Ruta relativa desde `docs/` | `productos/leche.png` |
| **Categoría** | Seleccionar del menú desplegable | `Lácteos` |
| **Descripción** | Descripción detallada del producto | `Leche fresca azucarada...` |
| **Precio** | Precio con formato automático | `$3.500` |

**Nota sobre el precio:** El formato se aplica automáticamente mientras escribes. Solo ingresa números y el sistema añadirá el símbolo `$` y el separador de miles.

### Paso 3: Generar el JSON
1. Haz clic en el botón **"Generar JSON"**
2. El sistema validará que todos los campos estén completos
3. Se mostrará una vista previa del JSON generado
4. El ID se auto-incrementará para el siguiente producto

### Paso 4: Copiar al Portapapeles
1. Haz clic en el botón **"Copiar al Portapapeles"**
2. Verás una confirmación cuando el JSON se haya copiado correctamente

### Paso 5: Pegar en products.json
1. Abre el archivo `docs/products.json`
2. Busca el **corchete de cierre** `]` al final del archivo
3. Posiciona el cursor **ANTES** del corchete de cierre
4. Pega el JSON copiado (Ctrl+V / Cmd+V)
5. Guarda el archivo

**Ejemplo de cómo debe quedar:**

```json
[
  {
    "id": 16,
    "name": "Leche UHT Entera Unidos x1100ml",
    "image": "productos/lecheenterax1100ml.png",
    "category": "Lácteos",
    "description": "Toda la pureza...",
    "price": "$4.150"
  }
  ,{                           ← JSON pegado aquí
    "id": 17,
    "name": "Nuevo Producto",
    "image": "productos/nuevo.png",
    "category": "Lácteos",
    "description": "Descripción...",
    "price": "$5.000"
  }
]                              ← Corchete de cierre
```

### Paso 6: Validar el JSON
Después de pegar, es importante validar que el archivo JSON no tenga errores:

**Usando Node.js:**
```bash
node -e "JSON.parse(require('fs').readFileSync('docs/products.json', 'utf8'))"
```

**Usando Python:**
```bash
python3 -c "import json; json.load(open('docs/products.json'))"
```

**Usando herramientas online:**
- [JSONLint](https://jsonlint.com/)
- [JSON Formatter](https://jsonformatter.org/)

## 🎨 Características del Formulario

### ✨ Funcionalidades Principales
- ✅ **Validación de campos**: Todos los campos requeridos deben ser completados
- 🔢 **ID Auto-incremental**: El ID se incrementa automáticamente después de cada generación
- 💰 **Formato de precio automático**: El precio se formatea mientras escribes
- 📋 **Copia al portapapeles**: Un clic para copiar el JSON generado
- 👁️ **Vista previa**: Visualiza el JSON antes de copiarlo
- 🧹 **Limpiar formulario**: Resetea todos los campos para agregar otro producto
- 📱 **Responsive**: Funciona perfectamente en móviles, tablets y escritorio
- 🎨 **Diseño moderno**: Interfaz con gradientes y efectos visuales atractivos

### 🎯 Formato del JSON

El JSON generado incluye:
- **Coma inicial** (`,{`) para facilitar el pegado en `products.json`
- **Indentación correcta** de 2 espacios
- **Formato exacto** del archivo products.json existente

## 📝 Categorías Disponibles

El formulario incluye las siguientes categorías en el menú desplegable:

1. Lácteos
2. Aceites y Untables
3. Bebidas
4. Frutos Secos
5. Aseo Personal
6. Panadería
7. Limpieza
8. Hogar
9. Dulces y Postres
10. Condimentos
11. Enlatados
12. Granos y Cereales

## ⚠️ Notas Importantes

### Sobre el ID
- El ID comienza en **17** (siguiente al último producto existente)
- Se auto-incrementa después de cada generación
- Si necesitas cambiar el ID inicial, edita el campo manualmente

### Sobre las Imágenes
- Las rutas de imagen deben ser **relativas a `docs/`**
- Formato típico: `productos/nombre_imagen.png`
- Asegúrate de que la imagen exista antes de agregar el producto

### Sobre el Formato del Precio
- El sistema acepta solo números
- Agrega automáticamente el símbolo `$` y el separador de miles
- Formato final: `$X.XXX` (ej: `$3.500`)

### Sobre la Sintaxis JSON
- **Importante**: El JSON generado incluye una coma `,` al inicio
- Esta coma es necesaria para separar el nuevo producto del anterior
- NO elimines esta coma al pegar en products.json

## 🔧 Solución de Problemas

### El botón "Copiar al Portapapeles" no funciona
- Asegúrate de estar usando un navegador moderno (Chrome, Firefox, Edge, Safari)
- Verifica que estés accediendo al formulario mediante HTTPS o localhost
- Si el problema persiste, copia manualmente el JSON de la vista previa

### El JSON pegado tiene errores de sintaxis
- Verifica que pegaste el JSON **antes** del corchete de cierre `]`
- Asegúrate de que el producto anterior tiene una coma al final si es necesario
- Valida el archivo JSON usando las herramientas mencionadas arriba

### El formato del precio no se aplica
- Escribe solo números en el campo de precio
- El formato se aplica automáticamente mientras escribes
- Si copias y pegas un precio, el formato se aplicará al hacer clic fuera del campo

## 💡 Consejos y Mejores Prácticas

1. **Antes de agregar un producto**:
   - Verifica que la imagen del producto esté disponible
   - Ten la información completa del producto lista
   - Conoce la categoría correcta del producto

2. **Después de pegar en products.json**:
   - Siempre valida la sintaxis JSON
   - Verifica visualmente que el formato sea correcto
   - Realiza un commit descriptivo de los cambios

3. **Para agregar múltiples productos**:
   - Usa el botón "Limpiar Formulario" entre productos
   - El ID se incrementará automáticamente
   - Genera y copia cada producto por separado

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias de mejora:
1. Abre un issue en el repositorio de GitHub
2. Incluye capturas de pantalla si es posible
3. Describe el problema en detalle

---

**Última actualización**: 2026-02-06  
**Versión**: 1.0.0  
**Mantenedor**: MILPAS3 Team
