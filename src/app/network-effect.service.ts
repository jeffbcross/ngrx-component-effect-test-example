import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

export const GET_DATA = 'GetData';
export const DATA_NOT_GOTTEN = 'DataNotGotten';
export const DATA_GOTTEN = 'DataGotten';

export interface NetDataState {
  live: boolean;
}

export function networkEffectReducer(state, action) {
  console.log('state/action:', state, '/', action);
  switch(action.type) {
    case GET_DATA:
      return state;
    case DATA_GOTTEN:
      console.log('returning new state', action.payload)
      return action.payload;
    case DATA_NOT_GOTTEN:
      return { error: 'Data fetch failed' };
    default:
      console.log('no type to match', action.type);
  }

  return state;
}

@Injectable()
export class NetworkEffectService {

  constructor(private http: Http, private actions$: Actions) { }

  @Effect() data$ = this.actions$
      // Listen for the 'GET_DATA' action
      .ofType(GET_DATA)
      .switchMap(payload => this.http.get('/assets/live-server.json')
        // If successful, dispatch success action with result
        .map(res => ({ type: DATA_GOTTEN, payload: res.json() }))
        // If request fails, dispatch failed action
        .catch(() => Observable.of({ type: DATA_NOT_GOTTEN }))
      );

}
