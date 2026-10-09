import { ContainerInfo, ContainerType } from '../types';

export const CONTAINERS: Record<ContainerType, ContainerInfo> = {
  azul: {
    id: 'azul',
    colorName: 'Azul',
    category: 'Papel y Cartón',
    subtitle: 'Residuos de celulosa limpios y secos',
    colorHex: '#2563EB',
    accentBg: 'bg-blue-600',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    borderClass: 'border-blue-500',
    textColor: 'text-blue-700',
    iconName: 'FileText',
    description: 'Destinado al almacenamiento de papeles y cartones limpios, secos, sin restos de comida ni grasa, aptos para reciclaje industrial.',
    whatGoesIn: [
      'Papel bond de oficina (hojas de impresión, borradores)',
      'Cajas de cartón de embalaje (desarmadas)',
      'Periódicos, revistas y folletos comerciales',
      'Sobres de papel (sin ventanas plásticas grandes)',
      'Conos o tubos de cartón de papel higiénico/toalla',
      'Cartulinas y archivadores de cartón (sin partes metálicas)'
    ],
    whatDoesNotGoIn: [
      'Papel higiénico o servilletas usadas (Contenedor Negro)',
      'Papel carbón o papel térmico de tickets (Contenedor Negro)',
      'Papel o cartón con grasa de comida o aceite (Contenedor Negro)',
      'Papel plastificado o encerado'
    ],
    frequentErrors: [
      'Arrojar servilletas manchadas de comida pensando que son reciclables.',
      'Depositar cajas de cartón sin desarmar, saturando el volumen.',
      'Mezclar papel con grapas pesadas o clips plásticos.'
    ],
    bestPractices: [
      'Desarmar y aplanar las cajas para optimizar el espacio.',
      'Asegurarse de que el papel esté completamente seco.',
      'Reutilizar hojas por ambas caras antes de disponerlas.'
    ],
    ntpReference: 'NTP 900.058:2019 - Tabla 2 (Ámbito no municipal)'
  },

  blanco: {
    id: 'blanco',
    colorName: 'Blanco',
    category: 'Plástico',
    subtitle: 'Polímeros reciclables limpios y compactados',
    colorHex: '#F8FAFC',
    accentBg: 'bg-slate-100 text-slate-800',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    borderClass: 'border-slate-300 shadow-sm',
    textColor: 'text-slate-800',
    iconName: 'Milk',
    description: 'Destinado al acopio de envases, botellas y empaques plásticos limpios, escurridos y preferentemente compactados.',
    whatGoesIn: [
      'Botellas plásticas de bebidas PET (agua, refrescos)',
      'Envases de champú, jabón y detergente PEAD (limpios)',
      'Tapas plásticas de botellas',
      'Bolsas de polietileno limpias y stretch film de embalaje',
      'Vasos y recipientes plásticos desechables limpios',
      'Bandejas plásticas transparentes de alimentos (sin restos)'
    ],
    whatDoesNotGoIn: [
      'Envases de tecnopor / poliestireno expandido (Contenedor Negro)',
      'Bolsas plásticas con grasa o residuos de comida (Contenedor Negro)',
      'Envases de sustancias químicas peligrosas o aceites (Contenedor Rojo)',
      'Cepillos dentales y bolígrafos gastados (Contenedor Negro)'
    ],
    frequentErrors: [
      'Introducir botellas con líquidos dentro, lo que genera malos olores y contamina el lote.',
      'Confundir el tecnopor con plástico reciclable (el tecnopor va en Negro).',
      'Depositar envases plásticos sucios de salsas o grasas.'
    ],
    bestPractices: [
      'Vaciar todo el contenido líquido o residuo.',
      'Enjuagar ligeramente si contenía productos densos y escurrir.',
      'Aplastar la botella y colocarle la tapa para reducir volumen.'
    ],
    ntpReference: 'NTP 900.058:2019 - Tabla 2 (Ámbito no municipal)'
  },

  amarillo: {
    id: 'amarillo',
    colorName: 'Amarillo',
    category: 'Metales',
    subtitle: 'Metales ferrosos y no ferrosos limpios',
    colorHex: '#EAB308',
    accentBg: 'bg-yellow-500',
    badgeBg: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    borderClass: 'border-yellow-500',
    textColor: 'text-yellow-700',
    iconName: 'Wrench',
    description: 'Destinado al almacenamiento de latas, chatarra, piezas metálicas y elementos de aluminio limpios y secos.',
    whatGoesIn: [
      'Latas de aluminio de gaseosa y energizantes',
      'Latas de conservas y atún (enjuagadas y secas)',
      'Tapas metálicas corona y tapas de frascos',
      'Retazos de alambre, clavos, tuercas y tornillos de taller',
      'Virutas metálicas limpias de mecanizado',
      'Perfiles y piezas metálicas sin grasa pesada'
    ],
    whatDoesNotGoIn: [
      'Latas de pintura o solventes químicos (Contenedor Rojo)',
      'Filtros de aceite de motor (Contenedor Rojo)',
      'Pilas o acumuladores (Contenedor Rojo)',
      'Empaques metalizados tipo snack/galletas (Contenedor Negro)'
    ],
    frequentErrors: [
      'Desechar empaques metalizados de galletas pensando que son de aluminio (son film plástico compuesto, van en Negro).',
      'Arrojar latas de atún con aceite restante.',
      'Confundir envases de aerosoles con químicos peligrosos.'
    ],
    bestPractices: [
      'Lavar y escurrir las latas de alimentos para evitar roedores.',
      'Aplastar las latas de bebidas de aluminio para ahorrar espacio.',
      'Tener cuidado con bordes afilados para evitar cortes al personal de limpieza.'
    ],
    ntpReference: 'NTP 900.058:2019 - Tabla 2 (Ámbito no municipal)'
  },

  marron: {
    id: 'marron',
    colorName: 'Marrón',
    category: 'Orgánicos',
    subtitle: 'Biodegradables y compostables',
    colorHex: '#854D0E',
    accentBg: 'bg-amber-800',
    badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
    borderClass: 'border-amber-800',
    textColor: 'text-amber-800',
    iconName: 'Apple',
    description: 'Destinado al depósito de restos de comida cruda o cocida, cáscaras, restos de jardinería y materia orgánica biodegradable.',
    whatGoesIn: [
      'Cáscaras de frutas (plátano, naranja, manzana)',
      'Restos de verduras y hortalizas',
      'Borra o restos de café y bolsitas de té filtrante',
      'Hojas secas, flores y restos de poda de áreas verdes',
      'Restos de comida del comedor de personal (sin empaques)'
    ],
    whatDoesNotGoIn: [
      'Bolsas plásticas o cubiertos descartables (Contenedor Blanco o Negro)',
      'Huesos muy grandes de faena industrial (revisar política interna)',
      'Aceite de cocina vegetal usado (disponer en bidones específicos de reciclaje de aceite)',
      'Excrementos de animales domésticos (Contenedor Negro)'
    ],
    frequentErrors: [
      'Arrojar la comida dentro de su bolsa o contenedor plástico.',
      'Mezclar servilletas sintéticas o empaques plásticos.',
      'Dejar líquidos calientes en el contenedor.'
    ],
    bestPractices: [
      'Separar el residuo orgánico de su empaque antes de botarlo.',
      'Drenar el exceso de caldo o líquido en el lavadero adecuado.',
      'Priorizar su transporte oportuno a composteras de la empresa.'
    ],
    ntpReference: 'NTP 900.058:2019 - Tabla 2 (Ámbito no municipal)'
  },

  plomo: {
    id: 'plomo',
    colorName: 'Plomo / Gris',
    category: 'Vidrio',
    subtitle: 'Botellas, frascos y piezas de vidrio',
    colorHex: '#64748B',
    accentBg: 'bg-slate-600',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    borderClass: 'border-slate-500',
    textColor: 'text-slate-700',
    iconName: 'Wine',
    description: 'Destinado al almacenamiento de botellas y recipientes de vidrio íntegros o rotos, limpios y libres de tapas o corchos.',
    whatGoesIn: [
      'Botellas de vidrio de bebidas (cerveza, vino, gaseosa)',
      'Frascos de vidrio de café soluble, mermeladas y conservas',
      'Vasos o copas de vidrio (enteros o rotos)',
      'Frascos de perfume o cosméticos de vidrio limpios'
    ],
    whatDoesNotGoIn: [
      'Cerámica, loza o porcelana (Contenedor Negro)',
      'Espejos o vidrio laminado de vehículos (Contenedor Negro)',
      'Tubos fluorescentes o focos (Contenedor Rojo - Peligroso por mercurio)',
      'Frascos de medicamentos o reactivos químicos peligrosos (Contenedor Rojo)'
    ],
    frequentErrors: [
      'Botar tazas rotas de cerámica en vidrio (la cerámica no funde igual, va en Negro).',
      'Tirar fluorescentes o focos LED en vidrio (son peligrosos o RAEE).',
      'No advertir cuando hay vidrio roto cortante.'
    ],
    bestPractices: [
      'Retirar las tapas plásticas o metálicas y clasificarlas aparte.',
      'Si el vidrio está roto, envolverlo en papel grueso o cartón y rotular "VIDRIO ROTO".',
      'Enjuagar frascos que contuvieron alimentos o salsas.'
    ],
    ntpReference: 'NTP 900.058:2019 - Tabla 2 (Ámbito no municipal)'
  },

  rojo: {
    id: 'rojo',
    colorName: 'Rojo',
    category: 'Peligrosos',
    subtitle: 'Riesgo biológico, químico, reactivo o inflamable',
    colorHex: '#DC2626',
    accentBg: 'bg-red-600',
    badgeBg: 'bg-red-50 text-red-800 border-red-200',
    borderClass: 'border-red-600',
    textColor: 'text-red-700',
    iconName: 'AlertTriangle',
    description: 'Destinado exclusivamente a residuos que presentan características de peligrosidad: corrosividad, reactividad, explosividad, toxicidad, inflamabilidad o patogenicidad.',
    whatGoesIn: [
      'Trapos, waypes y aserrín contaminados con hidrocarburos o aceites',
      'Pilas alcalinas y baterías recargables gastadas',
      'Cartuchos de tóner y tinta de impresora',
      'Envases vacíos de disolventes, pinturas, reactivos químicos',
      'Luminarias, lámparas y tubos fluorescentes (contienen vapor de mercurio)',
      'Residuos biocontaminados del tópico médico (gasas, apósitos, guantes de examen)'
    ],
    whatDoesNotGoIn: [
      'Papel común o botellas plásticas sin contaminar (Contenedor Azul o Blanco)',
      'Restos de comida (Contenedor Marrón)',
      'Papel higiénico de servicios higiénicos comunes (Contenedor Negro)',
      'Chatarra metálica limpia (Contenedor Amarillo)'
    ],
    frequentErrors: [
      'Botar pilas en el basurero común (contaminan miles de litros de agua subterránea).',
      'Limpiar grasa con un trapo y botarlo al contenedor negro.',
      'Manipular fluorescentes rotos sin protección respiratoria.'
    ],
    bestPractices: [
      'Utilizar guantes de seguridad adecuados al manipular estos residuos.',
      'No mezclar sustancias químicas incompatibles en el mismo contenedor.',
      'Respetar el protocolo interno de entrega al operador especializado (EO-RS).'
    ],
    ntpReference: 'NTP 900.058:2019 - Tabla 2 (Ámbito no municipal)'
  },

  negro: {
    id: 'negro',
    colorName: 'Negro',
    category: 'No Aprovechables',
    subtitle: 'Residuos comunes no reciclables ni compostables',
    colorHex: '#1E293B',
    accentBg: 'bg-slate-900',
    badgeBg: 'bg-slate-100 text-slate-900 border-slate-300',
    borderClass: 'border-slate-800',
    textColor: 'text-slate-900',
    iconName: 'Trash2',
    description: 'Destinado a todo residuo común que no puede ser reciclado, valorizado ni aprovechado, cuyo destino final es el relleno sanitario autorizado.',
    whatGoesIn: [
      'Papel higiénico y pañuelos desechables usados',
      'Servilletas de papel con grasa de alimentos',
      'Envases y vasos de tecnopor (poliestireno expandido)',
      'Papel carbón y papel térmico de comprobantes de pago (tickets)',
      'Envolturas metalizadas de galletas, snacks y golosinas',
      'Colillas de cigarro apagadas',
      'Restos de vajilla de cerámica, loza o porcelana rotos',
      'Bolígrafos, plumones gastados y cintas adhesivas usadas'
    ],
    whatDoesNotGoIn: [
      'Hojas de papel limpias y secas (Contenedor Azul)',
      'Botellas de plástico PET vacías (Contenedor Blanco)',
      'Latas de atún o conservas (Contenedor Amarillo)',
      'Pilas o trapos con solventes (Contenedor Rojo)'
    ],
    frequentErrors: [
      'Usar el tacho negro para "todo lo que dé pereza clasificar", arruinando las metas de reciclaje de la empresa.',
      'Botar botellas plásticas o latas limpias aquí por descuido.',
      'Botar residuos químicos o pilas aquí.'
    ],
    bestPractices: [
      'Verificar siempre si el residuo puede ser aprovechado antes de optar por el negro.',
      'Cerrar adecuadamente las bolsas para evitar dispersión de olores.',
      'Comprender que reducir estos residuos ayuda a la meta de Cero Residuos al Relleno.'
    ],
    ntpReference: 'NTP 900.058:2019 - Tabla 2 (Ámbito no municipal)'
  }
};

export const CONTAINER_LIST = Object.values(CONTAINERS);
