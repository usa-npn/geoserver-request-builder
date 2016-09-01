import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {GeoserverLayer} from './geoserver-layer';
import {GeoserverFormat} from "./geoserver-format";

declare function require(name: string);

@Injectable()
export class GeoserverService {
  constructor (private http:Http) {}

  
  parseString = require('xml2js').parseString;

  private wmsCapabilitiesUrl = 'https://geoserver.usanpn.org/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities';
  public wmsLayers:GeoserverLayer[];
  errorMessage: string;

  initWmsLayers() {
    this.getWmsLayers().subscribe(
        wmsLayers => {
            var that = this;
            this.parseString(wmsLayers, function (err, result) {
                // console.log(result);
                var layers:GeoserverLayer[] = [];
                for(var layer of result.WMS_Capabilities.Capability[0].Layer[0].Layer) {
                    if(layer.Title[0] != "states" && layer.Title[0] != "average_leaf_prism_2015")
                        layers.push({workspace: layer.Name[0].split(':')[0],
                            name: layer.Name[0],
                            title: layer.Title[0],
                            description: layer.Abstract[0],
                            dimension: layer.Dimension[0]['$']['name'],
                            dimensionRange: layer.Dimension[0]['_'],
                            metadataUrl: layer.MetadataURL[0]['OnlineResource'][0]['$']['xlink:href'],
                            selected: false})
                }
                
                // console.log(layers);
                that.wmsLayers = layers.sort(function(a:GeoserverLayer, b:GeoserverLayer) {
                    if(a.workspace < b.workspace) return -1;
                    if(a.workspace > b.workspace) return 1;
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    return 0;
                });
                // that.wmsLayers = layers;
            })
        },
        error => this.errorMessage = <any>error)
  }

  getWmsLayers() {
    return this.http.get(this.wmsCapabilitiesUrl)
        .map(res => <any> res.text())
        .catch(this.handleError)
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }


    public wmsFormats:GeoserverFormat[] = [
            {name: 'png', syntax: 'image/png', description: 'Portable Network Graphics is a raster graphics file format that supports lossless data compression.'},
            {name: 'atom+xml', syntax: 'application/atom+xml', description: ''},
            {name: 'pdf', syntax: 'application/pdf', description: ''},
            {name: 'rss+xml', syntax: 'application/rss+xml', description: ''},
            {name: 'kml', syntax: 'application/vnd.google-earth.kml+xml', description: ''},
            {name: 'kmz', syntax: 'application/vnd.google-earth.kmz', description: ''},
            {name: 'geotiff', syntax: 'image/geotiff', description: ''},
            {name: 'geotiff8', syntax: 'image/geotiff8', description: ''},
            {name: 'gif', syntax: 'image/gif', description: ''},
            {name: 'jpeg', syntax: 'image/jpeg', description: ''},
            // {name: 'svg+xml', syntax: 'image/svg+xml<', description: ''},
            {name: 'tiff', syntax: 'image/tiff', description: ''},
            {name: 'tiff8', syntax: 'image/tiff8', description: ''},
            {name: 'openlayers', syntax: 'openlayers#toggle', description: ''}
        ];

    public wcsFormats:GeoserverFormat[] = [
        // {name: 'JPEG', syntax: 'jpeg', description: ''},
        // {name: 'GIF', syntax: 'gif', description: ''},
        // {name: 'PNG', syntax: 'png', description: 'Portable Network Graphics is a raster graphics file format that supports lossless data compression.'},
        {name: 'GeoTiff', syntax: 'geotiff', description: ''},
        {name: 'Tiff', syntax: 'tif', description: ''},
        // {name: 'BMP', syntax: 'bmp', description: ''},
        // {name: 'GTopo30', syntax: 'application/gtopo30', description: ''},
        {name: 'ArcGrid', syntax: 'ArcGrid', description: ''},
        {name: 'GZipped ArcGrid', syntax: 'ArcGrid-GZIP', description: ''},
        {name: 'NetCDF', syntax: 'application/x-netcdf', description: ''},
        {name: 'GML+XML', syntax: 'application/gml+xml', description: ''},
        {name: 'NetCDF', syntax: 'application/x-netcdf', description: ''},
        {name: 'Plain Text', syntax: 'text/plain', description: ''},
    ];
}
