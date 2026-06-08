"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api: "/api/chat" });

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="text-sm font-semibold text-navy-900">
          Asistente comercial · Jevas Asesores
        </div>
        <div className="text-xs text-slate-500">
          Cuéntame qué necesitas y te indico el siguiente paso.
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {messages.length === 0 && (
          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Hola 👋 Soy el asistente de Jevas Asesores. ¿Qué tipo de
            asesoramiento necesitas: fiscal, contable o mercantil?
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-auto max-w-[85%] rounded-lg bg-navy-900 px-4 py-2 text-sm text-white"
                : "max-w-[85%] rounded-lg bg-slate-100 px-4 py-2 text-sm text-navy-900"
            }
          >
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[85%] rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-500">
            Escribiendo…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-slate-200 px-5 py-4"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje…"
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-navy-700 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800 disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
