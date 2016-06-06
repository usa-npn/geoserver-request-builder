import {Component} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import "rxjs/Rx";
import {GeoserverService} from "./geoserver.service";
import {GeoserverLayer} from "./geoserver-layer";
import {GeoserverFormat} from "./geoserver-format";

@Component({
    selector: 'my-app', 
    templateUrl: 'app/geoserver-request-builder.html', 
    providers: [GeoserverService, HTTP_PROVIDERS] 
})
export class AppComponent {

    service:string;
    urlWidth:number;
    urlHeight:number;
    selectedLayer:GeoserverLayer;
    selectedFormat:GeoserverFormat;
    selectedDate:string;
    selectedDoy:number;
    stateBorders:boolean = false;
    showColorRamp:boolean = true;

    constructor(private _geoserverService: GeoserverService) {}

    setService(service:string) {
        this.service = service;
        this.selectedFormat = null;
    }

    selectedLayerHasDate() {
        return this.selectedLayer && this.selectedLayer.dimension === 'time';
    }
    
    selectedLayerHasDoy() {
        return this.selectedLayer && this.selectedLayer.dimension === 'elevation';
    }
    
    isSelected(button) {
        return button == this.service;
    }
    
    getSelectedLayer() {
        if(this.selectedLayer)
            return this.selectedLayer.title;
        else
            return "Select a Layer";
    }
    
    setSelectedLayer(layer:GeoserverLayer) {
        var now:any = new Date();
        if(layer.dimensionRange === '1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0,59.0,60.0,61.0,62.0,63.0,64.0,65.0,66.0,67.0,68.0,69.0,70.0,71.0,72.0,73.0,74.0,75.0,76.0,77.0,78.0,79.0,80.0,81.0,82.0,83.0,84.0,85.0,86.0,87.0,88.0,89.0,90.0,91.0,92.0,93.0,94.0,95.0,96.0,97.0,98.0,99.0,100.0,101.0,102.0,103.0,104.0,105.0,106.0,107.0,108.0,109.0,110.0,111.0,112.0,113.0,114.0,115.0,116.0,117.0,118.0,119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0,167.0,168.0,169.0,170.0,171.0,172.0,173.0,174.0,175.0,176.0,177.0,178.0,179.0,180.0,181.0,182.0,183.0,184.0,185.0,186.0,187.0,188.0,189.0,190.0,191.0,192.0,193.0,194.0,195.0,196.0,197.0,198.0,199.0,200.0,201.0,202.0,203.0,204.0,205.0,206.0,207.0,208.0,209.0,210.0,211.0,212.0,213.0,214.0,215.0,216.0,217.0,218.0,219.0,220.0,221.0,222.0,223.0,224.0,225.0,226.0,227.0,228.0,229.0,230.0,231.0,232.0,233.0,234.0,235.0,236.0,237.0,238.0,239.0,240.0,241.0,242.0,243.0,244.0,245.0,246.0,247.0,248.0,249.0,250.0,251.0,252.0,253.0,254.0,255.0,256.0,257.0,258.0,259.0,260.0,261.0,262.0,263.0,264.0,265.0,266.0,267.0,268.0,269.0,270.0,271.0,272.0,273.0,274.0,275.0,276.0,277.0,278.0,279.0,280.0,281.0,282.0,283.0,284.0,285.0,286.0,287.0,288.0,289.0,290.0,291.0,292.0,293.0,294.0,295.0,296.0,297.0,298.0,299.0,300.0,301.0,302.0,303.0,304.0,305.0,306.0,307.0,308.0,309.0,310.0,311.0,312.0,313.0,314.0,315.0,316.0,317.0,318.0,319.0,320.0,321.0,322.0,323.0,324.0,325.0,326.0,327.0,328.0,329.0,330.0,331.0,332.0,333.0,334.0,335.0,336.0,337.0,338.0,339.0,340.0,341.0,342.0,343.0,344.0,345.0,346.0,347.0,348.0,349.0,350.0,351.0,352.0,353.0,354.0,355.0,356.0,357.0,358.0,359.0,360.0,361.0,362.0,363.0,364.0,365.0') {
            var start:any = new Date(now.getFullYear(), 0, 0);
            var diff:any = now - start;
            var oneDay:number = 1000 * 60 * 60 * 24;
            var day:any = Math.floor(diff / oneDay);
            this.selectedDoy = day;
            this.selectedDate = null;
        }
        if(layer.dimensionRange.includes('1981')) {
            this.selectedDoy = null;
            this.selectedDate = (now.getFullYear() - 1).toString() + '-01-01';
        }
        if(layer.dimensionRange.includes('2016-01-01')) {
            this.selectedDoy = null;
            this.selectedDate = now.toISOString().slice(0,10);
        }
        this.selectedLayer = layer;
    }
    
    getFormats() {
        if(this.service === 'wms')
            return this._geoserverService.wmsFormats;
        else
            return this._geoserverService.wcsFormats;
    }

    getSelectedFormat() {
        if(this.selectedFormat)
            return this.selectedFormat.name;
        else
            return "Select a Format";
    }

    setSelectedFormat(format:GeoserverFormat) {
        this.selectedFormat = format;
        if(format.name === 'openlayers') {
            this.urlHeight = 800;
            this.urlWidth =  1600;
        }
        else {
            this.urlHeight = 800;
            this.urlWidth =  1800;
        }
    }

