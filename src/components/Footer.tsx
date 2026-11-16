import { CLINIC_INFO, buildWhatsAppUrl } from '../data/clinicData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] py-14 md:py-16 border-t border-[hsl(var(--border-ice))]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10 border-b border-[hsl(var(--border-ice))]">
          <div>
            <p className="font-display text-3xl font-normal text-[hsl(var(--color-ice))]">
              {CLINIC_INFO.brandFull}
            </p>
            <p className="mt-2 text-sm text-[hsl(var(--color-ice))]/75 font-light">
              {CLINIC_INFO.subtitle}
            </p>
          </div>

          <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-6 text-sm text-[hsl(var(--color-ice))]/80">
            {[
              { id: 'inicio', label: 'Início' },
              { id: 'servicos', label: 'Serviços' },
              { id: 'sobre', label: 'Sobre' },
              { id: 'contato', label: 'Contato' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="hover:text-[hsl(var(--color-ice))] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[hsl(var(--color-ice))]/70 font-light">
          <p>{CLINIC_INFO.address}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={buildWhatsAppUrl(`Olá! Gostaria de informações sobre a ${CLINIC_INFO.brandFull}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(var(--color-ice))] transition-colors tabular-nums"
            >
              WhatsApp: {CLINIC_INFO.phoneDisplay}
            </a>
            <span aria-hidden="true">·</span>
            <span>© {year} {CLINIC_INFO.brandFull}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
