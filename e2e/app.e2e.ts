import { SeeBIMPage } from './app.po';

describe('see-bim App', function() {
  let page: SeeBIMPage;

  beforeEach(() => {
    page = new SeeBIMPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('see-bim works!');
  });
});
