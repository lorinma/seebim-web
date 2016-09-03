import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { SeeBIMAppComponent } from '../app/see-bim.component';

beforeEachProviders(() => [SeeBIMAppComponent]);

describe('App: SeeBIM', () => {
  it('should create the app',
      inject([SeeBIMAppComponent], (app: SeeBIMAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'see-bim works!\'',
      inject([SeeBIMAppComponent], (app: SeeBIMAppComponent) => {
    expect(app.title).toEqual('see-bim works!');
  }));
});
