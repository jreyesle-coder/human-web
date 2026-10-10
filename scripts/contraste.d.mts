export const PARES: [string, string, number][];
export function leerColores(css: string): Record<string, string>;
export function contraste(a: string, b: string): number;
export function verificar(css: string): {
  texto: string;
  fondo: string;
  minimo: number;
  ratio: number;
  ok: boolean;
  falta?: true;
}[];
