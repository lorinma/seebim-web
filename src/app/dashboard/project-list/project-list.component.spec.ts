/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { ProjectListComponent } from './project-list.component';

describe('Component: ProjectList', () => {
  it('should create an instance', () => {
    let component = new ProjectListComponent();
    expect(component).toBeTruthy();
  });
});
