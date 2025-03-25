import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.itemsSubject.subscribe(items => {
      this.items = items;
      this.updateTotal();
    });
  }

  getItems(): Observable<CartItem[]> {
    return this.itemsSubject.asObservable();
  }

  getTotal(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  addItem(product: Product): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    
    this.itemsSubject.next([...this.items]);
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.itemsSubject.next([...this.items]);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
      } else {
        this.itemsSubject.next([...this.items]);
      }
    }
  }

  clearCart(): void {
    this.items = [];
    this.itemsSubject.next([]);
  }

  copyToClipboard(): string {
    return this.items
      .map(item => `${item.product.name} - ${item.quantity}`)
      .join('\n');
  }

  private updateTotal(): void {
    const total = this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.totalSubject.next(total);
  }
} 