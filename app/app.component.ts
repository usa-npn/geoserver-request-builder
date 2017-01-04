import {
    Component, ViewChild, ElementRef, OnInit, Directive, Output, EventEmitter, ChangeDetectorRef,
    AfterViewInit
} from "@angular/core";
import {GeoserverService} from "./geoserver.service";
import {GeoserverLayer} from "./geoserver-layer";
import {GeoserverFormat} from "./geoserver-format";
import {ModalComponent, MODAL_DIRECTIVES} from "ng2-bs3-modal/ng2-bs3-modal";


declare var $: any;

@Directive({
    selector: "[datePicker]"
})
export class DatePicker implements OnInit {
    @Output() dateChange = new EventEmitter();
    private element: ElementRef;

    constructor(element: ElementRef) {
        this.element = element;
    }

    public ngOnInit(): void {
        let that = this;
        $(this.element.nativeElement).datetimepicker({format: "YYYY-MM-DD", ignoreReadonly: true});
        $(this.element.nativeElement).on("dp.change", function (e) {
            that.dateChange.emit({
                value: e
            });
        });
    }
}

@Component({
    selector: "my-app",
    directives: [MODAL_DIRECTIVES, DatePicker],
    templateUrl: "app/geoserver-request-builder.html"
})
export class AppComponent implements OnInit, AfterViewInit {

    selectedDateChange(event) {
        if (event.value && event.value.target && event.value.target.children[0])
            this.selectedDate = event.value.target.children[0].value;
        this.cdr.detectChanges();
    }

    today = new Date();
    year = this.today.getFullYear();
    previousYear = this.year - 1;

    service: string;
    urlWidth: number;
    urlHeight: number;
    selectedLayer: GeoserverLayer;
    selectedFormat: GeoserverFormat;
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
    caption: string;

    constructor(private _geoserverService: GeoserverService,
                private cdr: ChangeDetectorRef) {}

    @ViewChild("validationErrorModal")
    validationErrorModal: ModalComponent;

    setService(service: string) {
        this.service = service;
        this.selectedFormat = null;
    }

    selectedLayerHasDate(): boolean {
        return this.selectedLayer && this.selectedLayer.dimension === "time" && !this.yearlyTimeStep;
    }

    selectedLayerHasYear(): boolean {
        return this.selectedLayer && this.selectedLayer.dimension === "time" && this.yearlyTimeStep;
    }

    selectedLayerHasDoy(): boolean {
        return this.selectedLayer && this.selectedLayer.dimension === "elevation";
    }
    
    isSelected(button): boolean {
        return button == this.service;
    }
    
    getSelectedLayer(): string {
        if (this.selectedLayer)
            return this.selectedLayer.title;
        else
            return "Select a Layer";
    }
    
