import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
] as const;

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 48);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[hsl(var(--color-ice))]/90 backdrop-blur-xl border-b border-[hsl(var(--border-ink))] text-[hsl(var(--color-ink))]'
          : 'bg-[hsl(var(--color-ink))]/35 backdrop-blur-md border-b border-[hsl(var(--border-ice))] text-[hsl(var(--color-ice))]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zona 1: Wordmark em linha única */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('inicio');
          }}
          className="font-display text-2xl md:text-[1.85rem] font-medium tracking-[-0.015em] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          Harmolaser
        </a>

        {/* Zona 2: Links de navegação limpos */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className={`relative py-1 text-[13px] font-normal uppercase tracking-[0.14em] transition-opacity duration-200 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
                scrolled
                  ? 'text-[hsl(var(--color-ink-muted))] hover:text-[hsl(var(--color-ink))] after:bg-[hsl(var(--color-ink))]'
                  : 'text-[hsl(var(--color-ice))]/85 hover:text-[hsl(var(--color-ice))] after:bg-[hsl(var(--color-ice))]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Ação principal única */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('contato')}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs tracking-[0.12em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
              scrolled
                ? 'bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] hover:bg-[hsl(var(--color-ink-soft))]'
                : 'bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] hover:bg-[hsl(var(--color-ice-surface))]'
            }`}
          >
            Entrar em contato
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Linha de progresso editorial */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className={`h-[1.5px] origin-left ${
          scrolled ? 'bg-[hsl(var(--color-ink))]' : 'bg-[hsl(var(--color-ice))]'
        }`}
      />

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-[hsl(var(--color-ice))] text-[hsl(var(--color-ink))] border-b border-[hsl(var(--border-ink))] px-5 pb-6 pt-3">
          <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-[hsl(var(--border-ink))]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="py-3.5 text-base font-normal text-[hsl(var(--color-ink))] hover:text-[hsl(var(--color-ink-muted))] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => handleLinkClick('contato')}
            className="mt-4 w-full py-3.5 px-6 text-xs uppercase tracking-[0.12em] bg-[hsl(var(--color-ink))] text-[hsl(var(--color-ice))] hover:bg-[hsl(var(--color-ink-soft))] transition-colors cursor-pointer"
          >
            Entrar em contato
          </button>
        </div>
      )}
    </header>
  );
}
