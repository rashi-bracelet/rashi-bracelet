import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  subtotal: number = 0;
  shipping: number = 0;
  copySuccess: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  private calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.shipping = this.subtotal > 0 ? 100 : 0; // ₹100 shipping, free over ₹1000
    this.total = this.subtotal + this.shipping;
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.product.id, newQuantity);
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.product.id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  proceedToCheckout(): void {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
  }

  copyToClipboard(): void {
    const cartText = this.cartItems.map(item => 
      `${item.product.name} (${item.product.collection}) - ₹${item.product.price} x ${item.quantity} = ₹${item.product.price * item.quantity}`
    ).join('\n');

    const summaryText = `\n\nSubtotal: ₹${this.subtotal}\nShipping: ₹${this.shipping}\nTotal: ₹${this.total}`;

    navigator.clipboard.writeText(cartText + summaryText).then(() => {
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 2000);
    });
  }
} 