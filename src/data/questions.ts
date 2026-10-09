import { Question } from '../types';

export const EVALUATION_QUESTIONS: Question[] = [
  {
    id: 'q-01',
    type: 'multiple_choice',
    question: 'Según la NTP 900.058:2019 para el ámbito no municipal, ¿a qué color de contenedor corresponden los residuos de papel y cartón limpios y secos?',
    options: ['Blanco', 'Azul', 'Amarillo', 'Plomo o Gris'],
    correctAnswer: 1,
    explanation: 'El contenedor AZUL está destinado a papeles y cartones limpios y secos según la NTP 900.058:2019.',
    category: 'Papel y Cartón',
    difficulty: 'basico',
    relatedContainerId: 'azul'
  },
  {
    id: 'q-02',
    type: 'identify_container',
    question: 'Una botella plástica PET de gaseosa o agua de mesa vacía debe depositarse en el contenedor de color:',
    options: ['Azul', 'Blanco', 'Amarillo', 'Negro'],
    correctAnswer: 1,
    explanation: 'El contenedor BLANCO corresponde a los residuos plásticos aprovechables (botellas PET, PEAD, etc.).',
    category: 'Plástico',
    difficulty: 'basico',
    relatedContainerId: 'blanco'
  },
  {
    id: 'q-03',
    type: 'true_false',
    question: '¿Verdadero o Falso? Las servilletas de papel con grasa de alimentos y el papel higiénico usado pueden reciclarse en el contenedor azul de papel.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. La grasa y los fluidos contaminan el proceso de reciclaje de pulpa. Estos residuos deben ir al contenedor NEGRO (no aprovechables).',
    category: 'No Aprovechables',
    difficulty: 'intermedio',
    relatedContainerId: 'negro'
  },
  {
    id: 'q-04',
    type: 'multiple_choice',
    question: '¿Qué residuo corresponde al contenedor AMARILLO en una empresa?',
    options: [
      'Envases de plástico de champú',
      'Latas de aluminio y chatarra metálica limpia',
      'Cáscaras de plátano y restos de comida',
      'Pilas alcalinas y baterías'
    ],
    correctAnswer: 1,
    explanation: 'El contenedor AMARILLO almacena residuos metálicos (aluminio, hojalata, pernos, piezas metálicas limpias).',
    category: 'Metales',
    difficulty: 'basico',
    relatedContainerId: 'amarillo'
  },
  {
    id: 'q-05',
    type: 'multiple_choice',
    question: 'Un técnico de mantenimiento utiliza un trapo o waype para limpiar aceite lubricante de un motor. ¿En qué contenedor debe depositarlo?',
    options: ['Negro (No aprovechables)', 'Rojo (Peligrosos)', 'Amarillo (Metales)', 'Marrón (Orgánicos)'],
    correctAnswer: 1,
    explanation: 'El contenedor ROJO es para residuos peligrosos. El hidrocarburo convierte al textil en residuo inflamable y tóxico.',
    category: 'Peligrosos',
    difficulty: 'intermedio',
    relatedContainerId: 'rojo'
  },
  {
    id: 'q-06',
    type: 'multiple_choice',
    question: '¿A qué contenedor corresponden las cáscaras de frutas, borra de café y restos de comida cruda o cocida sin empaques?',
    options: ['Plomo o Gris', 'Marrón', 'Negro', 'Azul'],
    correctAnswer: 1,
    explanation: 'El contenedor MARRÓN está reservado para residuos orgánicos biodegradables para compostaje.',
    category: 'Orgánicos',
    difficulty: 'basico',
    relatedContainerId: 'marron'
  },
  {
    id: 'q-07',
    type: 'identify_container',
    question: 'Los frascos de conserva de vidrio y botellas de vidrio de bebidas corresponden al contenedor:',
    options: ['Plomo o Gris', 'Blanco', 'Azul', 'Negro'],
    correctAnswer: 0,
    explanation: 'El contenedor PLOMO O GRIS está destinado al almacenamiento de vidrio aprovechable.',
    category: 'Vidrio',
    difficulty: 'basico',
    relatedContainerId: 'plomo'
  },
  {
    id: 'q-08',
    type: 'multiple_choice',
    question: 'Se quiebra una taza de cerámica en la cocina de la oficina. ¿En qué contenedor debe disponerse?',
    options: ['Plomo o Gris (Vidrio)', 'Negro (No aprovechables)', 'Rojo (Peligrosos)', 'Blanco (Plástico)'],
    correctAnswer: 1,
    explanation: 'La cerámica o porcelana NO se funde a la misma temperatura que el vidrio y no es reciclable con el vidrio común. Va en el contenedor NEGRO.',
    category: 'No Aprovechables',
    difficulty: 'avanzado',
    relatedContainerId: 'negro'
  },
  {
    id: 'q-09',
    type: 'true_false',
    question: '¿Verdadero o Falso? Los tubos fluorescentes y focos ahorradores rotos deben tirarse al contenedor plomo de vidrio.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. Las luminarias contienen vapor de mercurio y metales pesados. Son residuos peligrosos y van al contenedor ROJO.',
    category: 'Peligrosos',
    difficulty: 'intermedio',
    relatedContainerId: 'rojo'
  },
  {
    id: 'q-10',
    type: 'multiple_choice',
    question: '¿Qué condición previa deben cumplir las botellas plásticas PET antes de ser colocadas en el contenedor blanco?',
    options: [
      'Deben estar llenas de agua para pesar más',
      'Deben estar vacías de líquidos, preferentemente aplastadas y limpias',
      'Deben quemarse antes de depositarlas',
      'No importa su estado ni si tienen gaseosa dentro'
    ],
    correctAnswer: 1,
    explanation: 'Deben estar sin líquido, aplastadas para optimizar el volumen del contenedor y sin grasa.',
    category: 'Plástico',
    difficulty: 'basico',
    relatedContainerId: 'blanco'
  },
  {
    id: 'q-11',
    type: 'multiple_choice',
    question: '¿Dónde se deben depositar los envases de tecnopor (poliestireno expandido) con restos de almuerzo?',
    options: ['Blanco (Plásticos)', 'Azul (Papel y cartón)', 'Negro (No aprovechables)', 'Marrón (Orgánicos)'],
    correctAnswer: 2,
    explanation: 'El tecnopor alimentario contaminado no tiene cadena de reciclaje viable y corresponde al contenedor NEGRO.',
    category: 'No Aprovechables',
    difficulty: 'intermedio',
    relatedContainerId: 'negro'
  },
  {
    id: 'q-12',
    type: 'multiple_choice',
    question: 'Un trabajador recibe un voucher o comprobante de pago impreso en papel térmico. ¿En qué contenedor debe desecharlo?',
    options: ['Azul (Papel)', 'Negro (No aprovechables)', 'Blanco (Plástico)', 'Amarillo (Metales)'],
    correctAnswer: 1,
    explanation: 'El papel térmico de tickets contiene sustancias químicas (como bisfenol) que arruinan el reciclaje del papel bond. Corresponde al contenedor NEGRO.',
    category: 'No Aprovechables',
    difficulty: 'avanzado',
    relatedContainerId: 'negro'
  },
  {
    id: 'q-13',
    type: 'true_false',
    question: '¿Verdadero o Falso? El film estirable (stretch film) limpio utilizado para embalar paletas en el almacén corresponde al contenedor blanco de plástico.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Verdadero. El stretch film es polietileno de baja densidad (PEBD) altamente reciclable si no contiene grasa ni tierra.',
    category: 'Plástico',
    difficulty: 'intermedio',
    relatedContainerId: 'blanco'
  },
  {
    id: 'q-14',
    type: 'multiple_choice',
    question: '¿Qué contenedor corresponde a las pilas alcalinas agotadas de linternas o mouses?',
    options: ['Amarillo (Metales)', 'Rojo (Peligrosos)', 'Negro (No aprovechables)', 'Plomo (Vidrio)'],
    correctAnswer: 1,
    explanation: 'Las pilas contienen metales pesados altamente contaminantes y corresponden obligatoriamente al contenedor ROJO.',
    category: 'Peligrosos',
    difficulty: 'basico',
    relatedContainerId: 'rojo'
  },
  {
    id: 'q-15',
    type: 'multiple_choice',
    question: 'En el comedor, una persona termina su gaseosa en botella de vidrio y retira la chapa metálica corona. ¿Cómo debe segregar ambos elementos?',
    options: [
      'Ambos van al contenedor plomo de vidrio',
      'Ambos van al contenedor amarillo de metales',
      'La botella al contenedor plomo y la chapa al contenedor amarillo',
      'Ambos van al contenedor negro de no aprovechables'
    ],
    correctAnswer: 2,
    explanation: 'Correcta segregación en origen: botella al contenedor PLOMO (vidrio) y la chapa corona al contenedor AMARILLO (metales).',
    category: 'Buenas Prácticas',
    difficulty: 'intermedio',
    relatedContainerId: 'plomo'
  },
  {
    id: 'q-16',
    type: 'multiple_choice',
    question: '¿Cuál es la mejor práctica al momento de desechar cajas de cartón en el contenedor azul?',
    options: [
      'Dejarlas armadas con aire adentro para amortiguar',
      'Desarmarlas y aplanarlas completamente para reducir volumen',
      'Llenarlas con restos de comida',
      'Mojarlas con abundante agua para que pesen menos'
    ],
    correctAnswer: 1,
    explanation: 'Desarmar y aplanar las cajas ahorra hasta un 80% de volumen en el contenedor azul y facilita su transporte.',
    category: 'Papel y Cartón',
    difficulty: 'basico',
    relatedContainerId: 'azul'
  },
  {
    id: 'q-17',
    type: 'true_false',
    question: '¿Verdadero o Falso? Las envolturas metalizadas de galletas y papas fritas deben arrojarse al contenedor amarillo de metales.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Falso. Aunque tienen brillo metálico, son películas multicapa plásticas con vapor de aluminio inseparables. Corresponden al contenedor NEGRO.',
    category: 'No Aprovechables',
    difficulty: 'intermedio',
    relatedContainerId: 'negro'
  },
  {
    id: 'q-18',
    type: 'multiple_choice',
    question: 'En el tópico médico de la sede se generan gasas y guantes con fluidos biológicos. ¿A qué contenedor pertenecen?',
    options: ['Negro (No aprovechables)', 'Rojo (Peligrosos / Biocontaminados)', 'Azul (Papel)', 'Marrón (Orgánicos)'],
    correctAnswer: 1,
    explanation: 'Son residuos biocontaminados con riesgo infeccioso y corresponden estrictamente al contenedor ROJO.',
    category: 'Peligrosos',
    difficulty: 'basico',
    relatedContainerId: 'rojo'
  },
  {
    id: 'q-19',
    type: 'multiple_choice',
    question: '¿Cuál de los siguientes residuos es considerado NO APROVECHABLE (contenedor negro)?',
    options: [
      'Hojas bond impresas secas',
      'Colillas de cigarro apagadas',
      'Cáscaras de naranja',
      'Latas de atún lavadas'
    ],
    correctAnswer: 1,
    explanation: 'Las colillas de cigarro son un residuo no aprovechable tóxico que debe ir al contenedor NEGRO.',
    category: 'No Aprovechables',
    difficulty: 'basico',
    relatedContainerId: 'negro'
  },
  {
    id: 'q-20',
    type: 'multiple_choice',
    question: '¿Cuál es el beneficio directo para la empresa y el medio ambiente al implementar la segregación según la NTP 900.058:2019?',
    options: [
      'Evitar multas y únicamente cumplir una formalidad en papel',
      'Aumentar la generación indiscriminada de basura hacia botaderos informales',
      'Fomentar la economía circular, valorizar residuos aprovechables y reducir la huella de carbono',
      'Eliminar todos los contenedores de las oficinas'
    ],
    correctAnswer: 2,
    explanation: 'La correcta segregación permite reinsertar materiales en ciclos productivos (economía circular), disminuyendo el impacto ambiental y optimizando la gestión SSOMA.',
    category: 'Sostenibilidad',
    difficulty: 'intermedio'
  }
];
