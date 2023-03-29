import { TestBed } from '@angular/core/testing';

import { BiomatricRegistrationService } from './biomatric-registration.service';

describe('BiomatricRegistrationService', () => {
  let service: BiomatricRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiomatricRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