    setSelectedLayer(layer: GeoserverLayer): void {
        let now: any = new Date();
        if (layer.dimensionRange === "1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0,59.0,60.0,61.0,62.0,63.0,64.0,65.0,66.0,67.0,68.0,69.0,70.0,71.0,72.0,73.0,74.0,75.0,76.0,77.0,78.0,79.0,80.0,81.0,82.0,83.0,84.0,85.0,86.0,87.0,88.0,89.0,90.0,91.0,92.0,93.0,94.0,95.0,96.0,97.0,98.0,99.0,100.0,101.0,102.0,103.0,104.0,105.0,106.0,107.0,108.0,109.0,110.0,111.0,112.0,113.0,114.0,115.0,116.0,117.0,118.0,119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0,167.0,168.0,169.0,170.0,171.0,172.0,173.0,174.0,175.0,176.0,177.0,178.0,179.0,180.0,181.0,182.0,183.0,184.0,185.0,186.0,187.0,188.0,189.0,190.0,191.0,192.0,193.0,194.0,195.0,196.0,197.0,198.0,199.0,200.0,201.0,202.0,203.0,204.0,205.0,206.0,207.0,208.0,209.0,210.0,211.0,212.0,213.0,214.0,215.0,216.0,217.0,218.0,219.0,220.0,221.0,222.0,223.0,224.0,225.0,226.0,227.0,228.0,229.0,230.0,231.0,232.0,233.0,234.0,235.0,236.0,237.0,238.0,239.0,240.0,241.0,242.0,243.0,244.0,245.0,246.0,247.0,248.0,249.0,250.0,251.0,252.0,253.0,254.0,255.0,256.0,257.0,258.0,259.0,260.0,261.0,262.0,263.0,264.0,265.0,266.0,267.0,268.0,269.0,270.0,271.0,272.0,273.0,274.0,275.0,276.0,277.0,278.0,279.0,280.0,281.0,282.0,283.0,284.0,285.0,286.0,287.0,288.0,289.0,290.0,291.0,292.0,293.0,294.0,295.0,296.0,297.0,298.0,299.0,300.0,301.0,302.0,303.0,304.0,305.0,306.0,307.0,308.0,309.0,310.0,311.0,312.0,313.0,314.0,315.0,316.0,317.0,318.0,319.0,320.0,321.0,322.0,323.0,324.0,325.0,326.0,327.0,328.0,329.0,330.0,331.0,332.0,333.0,334.0,335.0,336.0,337.0,338.0,339.0,340.0,341.0,342.0,343.0,344.0,345.0,346.0,347.0,348.0,349.0,350.0,351.0,352.0,353.0,354.0,355.0,356.0,357.0,358.0,359.0,360.0,361.0,362.0,363.0,364.0,365.0") {
            let start: any = new Date(now.getFullYear(), 0, 0);
            let diff: any = now - start;
            let oneDay: number = 1000 * 60 * 60 * 24;
            let day: any = Math.floor(diff / oneDay);
            this.selectedDoy = day;
            this.selectedDate = null;
        }
        if (layer.dimensionRange.includes("1981")) {
            this.selectedDoy = null;
            this.selectedDate = (now.getFullYear() - 1).toString() + "-01-01";
            this.selectedYear = now.getFullYear() - 1;
            this.yearlyTimeStep = true;
            this.setYears(1981, this.previousYear);
        }
        if (layer.dimensionRange.includes("1880")) {
            this.selectedDoy = null;
            this.selectedDate = "2013-01-01";
            this.selectedYear = 2013;
            this.yearlyTimeStep = true;
            this.setYears(1880, 2013);
        }
        if (layer.dimensionRange.includes("2016-01-01")) {
            this.selectedDoy = null;
            this.selectedDate = now.toISOString().slice(0, 10);
            this.yearlyTimeStep = false;
        }
        if (layer.name.includes("ncep_historic")) {
            this.selectedDoy = null;
            this.selectedDate = "2016-01-01";
            this.selectedYear = 2016;
            this.yearlyTimeStep = true;
            this.setYears(2016, this.previousYear);
        }
        this.selectedLayer = layer;
    }

    years: number[] = [];
    setYears(minYear, maxYear) {
        this.years = [];
        for (let i = minYear; i <= maxYear; i++) {
            this.years.push(i);
        }
        return this.years;
    }
    
    getFormats(): GeoserverFormat[] {
        if (this.service === "wms")
            return this._geoserverService.wmsFormats;
        else
            return this._geoserverService.wcsFormats;
    }

    getSelectedFormat(): string {
        if (this.selectedFormat)
            return this.selectedFormat.name;
        else
            return "Select a Format";
    }

    setSelectedFormat(format: GeoserverFormat): void {
        this.selectedFormat = format;
        if (format.name === "openlayers") {
            this.urlHeight = 800;
            this.urlWidth =  1600;
        }
        else {
            this.urlHeight = 800;
            this.urlWidth =  1600;
        }
    }

