import { NgModule }       from "@angular/core";
import { BrowserModule  } from "@angular/platform-browser";
import { AppComponent, DatePicker }   from "./app.component";
import {HttpModule} from "@angular/http";
import {GeoserverService} from "./geoserver.service";
import {FormsModule} from "@angular/forms";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

@NgModule({
    declarations: [AppComponent, DatePicker],
    imports:      [BrowserModule, HttpModule, FormsModule, Ng2Bs3ModalModule ],
    bootstrap:    [AppComponent],
    providers: [GeoserverService]
})
export class AppModule {}