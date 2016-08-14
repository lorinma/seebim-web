import { SeebimWebPage } from './app.po';

describe('seebim-web App', function() {
  let page: SeebimWebPage;

  beforeEach(() => {
    page = new SeebimWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
