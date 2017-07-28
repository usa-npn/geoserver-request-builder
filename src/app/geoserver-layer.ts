export interface GeoserverLayer {
  workspace: string;
  name: string;
  title: string;
  description: string;
  dimension: string;
  dimensionRange: string;
  metadataUrl: string;
  legendUrl: string;
  maxx: number;
  maxy: number;
  minx: number;
  miny: number;
  crs: string;
  selected: boolean;
  
  
}
