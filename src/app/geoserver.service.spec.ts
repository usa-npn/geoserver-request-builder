/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GeoserverService } from './geoserver.service';
import { GeoserverLayer } from './geoserver-layer';
import { HttpModule } from '@angular/http';
import { BrowserModule  } from '@angular/platform-browser';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

describe('Geoserver service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, HttpModule, FormsModule],
      providers: [GeoserverService]
    });
    TestBed.compileComponents();
  });

  // it('should not have any empty descriptions', inject([GeoserverService], (geoserverService: GeoserverService) => {
  //   geoserverService.initWmsLayers().then((result) => {
  //     console.log(result);
  //     testing();
  //   });
  //
  //   function testing() {
  //     console.log('after');
  //     geoserverService.wmsLayers.forEach((layer: GeoserverLayer) => {
  //       console.log('hello');
  //       expect(layer.description).toBeNull();
  //     });
  //   }
  //
  //   console.log('sdfsdfsd');
  //   //setTimeout(testing(), 70000);
  // }));

});


