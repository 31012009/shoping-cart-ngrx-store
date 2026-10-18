import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addItem } from '../cart/cart.actions';
import { CartItem } from '../cart/cart.model';
import { selectCartItems } from '../cart/cart.selectors';

interface Product {
  item: CartItem;
  category: string;
  detail: string;
  image: string;
  imageAlt: string;
  tone: string;
  badge?: string;
}

const PRODUCTS: Product[] = [
  {
    item: { id: 'field-journal', name: 'Field Journal', price: 24, quantity: 1 },
    category: 'Paper goods',
    detail: 'Recycled paper · 192 pages',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Open linen-covered journal on a wooden table',
    tone: 'journal',
    badge: 'Bestseller'
  },
  {
    item: { id: 'weekend-mug', name: 'Weekend Mug', price: 32, quantity: 1 },
    category: 'Kitchen',
    detail: 'Hand-thrown stoneware · 12 oz',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Handmade ceramic cup with a warm glaze',
    tone: 'mug'
  },
  {
    item: { id: 'market-tote', name: 'Market Tote', price: 38, quantity: 1 },
    category: 'Carry',
    detail: 'Heavyweight cotton canvas',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Natural canvas carryall with leather details',
    tone: 'tote',
    badge: 'Small batch'
  },
  {
    item: { id: 'desk-light', name: 'Sunday Desk Light', price: 68, quantity: 1 },
    category: 'Home',
    detail: 'Powder-coated steel · 3 settings',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Sculptural table lamp lighting a quiet room',
    tone: 'lamp'
  },
  {
    item: { id: 'slow-morning-candle', name: 'Slow Morning Candle', price: 28, quantity: 1 },
    category: 'Home',
    detail: 'Soy wax · cedar and bergamot',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'A lit candle in an amber glass vessel',
    tone: 'candle'
  },
  {
    item: { id: 'daily-bottle', name: 'Daily Bottle', price: 36, quantity: 1 },
    category: 'Carry',
    detail: 'Double-wall stainless steel · 20 oz',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Reusable water bottle in a soft natural color',
    tone: 'bottle'
  }
];

@Component({
  selector: 'app-products',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly store = inject(Store);
  protected readonly products = PRODUCTS;
  protected readonly categories = ['All goods', 'Paper goods', 'Kitchen', 'Carry', 'Home'];
  protected readonly cartItems$ = this.store.select(selectCartItems);
  protected selectedCategory = 'All goods';

  protected get visibleProducts(): Product[] {
    return this.selectedCategory === 'All goods'
      ? this.products
      : this.products.filter((product) => product.category === this.selectedCategory);
  }

  protected setCategory(category: string): void {
    this.selectedCategory = category;
  }

  protected addToCart(item: CartItem): void {
    this.store.dispatch(addItem({ item }));
  }

  protected quantityInCart(items: CartItem[] | null, id: string): number {
    return items?.find((item) => item.id === id)?.quantity ?? 0;
  }
}