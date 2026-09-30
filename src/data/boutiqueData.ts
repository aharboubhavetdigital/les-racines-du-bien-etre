import { BoutiqueSoin } from '../types';

export const BOUTIQUE_SOINS: BoutiqueSoin[] = [
  {
    id: 'reflexologie-plantaire',
    slug: 'reflexologie-plantaire',
    title: 'Réflexologie plantaire',
    subtitle: 'Soin neuro-tégumentaire & reconnexion corporelle',
    categoryTag: 'RÉFLEXOLOGIE',
    filterCategories: ['DÉTENTE', 'CORPS', 'ÉQUILIBRE'],
    description: 'Une approche sensorielle du pied pour favoriser le lâcher-prise, apaiser le système nerveux et dénouer les tensions.',
    fullDescription: 'Chaque zone réflexe du pied résonne avec une fonction physiologique ou un organe. Par des pressions douces et rythmées, ce soin stimule le système nerveux parasympathique pour décharger le stress acumulé, relancer les fluides corporels et procurer un ancrage profond.',
    duration: '60 MIN',
    price: 75,
    image: 'https://racines-v2.vercel.app/images/reflexologie-plantaire.jpeg',
    isFeatured: true,
    forWhom: [
      'Personnes sujettes au stress chronique, insomnies ou irritabilité',
      'Besoin d’ancrage mental et de reconnexion corporelle',
      'Tensions musculaires de la voûte plantaire et des jambes'
    ],
    sessionFlow: [
      'Temps d’accueil et échange personnalisé sur vos besoins du moment',
      'Bain de pieds chaud infusé aux sels minéraux et huile essentielle de lavande bio',
      'Travail réflexe ciblé et rythmé aux huiles botaniques de première pression',
      'Réveil musculaire tout en douceur et conseils d’ancrage pour la journée'
    ],
    practicalInfo: [
      'Lieu : Institut Belle et Zen (Saint-Lô) ou Le Chant des Oiseaux (Normandie)',
      'Prévoir des vêtements souples et confortables',
      'Contre-indications relatives : phlébite récente ou premier trimestre de grossesse'
    ],
    quote: '« Les pieds soutiennent la terre que nous foulons ; en prendre soin, c’est réenraciner l’esprit. »',
    bookingServiceId: 'reflexologie-plantaire'
  },
  {
    id: 'naturopathie',
    slug: 'bilan-naturopathie',
    title: 'Bilan de Naturopathie & Vitalité',
    subtitle: 'Bilan d’hygiène de vie & accompagnement sur-mesure',
    categoryTag: 'NATUROPATHIE',
    filterCategories: ['ACCOMPAGNEMENT', 'ÉQUILIBRE'],
    description: 'Un bilan approfondi pour comprendre la source de vos déséquilibres et co-construire une hygiène de vie personnalisée.',
    fullDescription: 'La naturopathie holistique explore votre fonctionnement global (alimentation, sommeil, stress, digestion, rythmes). Lors de ce bilan, nous identifions vos leviers d’énergie et définissons un programme clair et réaliste pour agir sur l’origine des symptômes.',
    duration: '75 MIN',
    price: 85,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    forWhom: [
      'Fatigue tenace, baisse de vitalité ou coups de pompe quotidiens',
      'Troubles digestifs, ballonnements ou sensibilité intestinale',
      'Volonté d’adopter une alimentation vivante et de réguler son sommeil'
    ],
    sessionFlow: [
      'Anamnèse globale (antécédents, habitudes alimentaires, chronobiologie)',
      'Évaluation de la vitalité et identification des facteurs de déséquilibre',
      'Co-construction d’une stratégie progressive (alimentation, plantes, respiration)',
      'Fiche de conseils sur-mesure transmise sous 48 heures'
    ],
    practicalInfo: [
      'En cabinet (Saint-Lô / Normandie) ou en visioconférence',
      'Possibilité de venir avec vos récents examens de santé si besoin'
    ],
    quote: '« Le corps possède les clés de son propre équilibre lorsqu’on lui offre l’environnement adapté. »',
    bookingServiceId: 'naturopathie'
  },

  {
    id: 'reflexologie-faciale',
    slug: 'reflexologie-faciale-kobido',
    title: 'Réflexologie faciale & Soin Kobido',
    subtitle: 'Lissage des tensions du visage & éclat naturel',
    categoryTag: 'RÉFLEXOLOGIE FACIALE',
    filterCategories: ['VISAGE', 'DÉTENTE'],
    description: 'Un soin doux et sculptant combinant stimulation des points réflexes du visage et lissage des traits de fatigue.',
    fullDescription: 'Inspiré des traditions asiatiques et du soin réflexe faciale, ce soin stimule la circulation micro-capillaire et le drainage lymphatique du visage. Il dénoue les crispations des mâchoires et du front pour révéler un teint lumineux et apaiser la charge mentale.',
    duration: '45 MIN',
    price: 65,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    forWhom: [
      'Fatigue visuelle, crispations des mâchoires ou céphalées de tension',
      'Recherche d’un soin visage naturel apportant éclat et déconnexion mentale',
      'Teint terne et besoin d’oxygénation des tissus'
    ],
    sessionFlow: [
      'Purification douce du visage à la brume florale et aux huiles pures',
      'Pression rythmée des points réflexes du visage et du cuir chevelu',
      'Soin lissant aux pierres naturelles de quartz rose et huiles botaniques',
      'Application d’un baume réconfortant'
    ],
    practicalInfo: [
      'Séance réalisée installé(e) confortablement sur table chauffée',
      'Soin idéal en préparation d’un événement ou en routine mensuelle'
    ],
    quote: '« Le visage reflète les équilibres intérieurs : un geste attentif ravive sa lumière. »',
    bookingServiceId: 'reflexologie-faciale'
  },
  {
    id: 'hygiene-de-vie',
    slug: 'conseils-hygiene-de-vie',
    title: 'Routines & Hygiène de vie',
    subtitle: 'Conseils personnalisés & rituels de saison',
    categoryTag: 'CONSEILS & ROUTINES',
    filterCategories: ['ACCOMPAGNEMENT', 'ÉQUILIBRE'],
    description: 'Une séance thématique pour structurer vos rituels quotidiens : alimentation, chronobiologie et gestion du rythme.',
    fullDescription: 'L’hygiène de vie s’articule autour de petits gestes constants. Cette consultation permet d’ajuster vos horaires de repas, vos pauses respiratoires et vos routines de coucher afin de prévenir le surmenage sans rigidité.',
    duration: '50 MIN',
    price: 60,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    forWhom: [
      'Horaires décalés, surcharge de travail ou difficulté à déconnecter',
      'Volonté d’instaurer des routines matinales et nocturnes efficaces',
      'Recherche de simplicité et d’autonomie au quotidien'
    ],
    sessionFlow: [
      'Bilan rapide de vos rythmes actuels et de vos contraintes',
      'Définition de 3 rituels clés simples à mettre en œuvre',
      'Apprentissage de techniques de respiration de cohérence cardiaque',
      'Remise d’un guide synthétique personnalisé'
    ],
    practicalInfo: [
      'Disponible en présentiel ou à distance (visio)'
    ],
    quote: '« La simplicité des rituels réguliers soutient la santé durable. »',
    bookingServiceId: 'hygiene-de-vie'
  },
  {
    id: 'rituel-phyto-energie',
    slug: 'rituel-vitalite-phyto-energie',
    title: 'Rituel Vitalité Phyto & Énergie',
    subtitle: 'Plantes adaptogènes & harmonisation globale',
    categoryTag: 'PHYTOTHÉRAPIE',
    filterCategories: ['ÉNERGIE', 'ÉQUILIBRE'],
    description: 'Un soin stimulant qui réveille la vitalité par l’association de plantes aromatiques et de pressions dynamisantes.',
    fullDescription: 'Conçu pour les périodes de grande transition ou d’épuisement saisonnier, ce soin associe l’inhalation de sérums phyto-actifs à des manœuvres de dynamisation corporelle pour débloquer l’énergie stagnante.',
    duration: '60 MIN',
    price: 80,
    image: 'https://images.unsplash.com/photo-1512290900676-26c2a6a095ae?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    forWhom: [
      'Sensation de baisse d’énergie ou de brouillard mental',
      'Périodes de changement de saison ou de convalescence',
      'Besoin d’un coup de fouet naturel et réconfortant'
    ],
    sessionFlow: [
      'Olfactions de synergies d’huiles essentielles stimulantes',
      'Pression des méridiens du dos, des bras et des jambes',
      'Application de sérums vivifiants aux plantes',
      'Dégustation d’une infusion revitalisante faite maison'
    ],
    practicalInfo: [
      'Accompagné d’une fiche de recommandation d’herboristerie'
    ],
    quote: '« Les plantes sauvages transmettent leur puissance vitale à ceux qui les accueillent. »',
    bookingServiceId: 'naturopathie'
  },
  {
    id: 'suivi-saison',
    slug: 'suivi-naturopathique-de-saison',
    title: 'Suivi Naturopathique de Saison',
    subtitle: 'Ajustements nutritionnels & soutien d’inter-saison',
    categoryTag: 'SUIVI NUTRITION',
    filterCategories: ['ACCOMPAGNEMENT', 'ÉQUILIBRE'],
    description: 'Une séance de point d’étape pour adapter votre hygiène de vie aux besoins changeants des 4 saisons.',
    fullDescription: 'Chaque saison exige des ajustements physiologiques (renforcement immunitaire en automne, détox au printemps, protection nerveuse en hiver). Ce suivi fait le bilan de vos avancées et affine vos recommandations.',
    duration: '45 MIN',
    price: 65,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=85',
    isFeatured: false,
    forWhom: [
      'Personnes ayant déjà réalisé un premier bilan de naturopathie',
      'Besoin de réajuster sa nutrition et ses compléments avant la saison froide',
      'Maintien d’une dynamique d’autonomie de santé'
    ],
    sessionFlow: [
      'Bilan des réussites et des difficultés depuis la dernière séance',
      'Ajustement du plan d’action alimentaire et micronutritionnel',
      'Introduction des plantes de saison adaptées à votre profil'
    ],
    practicalInfo: [
      'Réservé aux personnes ayant déjà effectué leur bilan initial'
    ],
    quote: '« S’harmoniser avec le rythme des saisons est l’assurance d’une vitalité préservée. »',
    bookingServiceId: 'naturopathie'
  }
];
