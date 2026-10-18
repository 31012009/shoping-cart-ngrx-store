import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, map, tap, timer } from 'rxjs';

export interface DummyCartApiResponse {
  success: true;
  actionType: string;
}

@Injectable({ providedIn: 'root' })
export class DummyCartApiService {
  syncMutation(action: Action): Observable<DummyCartApiResponse> {
    return timer(250).pipe(
      map(() => ({ success: true as const, actionType: action.type })),
      tap((response) => console.info('[Dummy Cart API] Mutation synced:', response.actionType, action))
    );
  }
}