import { z } from "zod";

export const COLLECTIONS = [
  "metodo",
  "protocolos",
  "motivos",
  "evaluaciones",
  "coaches",
  "historias",
  "contenido",
] as const;

export type Collection = (typeof COLLECTIONS)[number];

export const STATUSES = ["draft", "review", "published"] as const;
export type Status = (typeof STATUSES)[number];

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug en minúsculas con guiones");

export const baseFrontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1).max(200),
  updated: z.coerce.date(),
  status: z.enum(STATUSES),
});

const pregunta = z.object({ pregunta: z.string().min(1), respuesta: z.string().min(1) });

export const schemas = {
  metodo: baseFrontmatter.extend({
    paso: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  }),
  protocolos: baseFrontmatter.extend({
    /** Para quién es, en una frase. */
    objetivo: z.string().min(1),
    /** Etiqueta de WooCommerce que agrupa los productos del protocolo. */
    wooTag: slug,
    /** Motivo de consulta relacionado en /sanar. */
    motivo: slug.optional(),
    orden: z.number().int().default(99),
    preguntas: z.array(pregunta).default([]),
  }),
  motivos: baseFrontmatter.extend({
    /** Nombre corto para el selector de /sanar. */
    nombre: z.string().min(1),
    evaluacion: slug.optional(),
    protocolo: slug.optional(),
    orden: z.number().int().default(99),
    preguntas: z.array(pregunta).default([]),
  }),
  evaluaciones: baseFrontmatter.extend({
    nombre: z.string().min(1),
    orden: z.number().int().default(99),
  }),
  coaches: baseFrontmatter.extend({
    nombre: z.string().min(1),
    especialidad: z.string().min(1),
  }),
  // autorizacion es opcional a propósito: si falta, la historia se omite en lugar de romper el build.
  historias: baseFrontmatter.extend({
    nombre: z.string().min(1),
    objetivo: z.string().min(1),
    autorizacion: z.boolean().optional(),
  }),
  contenido: baseFrontmatter.extend({
    protocolo: slug.optional(),
    /** ID de video de YouTube del canal oficial. */
    video: z.string().optional(),
  }),
} satisfies Record<Collection, z.ZodType>;

export type Frontmatter<C extends Collection> = z.infer<(typeof schemas)[C]>;
