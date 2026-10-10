/**
 * Datos de marca verificados en docs/00-marca-y-filosofia.md. Nada aquí afirma resultados de salud.
 * Lo que no está verificado no va aquí: va como <Pendiente>.
 */

export type Unidad = {
  clave: "entrenar" | "sanar" | "sostener";
  ruta: string;
  verbo: string;
  nombre: string;
  resumen: string;
  accion: { label: string; href: string };
};

export const UNIDADES: readonly Unidad[] = [
  {
    clave: "entrenar",
    ruta: "/entrenar",
    verbo: "Entrenar",
    nombre: "Human Balance",
    resumen:
      "Entrenamiento personalizado que empieza con una evaluación física, corrige la técnica y se ajusta a tu objetivo.",
    accion: {
      label: "Agendar clase de prueba",
      href: "/entrenar/clase-de-prueba",
    },
  },
  {
    clave: "sanar",
    ruta: "/sanar",
    verbo: "Sanar",
    nombre: "Centro de Dietética Funcional",
    resumen:
      "Consulta de salud funcional y dietética, con evaluaciones instrumentales como OligoScan. La puerta de entrada a tu protocolo personal.",
    accion: { label: "Agendar evaluación", href: "/sanar/agendar" },
  },
  {
    clave: "sostener",
    ruta: "/tienda",
    verbo: "Sostener",
    nombre: "Human Stores",
    resumen:
      "Suplementación organizada por protocolo, no por producto suelto, con la línea propia OMNI.",
    accion: { label: "Ver protocolos", href: "/tienda/protocolos" },
  },
];

export type PasoMetodo = {
  slug: "eliminar" | "reparar" | "liberar";
  numero: 1 | 2 | 3;
  nombre: string;
  resumen: string;
};

/** Los tres pasos de la filosofía The Simó Diet, tal como los describe el libro (2022). */
export const PASOS_METODO: readonly PasoMetodo[] = [
  {
    slug: "eliminar",
    numero: 1,
    nombre: "Eliminar",
    resumen: "Retirar los patrones alimenticios que inflaman el organismo.",
  },
  {
    slug: "reparar",
    numero: 2,
    nombre: "Reparar",
    resumen: "Restablecer el metabolismo y la función.",
  },
  {
    slug: "liberar",
    numero: 3,
    nombre: "Liberar",
    resumen: "Soltar las creencias erradas sobre la alimentación.",
  },
];

export const LIBRO = {
  titulo: "Filosofía The Simó Diet, Alimentación que Sana",
  anio: 2022,
  /** Producto real en el catálogo de WooCommerce (ID 10746). */
  slugProducto: "libro-the-simo-diet",
};

/** Citas documentadas del autor (docs/00-marca-y-filosofia.md, sección "Voz de marca"). */
export const CITAS = [
  "Si no aprendemos a sanar a través de los alimentos, estos serán la razón de nuestras enfermedades.",
  "Cada comida, cada ingesta tiene un impacto determinante en cómo nos sentimos, cómo procesamos nuestros pensamientos y cómo podemos ejecutar o desempeñarnos en el ámbito físico.",
  "La acción es la única forma de saber a ciencia cierta el compromiso de una persona frente a su sistema de creencias.",
] as const;

export const UBICACION = {
  calle: "Av. Abraham Lincoln",
  ciudad: "Santo Domingo",
  pais: "República Dominicana",
  codigoPais: "DO",
};

export const ALCANCE_VENTAS = "Ventas y envíos solo dentro de República Dominicana.";