    getDimensionRange(): string {
        let rightNow = new Date();
        let res = rightNow.toISOString().slice(0, 10);

        if (!this.selectedLayer)
            return "Select a layer to view its dimension range.";
        if (this.selectedLayer.name.includes("ncep_historic")) {
            this.minDate = "2016-01-01";
            this.maxDate = (rightNow.getFullYear() - 1).toString() + "-01-01";
            return "2016-01-01 Through " + (rightNow.getFullYear() - 1).toString() + "-01-01";
        }
        if (this.selectedLayer.dimensionRange === "1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0,59.0,60.0,61.0,62.0,63.0,64.0,65.0,66.0,67.0,68.0,69.0,70.0,71.0,72.0,73.0,74.0,75.0,76.0,77.0,78.0,79.0,80.0,81.0,82.0,83.0,84.0,85.0,86.0,87.0,88.0,89.0,90.0,91.0,92.0,93.0,94.0,95.0,96.0,97.0,98.0,99.0,100.0,101.0,102.0,103.0,104.0,105.0,106.0,107.0,108.0,109.0,110.0,111.0,112.0,113.0,114.0,115.0,116.0,117.0,118.0,119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0,167.0,168.0,169.0,170.0,171.0,172.0,173.0,174.0,175.0,176.0,177.0,178.0,179.0,180.0,181.0,182.0,183.0,184.0,185.0,186.0,187.0,188.0,189.0,190.0,191.0,192.0,193.0,194.0,195.0,196.0,197.0,198.0,199.0,200.0,201.0,202.0,203.0,204.0,205.0,206.0,207.0,208.0,209.0,210.0,211.0,212.0,213.0,214.0,215.0,216.0,217.0,218.0,219.0,220.0,221.0,222.0,223.0,224.0,225.0,226.0,227.0,228.0,229.0,230.0,231.0,232.0,233.0,234.0,235.0,236.0,237.0,238.0,239.0,240.0,241.0,242.0,243.0,244.0,245.0,246.0,247.0,248.0,249.0,250.0,251.0,252.0,253.0,254.0,255.0,256.0,257.0,258.0,259.0,260.0,261.0,262.0,263.0,264.0,265.0,266.0,267.0,268.0,269.0,270.0,271.0,272.0,273.0,274.0,275.0,276.0,277.0,278.0,279.0,280.0,281.0,282.0,283.0,284.0,285.0,286.0,287.0,288.0,289.0,290.0,291.0,292.0,293.0,294.0,295.0,296.0,297.0,298.0,299.0,300.0,301.0,302.0,303.0,304.0,305.0,306.0,307.0,308.0,309.0,310.0,311.0,312.0,313.0,314.0,315.0,316.0,317.0,318.0,319.0,320.0,321.0,322.0,323.0,324.0,325.0,326.0,327.0,328.0,329.0,330.0,331.0,332.0,333.0,334.0,335.0,336.0,337.0,338.0,339.0,340.0,341.0,342.0,343.0,344.0,345.0,346.0,347.0,348.0,349.0,350.0,351.0,352.0,353.0,354.0,355.0,356.0,357.0,358.0,359.0,360.0,361.0,362.0,363.0,364.0,365.0")
            return "1-365";
        if (this.selectedLayer.dimensionRange.includes("1981")) {
            this.minDate = "1981-01-01";
            this.maxDate = (rightNow.getFullYear() - 1).toString() + "-01-01";
            return "1981-01-01 Through " + (rightNow.getFullYear() - 1).toString() + "-01-01";
        }
        if (this.selectedLayer.dimensionRange.includes("1880")) {
            this.minDate = "1880-01-01";
            this.maxDate = "2013-01-01";
            return "1880-01-01 Through 2013-01-01";
        }
        if (this.selectedLayer.dimensionRange.includes("2016-01-01")) {
            this.minDate = "2016-01-01";
            this.maxDate = res;
            return "2016-01-01 Through " + res;
        }
    }

    getLayerStyle(layer: GeoserverLayer): string {
        if (layer.name.includes("tmin") || layer.name.includes("tmax"))
            return "climate:celsius_web";
        if (layer.name.includes("leaf_anomaly") || layer.name.includes("bloom_anomaly"))
            return "si-x:leaf_anomaly_black";
        if (layer.name.includes("leaf_best")) {
            return "si-x:leafout_best_web";
        }
        if (layer.name.includes("bloom_best")) {
            return "si-x:bloom_best_web";
        }
        if (layer.name.includes("leaf"))
            return "si-x:leafout_bimonthly_web";
        if (layer.name.includes("bloom"))
            return "si-x:bloom_bimonthly_web";
        if (layer.name.includes("agdd_anomaly"))
            return null;
        if (layer.name.includes("agdd"))
            return "gdd:agdd_web";
    }
    
    getLayerMetaDataUrl(): string {
        if (this.selectedLayer)
            return this.selectedLayer.metadataUrl;
        else
            return "";
    }
    
