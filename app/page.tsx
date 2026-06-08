import Chat from "./components/Chat";
import LeadForm from "./components/LeadForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold text-navy-900">Jevas Asesores</div>
          <a
            href="#chat"
            className="rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
          >
            Hablar con el asistente
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <h1 className="text-4xl font-bold leading-tight text-navy-900 sm:text-5xl">
          Automatización de Clientes para Asesorías en Zaragoza
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Cualifica leads, agenda reuniones y elimina tareas administrativas
          repetitivas. Tu asesoría trabajando 24/7 sin contratar a nadie más.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-16 sm:grid-cols-3">
        {[
          {
            title: "Filtrado de leads 24/7",
            body: "Un asistente que clasifica clientes potenciales en segundos, día y noche.",
          },
          {
            title: "Agenda automática",
            body: "Los clientes ideales se redirigen directamente a tu calendario.",
          },
          {
            title: "Cero tareas repetitivas",
            body: "Elimina preguntas básicas, correos manuales y seguimiento de baja prioridad.",
          },
        ].map((v) => (
          <div
            key={v.title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-base font-semibold text-navy-900">{v.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{v.body}</p>
          </div>
        ))}
      </section>

      <section id="chat" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Chat />
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Jevas Asesores · Zaragoza
        </div>
      </footer>
    </main>
  );
}
