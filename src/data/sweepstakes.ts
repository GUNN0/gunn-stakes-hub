export interface Sweepstake {
  id: string;
  name: string;
  logo: string;
  reward: string;
  category: string;
  affLink: string;
  endDate?: string;
}

// Sample sweepstakes data - replace with your actual affiliate links
export const sweepstakesData: Sweepstake[] = [
  {
    id: "1",
    name: "$10,000 Cash Giveaway",
    logo: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=100&h=100&fit=crop",
    reward: "$10,000 Cash",
    category: "Cash Prizes",
    affLink: "https://example.com/sweepstakes1",
    endDate: "Dec 31, 2025"
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    logo: "https://images.unsplash.com/photo-1592286927505-53d47e40e4c9?w=100&h=100&fit=crop",
    reward: "Latest iPhone",
    category: "Tech & Gadgets",
    affLink: "https://example.com/sweepstakes2",
    endDate: "Jan 15, 2026"
  },
  {
    id: "3",
    name: "Dream Vacation to Bali",
    logo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&h=100&fit=crop",
    reward: "All-Expense Paid Trip",
    category: "Travel & Vacation",
    affLink: "https://example.com/sweepstakes3",
    endDate: "Feb 1, 2026"
  },
  {
    id: "4",
    name: "$5,000 Shopping Spree",
    logo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop",
    reward: "$5,000 Gift Card",
    category: "Shopping Spree",
    affLink: "https://example.com/sweepstakes4",
    endDate: "Dec 25, 2025"
  },
  {
    id: "5",
    name: "Tesla Model 3 Giveaway",
    logo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop",
    reward: "Brand New Tesla",
    category: "Automotive",
    affLink: "https://example.com/sweepstakes5",
    endDate: "Mar 1, 2026"
  },
  {
    id: "6",
    name: "MacBook Pro M3",
    logo: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
    reward: "Latest MacBook Pro",
    category: "Tech & Gadgets",
    affLink: "https://example.com/sweepstakes6",
    endDate: "Jan 20, 2026"
  },
  {
    id: "7",
    name: "$25,000 Grand Prize",
    logo: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=100&h=100&fit=crop",
    reward: "$25,000 Cash",
    category: "Cash Prizes",
    affLink: "https://example.com/sweepstakes7",
    endDate: "Apr 1, 2026"
  },
  {
    id: "8",
    name: "Mediterranean Cruise",
    logo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop",
    reward: "7-Day Luxury Cruise",
    category: "Travel & Vacation",
    affLink: "https://example.com/sweepstakes8",
    endDate: "Feb 14, 2026"
  },
  {
    id: "9",
    name: "PlayStation 5 Bundle",
    logo: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&h=100&fit=crop",
    reward: "PS5 + Games",
    category: "Tech & Gadgets",
    affLink: "https://example.com/sweepstakes9",
    endDate: "Jan 10, 2026"
  }
];