    getLayerColorRampUrl(): string {
        if (this.selectedLayer) {
            let colorRampUrl = this.selectedLayer.legendUrl;
            let style = this.getLayerStyle(this.selectedLayer);
            if (style)
                colorRampUrl += ("&style=" + style);
            return colorRampUrl;
        }
        else
            return "";
    }

    getCaption(layer: GeoserverLayer): string {
        let dateText = "";
        let yearText = "";
        let doyText = "";
        if (this.selectedLayerHasDate() && this.selectedDate)
            dateText = this.selectedDate;
        if (this.selectedLayerHasYear() && this.selectedYear)
            yearText = this.selectedYear.toString();
        if (this.selectedLayerHasDoy() && this.selectedDoy)
            doyText = this.selectedDoy.toString();
        // climate captions
        if (layer.name.includes("tmin"))
            return "Minimum Temperatures in Celsius on " + dateText + " Using NCEP Data";
        if (layer.name.includes("tmax"))
            return "Maximum Temperatures in Celsius on " + dateText + " Using NCEP Data";
        // agdd captions
        if (layer.name.includes("gdd:agdd_anomaly_50f"))
            return "Accumulated Growing Degree Days Anomaly 50F Base Temp Through " + dateText + " Using NCEP and PRISM Data";
        if (layer.name.includes("gdd:agdd_anomaly"))
            return "Accumulated Growing Degree Days Anomaly 32F Base Temp Through " + dateText + " Using NCEP and PRISM Data";
        if (layer.name.includes("gdd:30yr_avg_agdd_50f"))
            return "30-Year Average Temperature Accumulations 50F Base Temp Through Day of Year " + doyText + " Using PRISM Data";
        if (layer.name.includes("gdd:30yr_avg_agdd"))
            return "30-Year Average Temperature Accumulations 32F Base Temp Through Day of Year " + doyText + " Using PRISM Data";
        if (layer.name.includes("gdd:agdd_50f"))
            return "Accumulated Growing Degree Days 50F Base Temp Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("gdd:agdd_prism"))
            return "PRISM Accumulated Growing Degree Days 32F Base Temp Through " + dateText + " Using PRISM Data";
        if (layer.name.includes("gdd:agdd"))
            return "Accumulated Growing Degree Days 32F Base Temp Through " + dateText + " Using NCEP Data";
        // spring index historic ncep
        if (layer.name.includes("arnoldred_leaf_ncep_historic"))
            return "Arnold Red Honeysuckle First Leaf " + yearText + " Using NCEP Data";
        if (layer.name.includes("zabelli_leaf_ncep_historic"))
            return "Zabelli First Leaf " + yearText + " Using NCEP Data";
        if (layer.name.includes("lilac_leaf_ncep_historic"))
            return "Lilac First Leaf " + yearText + " Using NCEP Data";
        if (layer.name.includes("arnoldred_bloom_ncep_historic"))
            return "Arnold Red Honeysuckle First Bloom " + yearText + " Using NCEP Data";
        if (layer.name.includes("zabelli_bloom_ncep_historic"))
            return "Zabelli First Bloom " + yearText + " Using NCEP Data";
        if (layer.name.includes("lilac_bloom_ncep_historic"))
            return "Lilac First Bloom " + yearText + " Using NCEP Data";
        if (layer.name.includes("average_leaf_ncep_historic"))
            return "Spring Index First Leaf " + yearText + " Using NCEP Data";
        if (layer.name.includes("average_bloom_ncep_historic"))
            return "Spring Index First Bloom " + yearText + " Using NCEP Data";
        // spring index current year
        if (layer.name.includes("si-x:arnoldred_leaf_ncep"))
            return "Arnold Red Honeysuckle First Leaf Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("si-x:zabelli_leaf_ncep"))
            return "Zabelli First Leaf Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("si-x:lilac_leaf_ncep"))
            return "Lilac First Leaf Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("si-x:arnoldred_bloom_ncep"))
            return "Arnold Red Honeysuckle First Bloom Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("si-x:zabelli_bloom_ncep"))
            return "Zabelli First Bloom Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("si-x:lilac_bloom_ncep"))
            return "Lilac First Bloom Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("si-x:average_leaf_ncep"))
            return "Spring Index First Leaf Through " + dateText + " Using NCEP Data";
        if (layer.name.includes("si-x:average_bloom_ncep"))
            return "Spring Index First Bloom Through " + dateText + " Using NCEP Data";
        // spring index historic prism
        if (layer.name.includes("si-x:arnoldred_leaf_prism"))
            return "Arnold Red Honeysuckle First Leaf " + yearText + " Using PRISM Data";
        if (layer.name.includes("si-x:zabelli_leaf_prism"))
            return "Zabelli First Leaf " + yearText + " Using PRISM Data";
        if (layer.name.includes("si-x:lilac_leaf_prism"))
            return "Lilac First Leaf " + yearText + " Using PRISM Data";
        if (layer.name.includes("si-x:arnoldred_bloom_prism"))
            return "Arnold Red Honeysuckle First Bloom " + yearText + " Using PRISM Data";
        if (layer.name.includes("si-x:zabelli_bloom_prism"))
            return "Zabelli First Bloom " + yearText + " Using PRISM Data";
        if (layer.name.includes("si-x:lilac_bloom_prism"))
            return "Lilac First Bloom " + yearText + " Using PRISM Data";
        if (layer.name.includes("si-x:average_leaf_prism"))
            return "Spring Index First Leaf " + yearText + " Using PRISM Data";
        if (layer.name.includes("si-x:average_bloom_prism"))
            return "Spring Index First Bloom " + yearText + " Using PRISM Data";
        // 30 year average si-x
        if (layer.name.includes("si-x:30yr_avg_six_leaf"))
            return "30-Year Average Spring Index First Leaf Through Day of Year " + doyText + " Using PRISM Data";
        if (layer.name.includes("si-x:30yr_avg_six_bloom"))
            return "30-Year Average Spring Index First Bloom Through Day of Year " + doyText + " Using PRISM Data";
        // spring index anomaly
        if (layer.name.includes("si-x:leaf_anomaly"))
            return "Spring Index First Leaf Anomaly Through " + dateText + " Using NCEP and PRISM Data";
        if (layer.name.includes("si-x:bloom_anomaly"))
            return "Spring Index First Bloom Anomaly Through " + dateText + " Using NCEP and PRISM Data";
        // spring index BEST
        if (layer.name.includes("leaf_best"))
            return "Spring Index First Leaf " + yearText + " Using BEST Data";
        if (layer.name.includes("bloom_best"))
            return "Spring Index First Bloom " + yearText + " Using BEST Data";
        else
            return "";
    }

