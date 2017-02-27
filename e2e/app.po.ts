import { browser, element, by } from 'protractor';

export class NpnGeoserverRequestBuilderPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  clickButton(id: string) {
    element(by.id(id)).click();
  }

  getModelValue(ngmodel: string) {
    return element(by.model(ngmodel)).getText();
  }

  getAttributeValueById(id: string) {
    return element(by.id(id)).getAttribute('value');
  }

  clickDropdownLink(linkText: string) {
    element(by.linkText(linkText)).click();
  }
}
