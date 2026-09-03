import { Service, Product, JournalArticle, Testimonial } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'naturopathie',
    title: 'Naturopathie',
    subtitle: 'Bilan de vitalité & accompagnement personnalisé',
    description: 'Comprendre votre équilibre et mettre en place des habitudes adaptées à votre quotidien.',
    fullDescription: 'La naturopathie holistique considère l’individu dans sa globalité physique, émotionnelle et environnementale. À travers un bilan approfondi, nous identifions la cause profonde de vos déséquilibres (fatigue chronique, troubles digestifs, stress, désordres hormonaux) pour restaurer votre vitalité naturelle.',
    duration: '1h15',
    price: 85,
    category: 'naturopathie',
    benefits: [
      'Bilan d’hygiène de vie et de vitalité complet',
      'Programme de réglage alimentaire sur-mesure',
      'Recommandations personnalisées en phytothérapie et micronutrition',
      'Gestion naturelle du stress et optimisation du sommeil'
    ],
    protocolSteps: [
      'Anamnèse détaillée (hygiène de vie, alimentation, antécédents, émotions)',
      'Évaluation de la force vitale et de l’écosystème intestinal',
      'Co-construction d’un plan d’action réaliste et personnalisé',
      'Fiche de synthèse claire remise sous 48h avec suivi dédié'
    ],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85',
    quote: '« La médecine de demain consistera à donner à chacun l’envie et les outils de prendre soin de son propre équilibre. »'
  },
  {
    id: 'reflexologie-plantaire',
    title: 'Réflexologie plantaire',
    subtitle: 'Soin neuro-tégumentaire & reconnexion corporelle',
    description: 'Une approche sensorielle pour favoriser détente, équilibre et reconnexion au corps.',
    fullDescription: 'Chaque zone du pied est le miroir d’un organe ou d’une fonction physiologique. Par des pressions douces, précises et rythmées sur les zones réflexes, ce soin stimule le système nerveux autonome pour apaiser les tensions, relancer les circulations et procurer un lâcher-prise immédiat.',
    duration: '1h00',
    price: 75,
    category: 'reflexologie-plantaire',
    benefits: [
      'Relâchement des tensions nerveuses et musculaires',
      'Stimulation des émonctoires et drainage des toxines',
      'Amélioration de la qualité du sommeil et de la digestion',
      'Sentiment d’ancrage profond et d’apaisement mental'
    ],
    protocolSteps: [
      'Temps d’échange court et bain de pieds chaud aux sels minéraux et lavande',
      'Massage relaxant préparatoire aux huiles botaniques bio',
      'Travail réflexe ciblé selon vos besoins du moment',
      'Réveil musculaire doux et conseils d’ancrage'
    ],
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=85',
    quote: '« Les pieds soutiennent la terre que nous foulons ; en prendre soin, c’est réenraciner l’esprit. »'
  },
  {
    id: 'reflexologie-faciale',
    title: 'Réflexologie faciale',
    subtitle: 'Soin doux & lissage des tensions du visage',
    description: 'Un soin doux et précis autour du visage pour accompagner votre bien-être.',
    fullDescription: 'Inspiré de la réflexologie Dien Chan et du soin Kobido holistique, ce massage facial stimule les points réflexes et les trajets lymphatiques du visage. Il favorise l’éclat naturel du teint tout en apportant une relaxation nerveuse d’une grande finesse.',
    duration: '45 min',
    price: 65,
    category: 'reflexologie-faciale',
    benefits: [
      'Détente musculaire des traits et lissage de l’expression',
      'Oxygénation des tissus et éclat de la peau',
      'Apaisement de la charge mentale et de la fatigue oculaire',
      'Activation de la micro-circulation et du drainage lymphatique'
    ],
    protocolSteps: [
      'Nettoyage doux avec nos huiles végétales pures',
      'Pression des zones réflexes avec outils en quartz et doigts',
      'Massage sculptant et lissant aux élixirs botaniques',
      'Application d’une brume florale rafraîchissante'
    ],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    quote: '« Le visage est le reflet de nos équilibres intérieurs : un soin doux ravive sa lumière native. »'
  },
  {
    id: 'hygiene-de-vie',
    title: 'Hygiène de vie',
    subtitle: 'Conseils personnalisés & routines de saison',
    description: 'Des conseils personnalisés pour construire un quotidien plus équilibré, naturellement.',
    fullDescription: 'L’équilibre ne s’obtient pas par la rigidité, mais par l’écoute harmonieuse de vos rythmes de vie. Cette séance thématique se concentre sur la création de routines durables : alimentation vivante, chronobiologie, respiration guidée et rituels saisonniers.',
    duration: '50 min',
    price: 60,
    category: 'hygiene-de-vie',
    benefits: [
      'Compréhension de votre chronobiologie naturelle',
      'Routines matinales et nocturnes sur-mesure',
      'Exercices de cohérence cardiaque et de respiration',
      'Adaptation de votre mode de vie au fil des saisons'
    ],
    protocolSteps: [
      'Analyse de votre rythme quotidien (travail, repos, alimentation)',
      'Définition d’objectifs simples et non-culpabilisants',
      'Expérimentation guidée de techniques respiratoires',
      'Remise du guide pratique « Routines de Saison »'
    ],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
    quote: '« La simplicité des rituels quotidiens est le fondement de la santé durable. »'
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'huile-botanique',
    name: 'Huile Botanique Rééquilibrante',
    subtitle: 'Sauge, Jojoba & Calendula Bio',
    price: 42,
    volume: '50 ml',
    category: 'huiles',
    description: 'Huile de soin visage et corps formulée par pression à froid. Apaise les épidermes sensibles, régule le sébum et apporte un fini satiné sans film gras.',
    ingredients: ['Huile de Jojoba bio', 'Macerat de Calendula', 'Huile essentielle de Sauge sclarée', 'Vitamine E naturelle'],
    usage: 'Appliquer 3 à 4 gouttes matin et soir sur peau propre en effleurages ascendants.',
    image: 'https://images.unsplash.com/photo-1608248597263-000796df9c11?auto=format&fit=crop&w=800&q=85',
    isBestseller: true
  },
  {
    id: 'tisane-racines',
    name: 'Infusion Racines & Sérénité',
    subtitle: 'Frêne, Reine-des-prés & Mélisse',
    price: 18,
    volume: '100 g (Vrac)',
    category: 'infusions',
    description: 'Mélange synergique de plantes médicinales sauvages récoltées à la main en France. Favorise l’apaisement digestif et la détente nerveuse du soir.',
    ingredients: ['Mélisse officinale', 'Feuilles de Frêne', 'Reine-des-prés', 'Fleurs de Mauve'],
    usage: 'Infuser 1 cuillère à soupe dans une eau à 85°C pendant 7 à 10 minutes.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=85',
    isNew: true
  },
  {
    id: 'gua-sha-quartz',
    name: 'Gua Sha en Quartz Rose Artisanal',
    subtitle: 'Pierre naturelle polie à la main',
    price: 34,
    volume: 'Pièce unique',
    category: 'accessoires',
    description: 'Outil traditionnel de réflexologie faciale sculpté dans du quartz rose pur. Stimule les méridiens du visage et détend les traits.',
    ingredients: ['100% Quartz Rose naturel certifié', 'Pochette en lin naturel'],
    usage: 'À utiliser en combinaison avec notre Huile Botanique du centre vers l’extérieur du visage.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'baume-alpes',
    name: 'Baume Nourrissant aux Plantes',
    subtitle: 'Beurre de Karité & Lavande fine',
    price: 28,
    volume: '60 ml',
    category: 'baumes',
    description: 'Baume réparateur intense pour zones sèches et pieds fatigués. Enrichi aux huiles végétales de montagne pour une nutrition réparatrice profonde.',
    ingredients: ['Beurre de Karité brut', 'Huile de Tournesol bio', 'Cire d’abeille bio', 'Lavande fine de Provence'],
    usage: 'Masser délicatement sur les pieds ou zones sèches avant le coucher.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'elixir-vitalite',
    name: 'Gouttes Élixir Adaptogène',
    subtitle: 'Rhodiola, Ashwagandha & Cynorrhodon',
    price: 36,
    volume: '30 ml',
    category: 'elixirs',
    description: 'Concentré de plantes adaptogènes bio pour soutenir l’organisme face au stress physique et mental, sans effet d’excitation.',
    ingredients: ['Extrait hydro-alcoolique de Rhodiola Rosea', 'Ashwagandha bio', 'Cynorrhodon', 'Glycérine végétale'],
    usage: '15 à 20 gouttes diluées dans un verre d’eau le matin à jeun.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85',
    isBestseller: true
  }
];

