import { useSyncExternalStore } from "react";

export type CartItem = {
  id: number;
  slug: string;
  nombre: string;
  /** Precio unitario en centavos de DOP, tal como lo entrega la Store API. */
  precio: number;
  imagen?: string;
  cantidad: number;
};

export type CartState = { items: CartItem[] };

const STORAGE_KEY = "human-carrito-v1";
const VACIO: CartState = { items: [] };
const MAX_CANTIDAD = 20;

let estado: CartState = VACIO;
let cargado = false;
const suscriptores = new Set<() => void>();

function cargar() {
  if (cargado || typeof window === "undefined") return;
  cargado = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartState;
      if (Array.isArray(parsed.items)) estado = { items: parsed.items };
    }
  } catch {
    estado = VACIO;
  }
}

function guardar(siguiente: CartState) {
  estado = siguiente;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(siguiente));
  } catch {
    // Sin almacenamiento (modo privado): el carrito vive solo en esta pestaña.
  }
  suscriptores.forEach((fn) => fn());
}

function suscribir(fn: () => void) {
  cargar();
  suscriptores.add(fn);
  const enOtraPestana = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    cargado = false;
    cargar();
    fn();
  };
  window.addEventListener("storage", enOtraPestana);
  return () => {
    suscriptores.delete(fn);
    window.removeEventListener("storage", enOtraPestana);
  };
}

/** Reglas puras del carrito: se prueban sin navegador. */
export function agregarItems(
  state: CartState,
  nuevos: Omit<CartItem, "cantidad">[],
  cantidad = 1,
): CartState {
  const items = [...state.items];
  for (const n of nuevos) {
    const i = items.findIndex((x) => x.id === n.id);
    if (i >= 0) {
      const actual = items[i]!;
      items[i] = {
        ...actual,
        ...n,
        cantidad: Math.min(actual.cantidad + cantidad, MAX_CANTIDAD),
      };
    } else {
      items.push({ ...n, cantidad: Math.min(cantidad, MAX_CANTIDAD) });
    }
  }
  return { items };
}

export function cambiarCantidad(state: CartState, id: number, cantidad: number): CartState {
  if (cantidad <= 0) return { items: state.items.filter((x) => x.id !== id) };
  return {
    items: state.items.map((x) =>
      x.id === id ? { ...x, cantidad: Math.min(cantidad, MAX_CANTIDAD) } : x,
    ),
  };
}

export function totales(state: CartState) {
  return {
    unidades: state.items.reduce((s, x) => s + x.cantidad, 0),
    subtotal: state.items.reduce((s, x) => s + x.cantidad * x.precio, 0),
  };
}

export const cart = {
  agregar(items: Omit<CartItem, "cantidad">[], cantidad = 1) {
    cargar();
    guardar(agregarItems(estado, items, cantidad));
  },
  cambiar(id: number, cantidad: number) {
    cargar();
    guardar(cambiarCantidad(estado, id, cantidad));
  },
  quitar(id: number) {
    cargar();
    guardar(cambiarCantidad(estado, id, 0));
  },
  vaciar() {
    guardar(VACIO);
  },
};

export function useCart() {
  const state = useSyncExternalStore(
    suscribir,
    () => estado,
    () => VACIO,
  );
  return { ...state, ...totales(state) };
}
