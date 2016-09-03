import {
  describe,
  ddescribe,
  expect,
  iit,
  it
} from '@angular/core/testing';
import {Entity} from './entity';

describe('Entity', () => {
  it('should create an instance', () => {
    expect(new Entity()).toBeTruthy();
  });
});
