import { TestBed, inject } from '@angular/core/testing';

import { RxAnimationsService } from './rx-animations.service';

describe('RxAnimationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RxAnimationsService]
    });
  });

  it('should be created', inject([RxAnimationsService], (service: RxAnimationsService) => {
    expect(service).toBeTruthy();
  }));
});
