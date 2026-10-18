import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.model';

export const addItem = createAction('[Cart] Add item', props<{ item: CartItem }>());
export const removeItem = createAction('[Cart] Remove item', props<{ id: string }>());
export const changeQuantity = createAction(
  '[Cart] Change quantity',
  props<{ id: string; amount: number }>()
);
export const toggleItemSelection = createAction(
  '[Cart] Toggle item selection',
  props<{ id: string }>()
);
export const toggleAllSelection = createAction('[Cart] Toggle all selection');
export const clearCart = createAction('[Cart] Clear cart');