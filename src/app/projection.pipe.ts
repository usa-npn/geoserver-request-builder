import { Pipe, PipeTransform } from '@angular/core';
import { Projection } from './projection';

@Pipe({ name: 'projectionPipe'})
export class ProjectionPipe implements PipeTransform {
  transform(allProjections: Projection[], showAlaska: boolean) {
    return allProjections.filter(projection => {
      if (showAlaska) {
        return true;
      } else {
        return !projection.alaskaOnly;
      }
    });
  }
}
