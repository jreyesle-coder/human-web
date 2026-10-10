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

export const baseFrontmatter = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  updated: z.coerce.date(),
  status: z.enum(STATUSES),
});

// En historias, autorizacion es opcional a propósito: si falta, la historia se omite en lugar de romper el build.
const historiaFrontmatter = baseFrontmatter.extend({
  autorizacion: z.boolean().optional(),
});

export const schemas = {
  metodo: baseFrontmatter,
  protocolos: baseFrontmatter,
  motivos: baseFrontmatter,
  evaluaciones: baseFrontmatter,
  coaches: baseFrontmatter,
  historias: historiaFrontmatter,
  contenido: baseFrontmatter,
} satisfies Record<Collection, z.ZodType>;

export type Frontmatter<C extends Collection> = z.infer<(typeof schemas)[C]>;
