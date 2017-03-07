import { TestBed, inject } from '@angular/core/testing';

import { NetworkEffectService } from './network-effect.service';

describe('NetworkEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkEffectService]
    });
  });

  it('should ...', inject([NetworkEffectService], (service: NetworkEffectService) => {
    expect(service).toBeTruthy();
  }));
});
