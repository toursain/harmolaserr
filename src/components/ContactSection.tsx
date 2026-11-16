import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, MapPin, MessageCircle, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AESTHETIC_TREATMENTS,
  CLINIC_INFO,
  buildWhatsAppUrl,
} from '../data/clinicData';

interface ContactSectionProps {
  selectedService: string;
}

const SERVICE_OPTIONS = [
  'Avaliação Personalizada',
  'Depilação a Laser — Feminino',
  'Depilação a Laser — Masculino',
  'Depilação a Laser — Facial',
  ...AESTHETIC_TREATMENTS.map((t) => t.title),
];

const SHIFT_OPTIONS = ['Manhã', 'Tarde', 'Qualquer horário'] as const;

export function ContactSection({ selectedService }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICE_OPTIONS[0]);
  const [shift, setShift] = useState<(typeof SHIFT_OPTIONS)[number]>('Qualquer horário');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedService) {
      setService(selectedService);
      setSubmittedUrl(null);
    }
  }, [selectedService]);

  const directWhatsAppUrl = buildWhatsAppUrl(
    `Olá! Gostaria de agendar um atendimento na ${CLINIC_INFO.brandFull}.`
  );

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    CLINIC_INFO.address
  )}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; phone?: string } = {};

    const cleanName = name.trim();
    const digits = phone.replace(/\D/g, '');

    if (cleanName.length < 2) {
      nextErrors.name = 'Informe seu nome para continuarmos.';
    }
    if (digits.length < 10) {
      nextErrors.phone = 'Informe um número de WhatsApp com DDD.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const messageLines = [
      `Olá, ${CLINIC_INFO.brandFull}!`,
      `Nome: ${cleanName}`,
      `Telefone: ${phone.trim()}`,
      `Interesse: ${service}`,
      `Preferência de horário: ${shift}`,
    ];
    if (notes.trim()) {
      messageLines.push(`Observações: ${notes.trim()}`);
    }

    const url = buildWhatsAppUrl(messageLines.join('\n'));
    setSubmittedUrl(url);
  };

  return (
    <section
      id="contato"
      className="py-24 md:py-36 bg-[hsl(var(--color-ice))] editorial-ice-mesh border-t border-[hsl(var(--border-ink))]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Concierge Preto Elegante */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] p-8 sm:p-10 md:p-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-[hsl(var(--color-ice))]/45" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--color-ice))]/75">
                Contato direto
              </p>
            </div>

            <h2
              className="font-display font-normal text-[hsl(var(--color-ice))] leading-[1.04] tracking-tight"
              style={{
                fontSize: 'clamp(2.25rem, 3.8vw, 3.25rem)',
                textWrap: 'balance',
              }}
            >
              Agende sua visita em <em className="italic">Maceió</em>.
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[hsl(var(--color-ice))]/80 leading-relaxed font-light">
              Fale diretamente com nossa equipe pelo WhatsApp ou preencha o agendamento online ao lado.
            </p>

            <div className="mt-10 space-y-7 border-t border-[hsl(var(--border-ice))] pt-8">
              <div className="flex items-start gap-4">
                <MapPin
                  className="w-5 h-5 mt-0.5 text-[hsl(var(--color-ice))] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-xs uppercase tracking-[0.16em] text-[hsl(var(--color-ice))]/65 mb-1.5">
                    Endereço
                  </span>
                  <address className="not-italic text-sm sm:text-base text-[hsl(var(--color-ice))] leading-relaxed">
                    {CLINIC_INFO.address}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-[hsl(var(--color-ice))]/80 hover:text-[hsl(var(--color-ice))] underline underline-offset-4"
                  >
                    <span>Ver rota no mapa</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  className="w-5 h-5 mt-0.5 text-[hsl(var(--color-ice))] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="block text-xs uppercase tracking-[0.16em] text-[hsl(var(--color-ice))]/65 mb-1.5">
                    Telefone e WhatsApp
                  </span>
                  <a
                    href={`tel:+${CLINIC_INFO.phoneSanitized}`}
                    className="text-base text-[hsl(var(--color-ice))] hover:underline tabular-nums"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-[hsl(var(--border-ice))]">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.14em] bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] hover:bg-[hsl(var(--color-ice-surface))] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--color-ice))]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Coluna Direita: Agendamento Online */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-[hsl(var(--color-ice-surface))]/80 backdrop-blur-xl border border-[hsl(var(--border-ink-strong))] p-6 sm:p-10 md:p-12">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[hsl(var(--border-ink))]">
                <h3 className="font-display text-3xl sm:text-[2.15rem] font-medium text-[hsl(var(--color-ink))]">
                  Agendamento <em className="italic font-normal">Online</em>
                </h3>
                <span className="text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ink-muted))]">
                  Resposta rápida no WhatsApp
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ink))] mb-2"
                    >
                      Nome completo
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      aria-invalid={Boolean(errors.name)}
                      className="w-full px-4 py-3.5 text-sm bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] placeholder:text-[hsl(var(--color-ink-subtle))] border border-[hsl(var(--border-ink-strong))] focus:outline-none focus:border-[hsl(var(--color-ink))] transition-colors"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs text-[hsl(var(--color-ink))] font-bold">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ink))] mb-2"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(82) 99999-9999"
                      aria-invalid={Boolean(errors.phone)}
                      className="w-full px-4 py-3.5 text-sm bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] placeholder:text-[hsl(var(--color-ink-subtle))] border border-[hsl(var(--border-ink-strong))] focus:outline-none focus:border-[hsl(var(--color-ink))] transition-colors tabular-nums"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 text-xs text-[hsl(var(--color-ink))] font-bold">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-service"
                    className="block text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ink))] mb-2"
                  >
                    Tratamento de interesse
                  </label>
                  <select
                    id="booking-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3.5 text-sm bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] border border-[hsl(var(--border-ink-strong))] focus:outline-none focus:border-[hsl(var(--color-ink))] transition-colors"
                  >
                    {!SERVICE_OPTIONS.includes(service) && (
                      <option value={service}>{service}</option>
                    )}
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ink))] mb-2">
                    Preferência de turno
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {SHIFT_OPTIONS.map((option) => {
                      const active = shift === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setShift(option)}
                          className={`py-3 px-3 text-xs uppercase tracking-[0.08em] border transition-colors duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-ink))] ${
                            active
                              ? 'bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] border-[hsl(var(--color-ink))]'
                              : 'bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink-muted))] border-[hsl(var(--border-ink-strong))] hover:text-[hsl(var(--color-ink))]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ink))] mb-2"
                  >
                    Observações (opcional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Dúvidas sobre sessões ou regiões desejadas..."
                    className="w-full px-4 py-3.5 text-sm bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] placeholder:text-[hsl(var(--color-ink-subtle))] border border-[hsl(var(--border-ink-strong))] focus:outline-none focus:border-[hsl(var(--color-ink))] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-[0.14em] bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] hover:bg-[hsl(var(--color-ink-soft))] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--color-ink))]"
                  >
                    <span>Solicitar agendamento</span>
                  </button>
                </div>

                <AnimatePresence>
                  {submittedUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      role="status"
                      className="p-5 bg-[hsl(var(--color-ice))] border border-[hsl(var(--color-ink))] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 text-sm text-[hsl(var(--color-ink))]">
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Solicitação pronta para envio pelo WhatsApp.</span>
                      </div>
                      <a
                        href={submittedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.1em] bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] hover:bg-[hsl(var(--color-ink-soft))] transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Abrir WhatsApp agora</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
