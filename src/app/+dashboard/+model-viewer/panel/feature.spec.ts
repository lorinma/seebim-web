import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Feature} from './feature';

describe('Feature', () => {
  it('should create an instance', () => {
    expect(new Feature()).toBeTruthy();
  });
});
