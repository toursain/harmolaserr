export const CLINIC_INFO = {
  brandShort: 'Harmolaser',
  brandFull: 'Harmolaser Maceió',
  subtitle: 'Depilação a Laser e Estética Avançada',
  address: 'Av. Dr. André Papini Góis - Cidade Universitária, Maceió - AL, 57073-130',
  neighborhood: 'Cidade Universitária, Maceió',
  phoneDisplay: '(82) 98830-2715',
  phoneSanitized: '5582988302715',
} as const;

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CLINIC_INFO.phoneSanitized}?text=${encoded}`;
}

export type LaserCategory = 'feminino' | 'masculino' | 'facial';

export interface LaserArea {
  id: string;
  label: string;
  note: string;
}

export const LASER_CATEGORIES: Record<
  LaserCategory,
  { title: string; areas: LaserArea[] }
> = {
  feminino: {
    title: 'Feminino',
    areas: [
      { id: 'axilas', label: 'Axilas', note: 'Sessão rápida com resfriamento confortável' },
      { id: 'virilha', label: 'Virilha completa', note: 'Cuidado delicado e proteção da pele' },
      { id: 'pernas', label: 'Pernas inteiras', note: 'Uniformidade e maciez duradoura' },
      { id: 'meia-perna', label: 'Meia perna', note: 'Praticidade para a rotina diária' },
      { id: 'bracos', label: 'Braços', note: 'Acabamento suave sem foliculite' },
    ],
  },
  masculino: {
    title: 'Masculino',
    areas: [
      { id: 'barba', label: 'Faixa da barba e pescoço', note: 'Menos irritação ao barbear' },
      { id: 'torax', label: 'Tórax e abdômen', note: 'Redução progressiva e uniforme' },
      { id: 'costas', label: 'Costas completas', note: 'Aplicação precisa em grandes áreas' },
      { id: 'axilas-m', label: 'Axilas', note: 'Conforto térmico durante toda a aplicação' },
    ],
  },
  facial: {
    title: 'Facial',
    areas: [
      { id: 'buco', label: 'Buço', note: 'Precisão milimétrica para pele sensível' },
      { id: 'mento', label: 'Queixo e mandíbula', note: 'Pele uniforme sem pelos encravados' },
      { id: 'rosto-completo', label: 'Rosto completo', note: 'Protocolo gentil adaptado ao fototipo' },
    ],
  },
};

export interface AestheticTreatment {
  index: string;
  title: string;
  summary: string;
}

export const AESTHETIC_TREATMENTS: AestheticTreatment[] = [
  {
    index: '01',
    title: 'Limpeza de Pele Profunda',
    summary: 'Desobstrução suave dos poros, renovação celular e equilíbrio da barreira cutânea.',
  },
  {
    index: '02',
    title: 'Peelings Renovadores',
    summary: 'Protocolos personalizados para luminosidade, textura uniforme e viço natural.',
  },
  {
    index: '03',
    title: 'Estética Facial Avançada',
    summary: 'Cuidados sob medida para hidratação intensa, firmeza e vitalidade da pele.',
  },
  {
    index: '04',
    title: 'Protocolos Corporais',
    summary: 'Combinação de técnicas estéticas para contorno, bem-estar e textura saudável.',
  },
];

export const CLINIC_IMAGES = {
  hero: '/src/assets/images/hero_laser_studio_1794855996069.jpg',
  laser: '/src/assets/images/service_laser_depilation_1794855996544.jpg',
  facial: '/src/assets/images/service_facial_aesthetics_1794855996897.jpg',
  interior: '/src/assets/images/about_clinic_interior_1794855997246.jpg',
} as const;
