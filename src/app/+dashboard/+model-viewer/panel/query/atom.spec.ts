import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Atom} from './atom';

describe('Atom', () => {
  it('should create an instance', () => {
    expect(new Atom()).toBeTruthy();
  });
});