    getGeoserverUrl(): string {
        let url: string = "";
        if (location.hostname.includes("local"))
            url = "https://geoserver-dev.usanpn.org/geoserver/";
        else if (location.hostname.includes("dev"))
            url = "https://geoserver-dev.usanpn.org/geoserver/";
        else
            url = "https://geoserver.usanpn.org/geoserver/";
        if (this.isSelected("wms")) {
            // url = url.concat("wms?service=WMS&request=GetMap&bbox=-125.020833333333,24.0625,-66.479166666662,49.937500000002&srs=EPSG:4269");
            if (this.selectedLayer) {
                url = url.concat(`wms?service=WMS&request=GetMap`);
                url = url.concat(`&bbox=${this.selectedLayer.miny},${this.selectedLayer.minx},${this.selectedLayer.maxy},${this.selectedLayer.maxx}`);
                url = url.concat(`&srs=${this.selectedLayer.crs}`);
                url = url.concat("&layers=" + this.selectedLayer.name);
                if (this.stateBorders)
                    url = url.concat("," + this.selectedLayer.workspace + ":states");
                let style = this.getLayerStyle(this.selectedLayer);
                if (style)
                    url = url.concat("&styles=" + style + ",");
                if (this.showColorRamp)
                    url = url.concat("&format_options=layout:provisional");
                else
                    url = url.concat("&format_options=layout:provisional_no_ramp");
                if (this.getCaption(this.selectedLayer) !== "")
                    url = url.concat("&env=the_caption:" + this.getCaption(this.selectedLayer));
            }
            if (this.urlWidth)
                url = url.concat("&width=" + this.urlWidth.toString());
            if (this.urlHeight)
                url = url.concat("&height=" + this.urlHeight.toString());
            if (this.selectedLayerHasDate() && this.selectedDate)
                url = url.concat("&time=" + this.selectedDate);
            if (this.selectedLayerHasYear() && this.selectedYear)
                url = url.concat("&time=" + this.selectedYear + "-01-01");
            if (this.selectedLayerHasDoy() && this.selectedDoy)
                url = url.concat("&elevation=" + this.selectedDoy.toString());
            if (this.selectedFormat)
                url = url.concat("&format=" + this.selectedFormat.syntax);
        }
        if (this.isSelected("wcs")) {
            url = url.concat("wcs?service=WCS&version=2.0.1&request=GetCoverage");
            if (this.selectedLayer)
                url = url.concat("&coverageId=" + this.selectedLayer.name);
            if (this.selectedLayerHasDate() && this.selectedDate)
                url = url.concat('&SUBSET=time("' + this.selectedDate + 'T00:00:00.000Z")');
            if (this.selectedLayerHasYear() && this.selectedYear)
                url = url.concat('&SUBSET=time("' + this.selectedYear + '-01-01T00:00:00.000Z")');
            if (this.selectedLayerHasDoy() && this.selectedDoy)
                url = url.concat("&SUBSET=elevation(" + this.selectedDoy.toString() + ")");
            if (this.selectedFormat)
                url = url.concat("&format=" + this.selectedFormat.syntax);
        }
        return url;
    }

