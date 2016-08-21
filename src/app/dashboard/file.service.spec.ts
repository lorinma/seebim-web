/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { FileService } from './file.service';

describe('Service: File', () => {
  beforeEach(() => {
    addProviders([FileService]);
  });

  it('should ...',
    inject([FileService],
      (service: FileService) => {
        expect(service).toBeTruthy();
      }));
});
