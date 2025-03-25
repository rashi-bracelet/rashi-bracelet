export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  collection: 'All' | 'Couples' | 'Friends' | 'Customization';
  features: string[];
  materials: string[];
  inStock: boolean;
} 