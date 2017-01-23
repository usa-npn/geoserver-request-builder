import { NpnGeoserverRequestBuilderPage } from './app.po';

describe('npn-geoserver-request-builder App', function() {
  let page: NpnGeoserverRequestBuilderPage;

  beforeEach(() => {
    page = new NpnGeoserverRequestBuilderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
