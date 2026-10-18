import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  changeQuantity,
  clearCart,
  removeItem,
  toggleAllSelection,
  toggleItemSelection
} from './cart.actions';
import { CartItem } from './cart.model';
import { selectCartItems, selectCartSummary, selectIsAllSelected, selectSelectedIds } from './cart.selectors';

interface CartProductDetails {
  image: string;
  imageAlt: string;
  category: string;
}

const PRODUCT_DETAILS: Record<string, CartProductDetails> = {
  'field-journal': {
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=320&q=80',
    imageAlt: 'Linen-covered field journal',
    category: 'Paper goods'
  },
  'weekend-mug': {
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=320&q=80',
    imageAlt: 'Hand-thrown stoneware mug',
    category: 'Kitchen'
  },
  'market-tote': {
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=320&q=80',
    imageAlt: 'Canvas market tote',
    category: 'Carry'
  },
  'desk-light': {
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=320&q=80',
    imageAlt: 'Sunday desk light',
    category: 'Home'
  },
  'slow-morning-candle': {
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=320&q=80',
    imageAlt: 'Slow morning candle',
    category: 'Home'
  },
  'daily-bottle': {
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=320&q=80',
    imageAlt: 'Daily reusable bottle',
    category: 'Carry'
  }
};

@Component({
  selector: 'app-cart',
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private readonly store = inject(Store);
  protected readonly items$ = this.store.select(selectCartItems);
  protected readonly selectedIds$ = this.store.select(selectSelectedIds);
  protected readonly summary$ = this.store.select(selectCartSummary);
  protected readonly summary = this.store.selectSignal(selectCartSummary);
  protected readonly allSelected$ = this.store.select(selectIsAllSelected);
  protected checkoutMessage = '';

  protected details(id: string): CartProductDetails | undefined {
    return PRODUCT_DETAILS[id];
  }

  protected toggleItem(id: string): void {
    this.store.dispatch(toggleItemSelection({ id }));
  }

  protected toggleAll(): void {
    this.store.dispatch(toggleAllSelection());
  }

  protected updateQuantity(id: string, amount: number): void {
    this.store.dispatch(changeQuantity({ id, amount }));
  }

  protected remove(id: string): void {
    this.store.dispatch(removeItem({ id }));
  }

  protected confirmClear(): void {
    if (window.confirm('Clear every item from your bag? This cannot be undone.')) {
      this.store.dispatch(clearCart());
    }
  }

  protected reviewCheckout(): void {
    const { selectedCount, selectedTotal } = this.summary();
    const total = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(selectedTotal);
    this.checkoutMessage = `${selectedCount} selected ${selectedCount === 1 ? 'item' : 'items'} · ${total} checkout subtotal. Checkout is ready to continue.`;
  }

  protected isSelected(selectedIds: string[] | null, item: CartItem): boolean {
    return selectedIds?.includes(item.id) ?? false;
  }
}