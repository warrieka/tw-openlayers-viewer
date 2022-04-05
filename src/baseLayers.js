import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';

const webMercator = getProjection('EPSG:3857');
const webmercatorExtent = webMercator.getExtent();
const size = getWidth(webmercatorExtent) / 256;
const resolutions = new Array(21);
const matrixIds = new Array(21);
for (let z = 0; z < 21; ++z) {
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

let tw_Mapbox = new XYZ({
    name: "Trage wegen", id: 'tw_Mapbox', 
    attributions: ["trage wegen vzw"],
    url: "https://api.mapbox.com/styles/v1/tragewegenantwerpen/ckgtudjm12i7819pfgynlwr07/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHJhZ2V3ZWdlbmFudHdlcnBlbiIsImEiOiJjanNidDBhMzgwMmNjNGFwZmZnemFydXZnIn0.wbWyb0tpUuCfIvzF2KuPKQ",
    minZoom: 0 , maxZoom: 22
})

let osm = new OSM();

let ngi1873 =	new XYZ({
  name: "NGI Basemap 1873", id: 'ngi1873', 
  attributions: ["Nationaal Geografisch Instituut"],
  url: "https://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__140/MapServer/tile/{z}/{y}/{x}",
  minZoom: 7 , maxZoom: 17
});
let ngi1904= new XYZ({
  name: "NGI Basemap 1904", id: 'ngi1904', 
  attributions: ["Nationaal Geografisch Instituut"],
  url: "http://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__450/MapServer/tile/{z}/{y}/{x}",
  minZoom: 7 , maxZoom: 17
});
let ngi1939 =	new XYZ({
  name: "NGI Basemap 1939", id: 'ngi1939', 
  attributions: ["Nationaal Geografisch Instituut"],
  url: "http://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__800/MapServer/tile/{z}/{y}/{x}",
  minZoom: 7 , maxZoom: 17
});
let ngi1969= new XYZ({
  name: "NGI Basemap 1969", id: 'ngi1969', 
  attributions: ["Nationaal Geografisch Instituut"],
  url: "http://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__1100/MapServer/tile/{z}/{y}/{x}",
  minZoom: 7 , maxZoom: 17
});
let ngi1981 =	new XYZ({
  name: "NGI Basemap 1969", id: 'ngic', 
  attributions: ["Nationaal Geografisch Instituut"],
  url: "http://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__1220/MapServer/tile/{z}/{y}/{x}",
  minZoom: 7 , maxZoom: 17
});
let ngi1989= new XYZ({
  name: "NGI Basemap 1989", id: 'ngi1989', 
  attributions: ["Nationaal Geografisch Instituut"],
  url: "http://www.ngi.be/tiles/arcgis/rest/services/seamless_carto__default__3857__1300/MapServer/tile/{z}/{y}/{x}",
  minZoom: 7 , maxZoom: 17
});
let nginow = new XYZ({
    name: "NGI CartoWeb", id: 'ngi', 
    attributions: ["Nationaal Geografisch Instituut"],
    url: "https://cartoweb.wmts.ngi.be/1.0.0/topo/default/3857/{z}/{y}/{x}.png",
    minZoom: 7 , maxZoom: 17
});

let lufo =  new WMTS({
    url: 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts',
    attributions: ["Informatie Vlaanderen"],
    layer: 'omwrgbmrvl',
    matrixSet: 'GoogleMapsVL',
    format: 'image/png',
    projection: webMercator,
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(webmercatorExtent),
      resolutions: resolutions,
      matrixIds: matrixIds,
      }),
    style: '',
    wrapX: true,
});

let grb =  new WMTS({
    url: 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts',
    attributions: ["Informatie Vlaanderen"],
    layer: 'grb_bsk_grijs',
    matrixSet: 'GoogleMapsVL',
    format: 'image/png',
    projection: webMercator,
    tileGrid: new WMTSTileGrid({
      origin: getTopLeft(webmercatorExtent),
      resolutions: resolutions,
      matrixIds: matrixIds,
      }),
    style: '',
    wrapX: true,
 });
  
let abw = new WMTS({
      url: 'https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts',
      attributions: ["Vlaamse provincies"],
      layer: 'abw',
      matrixSet: 'GoogleMapsVL',
      format: 'image/png',
      projection: webMercator,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(webmercatorExtent),
        resolutions: resolutions,
        matrixIds: matrixIds,
        }),
      style: '',
      wrapX: true,
  });

const baselayers = [         
  {id:"nginow",  source: nginow , name: "Huidige NGI Basiskaart"},
  {id:"grb", source: grb, name: "Basiskaart Vlaanderen"},
  {id:"lufo", source: lufo, name: "Meest recente luchtfoto"},
  {id:"osm", source: osm,  name: "Openstreetmap" },
  {id:'tw_Mapbox', source: tw_Mapbox, name: "Basiskaart Trage wegen"} ];

const histolayers = [
  {id:"abw", source: abw, name: "Atlas der Buurtwegen"},
  {id:"ngi1873", source: ngi1873, name: "NGI Basiskaart, 1873"},
  {id:"ngi1904", source: ngi1904, name: "NGI Basiskaart, 1904"},
  {id:"ngi1939", source: ngi1939, name: "NGI Basiskaart, 1939"},
  {id:"ngi1969", source: ngi1969, name: "NGI Basiskaart, 1969"},
  {id:"ngi1981", source: ngi1981, name: "NGI Basiskaart, 1981"},
  {id:"ngi1989", source: ngi1989, name: "NGI Basiskaart, 1989"}
 ];

export {baselayers, histolayers};
export default baselayers;

////////////////////////////////
// ALT Methode for mapbox layers: 
////////////////////////////////
// import MapboxVector from 'ol/layer/MapboxVector';
// import TileLayer from 'ol/layer/Tile';
// const tw_Mapbox = new MapboxVector({
//    styleUrl: 'mapbox://styles/tragewegenantwerpen/ckgtudjm12i7819pfgynlwr07',
//     accessToken:
//     'pk.eyJ1IjoidHJhZ2V3ZWdlbmFudHdlcnBlbiIsImEiOiJjanNidDBhMzgwMmNjNGFwZmZnemFydXZnIn0.wbWyb0tpUuCfIvzF2KuPKQ',
//   });