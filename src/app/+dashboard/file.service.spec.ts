import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { FileService } from './file.service';

describe('File Service', () => {
  beforeEachProviders(() => [FileService]);

  it('should ...',
      inject([FileService], (service: FileService) => {
    expect(service).toBeTruthy();
  }));
});
