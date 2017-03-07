import { TestBed, async, inject } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { BaseRequestOptions, HttpModule, Http, XHRBackend, Response, ResponseOptions } from "@angular/http";
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EffectsModule } from "@ngrx/effects";
import { NetworkEffectService, networkEffectReducer, GET_DATA } from "./network-effect.service";
import { StoreModule, INITIAL_REDUCER } from "@ngrx/store";
import { reducer } from "./app.module";

describe('AppComponent', () => {
  var networkEffectReducerSpy: jasmine.Spy;

  beforeEach(async(() => {
    networkEffectReducerSpy = jasmine
      .createSpy('networkEffectReducerSpy')
      .and.callFake(networkEffectReducer);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HttpModule,
        EffectsModule.run(NetworkEffectService),
        StoreModule.provideStore({
          data: networkEffectReducerSpy
        }, {
          data: {}
        })
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, baseRequestOptions) => {
            return new Http(backend, baseRequestOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should dispatch an event to get data'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    networkEffectReducerSpy.calls.reset();
    expect(networkEffectReducerSpy).not.toHaveBeenCalled();

    fixture.detectChanges();
    // Since dispatch happens in ngOnInit, detect changes must be called.
    expect(networkEffectReducerSpy).toHaveBeenCalledWith({}, {
      type: GET_DATA
    });
  }));

  it('should render data when returned', inject([MockBackend], (backend: MockBackend) => {
    const fixture = TestBed.createComponent(AppComponent);
    const body = { live: false };
    respondToFirst(backend, body);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toEqual(`Data: ${JSON.stringify(body, null, 2)}`.trim());
  }));

  it('should render error message when error fetching', inject([MockBackend], (backend: MockBackend) => {
    const fixture = TestBed.createComponent(AppComponent);
    const body = { live: false };
    backend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({
        status: 404,
        body: 'Not Found'
      })));
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toEqual(`There was an error.
  Data fetch failed`.trim());
  }));
});

function respondToFirst(backend, body) {
  backend.connections.subscribe((c: MockConnection) => {
    c.mockRespond(new Response(new ResponseOptions({
      body
    })))
  });
}