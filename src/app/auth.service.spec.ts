import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('Dashboard Service', () => {
  beforeEachProviders(() => [AuthService]);

  it('should ...',
      inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
