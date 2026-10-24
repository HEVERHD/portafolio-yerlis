# Portafolio · Yerlis Dimas

Sitio personal de Yerlis Dimas, QA Engineer (pruebas manuales, automatizadas y de API).

Hecho con React 19 y Vite, sin librerías de UI ni de iconos. Es una sola página bilingüe
(ES/EN), con tema claro/oscuro, y responsive. Incluye:

- Demo animada de su suite real de pruebas de API ([api_stand_tests](https://github.com/Yerlis24/api_stand_tests)).
- Proceso de QA ligado al scroll con un ticket de bug de ejemplo.
- Casos de estudio, demos en video con vista previa al pasar el mouse.
- Minijuego "Encuentra los 5 bugs" y consola `qa-cli` (Ctrl/⌘ + K).
- Una sección que muestra el resultado real de las pruebas del propio sitio.

## Desarrollo

```bash
npm ci --ignore-scripts
npm run dev
```

`npm run build` genera el sitio estático en `dist/`, listo para servirse desde cualquier
hosting de archivos estáticos (las rutas son relativas).

## Pruebas

El sitio tiene pruebas end-to-end con Playwright y auditoría de accesibilidad WCAG A/AA
con axe, en escritorio y móvil. También corren en GitHub Actions (`.github/workflows/qa.yml`)
en cada push a `main` y en cada pull request.

```bash
npx playwright install chromium   # solo la primera vez
npm test                          # ejecuta la suite
npm run test:report               # ejecuta la suite y actualiza src/qa-report.json
```

`src/qa-report.json` alimenta la sección "Calidad" del sitio: vuelve a generarlo con
`npm run test:report` después de cambiar algo, para que los números sigan siendo reales.

## Editar el contenido

Todos los textos, en español e inglés, están en [`src/content.js`](src/content.js).

- **Foto:** `public/img/yerlis.png`.
- **Proyectos:** imagen en `public/img/`, video y vista previa en `public/videos/` (H.264).
- **CV:** coloca el PDF en `public/` y pon su ruta en `profile.cv`; el botón
  "Descargar CV" aparece solo cuando ese campo tiene valor.
- **Certificaciones:** agrégalas en `certifications` (ES y EN); el bloque aparece solo
  cuando la lista tiene elementos.
- **Imagen para redes:** `npm run og` regenera `public/og.png`. Cuando el sitio tenga
  dominio, pon la URL absoluta de la imagen en las etiquetas `og:image` de `index.html`.

## Dependencias

Las versiones están fijadas (sin `^` ni `~`) y las acciones de GitHub, por SHA de commit.
Antes de actualizar, revisa el paquete en [Socket.dev](https://socket.dev) o con
`npm audit`, e instala con `--ignore-scripts`.
