import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  cartTotal: number = 0;
  isDarkTheme: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe(items => {
      this.cartItemCount = items.length;
      this.cartTotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    });

    this.themeService.isDarkTheme$.subscribe(
      isDark => this.isDarkTheme = isDark
    );
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  onCollectionChange(collection: string): void {
    this.router.navigate(['/products'], { 
      queryParams: { collection: collection.toLowerCase() } 
    });
  }
} 