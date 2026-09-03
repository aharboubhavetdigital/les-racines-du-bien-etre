export type BoutiqueFilterCategory = 'TOUS' | 'ÉQUILIBRE' | 'DÉTENTE' | 'ÉNERGIE' | 'VISAGE' | 'CORPS' | 'ACCOMPAGNEMENT';

export interface BoutiqueSoin {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  filterCategories: BoutiqueFilterCategory[];
  description: string;
  fullDescription: string;
  duration: string;
  price?: number;
  image: string;
  isFeatured?: boolean;
  forWhom?: string[];
  sessionFlow?: string[];
  practicalInfo?: string[];
  quote?: string;
  bookingServiceId?: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  duration: string;
  price: number;
  category: 'naturopathie' | 'reflexologie-plantaire' | 'reflexologie-faciale' | 'hygiene-de-vie';
  benefits: string[];
  protocolSteps: string[];
  image: string;
  quote: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  volume: string;
  category: 'huiles' | 'infusions' | 'accessoires' | 'baumes' | 'elixirs' | 'complements' | string;
  fullCategory?: 'Compléments alimentaires' | 'Huiles' | 'Maison & rituel' | string;
  route?: string;
  description: string;
  ingredients: string[];
  usage: string;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  category: 'Alimentation' | 'Équilibre' | 'Sommeil' | 'Gestion du stress' | 'Réflexologie' | 'Hygiène de vie';
  readTime: string;
  date: string;
  author: string;
  image: string;
  contentParagraphs: string[];
  keyTakeaways: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  service: string;
  city: string;
}

export interface BookingState {
  serviceId: string;
  location: 'Institut Belle et Zen — Saint-Lô' | 'Le Chant des Oiseaux — Normandie' | 'Consultation en Ligne (Visio)';
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}
