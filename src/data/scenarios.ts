import { WorkplaceScenario } from '../types';

export const WORKPLACE_SCENARIOS: WorkplaceScenario[] = [
  {
    id: 'oficina',
    name: 'Oficina Administrativa',
    subtitle: 'Área de escritorios, salas de reunión y kitchenette',
    description: 'En el día a día administrativo se generan múltiples residuos de celulosa, plásticos y consumibles que requieren rápida atención.',
    bgImageUrl: '/src/assets/images/scenario_office_1791557902030.jpg',
    tips: [
      'Reutiliza el papel por el reverso antes de desecharlo.',
      'Separa los vouchers de papel térmico del papel bond limpio.',
      'Lleva los cartuchos de tóner al punto rojo de TI.'
    ],
    hotspots: [
      {
        id: 'hs-of-1',
        wasteId: 'w-01',
        label: 'Papel bond de borrador',
        x: 28,
        y: 62,
        icon: '📄',
        hint: 'Hojas sobre el escritorio'
      },
      {
        id: 'hs-of-2',
        wasteId: 'w-07',
        label: 'Botella de agua mineral',
        x: 48,
        y: 66,
        icon: '🧴',
        hint: 'Al costado de la laptop'
      },
      {
        id: 'hs-of-3',
        wasteId: 'w-20',
        label: 'Borra de café molido',
        x: 18,
        y: 52,
        icon: '☕',
        hint: 'Junto a la cafetera'
      },
      {
        id: 'hs-of-4',
        wasteId: 'w-38',
        label: 'Ticket de compra térmico',
        x: 72,
        y: 58,
        icon: '🧾',
        hint: 'Comprobante de compras'
      },
      {
        id: 'hs-of-5',
        wasteId: 'w-30',
        label: 'Tóner usado de impresora',
        x: 85,
        y: 72,
        icon: '🖨️',
        hint: 'Junto a la impresora central'
      }
    ]
  },
  {
    id: 'comedor',
    name: 'Comedor y Cafetería',
    subtitle: 'Zona de refrigerio y almuerzo del personal',
    description: 'Punto neurálgico donde conviven restos orgánicos, envases de bebidas, vajilla y servilletas.',
    tips: [
      'Retira la tapa de la botella de vidrio y deposita la chapa en el amarillo.',
      'No arrojes servilletas grasosas al tacho de papel.',
      'Los restos de comida van directo al contenedor marrón sin bolsas plásticas.'
    ],
    hotspots: [
      {
        id: 'hs-co-1',
        wasteId: 'w-19',
        label: 'Cáscara de plátano',
        x: 24,
        y: 68,
        icon: '🍌',
        hint: 'En la mesa de refrigerio'
      },
      {
        id: 'hs-co-2',
        wasteId: 'w-24',
        label: 'Botella de gaseosa de vidrio',
        x: 42,
        y: 55,
        icon: '🍾',
        hint: 'Botella vacía sobre la mesa'
      },
      {
        id: 'hs-co-3',
        wasteId: 'w-14',
        label: 'Lata de atún escurrida',
        x: 58,
        y: 62,
        icon: '🥫',
        hint: 'Lata de conserva de almuerzo'
      },
      {
        id: 'hs-co-4',
        wasteId: 'w-36',
        label: 'Servilleta manchada de grasa',
        x: 75,
        y: 70,
        icon: '🧻',
        hint: 'Servilleta con salsa'
      },
      {
        id: 'hs-co-5',
        wasteId: 'w-37',
        label: 'Táper de tecnopor',
        x: 86,
        y: 52,
        icon: '🥡',
        hint: 'Envase espumado descartable'
      }
    ]
  },
  {
    id: 'almacen',
    name: 'Almacén y Centro Logístico',
    subtitle: 'Recepción, paletizado y despacho de mercaderías',
    description: 'Enorme volumen de material de empaque que representa la mayor oportunidad de reciclaje corporativo.',
    bgImageUrl: '/src/assets/images/scenario_warehouse_1791557911934.jpg',
    tips: [
      'Desarma las cajas de cartón para no saturar el área de acopio.',
      'El stretch film debe mantenerse limpio y libre de barro para venderse a recicladores.',
      'Las baterías de carretillas eléctricas son residuos peligrosos.'
    ],
    hotspots: [
      {
        id: 'hs-al-1',
        wasteId: 'w-02',
        label: 'Caja de cartón de insumos',
        x: 22,
        y: 72,
        icon: '📦',
        hint: 'Caja vacía en el suelo'
      },
      {
        id: 'hs-al-2',
        wasteId: 'w-09',
        label: 'Stretch film de paleta',
        x: 18,
        y: 58,
        icon: '📦',
        hint: 'Film estirable retirado de una carga'
      },
      {
        id: 'hs-al-3',
        wasteId: 'w-15',
        label: 'Clavos y pernos caídos',
        x: 62,
        y: 80,
        icon: '🔩',
        hint: 'Ferretería suelta en el pasillo'
      },
      {
        id: 'hs-al-4',
        wasteId: 'w-34',
        label: 'Batería de montacargas',
        x: 82,
        y: 65,
        icon: '🔋',
        hint: 'Batería industrial en desuso'
      }
    ]
  },
  {
    id: 'taller',
    name: 'Taller de Mantenimiento',
    subtitle: 'Área electromecánica, soldadura y reparaciones',
    description: 'Zona con alta presencia de residuos peligrosos por aceites, solventes y piezas metálicas.',
    tips: [
      'El textil con hidrocarburos nunca va al tacho negro.',
      'Separa la chatarra ferrosa limpia para su valorización metalúrgica.',
      'Utiliza EPP apropiado para manipular trapos y envases de thinner.'
    ],
    hotspots: [
      {
        id: 'hs-ta-1',
        wasteId: 'w-29',
        label: 'Waype con grasa de motor',
        x: 32,
        y: 64,
        icon: '🧤',
        hint: 'Trapo usado junto al banco de trabajo'
      },
      {
        id: 'hs-ta-2',
        wasteId: 'w-15',
        label: 'Retazos de alambre de amarre',
        x: 52,
        y: 74,
        icon: '🔩',
        hint: 'Alambres cortados en el piso'
      },
      {
        id: 'hs-ta-3',
        wasteId: 'w-31',
        label: 'Lata vacía de disolvente',
        x: 74,
        y: 56,
        icon: '🪣',
        hint: 'Envase químico sobre el estante'
      },
      {
        id: 'hs-ta-4',
        wasteId: 'w-28',
        label: 'Pilas de linterna frontal',
        x: 88,
        y: 68,
        icon: '🔋',
        hint: 'Pilas agotadas en mesa de trabajo'
      }
    ]
  },
  {
    id: 'planta',
    name: 'Planta Industrial',
    subtitle: 'Líneas de producción y control de calidad',
    description: 'Espacio con protocolos estrictos de orden, limpieza (5S) y segregación ambiental certificada.',
    tips: [
      'Todo residuo en piso representa riesgo de tropiezo según SST.',
      'Ubica los puntos ecológicos señalizados antes de iniciar el turno.',
      'Reporta al supervisor si un contenedor está al 80% de su capacidad.'
    ],
    hotspots: [
      {
        id: 'hs-pl-1',
        wasteId: 'w-16',
        label: 'Virutas de acero limpias',
        x: 35,
        y: 75,
        icon: '⚙️',
        hint: 'Residuo de mecanizado en charola'
      },
      {
        id: 'hs-pl-2',
        wasteId: 'w-32',
        label: 'Fluorescente averiado',
        x: 50,
        y: 42,
        icon: '💡',
        hint: 'Lámpara retirada para cambio'
      },
      {
        id: 'hs-pl-3',
        wasteId: 'w-08',
        label: 'Envase de desengrasante PEAD',
        x: 68,
        y: 66,
        icon: '🧴',
        hint: 'Galonera plástica limpia'
      },
      {
        id: 'hs-pl-4',
        wasteId: 'w-41',
        label: 'Colilla en zona exterior',
        x: 85,
        y: 82,
        icon: '🚬',
        hint: 'Cigarro apagado cerca al ingreso'
      }
    ]
  },
  {
    id: 'obra',
    name: 'Obra y Construcción',
    subtitle: 'Frente de trabajo en campo y campamento',
    description: 'Gestión de residuos en campo donde la disciplina de segregación evita sanciones ambientales de OEFA y SUNAFIL.',
    tips: [
      'Mantén los cilindros de segregación debidamente rotulados.',
      'Separa los empaques plásticos de las bolsas de cemento secas.',
      'Los envases de aditivos químicos van siempre al cilindro rojo.'
    ],
    hotspots: [
      {
        id: 'hs-ob-1',
        wasteId: 'w-07',
        label: 'Botella de hidratación PET',
        x: 25,
        y: 70,
        icon: '🧴',
        hint: 'Botella de agua del operario'
      },
      {
        id: 'hs-ob-2',
        wasteId: 'w-40',
        label: 'Envoltura de galleta',
        x: 48,
        y: 62,
        icon: '🥔',
        hint: 'Empaque de snack del descanso'
      },
      {
        id: 'hs-ob-3',
        wasteId: 'w-31',
        label: 'Lata de desmoldante químico',
        x: 72,
        y: 68,
        icon: '🪣',
        hint: 'Envase con químico inflamable'
      },
      {
        id: 'hs-ob-4',
        wasteId: 'w-37',
        label: 'Táper de vianda de almuerzo',
        x: 85,
        y: 75,
        icon: '🥡',
        hint: 'Tecnopor sobre una parihuela'
      }
    ]
  }
];
