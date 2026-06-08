import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type Lead = { name: string; email: string; phone?: string; note?: string };

function validate(b: any): b is Lead {
  return (
    b &&
    typeof b.name === "string" && b.name.trim().length > 0 && b.name.length < 100 &&
    typeof b.email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email)
  );
}

async function sendEmail(lead: Lead) {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (!to || !key) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Jevas Asesores <onboarding@resend.dev>",
      to: [to],
      subject: `Nuevo lead: ${lead.name}`,
      text: `Nombre: ${lead.name}\nEmail: ${lead.email}\nTeléfono: ${lead.phone || "-"}\nNota: ${lead.note || "-"}`,
    }),
  }).catch((e) => console.error("email error", e));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!validate(body)) {
    return new Response(JSON.stringify({ error: "Invalid input" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const logDir = path.join(process.cwd(), "logs");
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(
      path.join(logDir, "leads.log"),
      JSON.stringify({ ts: new Date().toISOString(), ...body }) + "\n",
      "utf8"
    );
  } catch (e) {
    console.error("log error", e);
  }

  await sendEmail(body);

  return Response.json({ ok: true });
}
