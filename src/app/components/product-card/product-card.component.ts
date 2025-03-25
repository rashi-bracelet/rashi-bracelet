import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  quantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      const cartItem = items.find(item => item.product.id === this.product.id);
      this.quantity = cartItem ? cartItem.quantity : 0;
    });
  }

  addToCart(): void {
    if (this.quantity === 0) {
      this.quantity = 1;
    }
    this.cartService.addItem(this.product);
  }

  updateQuantity(change: number): void {
    const newQuantity = this.quantity + change;
    if (newQuantity > 0) {
      this.quantity = newQuantity;
      this.cartService.updateQuantity(this.product.id, newQuantity);
    } else if (newQuantity === 0) {
      this.quantity = 0;
      this.cartService.removeItem(this.product.id);
    }
  }
} 