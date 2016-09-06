/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';

describe('Service: Project', () => {
  beforeEach(() => {
    addProviders([ProjectService]);
  });

  it('should ...',
    inject([ProjectService],
      (service: ProjectService) => {
        expect(service).toBeTruthy();
      }));
});
