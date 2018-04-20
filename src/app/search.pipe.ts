import { Pipe, PipeTransform } from '@angular/core';
import { GeoserverLayer } from './geoserver-layer';

@Pipe({ name: 'searchPipe'})
export class SearchPipe implements PipeTransform {
  transform(allLayers: GeoserverLayer[], searchString: string) {
    return allLayers.filter(layer => {
      if (searchString === "") {
        return true;
      } else {
        return layer.title.toLowerCase().includes(searchString.toLowerCase());
      }
    });
  }
}