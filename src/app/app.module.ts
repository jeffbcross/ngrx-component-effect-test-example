import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { combineReducers, INITIAL_REDUCER, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { networkEffectReducer, NetworkEffectService } from './network-effect.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EffectsModule.run(NetworkEffectService),
    StoreModule.provideStore(reducer, {
      data: {}
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

/**
 *
 * Solution to AOT functions borrowed from
 * https://github.com/ngrx/store/issues/190
 */
export function reducer(lazyLoaded = {}) {
  let allReducers = Object.assign({
    data: networkEffectReducer
  });
  return combineReducers(allReducers);
}