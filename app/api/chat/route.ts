import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const maxDuration = 30;

const CALENDLY =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/tu-usuario/reunion-jevas";

const SYSTEM_PROMPT = `Eres un asistente comercial de élite para Jevas Asesores en Zaragoza. Tu función es clasificar clientes.
1. Pregunta siempre por el tipo de asesoramiento (fiscal, contable, mercantil).
2. Pregunta por el volumen de facturación o tamaño de la empresa.
3. Si el cliente es ideal (autónomo con facturación >30.000€/año o empresa con >1 empleado y necesidad recurrente), redirige a ${CALENDLY} para agendar reunión. Si no, sé educado pero breve.
Responde siempre en español, tono profesional y directo. No inventes precios.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages,
    onFinish: async ({ text }) => {
      try {
        const logDir = path.join(process.cwd(), "logs");
        await fs.mkdir(logDir, { recursive: true });
        const entry = {
          ts: new Date().toISOString(),
          messages,
          assistant: text,
        };
        await fs.appendFile(
          path.join(logDir, "chat.log"),
          JSON.stringify(entry) + "\n",
          "utf8"
        );
      } catch (e) {
        console.error("log error", e);
      }
    },
  });

  return result.toDataStreamResponse();
}