    getDimensionRange() {
        let rightNow = new Date();
        let res = rightNow.toISOString().slice(0,10);

        if(!this.selectedLayer)
            return 'Select a layer to view its dimension range.';
        if(this.selectedLayer.dimensionRange === '1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0,59.0,60.0,61.0,62.0,63.0,64.0,65.0,66.0,67.0,68.0,69.0,70.0,71.0,72.0,73.0,74.0,75.0,76.0,77.0,78.0,79.0,80.0,81.0,82.0,83.0,84.0,85.0,86.0,87.0,88.0,89.0,90.0,91.0,92.0,93.0,94.0,95.0,96.0,97.0,98.0,99.0,100.0,101.0,102.0,103.0,104.0,105.0,106.0,107.0,108.0,109.0,110.0,111.0,112.0,113.0,114.0,115.0,116.0,117.0,118.0,119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0,167.0,168.0,169.0,170.0,171.0,172.0,173.0,174.0,175.0,176.0,177.0,178.0,179.0,180.0,181.0,182.0,183.0,184.0,185.0,186.0,187.0,188.0,189.0,190.0,191.0,192.0,193.0,194.0,195.0,196.0,197.0,198.0,199.0,200.0,201.0,202.0,203.0,204.0,205.0,206.0,207.0,208.0,209.0,210.0,211.0,212.0,213.0,214.0,215.0,216.0,217.0,218.0,219.0,220.0,221.0,222.0,223.0,224.0,225.0,226.0,227.0,228.0,229.0,230.0,231.0,232.0,233.0,234.0,235.0,236.0,237.0,238.0,239.0,240.0,241.0,242.0,243.0,244.0,245.0,246.0,247.0,248.0,249.0,250.0,251.0,252.0,253.0,254.0,255.0,256.0,257.0,258.0,259.0,260.0,261.0,262.0,263.0,264.0,265.0,266.0,267.0,268.0,269.0,270.0,271.0,272.0,273.0,274.0,275.0,276.0,277.0,278.0,279.0,280.0,281.0,282.0,283.0,284.0,285.0,286.0,287.0,288.0,289.0,290.0,291.0,292.0,293.0,294.0,295.0,296.0,297.0,298.0,299.0,300.0,301.0,302.0,303.0,304.0,305.0,306.0,307.0,308.0,309.0,310.0,311.0,312.0,313.0,314.0,315.0,316.0,317.0,318.0,319.0,320.0,321.0,322.0,323.0,324.0,325.0,326.0,327.0,328.0,329.0,330.0,331.0,332.0,333.0,334.0,335.0,336.0,337.0,338.0,339.0,340.0,341.0,342.0,343.0,344.0,345.0,346.0,347.0,348.0,349.0,350.0,351.0,352.0,353.0,354.0,355.0,356.0,357.0,358.0,359.0,360.0,361.0,362.0,363.0,364.0,365.0')
            return "1-365";
        if(this.selectedLayer.dimensionRange.includes('1981'))
            return '1981-01-01 through ' + (rightNow.getFullYear() - 1).toString() + '-01-01';
        if(this.selectedLayer.dimensionRange.includes('2016-01-01'))
            return '2016-01-01 through ' + res;
    }

    getColorRamp(layer:GeoserverLayer) {
        if(layer.name.includes('tmin') || layer.name.includes('tmax'))
            return 'climate:celsius_web,';
        if(layer.name.includes('leaf_anomaly') || layer.name.includes('bloom_anomaly'))
            return 'si-x:leaf_anomaly_black,';
        if(layer.name.includes('leaf'))
            return 'si-x:leafout_bimonthly_web,';
        if(layer.name.includes('bloom'))
            return 'si-x:bloom_bimonthly_web,';
        if(layer.name.includes('agdd_anomaly'))
            return null;
        if(layer.name.includes('agdd'))
            return 'gdd:agdd_web,';
    }

    getGeoserverUrl() {
        let url:string = 'https://geoserver.usanpn.org/geoserver/';
        if(this.isSelected('wms')) {
            url = url.concat('wms?service=WMS&request=GetMap&bbox=-125.020833333333,24.0625,-66.479166666662,49.937500000002&srs=EPSG:4269');
            if(this.selectedLayer) {
                url = url.concat('&layers=' + this.selectedLayer.name);
                if(this.stateBorders)
                    url = url.concat(',' + this.selectedLayer.workspace + ':states');
                let colorRamp = this.getColorRamp(this.selectedLayer);
                if(colorRamp) 
                    url = url.concat('&styles=' + colorRamp);
                if(this.showColorRamp)
                    url = url.concat('&format_options=layout:provisional');
                else
                    url = url.concat('&format_options=layout:provisional_no_ramp');
            }
            if(this.urlWidth)
                url = url.concat('&width=' + this.urlWidth.toString());
            if(this.urlHeight)
                url = url.concat('&height=' + this.urlHeight.toString());
            if(this.selectedDate)
                url = url.concat('&time=' + this.selectedDate);
            if(this.selectedDoy)
                url = url.concat('&elevation=' + this.selectedDoy.toString());
            if(this.selectedFormat)
                url = url.concat('&format=' + this.selectedFormat.syntax);
        }
        if(this.isSelected('wcs')) {
            url = url.concat('wcs?service=WCS&version=2.0.1&request=GetCoverage');
            if(this.selectedLayer)
                url = url.concat('&coverageId=' + this.selectedLayer.name);
            if(this.selectedDate)
                url = url.concat('&time=' + this.selectedDate);
            if(this.selectedDoy)
                url = url.concat('&elevation=' + this.selectedDoy.toString());
            if(this.selectedFormat)
                url = url.concat('&format=' + this.selectedFormat.syntax);
        }
        return url;
    }

    openLinkInNewTab() {
        window.open(this.getGeoserverUrl());
    }

    ngOnInit() {
        this._geoserverService.initWmsLayers();
    }
}
