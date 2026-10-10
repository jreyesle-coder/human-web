"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Tabs } from "@/components/ui/Disclosure";
import { useToast } from "@/components/ui/Toast";

export function DialogDemo() {
  const [centro, setCentro] = useState(false);
  const [panel, setPanel] = useState(false);
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => setCentro(true)}>
        Abrir diálogo
      </Button>
      <Button variant="secondary" onClick={() => setPanel(true)}>
        Abrir panel lateral
      </Button>
      <Dialog open={centro} onClose={() => setCentro(false)} title="Confirmar">
        <p>El foco queda atrapado aquí. Escape o el botón Cerrar lo devuelven.</p>
        <div className="mt-6 flex gap-3">
          <Button onClick={() => setCentro(false)}>Aceptar</Button>
          <Button variant="ghost" onClick={() => setCentro(false)}>
            Cancelar
          </Button>
        </div>
      </Dialog>
      <Dialog open={panel} onClose={() => setPanel(false)} title="Panel" placement="side">
        <p>Variante lateral, usada por el carrito y el menú móvil.</p>
      </Dialog>
    </div>
  );
}

export function ToastDemo() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="secondary" onClick={() => toast("Aviso neutro")}>
        Aviso neutro
      </Button>
      <Button variant="secondary" onClick={() => toast("Agregado al carrito", "success")}>
        Aviso de éxito
      </Button>
      <Button variant="secondary" onClick={() => toast("No se pudo enviar", "error")}>
        Aviso de error
      </Button>
    </div>
  );
}

export function LoadingDemo() {
  const [cargando, setCargando] = useState(false);
  return (
    <Button
      loading={cargando}
      onClick={() => {
        setCargando(true);
        setTimeout(() => setCargando(false), 2000);
      }}
    >
      {cargando ? "Enviando" : "Probar carga"}
    </Button>
  );
}

export function TabsDemo() {
  return (
    <Tabs
      label="Ejemplo de pestañas"
      tabs={[
        {
          id: "uno",
          label: "Para qué sirve",
          content: <p>Contenido de la primera pestaña.</p>,
        },
        {
          id: "dos",
          label: "Cómo se toma",
          content: <p>Contenido de la segunda pestaña.</p>,
        },
        {
          id: "tres",
          label: "Qué contiene",
          content: <p>Contenido de la tercera pestaña.</p>,
        },
      ]}
    />
  );
}
