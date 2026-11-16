import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { CLINIC_IMAGES, CLINIC_INFO } from '../data/clinicData';
import { SafeImage } from './SafeImage';

interface AboutSectionProps {
  onContactClick: () => void;
}

const CLINIC_PILLARS = [
  {
    title: 'Avaliação individual',
    detail: 'Análise cuidadosa do tipo de pele e pelos antes de iniciar qualquer protocolo.',
  },
  {
    title: 'Conforto em cada sessão',
    detail: 'Ambiente calmo e técnica gentil para uma experiência tranquila do início ao fim.',
  },
  {
    title: 'Localização prática',
    detail: 'Atendimento acessível na Cidade Universitária, com contato rápido pelo WhatsApp.',
  },
] as const;

export function AboutSection({ onContactClick }: AboutSectionProps) {
  return (
    <section
      id="sobre"
      className="py-24 md:py-36 bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] editorial-dark-glow"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Cabeçalho editorial */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[hsl(var(--color-ice))]/45" aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.18em] text-[hsl(var(--color-ice))]/75">
                Sobre a clínica
              </p>
            </div>
            <h2
              className="font-display font-normal text-[hsl(var(--color-ice))] leading-[1.02] tracking-[0.005em]"
              style={{
                fontSize: 'clamp(2.45rem, 4.8vw, 4.1rem)',
                textWrap: 'balance',
              }}
            >
              Um refúgio de <em className="italic">calma e precisão</em> em Maceió.
            </h2>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <p className="text-xs uppercase tracking-[0.16em] text-[hsl(var(--color-ice))]/70">
              {CLINIC_INFO.neighborhood}
            </p>
          </div>
        </motion.div>

        {/* Foto arquitetônica com cartão glass sobreposto */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-16 relative"
        >
          <div className="overflow-hidden aspect-[16/9] lg:aspect-[21/10] bg-[hsl(var(--color-ink-soft))] border border-[hsl(var(--border-ice))]">
            <SafeImage
              src={CLINIC_IMAGES.interior}
              alt="Recepção e ambiente acolhedor da Harmolaser Maceió na Cidade Universitária"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.015]"
            />
          </div>

          <div className="mt-6 lg:mt-0 lg:absolute lg:bottom-8 lg:left-8 lg:max-w-lg p-7 sm:p-8 bg-[hsl(var(--color-ice))]/95 backdrop-blur-xl text-[hsl(var(--color-ink))] border border-[hsl(var(--border-ink))]">
            <p className="font-display text-2xl sm:text-[1.7rem] leading-snug">
              Cuidado real com <em className="italic">atenção e transparência</em> em cada etapa.
            </p>
            <p className="mt-3 text-sm text-[hsl(var(--color-ink-muted))] font-light leading-relaxed">
              Na {CLINIC_INFO.brandFull}, cada sessão é adaptada às necessidades reais da sua pele, unindo tecnologia segura e atendimento humano.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onContactClick}
                className="group inline-flex items-center gap-3 px-6 py-3.5 text-xs uppercase tracking-[0.14em] bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] hover:bg-[hsl(var(--color-ink-soft))] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--color-ink))]"
              >
                <span>Entrar em contato</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3 pilares limpos separados por linhas verticais */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-[hsl(var(--border-ice))] border-t border-[hsl(var(--border-ice))] pt-12">
          {CLINIC_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`${idx === 0 ? 'md:pr-10' : idx === 1 ? 'md:px-10' : 'md:pl-10'}`}
            >
              <span className="font-display italic text-xl text-[hsl(var(--color-ice))]/65 tabular-nums">
                0{idx + 1}.
              </span>
              <h3 className="mt-2 font-display text-2xl text-[hsl(var(--color-ice))]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm text-[hsl(var(--color-ice))]/80 font-light leading-relaxed">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
