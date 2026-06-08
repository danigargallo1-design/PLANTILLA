import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jevas Asesores | Automatización de Clientes en Zaragoza",
  description:
    "Filtrado de leads 24/7, agenda automática y eliminación de tareas administrativas para asesorías en Zaragoza.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
