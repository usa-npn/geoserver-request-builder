import { NgModule }       from "@angular/core";
import { BrowserModule  } from "@angular/platform-browser";
import { AppComponent }   from "./app.component";
import {HttpModule} from "@angular/http";
import {GeoserverService} from "./geoserver.service";
import {FormsModule} from "@angular/forms";
// import {MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";
import "rxjs/Rx";

@NgModule({
    declarations: [AppComponent],
    imports:      [BrowserModule, HttpModule, FormsModule],
    bootstrap:    [AppComponent],
    providers: [GeoserverService]
})
export class AppModule {}