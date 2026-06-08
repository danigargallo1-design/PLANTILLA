"use client";

import { useState } from "react";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-navy-900">Déjanos tus datos</div>
      <div className="mt-1 text-xs text-slate-500">
        Te contactamos en menos de 24h laborables.
      </div>

      {status === "ok" ? (
        <div className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-700">
          Gracias. Hemos recibido tus datos.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            required
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            placeholder="Teléfono"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            placeholder="¿Qué necesitas?"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={3}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
          >
            {status === "loading" ? "Enviando…" : "Solicitar contacto"}
          </button>
          {status === "err" && (
            <div className="text-xs text-red-600">
              No se pudo enviar. Inténtalo de nuevo.
            </div>
          )}
        </form>
      )}
    </div>
  );
}
