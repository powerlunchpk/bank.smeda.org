export interface BankingProduct {
  id: string;
  bankName: string;
  bankLogo: string;
  productName: string;
  loanAmount: {
    min: number;
    max: number;
    currency: string;
  };
  purpose: string[];
  sectors: string[];
  cities: string[];
  markup: string;
  serviceFees: string;
  lastUpdated: string;
  description: string;
  applicationUrl: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export type SortOption = 'recently_updated' | 'a-z' | 'z-a';

export interface FilterState {
  purpose: string[];
  sector: string[];
  bank: string[];
  city: string[];
  loanAmount: number | null;
}
