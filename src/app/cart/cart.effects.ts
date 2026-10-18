import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { EMPTY, catchError, concatMap } from 'rxjs';
import {
  addItem,
  changeQuantity,
  clearCart,
  removeItem,
  toggleAllSelection,
  toggleItemSelection
} from './cart.actions';
import { DummyCartApiService } from './dummy-cart-api.service';

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartApi = inject(DummyCartApiService);

  readonly syncCartMutation$ = createEffect(
    () => this.actions$.pipe(
      ofType(
        addItem,
        changeQuantity,
        toggleItemSelection,
        toggleAllSelection,
        removeItem,
        clearCart
      ),
      concatMap((action: Action) => 
        this.cartApi.syncMutation(action).pipe(catchError(() => EMPTY)))
    ),
    { dispatch: false }
  );
}