import { ArrowDown, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_IMAGES, CLINIC_INFO, buildWhatsAppUrl } from '../data/clinicData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const scrollToServices = () => {
    const el = document.getElementById('servicos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[94vh] flex items-end pb-14 pt-28 md:pb-20 md:pt-32 bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] overflow-hidden"
    >
      {/* Imagem Fullscreen cinematográfica */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src={CLINIC_IMAGES.hero}
          alt="Atendimento e bem-estar na clínica Harmolaser Maceió"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-[70%_25%] md:object-center"
        />
        {/* Scrim direcional Preto Elegante garantindo contraste >= 4.5:1 */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[hsl(222_47%_11%/0.94)] via-[hsl(222_47%_11%/0.72)] to-[hsl(222_47%_11%/0.25)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[hsl(222_47%_11%/0.88)] via-transparent to-[hsl(222_47%_11%/0.45)]"
        />
      </div>

      {/* Conteúdo Editorial em primeiro plano */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <motion.div
            initial={{ opacity: 0.9, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-[hsl(var(--color-ice))]/55" aria-hidden="true" />
              <p className="text-xs tracking-[0.2em] uppercase text-[hsl(var(--color-ice))]/85">
                {CLINIC_INFO.neighborhood}
              </p>
            </div>

            <h1
              className="font-display font-normal text-[hsl(var(--color-ice))] leading-[0.98] tracking-[-0.02em] max-w-[13ch]"
              style={{
                fontSize: 'clamp(3.15rem, 6.4vw, 5.75rem)',
                textWrap: 'balance',
              }}
            >
              Pele lisa, <em className="italic">cuidado preciso</em> em cada sessão.
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-[hsl(var(--color-ice))]/85 max-w-lg font-light">
              Depilação a laser e estética avançada em um espaço pensado para a sua tranquilidade e conforto.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onContactClick}
                className="group inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.14em] bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] hover:bg-[hsl(var(--color-ice-surface))] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--color-ice))]"
              >
                <span>Entrar em contato</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={scrollToServices}
                className="group inline-flex items-center gap-2.5 px-6 py-4 text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ice))] border border-[hsl(var(--color-ice))]/35 bg-[hsl(var(--color-ink))]/35 backdrop-blur-md hover:bg-[hsl(var(--color-ice))]/15 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--color-ice))]"
              >
                <span>Ver tratamentos</span>
                <ArrowDown
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </motion.div>

          {/* Painel glass flutuante de atendimento imediato */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:justify-self-end w-full max-w-md"
          >
            <div className="p-6 sm:p-7 bg-[hsl(var(--color-ink))]/65 backdrop-blur-xl border border-[hsl(var(--color-ice))]/20">
              <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--color-ice))]/70">
                Atendimento em Maceió
              </p>
              <p className="mt-2 font-display text-2xl sm:text-[1.75rem] leading-snug text-[hsl(var(--color-ice))]">
                Avaliação personalizada e agendamento direto.
              </p>
              <p className="mt-2 text-sm text-[hsl(var(--color-ice))]/80 font-light">
                {CLINIC_INFO.address}
              </p>
              <div className="mt-5 pt-5 border-t border-[hsl(var(--color-ice))]/15 flex items-center justify-between gap-4">
                <span className="text-sm text-[hsl(var(--color-ice))] tabular-nums">
                  {CLINIC_INFO.phoneDisplay}
                </span>
                <a
                  href={buildWhatsAppUrl(
                    `Olá! Gostaria de agendar uma avaliação na ${CLINIC_INFO.brandFull}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[hsl(var(--color-ice))] hover:underline whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
