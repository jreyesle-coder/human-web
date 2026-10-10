/** Une clases condicionales sin dependencias. */
export function cn(...clases: unknown[]): string {
  return clases.filter((c) => typeof c === "string" && c).join(" ");
}
