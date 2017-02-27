import { NpnGeoserverRequestBuilderPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('npn-geoserver-request-builder App', function() {
  let page: NpnGeoserverRequestBuilderPage;

  beforeEach(() => {
    page = new NpnGeoserverRequestBuilderPage();
  });

  it('should have no height and width set on first wms button click', () => {
    page.navigateTo();
    page.clickButton('wms-button');
    expect(page.getAttributeValueById('bbox_height')).toEqual('');
    expect(page.getAttributeValueById('bbox_width')).toEqual('');
  });

  it('should have no height and width 800x1700 after selecting wms layer', () => {
    page.clickButton('layersDropdownMenu');
    page.clickDropdownLink('Daily Maximum Temperatures');
    expect(page.getAttributeValueById('bbox_height')).toEqual('800');
    expect(page.getAttributeValueById('bbox_width')).toEqual('1700');
  });

});
