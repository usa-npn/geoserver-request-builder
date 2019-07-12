import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { DatePicker } from './datepicker.directive';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GeoserverService } from './geoserver.service';
import { FormsModule } from '@angular/forms';
import { BsModalModule } from 'ng2-bs3-modal';
import {ProjectionPipe} from './projection.pipe';
import {ActivatedRoute, Params, Router, RouterModule, Routes} from '@angular/router';
import { SearchPipe } from './search.pipe';

const routes : Routes = [
    {path: '', component : AppComponent}
];
 

@NgModule({
    declarations: [AppComponent, DatePicker, ProjectionPipe, SearchPipe],
    imports:      [BrowserModule, HttpClientModule, FormsModule, BsModalModule, RouterModule.forRoot(routes) ],
    bootstrap:    [AppComponent],
    providers: [GeoserverService]
})
export class AppModule {}
