// Todo el contenido del sitio vive aquí: para actualizar textos,
// proyectos o enlaces no hace falta tocar los componentes.

const base = import.meta.env.BASE_URL;

export const profile = {
  name: "Yerlis Dimas",
  role: "QA Engineer",
  focus: "Pruebas manuales · Automatización · API",
  email: "yerlisdimasqa@gmail.com",
  linkedin: "https://www.linkedin.com/in/yerlis-dimas-puello/",
  github: "https://github.com/Yerlis24",
  photo: `${base}img/yerlis.png`,
  // Cuando haya un CV en PDF, colócalo en /public y pon aquí su ruta,
  // p. ej. `${base}cv-yerlis-dimas.pdf`. Mientras sea null no se muestra el botón.
  cv: null,
};

export const hero = {
  title: "Encuentro los errores antes que tus usuarios.",
  highlight: "errores",
  intro:
    "Soy QA Engineer con experiencia en pruebas manuales y automatizadas para aplicaciones web, móviles y APIs. Diseño casos de prueba, documento defectos con claridad y ayudo a que cada entrega salga con confianza.",
  facts: [
    { value: "9", label: "proyectos prácticos de QA" },
    { value: "Web · Móvil · API", label: "plataformas validadas" },
    { value: "Python + Selenium", label: "automatización E2E" },
  ],
};

export const about = {
  paragraphs: [
    "Me formé como QA Engineer en el programa intensivo de TripleTen, donde completé 9 proyectos prácticos aplicando pruebas funcionales, de regresión, automatizadas y de API sobre escenarios reales.",
    "He trabajado con Selenium, Postman, SQL, Jira y Android Studio para validar aplicaciones web, móviles y servicios REST. Eso me ha permitido detectar defectos críticos de forma temprana y reducir los tiempos de validación.",
    "Hoy me desempeño como Auxiliar Administrativa y Logística, un rol en el que aplico control de calidad en entregas, gestión de tiempos y cumplimiento de procesos: la misma disciplina que llevo al testing.",
  ],
  strengths: [
    {
      title: "Capacidad analítica",
      text: "Descompongo un flujo en escenarios, bordes y casos negativos antes de ejecutar.",
    },
    {
      title: "Orientación al detalle",
      text: "Reportes de bugs reproducibles: pasos, resultado esperado, evidencia y severidad.",
    },
    {
      title: "Mejora continua",
      text: "Sigo reforzando automatización y análisis de datos de calidad.",
    },
  ],
  motto: "La calidad no es un acto, es un hábito.",
};

export const skills = [
  {
    title: "Tipos de prueba",
    items: [
      "Funcionales",
      "Regresión",
      "Smoke",
      "Interfaz (UI)",
      "API REST",
      "Móviles (Android)",
      "Casos negativos",
    ],
  },
  {
    title: "Automatización y código",
    items: ["Python", "Selenium WebDriver", "Postman", "Newman", "SQL / MySQL", "JSON", "Git"],
  },
  {
    title: "Gestión y documentación",
    items: ["Jira", "Casos de prueba", "Reporte de defectos", "Swagger / docs de API", "Metodologías ágiles"],
  },
  {
    title: "Entorno de trabajo",
    items: ["Chrome DevTools", "Android Studio", "PyCharm", "VS Code", "GitHub", "Figma", "Slack"],
  },
];

export const process = [
  {
    title: "Analizar requisitos",
    text: "Entiendo el flujo, las reglas de negocio y los criterios de aceptación antes de probar nada.",
    tag: "análisis",
  },
  {
    title: "Diseñar casos de prueba",
    text: "Escenarios positivos, negativos y de borde, priorizados por riesgo e impacto.",
    tag: "diseño",
  },
  {
    title: "Ejecutar pruebas",
    text: "Funcionales, de API y de interfaz; manuales o automatizadas con Python + Selenium.",
    tag: "ejecución",
  },
  {
    title: "Reportar defectos",
    text: "Bugs reproducibles en Jira: pasos, resultado esperado vs. actual, evidencia y severidad.",
    tag: "reporte",
  },
  {
    title: "Verificar la corrección",
    text: "Confirmo que el fix resuelve el problema en el mismo entorno donde se detectó.",
    tag: "verificación",
  },
  {
    title: "Regresión",
    text: "Vuelvo a correr la suite para asegurar que el cambio no rompió nada más.",
    tag: "regresión",
  },
];

// Ejemplo del formato con el que documento un defecto (no es un bug real
// de un cliente). Reemplázalo por uno propio cuando quieras.
export const bugExample = {
  id: "BUG-042",
  title: "El botón «Pedir taxi» se habilita sin método de pago",
  project: "Urban Routes",
  severity: "Alta",
  priority: "P2",
  env: "Chrome · Windows 11 · entorno de pruebas",
  steps: [
    "Abrir Urban Routes e ingresar origen y destino válidos.",
    "Seleccionar la tarifa «Comfort».",
    "No agregar ningún método de pago.",
    "Observar el estado del botón «Pedir taxi».",
  ],
  expected: "El botón permanece deshabilitado y se muestra «Agrega un método de pago».",
  actual: "El botón queda habilitado y la solicitud se envía sin método de pago.",
  evidence: ["video-reproduccion.mp4", "captura-consola.png", "request-payload.json"],
};

export const projects = [
  {
    id: "urban-routes",
    title: "Urban Routes",
    kind: "Aplicación web de transporte",
    summary:
      "Aseguramiento de calidad de una app tipo Uber: búsqueda de rutas, interacción con el mapa y flujo completo de solicitud de taxi.",
    work: [
      "Pruebas funcionales, de regresión y de interfaz sobre los flujos de usuario.",
      "Automatización E2E del flujo de solicitud de taxi con Python y Selenium.",
      "Documentación de casos de prueba, registro de bugs y reporte de resultados.",
    ],
    stack: ["Python", "Selenium", "Postman", "SQL"],
    image: `${base}img/urban-routes.jpg`,
    video: `${base}videos/urban-routes.mp4`,
  },
  {
    id: "urban-grocers",
    title: "Urban Grocers",
    kind: "Pruebas de API REST",
    summary:
      "Colección de Postman para la API de una plataforma de entrega de productos por catálogo y kits preparados.",
    work: [
      "Suites de smoke y regresión sobre endpoints CRUD de kits, productos y usuarios.",
      "Validación de códigos 2xx/4xx/5xx, esquemas JSON, autenticación y casos negativos.",
      "Variables de entorno y evidencias documentadas en la plantilla del proyecto.",
    ],
    stack: ["Postman", "API REST", "JSON"],
    image: `${base}img/urban-grocers.jpg`,
    video: `${base}videos/urban-grocers.mp4`,
  },
];

export const moreProjects = [
  {
    title: "Suite de pruebas de API",
    text: "Postman + Newman con reportes HTML para endpoints críticos: autenticación y validación de respuestas.",
    stack: ["Postman", "Newman"],
  },
  {
    title: "Pruebas móviles Android",
    text: "Casos de prueba funcionales y de regresión ejecutados sobre una app Android.",
    stack: ["Android Studio", "QA móvil"],
  },
];

export const timeline = [
  {
    when: "Actualidad",
    title: "Auxiliar Administrativa y Logística",
    text: "Control de calidad en entregas, gestión de tiempos y cumplimiento de procesos.",
  },
  {
    when: "Formación",
    title: "QA Engineer · TripleTen",
    text: "Programa intensivo con 9 proyectos prácticos: pruebas funcionales, de regresión, automatizadas y de API.",
  },
];

export const seeking = "QA Engineer, Tester Junior o Analista QA (manual y automatizado)";
