/** Tipos propios del catálogo (S6-01). No se exponen los del API en crudo al resto del sitio. */

export type Imagen = { src: string; alt: string; width?: number; height?: number };
export type Termino = { id: number; slug: string; nombre: string };

export type Producto = {
  id: number;
  slug: string;
  nombre: string;
  tipo: "simple" | "grouped" | "variable" | "external";
  sku: string;
  /** Precio en centavos de DOP. */
  precio: number;
  precioRegular: number;
  enOferta: boolean;
  comprable: boolean;
  /** Solo para listados; la existencia que se muestra en la ficha se consulta en cada petición. */
  enExistencia: boolean;
  imagenes: Imagen[];
  categorias: Termino[];
  etiquetas: Termino[];
  marcas: Termino[];
  /** Texto de la tienda actual, sin HTML. */
  resumen: string;
  descripcion: string;
  /** Para productos agrupados: los IDs que contiene. */
  agrupados: number[];
  resenas: { promedio: number; cantidad: number };
  urlTiendaActual: string;
};

export type Categoria = {
  id: number;
  slug: string;
  nombre: string;
  cantidad: number;
  padre: number;
};

export type Resultado<T> = { ok: true; datos: T } | { ok: false; error: string };
