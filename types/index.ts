export interface FlowerSeed {
  id: string;
  bengaliName: string;
  englishName: string;
  scientificName: string;
  seedCount: string;
  germinationRate: string;
  germinationDays: string;
  bloomTime: string;
  suitableFor: string;
  colorScheme: string[];
  description: string;
  iconType: string;
  accentColor: string;
  tag: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  gardenType: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  highlight: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingTier {
  id: string;
  title: string;
  bengaliSubtitle: string;
  packs: number;
  price: number;
  regularPrice: number;
  savings: number;
  deliveryFee: number;
  isPopular?: boolean;
  freeGifts: string[];
}
