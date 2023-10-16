import { TestBed } from '@angular/core/testing';

import { ForgetpasswordService } from './forgetpassword.service';

describe('ForgetpasswordService', () => {
  let service: ForgetpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
