export interface Projection {
  name: string;
  epsg: string;
  description: string;
  alaskaOnly: boolean;
}

export const projections: Projection[] = [
  { name: 'North American Datum of 1983 (NAD83)',
    epsg: '4269',
    description: 'The North American datum of 1983 (NAD 83) is the most current datum being used in North America. It provides latitude and longitude and some height information using the reference ellipsoid GRS80. Geodetic datums like the North American Datum 1983 (NAD83) form the basis of coordinates of all horizontal positions for Canada and the United States.',
    alaskaOnly: false
  },
  { name: 'Web Mercator',
    epsg: '3857',
    description: 'Web Mercator, Google Web Mercator is a variation of the Mercator projection and is the de facto standard for Web mapping applications. It rose to prominence when used in the first Google Maps in 2005. It is used by virtually all major online map providers, including Google Maps, Bing Maps, OpenStreetMap, Mapquest, Esri, Mapbox, and many others.',
    alaskaOnly: false
  },
  { name: 'US National Atlas Equal Area',
    epsg: '2163',
    description: '',
    alaskaOnly: false
  },
  { name: 'Alaska Polar Stereographic',
    epsg: '5936',
    description: 'https://epsg.io/5936',
    alaskaOnly: true
  }
];
