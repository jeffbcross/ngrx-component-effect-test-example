import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';


import { GET_DATA, NetDataState } from './network-effect.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Observable<NetDataState>;
  constructor(private store: Store<any>) {
    this.data = store.select('data');
  }

  ngOnInit() {
    this.store.dispatch({
      type: GET_DATA
    });
  }
}
