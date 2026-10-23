# Portafolio · Yerlis Dimas

Sitio personal de Yerlis Dimas, QA Engineer (pruebas manuales, automatizadas y de API).

Hecho con React 19 y Vite, sin librerías de UI ni de iconos: una sola página con secciones
de inicio, sobre mí, habilidades, proyectos (con demos en video), trayectoria y contacto.
Incluye tema claro/oscuro y es responsive.

## Desarrollo

```bash
npm ci --ignore-scripts
npm run dev
```

`npm run build` genera el sitio estático en `dist/`, listo para servirse desde cualquier
hosting de archivos estáticos (las rutas son relativas).

## Editar el contenido

Todos los textos, proyectos y enlaces están en [`src/data.js`](src/data.js).

- **Foto:** `public/img/yerlis.png`.
- **Proyectos:** cada uno tiene una imagen en `public/img/` y un video en `public/videos/`.
- **CV:** coloca el PDF en `public/` y pon su ruta en `profile.cv`; el botón
  "Descargar CV" aparece solo cuando ese campo tiene valor.

## Dependencias

Las versiones están fijadas (sin `^` ni `~`). Antes de actualizar, revisa el paquete en
[Socket.dev](https://socket.dev) o con `npm audit`, e instala con `--ignore-scripts`.
