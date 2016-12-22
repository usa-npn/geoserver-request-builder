export interface GeoserverLayer {
    workspace: string;
    name: string;
    title: string;
    description: string;
    dimension: string;
    dimensionRange: string;
    metadataUrl: string;
    legendUrl: string;
    maxx: string;
    maxy: string;
    minx: string;
    miny: string;
    crs: string;
    selected: boolean;
}