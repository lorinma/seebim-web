import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { EntityService } from './entity.service';

describe('Entity Service', () => {
  beforeEachProviders(() => [EntityService]);

  it('should ...',
      inject([EntityService], (service: EntityService) => {
    expect(service).toBeTruthy();
  }));
});
