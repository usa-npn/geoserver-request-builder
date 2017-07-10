import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { DatePicker } from './datepicker.directive';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { GeoserverService } from './geoserver.service';
import { FormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ProjectionPipe} from './projection.pipe';
import {ActivatedRoute, Params, Router, RouterModule, Routes} from '@angular/router';

const routes : Routes = [
    {path: '', component : AppComponent}
];
 

@NgModule({
    declarations: [AppComponent, DatePicker, ProjectionPipe],
    imports:      [BrowserModule, HttpModule, FormsModule, Ng2Bs3ModalModule, RouterModule.forRoot(routes) ],
    bootstrap:    [AppComponent],
    providers: [GeoserverService]
})
export class AppModule {}
