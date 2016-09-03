import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Project} from './project';

describe('Project', () => {
  it('should create an instance', () => {
    expect(new Project()).toBeTruthy();
  });
});