export const ARTICLES_DATA: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'Comprendre sa chronobiologie pour optimiser son énergie',
    excerpt: 'Comment aligner vos repas, votre travail et vos temps de repos avec les rythmes hormonaux naturels du corps.',
    category: 'Alimentation',
    readTime: '6 min',
    date: '14 Août 2026',
    author: 'Élise Vernier — Naturopathe',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=85',
    contentParagraphs: [
      'Notre organisme réagit à une horloge interne de 24 heures synchronisée par la lumière du soleil. Respecter cette chronobiologie est la clé pour éviter le réveil difficile et le coup de pompe de 15h.',
      'En naturopathie, nous recommandons de privilégier un petit-déjeuner protéiné et lipidique (œufs, oléagineux, pain au levain) pour stimuler la dopamine du matin, tout en évitant les sucres rapides qui provoquent une hypoglycémie réactionnelle.',
      'Le soir, l’apport en glucides complexes doux (courge, patate douce, quinoa) favorise l’assimilation du tryptophane, précurseur de la sérotonine et de la mélatonine nécessaires à un sommeil récupérateur.'
    ],
    keyTakeaways: [
      'Petit-déjeuner protéiné dès le réveil',
      'Exposition à la lumière naturelle avant 9h',
      'Repas du soir léger et pris 3 heures avant d’aller se coucher'
    ]
  },
  {
    id: 'art-2',
    title: 'Les bienfaits de la réflexologie plantaire contre l’anxiété',
    excerpt: 'Une plongée dans le fonctionnement neuro-tégumentaire du pied et son lien direct avec le système nerveux parasympathique.',
    category: 'Réflexologie',
    readTime: '5 min',
    date: '02 Août 2026',
    author: 'Élise Vernier — Réflexologue',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=85',
    contentParagraphs: [
      'La plante de nos pieds comporte plus de 7200 terminaisons nerveuses. Lorsqu’elles sont stimulées avec une pression appropriée, un message réflexe est transmis au cerveau via la moelle épinière.',
      'Cette stimulation active le système nerveux parasympathique — le frein de notre organisme —, entraînant la baisse immédiate du taux de cortisol sanguin et du rythme cardiaque.',
      'Une séance mensuelle de réflexologie plantaire permet de désamorcer les tensions accumulées avant qu’elles ne se traduisent par des somatisations digestives ou musculaires.'
    ],
    keyTakeaways: [
      '7200 terminaisons nerveuses connectées au système nerveux central',
      'Baisse mesurable du cortisol dès la première séance',
      'Action préventive sur les troubles psychosomatiques'
    ]
  },
  {
    id: 'art-3',
    title: 'Sommeil réparateur : 4 rituels simples pour déconnecter du mental',
    excerpt: 'Des gestes simples à intégrer une heure avant le coucher pour préparer le corps au repos profond.',
    category: 'Sommeil',
    readTime: '4 min',
    date: '24 Juillet 2026',
    author: 'Élise Vernier',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85',
    contentParagraphs: [
      'Le sommeil ne commence pas au moment où vous éteignez la lumière, mais dès le coucher du soleil. La lumière bleue des écrans inhibe la sécrétion naturelle de mélatonine pendant près de 2 heures.',
      'Remplacer les écrans par un bain de pieds chaud aux sels de magnésium permet de dériver l’excès de chaleur et d’énergie du mental vers la périphérie du corps.',
      'Associez cette pratique à 5 minutes de respiration carrée pour faire baisser la fréquence des ondes cérébrales.'
    ],
    keyTakeaways: [
      'Coupure des écrans 60 minutes avant d’éteindre',
      'Bain de pieds chaud au sel de magnésium',
      'Respiration carrée (4s inspiration, 4s rétention, 4s expiration, 4s rétention)'
    ]
  },
  {
    id: 'art-4',
    title: 'Gérer le stress par les plantes adaptogènes',
    excerpt: 'Découverte de la Rhodiola et de l’Ashwagandha : des alliés botaniques pour renforcer votre résistance globale.',
    category: 'Gestion du stress',
    readTime: '7 min',
    date: '11 Juillet 2026',
    author: 'Élise Vernier',
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=800&q=85',
    contentParagraphs: [
      'Les plantes adaptogènes possèdent la capacité unique d’accroître la résistance de l’organisme face aux facteurs de stress, qu’ils soient physiques, psychologiques ou environnementaux.',
      'Contrairement aux stimulants comme la caféine, les adaptogènes ne créent pas de dépendance ni d’épuisement des glandes surrénales.',
      'Un accompagnement naturopathique permet d’identifier la plante la plus adaptée à votre profil (plutôt épuisé ou plutôt hyperactif).'
    ],
    keyTakeaways: [
      'Soutien naturel des glandes surrénales',
      'Sans accoutumance ni excitation',
      'Utilisation en cures saisonnières de 3 semaines'
    ]
  },
  {
    id: 'art-5',
    title: 'Le soin réflexologique facial : éclat de la peau et sérénité',
    excerpt: 'Comment le lissage des points réflexes du visage redonne lumière au teint et apaisement au regard.',
    category: 'Réflexologie',
    readTime: '5 min',
    date: '28 Juin 2026',
    author: 'Élise Vernier',
    image: 'https://images.unsplash.com/photo-1512290900673-7002fc313815?auto=format&fit=crop&w=800&q=85',
    contentParagraphs: [
      'Le visage héberge des dizaines de zones réflexes en lien direct avec nos organes vitaux et notre système endocrinien.',
      'En travaillant sur ces points avec des pierres naturelles lisses comme le quartz ou l’obsidienne, nous relançons la circulation micro-capillaire et le drainage toxinique facial.',
      'Le résultat est immédiat : la peau retrouve son tonus, les ridules de tension s’adoucissent, et une sensation d’apaisement profond s’installe.'
    ],
    keyTakeaways: [
      'Double action : esthétique naturelle et apaisement nerveux',
      'Drainage lymphatique doux du contour des yeux',
      'Favorise la synthèse naturelle de collagène'
    ]
  },
  {
    id: 'art-6',
    title: 'L’art du brossage à sec : stimuler la lymphe en douceur',
    excerpt: 'Un geste quotidien de 3 minutes pour stimuler le renouvellement cellulaire et la circulation de retour.',
    category: 'Hygiène de vie',
    readTime: '4 min',
    date: '15 Juin 2026',
    author: 'Élise Vernier',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=85',
    contentParagraphs: [
      'Le système lymphatique est le grand système de nettoyage de notre corps. Contrairement au sang qui est propulsé par le cœur, la lymphe n’a pas de pompe dédiée.',
      'Le brossage à sec du matin, réalisé à l’aide d’une brosse en poils naturels sur peau sèche, stimule les ganglions lymphatiques et accélère l’élimination des déchets métaboliques.',
      'À pratiquer toujours des extrémités (mains et pieds) en remontant vers le cœur.'
    ],
    keyTakeaways: [
      'À pratiquer sur peau sèche avant la douche',
      'Mouvements doux orientés vers les ganglions lymphatiques',
      'Peau douce, tonifiée et sensation de légèreté immédiate'
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Élise a su poser les mots justes sur des déséquilibres que je traînais depuis des années. Son bilan de naturopathie a été une révélation douce, sans régimes punitifs. Je me sens reconnectée à mon corps.',
    author: 'Claire M.',
    service: 'Bilan de Naturopathie & Suivi 3 mois',
    city: 'Paris 7e'
  },
  {
    id: 't-2',
    quote: 'La réflexologie plantaire chez Les Racines du Bien-Être est une expérience hors du temps. La finesse des gestes et l’atmosphère apaisante m’ont procuré un apaisement mental inédit.',
    author: 'Julien D.',
    service: 'Réflexologie plantaire',
    city: 'Lyon Presqu’île'
  },
  {
    id: 't-3',
    quote: 'J’ai testé la réflexologie faciale avant mon mariage : au-delà de l’éclat bluffant de mon teint, j’ai ressenti une décharge de stress immédiate. Un soin rare d’une élégance rare.',
    author: 'Sophie L.',
    service: 'Réflexologie faciale & Soin Botanique',
    city: 'Paris 7e'
  }
];

export const PRACTITIONER_INFO = {
  name: 'Élise Vernier',
  title: 'Naturopathe certifiée FENA & Réflexologue holistique',
  bio: 'Formée aux méthodes traditionnelles et aux neurosciences du bien-être, j’accompagne chaque personne vers son propre équilibre en revenant aux piliers simples de la physiologie naturelle. Mon approche refuse l’ésotérisme et les diktats stricts pour privilégier l’écoute sensible, l’expertise scientifique et le bon sens.',
  diplomas: [
    'Diplômée de l’Institut Supérieur de Naturopathie (ISUPNAT Paris)',
    'Certifiée FENA (Fédération Française des Écoles de Naturopathie)',
    'Spécialisée en Réflexologie neuro-tégumentaire et Faciale (Dien Chan)',
    'Membre de l’OMNES (Organisation de la Médecine Naturelle et de l’Éducation Sanitaire)'
  ],
  quote: '« Réapprendre à écouter les signaux subtils du corps est le premier pas vers une santé souveraine. »'
};
