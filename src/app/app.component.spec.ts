/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import { GeoserverService } from "./geoserver.service";
import { HttpModule } from "@angular/http";
import { BrowserModule  } from "@angular/platform-browser";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, HttpModule, FormsModule, Ng2Bs3ModalModule ],
      declarations: [
        AppComponent
      ],
      providers: [GeoserverService]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'USA-NPN Geoserver Request Builder'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('USA-NPN Geoserver Request Builder');
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
