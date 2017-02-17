import { browser, element, by } from 'protractor';

export class IltisPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('il-root h1')).getText();
  }
}
