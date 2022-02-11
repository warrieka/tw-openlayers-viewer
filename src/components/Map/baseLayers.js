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
                    {id:"osm", source: osm,  name: "Openstreetmap" } ]
export {ngi, grb, abw, lufo, osm};
export default baselayers;