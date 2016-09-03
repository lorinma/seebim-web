export class SeeBIMPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('see-bim-app h1')).getText();
  }
}
