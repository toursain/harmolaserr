import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AESTHETIC_TREATMENTS,
  CLINIC_IMAGES,
  LASER_CATEGORIES,
  type LaserCategory,
} from '../data/clinicData';
import { SafeImage } from './SafeImage';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const CATEGORY_KEYS: LaserCategory[] = ['feminino', 'masculino', 'facial'];

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<LaserCategory>('feminino');
  const currentGroup = LASER_CATEGORIES[activeCategory];

  return (
    <section
      id="servicos"
      className="py-24 md:py-36 bg-[hsl(var(--color-ice))] editorial-ice-mesh"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-28 md:space-y-40">
        {/* Bloco 1: Depilação a Laser — Cards interativos + Retrato vertical com cartão glass sobreposto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[hsl(var(--color-ink))]/40" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--color-ink-muted))]">
                Depilação a Laser
              </p>
            </div>

            <h2
              className="font-display font-medium text-[hsl(var(--color-ink))] leading-[1.04] tracking-tight"
              style={{
                fontSize: 'clamp(2.35rem, 4.2vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              Tecnologia precisa para <em className="italic font-normal">pele lisa e livre</em>.
            </h2>

            <p className="mt-5 text-base text-[hsl(var(--color-ink-muted))] leading-relaxed max-w-xl font-light">
              Selecione uma região para iniciar seu agendamento com conforto térmico e segurança para diferentes fototipos.
            </p>

            {/* Seletor segmentado elegante */}
            <div
              role="tablist"
              aria-label="Regiões de depilação a laser"
              className="mt-9 inline-flex self-start items-center gap-1.5 p-1.5 bg-[hsl(var(--color-ice-surface))] border border-[hsl(var(--border-ink))]"
            >
              {CATEGORY_KEYS.map((key) => {
                const isActive = activeCategory === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(key)}
                    className={`relative px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--color-ink))] ${
                      isActive
                        ? 'bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))]'
                        : 'text-[hsl(var(--color-ink-muted))] hover:text-[hsl(var(--color-ink))]'
                    }`}
                  >
                    {LASER_CATEGORIES[key].title}
                  </button>
                );
              })}
            </div>

            {/* Grade de cards interativos com inversão de cor no hover */}
            <div className="mt-8 min-h-[290px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {currentGroup.areas.map((area) => {
                    const fullName = `Depilação a Laser — ${area.label} (${currentGroup.title})`;
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => onSelectService(fullName)}
                        className="group p-6 text-left bg-[hsl(var(--color-ice-surface))]/70 backdrop-blur-md border border-[hsl(var(--border-ink))] hover:bg-[hsl(var(--color-ink))] hover:border-[hsl(var(--color-ink))] transition-colors duration-200 flex flex-col justify-between gap-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-ink))]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-2xl font-medium text-[hsl(var(--color-ink))] group-hover:text-[hsl(var(--color-ice))] transition-colors leading-snug">
                            {area.label}
                          </h3>
                          <ArrowUpRight
                            className="w-4 h-4 mt-1 text-[hsl(var(--color-ink-muted))] group-hover:text-[hsl(var(--color-ice))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-sm text-[hsl(var(--color-ink-muted))] group-hover:text-[hsl(var(--color-ice))]/80 transition-colors font-light leading-relaxed">
                          {area.note}
                        </p>
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Imagem 3:4 com legenda glass sobreposta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden aspect-[3/4] bg-[hsl(var(--color-ice-surface))]">
              <SafeImage
                src={CLINIC_IMAGES.laser}
                alt="Especialista realizando sessão de depilação a laser na Harmolaser Maceió"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[hsl(222_47%_11%/0.75)] to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 p-5 bg-[hsl(var(--color-ice))]/85 backdrop-blur-md border border-[hsl(var(--border-ink))]">
                <p className="font-display text-xl italic text-[hsl(var(--color-ink))]">
                  Cuidado individualizado em cada aplicação
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[hsl(var(--color-ink-muted))]">
                  Sessões planejadas para o seu fototipo
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bloco 2 (Invertido): Estética Avançada — Grande imagem à esquerda · Cards esculturais à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-2 lg:order-1 relative"
          >
            <div className="overflow-hidden rounded-t-[11rem] sm:rounded-t-[15rem] aspect-[4/3] bg-[hsl(var(--color-ice-surface))] border border-[hsl(var(--border-ink))]">
              <SafeImage
                src={CLINIC_IMAGES.facial}
                alt="Tratamento de estética facial avançada na Harmolaser Maceió"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[hsl(var(--color-ink))]/40" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--color-ink-muted))]">
                Estética Avançada
              </p>
            </div>

            <h2
              className="font-display font-medium text-[hsl(var(--color-ink))] leading-[1.04] tracking-tight"
              style={{
                fontSize: 'clamp(2.35rem, 4.2vw, 3.65rem)',
                textWrap: 'balance',
              }}
            >
              Protocolos que <em className="italic font-normal">devolvem o viço</em> natural.
            </h2>

            <div className="mt-9 grid grid-cols-1 gap-4">
              {AESTHETIC_TREATMENTS.map((item) => (
                <button
                  key={item.index}
                  type="button"
                  onClick={() => onSelectService(item.title)}
                  className="group p-6 text-left bg-[hsl(var(--color-ice-surface))]/65 backdrop-blur-sm border border-[hsl(var(--border-ink))] hover:bg-[hsl(var(--color-ink))] hover:border-[hsl(var(--color-ink))] transition-colors duration-200 flex items-start justify-between gap-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[hsl(var(--color-ink))]"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display italic text-xl text-[hsl(var(--color-ink-muted))] group-hover:text-[hsl(var(--color-ice))]/75 transition-colors tabular-nums shrink-0">
                      {item.index}.
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-medium text-[hsl(var(--color-ink))] group-hover:text-[hsl(var(--color-ice))] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-[hsl(var(--color-ink-muted))] group-hover:text-[hsl(var(--color-ice))]/80 transition-colors font-light leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 mt-2 text-[hsl(var(--color-ink-muted))] group-hover:text-[hsl(var(--color-ice))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
