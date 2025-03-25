import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    // 35 Rupees Products
    {
      id: 1,
      name: 'Crystal Bracelet',
      description: 'A beautiful bracelet made with Sky Blue and Pink quartz crystals, perfect for couples.',
      price: 35,
      imageUrl: 'assets/images/35 Rupees/IMG_5853.JPG',
      collection: 'All',
      features: ['Sky Blue and Pink Quartz', 'Adjustable Size'],
      materials: ['Sky Blue and Pink Quartz', 'Crystal'],
      inStock: true
    },
    // 40 Rupees Products
    {
      id: 2,
      name: 'Friendship Crystal Band',
      description: 'Celebrate your friendship with this stunning amethyst crystal bracelet.',
      price: 40,
      imageUrl: 'assets/images/40 Rupees/IMG_6386.JPG',
      collection: 'Friends',
      features: ['Amethyst Crystal', 'Friendship Charm', 'Durable Cord'],
      materials: ['Amethyst', 'Nylon Cord', 'Crystal'],
      inStock: true
    },
    // 55 Rupees Products
    {
      id: 3,
      name: 'Custom Birthstone Bracelet',
      description: 'Personalized bracelet with your choice of birthstone crystal.',
      price: 55,
      imageUrl: 'assets/images/55 Rupees/IMG_6460.PNG',
      collection: 'Customization',
      features: ['Custom Birthstone', 'Name Engraving', 'Gift Box'],
      materials: ['Various Crystals', 'Crystal'],
      inStock: true
    },
    // 80 Rupees Products
    {
      id: 4,
      name: 'Elegant Crystal Set 1',
      description: 'A stunning set of crystal bracelets perfect for any occasion.',
      price: 80,
      imageUrl: 'assets/images/80 Rupees/IMG_6454.PNG',
      collection: 'All',
      features: ['Multiple Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Mixed Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 5,
      name: 'Elegant Crystal Set 2',
      description: 'Another beautiful set of crystal bracelets.',
      price: 80,
      imageUrl: 'assets/images/80 Rupees/IMG_6453.PNG',
      collection: 'Friends',
      features: ['Multiple Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Mixed Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 6,
      name: 'Elegant Crystal Set 3',
      description: 'A unique set of crystal bracelets.',
      price: 80,
      imageUrl: 'assets/images/80 Rupees/IMG_6323.JPG',
      collection: 'All',
      features: ['Multiple Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Mixed Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 7,
      name: 'Elegant Crystal Set 4',
      description: 'A special set of crystal bracelets.',
      price: 80,
      imageUrl: 'assets/images/80 Rupees/IMG_4210.JPG',
      collection: 'Friends',
      features: ['Multiple Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Mixed Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 8,
      name: 'Elegant Crystal Set 5',
      description: 'A beautiful set of crystal bracelets.',
      price: 80,
      imageUrl: 'assets/images/80 Rupees/IMG_4193.JPG',
      collection: 'Friends',
      features: ['Multiple Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Mixed Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 9,
      name: 'Elegant Crystal Set 6',
      description: 'A stunning set of crystal bracelets.',
      price: 80,
      imageUrl: 'assets/images/80 Rupees/IMG_4173.JPG',
      collection: 'Friends',
      features: ['Multiple Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Mixed Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 10,
      name: 'Elegant Crystal Set 7',
      description: 'A unique set of crystal bracelets.',
      price: 80,
      imageUrl: 'assets/images/80 Rupees/IMG_4165.JPG',
      collection: 'Friends',
      features: ['Multiple Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Mixed Crystals', 'Crystal'],
      inStock: true
    },
    // 120 Rupees Products
    {
      id: 11,
      name: 'Premium Crystal Collection 1',
      description: 'Luxurious crystal bracelet set with premium stones.',
      price: 120,
      imageUrl: 'assets/images/120 Rupees/IMG_6209.JPG',
      collection: 'Friends',
      features: ['Premium Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Premium Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 12,
      name: 'Premium Crystal Collection 2',
      description: 'Another luxurious crystal bracelet set.',
      price: 120,
      imageUrl: 'assets/images/120 Rupees/IMG_6199.JPG',
      collection: 'Customization',
      features: ['Premium Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Premium Crystals', 'Crystal'],
      inStock: true
    },
    // 140 Rupees Products
    {
      id: 13,
      name: 'Deluxe Crystal Set',
      description: 'Exquisite crystal bracelet set with rare stones.',
      price: 140,
      imageUrl: 'assets/images/140 Rupees/IMG_5964.JPG',
      collection: 'Couples',
      features: ['Rare Crystals', 'Gift Box', 'Adjustable Size'],
      materials: ['Rare Crystals', 'Crystal'],
      inStock: true
    },
    // 150 Rupees Products
    {
      id: 14,
      name: 'Luxury Crystal Collection 1',
      description: 'The most premium crystal bracelet set available.',
      price: 150,
      imageUrl: 'assets/images/150 Rupees/IMG_6007.JPG',
      collection: 'Couples',
      features: ['Luxury Crystals', 'Premium Gift Box', 'Adjustable Size'],
      materials: ['Luxury Crystals', 'Crystal'],
      inStock: true
    },
    {
      id: 15,
      name: 'Luxury Crystal Collection 2',
      description: 'Another premium crystal bracelet set.',
      price: 150,
      imageUrl: 'assets/images/150 Rupees/IMG_5997.JPG',
      collection: 'Couples',
      features: ['Luxury Crystals', 'Premium Gift Box', 'Adjustable Size'],
      materials: ['Luxury Crystals', 'Crystal'],
      inStock: true
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  filterProducts(collection?: string, minPrice?: number, maxPrice?: number): void {
    let filteredProducts = [...this.products];

    if (collection) {
      filteredProducts = filteredProducts.filter(p => p.collection === collection);
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    this.productsSubject.next(filteredProducts);
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
} 