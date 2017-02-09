import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GeoserverService } from './geoserver.service';
import { GeoserverLayer } from './geoserver-layer';
import { GeoserverFormat } from './geoserver-format';
import { projections, Projection } from './projection';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { getCaption } from './captions';
import * as proj4 from 'proj4';


declare const require: any;

@Component({
  selector: 'request-builder-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'USA-NPN Geoserver Request Builder';

  today = new Date();
  year = this.today.getFullYear();
  previousYear = this.year - 1;

  service: string;
  urlWidth: number;
  urlHeight: number;
  selectedLayer: GeoserverLayer;
  selectedFormat: GeoserverFormat;
  selectedProjection: Projection;
  years: number[] = [];
  minDate: string;
  maxDate: string;
  selectedDate: string;
  selectedYear: number = this.previousYear;
  selectedDoy: number;
  stateBorders: boolean = false;
  showColorRamp: boolean = true;
  validationErrorModalTitle: String;
  validationErrorModalBody: String;
  yearlyTimeStep: boolean = false;
  projections = projections;
  showAlaskaProjection = false;

  @ViewChild('validationErrorModal')
  validationErrorModal: ModalComponent;

  constructor(private _geoserverService: GeoserverService,
              private cdr: ChangeDetectorRef) { }

  selectedDateChange(event) {
    if (event.value && event.value.target && event.value.target.children[0]) {
      this.selectedDate = event.value.target.children[0].value;
    }
    this.cdr.detectChanges();
  }

  setService(service: string) {
    this.service = service;
    this.selectedFormat = null;
  }

  selectedLayerHasDate(): boolean {
    return this.selectedLayer && this.selectedLayer.dimension === 'time' && !this.yearlyTimeStep;
  }

  selectedLayerHasYear(): boolean {
    return this.selectedLayer && this.selectedLayer.dimension === 'time' && this.yearlyTimeStep;
  }

  selectedLayerHasDoy(): boolean {
    return this.selectedLayer && this.selectedLayer.dimension === 'elevation';
  }

  isSelected(button): boolean {
    return button === this.service;
  }

  getSelectedLayer(): string {
    if (this.selectedLayer) {
      return this.selectedLayer.title;
    } else {
      return 'Select a Layer';
    }
  }
  setSelectedLayer(layer: GeoserverLayer): void {
    const now: any = new Date();
    this.showAlaskaProjection = false;
    if (layer.name.includes('alaska')) {
      this.showAlaskaProjection = true;
    }
    if (layer.dimensionRange.includes('1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,')) {
      const start: any = new Date(now.getFullYear(), 0, 0);
      const diff: any = now - start;
      const oneDay: number = 1000 * 60 * 60 * 24;
      const day: any = Math.floor(diff / oneDay);
      this.selectedDoy = day;
      this.selectedDate = null;
    }
    if (layer.dimensionRange.includes('1981')) {
      this.selectedDoy = null;
      this.selectedDate = (now.getFullYear() - 1).toString() + '-01-01';
      this.selectedYear = now.getFullYear() - 1;
      this.yearlyTimeStep = true;
      this.setYears(1981, this.previousYear);
    }
    if (layer.dimensionRange.includes('1880')) {
      this.selectedDoy = null;
      this.selectedDate = '2013-01-01';
      this.selectedYear = 2013;
      this.yearlyTimeStep = true;
      this.setYears(1880, 2013);
    }
    if (layer.dimensionRange.includes('2017-01-01') || layer.name.includes('alaska')) {
      this.selectedDoy = null;
      this.selectedDate = now.toISOString().slice(0, 10);
      this.yearlyTimeStep = false;
    }
    if (layer.name.includes('ncep_historic') || layer.name.includes('anomaly_historic')) {
      this.selectedDoy = null;
      this.selectedDate = '2016-01-01';
      this.selectedYear = 2016;
      this.yearlyTimeStep = true;
      this.setYears(2016, this.previousYear);
    }
    this.selectedLayer = layer;
    this.initializeSelectedProjection('4269');
    this.setSelectedProjection(this.selectedProjection);
  }


  setYears(minYear, maxYear) {
    this.years = [];
    for (let i = minYear; i <= maxYear; i++) {
      this.years.push(i);
    }
    return this.years;
  }

  getFormats(): GeoserverFormat[] {
    if (this.service === 'wms') {
      return this._geoserverService.wmsFormats;
    } else {
      return this._geoserverService.wcsFormats;
    }
  }

  getSelectedFormat(): string {
    if (this.selectedFormat) {
      return this.selectedFormat.name;
    } else {
      return 'Select a Format';
    }
  }

  getProjections(): Projection[] {
    return this.projections;
  }

  setSelectedFormat(format: GeoserverFormat): void {
    this.selectedFormat = format;
    if (format.name === 'openlayers') {
      this.urlHeight = 800;
      this.urlWidth =  1600;
    }
  }

  getSelectedProjection(): string {
    if (this.selectedProjection) {
      return this.selectedProjection.name;
    } else {
      return 'Select a Projection';
    }
  }

  initializeSelectedProjection(epsg: string): void {
    projections.forEach((projection) => {
      if (projection.epsg === epsg) {
        this.selectedProjection = projection;
      }
    });
  }

  setSelectedProjection(projection: Projection): void {
    this.selectedProjection = projection;
    if (this.selectedLayer) {
      this.selectedLayer.crs = `EPSG:${projection.epsg}`;
      if (this.selectedLayer.name.includes('alaska')) {
        if (projection.epsg === '3857') {
          this.setExtent(-20010000, -14000000, 6300000, 11900000);
          this.setWidthAndHeight(1080, 800);
        } else if (projection.epsg === '2163') {
          this.setExtent(-4380000, -1000000, 1200000, 4350000);
          this.setWidthAndHeight(900, 800);
        } else if (projection.epsg === '5936') {
          this.setExtent(-200000, 3800000, -2300000, 70000);
          this.setWidthAndHeight(1200, 700);
        } else {
          this.setExtent(-179.948909, -125.97851777, 50.20503422, 72.665162);
          this.setWidthAndHeight(1600, 800);
        }
      } else if (this.selectedLayer.name.includes('best')) {
        if (projection.epsg === '3857') {
          this.setExtent(-20500000, 3500000, -200000, 19000000);
          this.setWidthAndHeight(1000, 800);
        } else if (projection.epsg === '2163') {
          this.setExtent(-6000000, 9100000, -4800000, 5000000);
          this.setWidthAndHeight(1300, 800);
        } else {
          this.setExtent(-180.0, 0.0, 0.0, 90.0);
          this.setWidthAndHeight(1600, 800);
        }
      } else {
        if (projection.epsg === '3857') {
          this.setExtent(-14000000, -7000000, 2700000, 6450000);
          this.setWidthAndHeight(1500, 800);
        } else if (projection.epsg === '2163') {
          this.setExtent(-2300000, 2700000, -2200000, 850000);
          this.setWidthAndHeight(1300, 800);
        } else {
          this.setExtent(-125.0208333, -66.4791667, 24.0625, 49.9375);
          this.setWidthAndHeight(1700, 800);
        }
      }
    }
  }

  setExtent(miny: number, maxy: number, minx: number, maxx: number): void {
    this.selectedLayer.miny = miny;
    this.selectedLayer.maxy = maxy;
    this.selectedLayer.minx = minx;
    this.selectedLayer.maxx = maxx;
  }

  setWidthAndHeight(width: number, height: number) {
    this.urlWidth = width;
    this.urlHeight = height;
  }

  getDimensionRange(): string {
    const rightNow = new Date();
    const res = rightNow.toISOString().slice(0, 10);

    if (!this.selectedLayer) {
      return 'Select a layer to view its dimension range.';
    }
    if (this.selectedLayer.name.includes('ncep_historic') || this.selectedLayer.name.includes('anomaly_historic')) {
      this.minDate = '2016-01-01';
      this.maxDate = (rightNow.getFullYear() - 1).toString() + '-01-01';
      return '2016-01-01 Through ' + (rightNow.getFullYear() - 1).toString() + '-01-01';
    }
    if (this.selectedLayer.dimensionRange.includes('1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,')) {
      return '1-365';
    }
    if (this.selectedLayer.dimensionRange.includes('1981')) {
      this.minDate = '1981-01-01';
      this.maxDate = (rightNow.getFullYear() - 1).toString() + '-01-01';
      return '1981-01-01 Through ' + (rightNow.getFullYear() - 1).toString() + '-01-01';
    }
    if (this.selectedLayer.dimensionRange.includes('1880')) {
      this.minDate = '1880-01-01';
      this.maxDate = '2013-01-01';
      return '1880-01-01 Through 2013-01-01';
    }
    if (this.selectedLayer.dimensionRange.includes('2016-01-01')) {
      this.minDate = '2016-01-01';
      this.maxDate = res;
      return '2016-01-01 Through ' + res;
    } else {
      this.minDate = (rightNow.getFullYear() - 1).toString() + '-01-01'
      this.maxDate = res;
      return this.minDate + ' Through ' + this.maxDate;
    }
  }

  getLayerStyle(layer: GeoserverLayer): string {
    if (layer.name.includes('tmin') || layer.name.includes('tmax')) {
      return 'climate:celsius_web';
    }
    if (layer.name.includes('leaf_anomaly') || layer.name.includes('bloom_anomaly')) {
      return 'si-x:leaf_anomaly_black';
    }
    if (layer.name.includes('leaf_best')) {
      return 'si-x:leafout_best_web';
    }
    if (layer.name.includes('bloom_best')) {
      return 'si-x:bloom_best_web';
    }
    if (layer.name.includes('leaf')) {
      return 'si-x:leafout_bimonthly_web';
    }
    if (layer.name.includes('bloom')) {
      return 'si-x:bloom_bimonthly_web';
    }
    if (layer.name.includes('agdd_anomaly')) {
      return null;
    }
    if (layer.name.includes('agdd')) {
      return 'gdd:agdd_web';
    }
  }

  getLayerColorRampUrl(): string {
    if (this.selectedLayer) {
      let colorRampUrl = this.selectedLayer.legendUrl;
      const style = this.getLayerStyle(this.selectedLayer);
      if (style) {
        colorRampUrl += ('&style=' + style);
      }
      return colorRampUrl;
    } else {
      return '';
    }
  }

  projectCoord(lat: number, long: number) {
    proj4.defs([
      [
        'EPSG:4326',
        '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees'],
      [
        'EPSG:4269',
        '+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees'
      ],
      [
        'EPSG:2163',
        '+proj=laea +lat_0=45 +lon_0=-100 +x_0=0 +y_0=0 +a=6370997 +b=6370997 +units=m +no_defs '
      ]
    ]);
    return proj4('EPSG:4269', `EPSG:${this.selectedProjection.epsg}`, [ lat, long ]);
  }

  getGeoserverUrl(): string {
    let url = '';
    if (location.hostname.includes('local')) {
      url = 'http://geoserver-dev.usanpn.org/geoserver/';
    } else if (location.hostname.includes('dev')) {
      url = 'http://geoserver-dev.usanpn.org/geoserver/';
    } else {
      url = 'https://geoserver.usanpn.org/geoserver/';
    }
    if (this.isSelected('wms')) {
      if (this.selectedLayer) {
        url = url.concat(`wms?service=WMS&request=GetMap`);
        // for now we are hard coding extents for different projections, come back to this though
        // the issue with dynamically reprojecting the extents is mostly the color ramp covers up parts of the map
        // also sometimes the extent looked off
        // const mins = this.projectCoord(this.selectedLayer.miny, this.selectedLayer.minx);
        // const maxs = this.projectCoord(this.selectedLayer.maxy, this.selectedLayer.maxx);
        // url = url.concat(`&bbox=${mins},${maxs}`);
        // url = url.concat(`&srs=EPSG:${this.selectedProjection.epsg}`);

        url = url.concat(`&bbox=${this.selectedLayer.miny},${this.selectedLayer.minx},${this.selectedLayer.maxy},${this.selectedLayer.maxx}`);
        url = url.concat(`&srs=${this.selectedLayer.crs}`);

        url = url.concat('&layers=' + this.selectedLayer.name);
        if (this.stateBorders) {
          url = url.concat(',' + this.selectedLayer.workspace + ':states');
        }
        const style = this.getLayerStyle(this.selectedLayer);
        if (style) {
          url = url.concat('&styles=' + style + ',');
        }
        if (this.showColorRamp) {
          url = url.concat('&format_options=layout:provisional');
        } else {
          url = url.concat('&format_options=layout:provisional_no_ramp');
        }
        if (getCaption(this.selectedLayer.name, this.selectedDate, this.selectedYear, this.selectedDoy) !== '') {
          url = url.concat(`&env=the_caption:${getCaption(this.selectedLayer.name, this.selectedDate, this.selectedYear, this.selectedDoy)}`);
        }
      }
      if (this.urlWidth) {
        url = url.concat('&width=' + this.urlWidth.toString());
      }
      if (this.urlHeight) {
        url = url.concat('&height=' + this.urlHeight.toString());
      }
      if (this.selectedLayerHasDate() && this.selectedDate) {
        url = url.concat('&time=' + this.selectedDate);
      }
      if (this.selectedLayerHasYear() && this.selectedYear) {
        url = url.concat('&time=' + this.selectedYear + '-01-01');
      }
      if (this.selectedLayerHasDoy() && this.selectedDoy) {
        url = url.concat('&elevation=' + this.selectedDoy.toString());
      }
      if (this.selectedFormat) {
        url = url.concat('&format=' + this.selectedFormat.syntax);
      }
    }
    if (this.isSelected('wcs')) {
      url = url.concat('wcs?service=WCS&version=2.0.1&request=GetCoverage');
      if (this.selectedLayer) {
        url = url.concat('&coverageId=' + this.selectedLayer.name);
      }
      if (this.selectedLayerHasDate() && this.selectedDate) {
        url = url.concat('&SUBSET=time("' + this.selectedDate + 'T00:00:00.000Z")');
      }
      if (this.selectedLayerHasYear() && this.selectedYear) {
        url = url.concat('&SUBSET=time("' + this.selectedYear + '-01-01T00:00:00.000Z")');
      }
      if (this.selectedLayerHasDoy() && this.selectedDoy) {
        url = url.concat('&SUBSET=elevation(' + this.selectedDoy.toString() + ')');
      }
      if (this.selectedFormat) {
        url = url.concat('&format=' + this.selectedFormat.syntax);
      }
    }
    return url;
  }

  validateRequest(openModal): boolean {
    if (!this.isSelected('wcs') &&  !this.isSelected('wms')) {
      this.validationErrorModalTitle = 'No service type selected.';
      this.validationErrorModalBody = 'Please choose a service type by clicking either the WMS or WCS button.';
      if (!openModal) {
        return false;
      }
      this.validationErrorModal.open();
    } else if (this.getSelectedLayer() === 'Select a Layer') {
      this.validationErrorModalTitle = 'No layer selected.';
      this.validationErrorModalBody = 'Please choose a layer from the layer name dropdown.';
      if (!openModal) {
        return false;
      }
      this.validationErrorModal.open();
    } else if (this.selectedLayerHasDoy() && (!this.selectedDoy || this.selectedDoy < 1 || this.selectedDoy > 365)) {
      this.validationErrorModalTitle = 'Invalid Day of Year.';
      this.validationErrorModalBody = 'Please enter a day of year between 1 and 365.';
      if (!openModal) {
        return false;
      }
      this.validationErrorModal.open();
    } else if (this.getSelectedFormat() === 'Select a Format') {
      this.validationErrorModalTitle = 'No format selected.';
      this.validationErrorModalBody = 'Please choose a format from the format dropdown.';
      if (!openModal) {
        return false;
      }
      this.validationErrorModal.open();
    } else if (!this.urlHeight || 0 > this.urlHeight || this.urlHeight > 4000) {
      this.validationErrorModalTitle = 'Invalid height.';
      this.validationErrorModalBody = 'Please enter a height between 1 and 4000.';
      if (!openModal) {
        return false;
      }
      this.validationErrorModal.open();
    } else if (!this.urlWidth || 0 > this.urlHeight || this.urlWidth > 4000) {
      this.validationErrorModalTitle = 'Invalid width.';
      this.validationErrorModalBody = 'Please enter a width between 1 and 4000.';
      if (!openModal) {
        return false;
      }
      this.validationErrorModal.open();
    } else {
      return true;
    }
  }

  requestButtonPressed(): void {
    if (this.validateRequest(true)) {
      window.open(this.getGeoserverUrl());
    }
  }

  metadataButtonPressed(): void {
    if (this.selectedLayer && this.selectedLayer.metadataUrl) {
      window.open(this.selectedLayer.metadataUrl);
    }
  }

  colorrampButtonPressed(): void {
    window.open(this.getLayerColorRampUrl());
  }

  ngOnInit() {
    this._geoserverService.initWmsLayers();
    this.initializeSelectedProjection('4269');
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
