import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

interface PriceRange {
  value: string;
  label: string;
  min: number;
  max: number | null;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  collections: string[] = ['All', 'Couples', 'Friends', 'Customize'];
  selectedCollection: string = 'All';
  selectedPriceRange: string = 'all';
  priceRanges: PriceRange[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.generatePriceRanges();
      this.applyFilters();

      // Check for query params
      this.route.queryParams.subscribe(params => {
        if (params['collection']) {
          this.selectedCollection = params['collection'].charAt(0).toUpperCase() + 
                                  params['collection'].slice(1);
          this.applyFilters();
        }
      });
    });
  }

  generatePriceRanges(): void {
    if (this.products.length === 0) return;

    // Get min and max prices
    const prices = this.products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Calculate range intervals
    const range = maxPrice - minPrice;
    const interval = Math.ceil(range / 4); // Create 4 price ranges

    this.priceRanges = [
      {
        value: `0-${minPrice + interval}`,
        label: `Under ₹${minPrice + interval}`,
        min: 0,
        max: minPrice + interval
      },
      {
        value: `${minPrice + interval}-${minPrice + interval * 2}`,
        label: `₹${minPrice + interval} - ₹${minPrice + interval * 2}`,
        min: minPrice + interval,
        max: minPrice + interval * 2
      },
      {
        value: `${minPrice + interval * 2}-${minPrice + interval * 3}`,
        label: `₹${minPrice + interval * 2} - ₹${minPrice + interval * 3}`,
        min: minPrice + interval * 2,
        max: minPrice + interval * 3
      },
      {
        value: `${minPrice + interval * 3}-${maxPrice}`,
        label: `Over ₹${minPrice + interval * 3}`,
        min: minPrice + interval * 3,
        max: null
      }
    ];
  }

  filterByCollection(collection: string): void {
    this.selectedCollection = collection;
    this.applyFilters();
  }

  filterByPrice(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    // Apply collection filter
    if (this.selectedCollection !== 'All') {
      filtered = filtered.filter(product => 
        product.collection === this.selectedCollection
      );
    }

    // Apply price filter
    if (this.selectedPriceRange !== 'all') {
      const selectedRange = this.priceRanges.find(range => 
        range.value === this.selectedPriceRange
      );

      if (selectedRange) {
        filtered = filtered.filter(product => 
          product.price >= selectedRange.min && 
          (selectedRange.max === null || product.price <= selectedRange.max)
        );
      }
    }

    this.filteredProducts = filtered;
  }
} 