import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { GeoserverLayer } from './geoserver-layer';
import { GeoserverFormat } from './geoserver-format';
import { map } from "rxjs/operators"; 
import {visibleLayers} from './layers';

declare function require(name: string);

@Injectable()
export class GeoserverService {
  parseString = require('xml2js').parseString;
  public wmsLayers: BehaviorSubject<GeoserverLayer[]> = new BehaviorSubject<GeoserverLayer[]>([]);
  errorMessage: string;

  public wmsFormats: GeoserverFormat[] = [
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

  public wcsFormats: GeoserverFormat[] = [
    // {name: 'JPEG', syntax: 'jpeg', description: ''},
    // {name: 'GIF', syntax: 'gif', description: ''},
    // {name: 'PNG', syntax: 'png', description: 'Portable Network Graphics is a raster graphics file format that supports lossless data compression.'},
    {name: 'GeoTiff', syntax: 'geotiff', description: ''},
    {name: 'Tiff', syntax: 'tiff', description: ''},
    // {name: 'BMP', syntax: 'bmp', description: ''},
    // {name: 'GTopo30', syntax: 'application/gtopo30', description: ''},
    {name: 'ArcGrid', syntax: 'ArcGrid', description: ''},
    {name: 'GZipped ArcGrid', syntax: 'ArcGrid-GZIP', description: ''},
    {name: 'NetCDF', syntax: 'application/x-netcdf', description: ''},
    {name: 'GML+XML', syntax: 'application/gml+xml', description: ''},
    {name: 'NetCDF', syntax: 'application/x-netcdf', description: ''},
    {name: 'Plain Text', syntax: 'text/plain', description: ''},
  ];

  constructor (private http: HttpClient) {}

  initWmsLayers() {
    this.getWmsLayers().subscribe(
      wmsLayers => {
        let that = this;
        this.parseString(wmsLayers, function (err, result) {
          console.log(result);
          let layers: GeoserverLayer[] = [];
          for (let layer of result.WMS_Capabilities.Capability[0].Layer[0].Layer) {
            if (visibleLayers.includes(layer.Name[0])) { //layer.Dimension && layer.Style
              if (layer.Title[0] !== 'states' && layer.Title[0] !== 'average_leaf_prism_2015') {
                let crs, maxx, maxy, minx, miny = null;
                for (let bbox of layer.BoundingBox) {
                  if (bbox['$'] && bbox['$']['CRS'] === 'EPSG:4269') {
                      crs = bbox['$']['CRS'];
                      maxx = Number(bbox['$']['maxx']);
                      maxy = Number(bbox['$']['maxy']);
                      minx = Number(bbox['$']['minx']);
                      miny = Number(bbox['$']['miny']);
                  }
                }
                let metaData = null;
                if (layer.MetadataURL) {
                  metaData = layer.MetadataURL[0]['OnlineResource'][0]['$']['xlink:href'];
                }
                layers.push({
                    workspace: layer.Name[0].split(':')[0],
                    name: layer.Name[0],
                    title: layer.Title[0],
                    description: layer.Abstract[0],
                    dimension: layer.Dimension ? layer.Dimension[0]['$']['name'] : null,
                    dimensionRange: layer.Dimension ? layer.Dimension[0]['_'] : null,
                    metadataUrl: metaData,
                    legendUrl: layer.Style[0]['LegendURL'][0]['OnlineResource'][0]['$']['xlink:href'],
                    maxx: maxx,
                    maxy: maxy,
                    minx: minx,
                    miny: miny,
                    crs: crs,
                    selected: false
                });
              }
            }
          }
          // console.log(layers);
          that.wmsLayers.next(layers.sort(function(a: GeoserverLayer, b: GeoserverLayer) {
              if (a.workspace < b.workspace) {
                return -1;
              } else if (a.workspace > b.workspace) {
                return 1;
              } else if (a.title < b.title) {
                return -1;
              } else if (a.title > b.title) {
                return 1;
              } else {
                return 0;
              }
          }));

          // that.wmsLayers = layers;
        });
      },
      error => this.errorMessage = <any>error);
  }

  getWmsLayers() {
    let wmsCapabilitiesUrl = '';
    if (location.hostname.includes('local')) {
      wmsCapabilitiesUrl = window.location.protocol + '//geoserver.usanpn.org/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities';
    } else if (location.hostname.includes('dev')) {
      wmsCapabilitiesUrl = window.location.protocol + '//geoserver-dev.usanpn.org/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities';
    } else {
      wmsCapabilitiesUrl = window.location.protocol + '//geoserver.usanpn.org/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities';
    }
    // this.http.get(wmsCapabilitiesUrl,{responseType: 'text'}).subscribe((res)=>{
    //   console.log(res);
    // });
    return this.http.get(wmsCapabilitiesUrl, {responseType: 'text'});
  }

}
