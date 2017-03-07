import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { GET_DATA, networkEffectReducer, NetworkEffectService } from './network-effect.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EffectsModule.run(NetworkEffectService),
    StoreModule.provideStore(combineReducers({
      data: networkEffectReducer
    }), {
      data: {}
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(store: Store<any>) {
    store.select('data')
      .subscribe(d => console.log('data', d));
    store.dispatch({type: GET_DATA })
  }
}
