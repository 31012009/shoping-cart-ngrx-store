import { createReducer, on } from '@ngrx/store';
import {
  addItem,
  changeQuantity,
  clearCart,
  removeItem,
  toggleAllSelection,
  toggleItemSelection
} from './cart.actions';
import { CartItem, initialCartState } from './cart.model';

export const cartReducer = createReducer(
  initialCartState,
  on(addItem, (state, { item }) => {
    const existing = state.items.find((cartItem) => cartItem.id === item.id);
    if(existing){
        return {
            ...state,
            items: state.items.map((cartItem) =>
                cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ),
        }
    }
    return {
        ...state,
        items: [...state.items, { ...item, quantity: 1 }]
    }
    
    const items = existing
      ? state.items.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      : [...state.items, { ...item, quantity: 1 }];
    return {
      ...state,
      items,
      selectedIds: state.selectedIds.includes(item.id)
        ? state.selectedIds
        : [...state.selectedIds, item.id]
    };
  }),
  on(removeItem, (state, { id }) => ({
    items: state.items.filter((item) => item.id !== id),
    selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id)
  })),
  on(changeQuantity, (state, { id, amount }) => {
    const target = state.items.find((item) => item.id === id);
    if (!target) return state;
    const nextQuantity = target.quantity + amount;
    if (nextQuantity < 1) {
      return {
        items: state.items.filter((item) => item.id !== id),
        selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id)
      };
    }
    return {
      ...state,
      items: state.items.map((item) => item.id === id ? { ...item, quantity: nextQuantity } : item)
    };
  }),
  on(toggleItemSelection, (state, { id }) => ({
    ...state,
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter((selectedId) => selectedId !== id)
      : [...state.selectedIds, id]
  })),
  on(toggleAllSelection, (state) => ({
    ...state,
    selectedIds: state.selectedIds.length === state.items.length
      ? []
      : state.items.map((item) => item.id)
  })),
  on(clearCart, () => initialCartState)
);

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}