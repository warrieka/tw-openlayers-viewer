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

let ngi = new XYZ({
    name: "NGI CartoWeb", id: 'ngi', 
    attributions: ["Nationaal Geografisch Instituut"],
    url: "https://cartoweb.wmts.ngi.be/1.0.0/topo/default/3857/{z}/{y}/{x}.png",
    minZoom: 7 , maxZoom: 17
})

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


const baselayers = [ {id:"ngi", source: ngi, name: "Basiskaart Belgie, NGI"},
                     {id:"grb", source: grb, name: "Basiskaart Vlaanderen"},
                     {id:"abw", source: abw, name: "Atlas der Buurtwegen"},
                     {id:"lufo", source: lufo, name: "Luchtfoto"},
                     {id:"osm", source: osm,  name: "Openstreetmap" },
                     {id:'tw_Mapbox', source: tw_Mapbox, name: "Basiskaart Trage wegen"} ]
export {ngi, grb, abw, lufo, osm, tw_Mapbox};
export default baselayers;



// import MapboxVector from 'ol/layer/MapboxVector';
// import TileLayer from 'ol/layer/Tile';
// const tw_Mapbox = new MapboxVector({
//    styleUrl: 'mapbox://styles/tragewegenantwerpen/ckgtudjm12i7819pfgynlwr07',
//     accessToken:
//     'pk.eyJ1IjoidHJhZ2V3ZWdlbmFudHdlcnBlbiIsImEiOiJjanNidDBhMzgwMmNjNGFwZmZnemFydXZnIn0.wbWyb0tpUuCfIvzF2KuPKQ',
//   });