    validateRequest(openModal): boolean {
        if (!this.isSelected("wcs") &&  !this.isSelected("wms")) {
            this.validationErrorModalTitle = "No service type selected.";
            this.validationErrorModalBody = "Please choose a service type by clicking either the WMS or WCS button.";
            if (!openModal)
                return false;
            this.validationErrorModal.open();
        }
        else if (this.getSelectedLayer() === "Select a Layer") {
            this.validationErrorModalTitle = "No layer selected.";
            this.validationErrorModalBody = "Please choose a layer from the layer name dropdown.";
            if (!openModal)
                return false;
            this.validationErrorModal.open();
        }
        else if (this.selectedLayerHasDoy() && (!this.selectedDoy || this.selectedDoy < 1 || this.selectedDoy > 365)) {
            this.validationErrorModalTitle = "Invalid Day of Year.";
            this.validationErrorModalBody = "Please enter a day of year between 1 and 365.";
            if (!openModal)
                return false;
            this.validationErrorModal.open();
        }
        // else if(!this.selectedLayerHasDoy() && (!this.selectedDate || this.selectedDate < this.minDate || this.selectedDate > this.maxDate)) {
        //     this.validationErrorModalTitle = "Invalid Date.";
        //     this.validationErrorModalBody = "Please enter a date between " + this.minDate + " and " + this.maxDate;
        //     this.validationErrorModal.open();
        // }
        else if (this.getSelectedFormat() === "Select a Format") {
            this.validationErrorModalTitle = "No format selected.";
            this.validationErrorModalBody = "Please choose a format from the format dropdown.";
            if (!openModal)
                return false;
            this.validationErrorModal.open();
        }
        else if (!this.urlHeight || 0 > this.urlHeight || this.urlHeight > 4000) {
            this.validationErrorModalTitle = "Invalid height.";
            this.validationErrorModalBody = "Please enter a height between 1 and 4000.";
            if (!openModal)
                return false;
            this.validationErrorModal.open();
        }
        else if (!this.urlWidth || 0 > this.urlHeight || this.urlWidth > 4000) {
            this.validationErrorModalTitle = "Invalid width.";
            this.validationErrorModalBody = "Please enter a width between 1 and 4000.";
            if (!openModal)
                return false;
            this.validationErrorModal.open();
        }
        else
            return true;
    }

    requestButtonPressed(): void {
        if (this.validateRequest(true))
            window.open(this.getGeoserverUrl());
    }

    metadataButtonPressed(): void {
        window.open(this.getLayerMetaDataUrl());
    }
    
    colorrampButtonPressed(): void {
        window.open(this.getLayerColorRampUrl());
    }

    ngOnInit() {
        this._geoserverService.initWmsLayers();
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
    }
}
