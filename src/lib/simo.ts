/**
 * Presencia pública de Juan Carlos Simó, verificada el 2026-10-10 (enlaces probados uno por uno).
 * Solo hechos con fuente: nada de cifras de resultados ni de clientes famosos sin respaldo del cliente.
 */

export const FOTO_SIMO = {
  src: "/img/juan-carlos-simo.jpg",
  width: 1069,
  height: 1603,
  alt: "Juan Carlos Simó, de pie, con polo negro de Human Performance",
  /** Retrato publicado por el cliente en humanstores.com (biblioteca de medios, sept. 2023). */
  fuente: "https://humanstores.com/wp-content/uploads/2023/09/jcsimo-foto-comprimida-.jpeg",
};

export type Video = { id: string; titulo: string; duracion: string; nota?: string };

/** Video de la portada: explica el método, eje de todo el sitio. */
export const VIDEO_PORTADA: Video = {
  id: "0uwPByji5js",
  titulo: "El estilo de vida The Simó Diet: fase 1 y fase 2",
  duracion: "43 min",
  nota: "Vida Sana con Juan Carlos Simó · Ep. 28",
};

export const PODCAST = {
  nombre: "Vida Sana con Juan Carlos Simó",
  canal: "https://www.youtube.com/@jcsimo",
  episodios: 250,
  destacados: [
    { id: "5EC2M0H7P54", titulo: "Detalles de The Simó Diet", duracion: "40 min", nota: "Ep. 17" },
    VIDEO_PORTADA,
    {
      id: "EOsmuYgzAEA",
      titulo: "La industria de los suplementos no quiere que sepas esto",
      duracion: "42 min",
      nota: "Ep. 250",
    },
  ] satisfies Video[],
};

export type Aparicion = {
  medio: string;
  titulo: string;
  url: string;
  tipo: "Podcast" | "Prensa" | "Video";
  idioma?: "Inglés";
  anio?: number;
};

export const APARICIONES: Aparicion[] = [
  {
    medio: "Clean Health · Industry Leaders Podcast",
    titulo: "Episodio 5 con Juan Carlos Simo, conducido por Daine McDonald",
    url: "https://cleanhealth.edu.au/industry-leaders-podcast/industry-leaders-podcast-ep-05-with-juancarlos-simo/",
    tipo: "Podcast",
    idioma: "Inglés",
  },
  {
    medio: "Therapie & Training Talk Podcast",
    titulo: "Functional Bodybuilding & Functional Medicine with Juan Carlos Simo (TWUP #45)",
    url: "https://www.podcast.de/episode/624197568/functional-bodybuilding-functional-medicine-with-juan-carlos-simo-twup-45",
    tipo: "Podcast",
    idioma: "Inglés",
    anio: 2020,
  },
  {
    medio: "Emprende Ahora",
    titulo: "“Pasión”: entrevista completa a Juan Carlos Simó, fundador de Human Performance",
    url: "https://www.youtube.com/watch?v=ohqXXsxh7WU",
    tipo: "Video",
  },
  {
    medio: "El Nuevo Diario",
    titulo: "Juan Carlos Simó considera un error comer con frecuencia para aumentar metabolismo",
    url: "https://elnuevodiario.com.do/juan-carlos-simo-considera-un-error-comer-con-frecuencia-para-aumentar-metabolismo/",
    tipo: "Prensa",
  },
];

export const REDES = [
  { red: "Instagram", usuario: "@jc_simo", url: "https://www.instagram.com/jc_simo/" },
  { red: "YouTube", usuario: "@jcsimo", url: "https://www.youtube.com/@jcsimo" },
  {
    red: "Facebook",
    usuario: "Human Performance Center",
    url: "https://www.facebook.com/humanperformancenter",
  },
] as const;
