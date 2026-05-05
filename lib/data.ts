import { BankingProduct, VideoTutorial } from './types';

export const MOCK_PRODUCTS: BankingProduct[] = [
  {
    id: '1',
    bankName: 'HBL (Habib Bank Limited)',
    bankLogo: 'https://picsum.photos/seed/hbl/100/100',
    productName: 'HBL Small Business Finance',
    loanAmount: { min: 500000, max: 15000000, currency: 'PKR' },
    purpose: ['Working Capital', 'Expansion'],
    sectors: ['Retail', 'Wholesale', 'Manufacturing'],
    cities: ['Karachi', 'Lahore', 'Islamabad', 'Quetta', 'Peshawar'],
    markup: '12% - 15%',
    serviceFees: '1%',
    lastUpdated: '2025-04-10',
    description: 'Tailored financing for small enterprises to manage daily operations and scale their business.',
    applicationUrl: '#'
  },
  {
    id: '2',
    bankName: 'Meezan Bank',
    bankLogo: 'https://picsum.photos/seed/meezan/100/100',
    productName: 'SME Karobar Financing',
    loanAmount: { min: 1000000, max: 25000000, currency: 'PKR' },
    purpose: ['Asset Purchase', 'Working Capital'],
    sectors: ['Agriculture', 'Textile', 'Food'],
    cities: ['All Cities'],
    markup: 'KIBOR + 3%',
    serviceFees: 'PKR 5,000 fixed',
    lastUpdated: '2025-05-01',
    description: 'Shariah-compliant financing solutions for small and medium businesses across Pakistan.',
    applicationUrl: '#'
  },
  {
    id: '3',
    bankName: 'Bank Alfalah',
    bankLogo: 'https://picsum.photos/seed/alfalah/100/100',
    productName: 'Alfalah SME Quick Finance',
    loanAmount: { min: 500000, max: 5000000, currency: 'PKR' },
    purpose: ['Emergency Funds', 'Inventory'],
    sectors: ['Services', 'Retail'],
    cities: ['Major Cities'],
    markup: 'Competitive',
    serviceFees: '0.5%',
    lastUpdated: '2025-04-20',
    description: 'Fast-track financing for urgent business needs with minimal documentation.',
    applicationUrl: '#'
  },
  {
    id: '4',
    bankName: 'National Bank of Pakistan (NBP)',
    bankLogo: 'https://picsum.photos/seed/nbp/100/100',
    productName: 'NBP Saibaan SME',
    loanAmount: { min: 100000, max: 10000000, currency: 'PKR' },
    purpose: ['Infrastructure', 'Agri-processing'],
    sectors: ['Agriculture', 'Manufacturing'],
    cities: ['All Cities'],
    markup: 'Government Subsidized',
    serviceFees: 'Minimal',
    lastUpdated: '2025-03-15',
    description: 'Subsidized loan schemes for youth and established SMEs in designated sectors.',
    applicationUrl: '#'
  }
];

export const MOCK_VIDEOS: VideoTutorial[] = [
  { id: 'v1', title: 'How to apply for PMYBL', thumbnail: 'https://picsum.photos/seed/v1/400/225', duration: '5:30', url: '#' },
  { id: 'v2', title: 'Understanding KIBOR Rates', thumbnail: 'https://picsum.photos/seed/v2/400/225', duration: '3:45', url: '#' },
  { id: 'v3', title: 'Financial Literacy for SMEs', thumbnail: 'https://picsum.photos/seed/v3/400/225', duration: '12:10', url: '#' },
  { id: 'v4', title: 'SBP Refinance Schemes Explained', thumbnail: 'https://picsum.photos/seed/v4/400/225', duration: '8:20', url: '#' },
  { id: 'v5', title: 'Choosing the right Bank', thumbnail: 'https://picsum.photos/seed/v5/400/225', duration: '4:15', url: '#' }
];
