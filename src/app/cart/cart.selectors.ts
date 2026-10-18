import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';
import { getCartSubtotal } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');
export const selectCartItems = createSelector(selectCartState, (state) => state.items);
export const selectSelectedIds = createSelector(selectCartState, (state) => state.selectedIds);
export const selectCartCount = createSelector(
  selectCartItems,
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);
export const selectIsAllSelected = createSelector(
  selectCartState,
  (state) => state.items.length > 0 && state.selectedIds.length === state.items.length
);
export const selectCartSummary = createSelector(selectCartState, (state) => {
  const selectedItems = state.items.filter((item) => state.selectedIds.includes(item.id));
  return {
    itemCount: state.items.reduce((count, item) => count + item.quantity, 0),
    selectedCount: selectedItems.reduce((count, item) => count + item.quantity, 0),
    cartTotal: getCartSubtotal(state.items),
    selectedTotal: getCartSubtotal(selectedItems)
  };
});