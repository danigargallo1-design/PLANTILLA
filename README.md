# Jevas Asesores — Landing + Asistente IA

Next.js 14 (App Router) + Tailwind + Vercel AI SDK.

## Setup

```bash
npm install
cp .env.example .env.local   # añade tu OPENAI_API_KEY
npm run dev
```

Abre http://localhost:3000

## Variables de entorno

- `OPENAI_API_KEY` — requerida para el chat.
- `NEXT_PUBLIC_CALENDLY_URL` — URL a la que el bot redirige clientes cualificados.
- `LEAD_NOTIFICATION_EMAIL` — correo que recibe avisos de nuevos leads.
- `RESEND_API_KEY` — opcional, para enviar los avisos por email vía Resend.

## Estructura

- `app/page.tsx` — Landing (hero, propuesta de valor, chat, formulario).
- `app/components/Chat.tsx` — Componente chat (`useChat`).
- `app/components/LeadForm.tsx` — Captura de leads.
- `app/api/chat/route.ts` — Endpoint chat con system prompt + logging.
- `app/api/lead/route.ts` — Webhook captura de leads (log + email opcional).
- `logs/` — Se crea automáticamente: `chat.log` y `leads.log` (JSONL).

## Deploy

Recomendado: Vercel. `vercel --prod`. Configura las variables de entorno en el dashboard.

Nota: el logging a `logs/` funciona en entornos con sistema de archivos persistente. En serverless (Vercel) sustituye por una base de datos (Supabase, Postgres, etc.) para conservar los logs.
