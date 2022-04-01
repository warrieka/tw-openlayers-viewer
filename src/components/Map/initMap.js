import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import baseLayers from '../../baseLayers';
import {ScaleLine} from 'ol/control';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import {toLonLat} from 'ol/proj';
import {urlParams} from '../tools'

let logo = urlParams().logo

let baseMap = baseLayers.find(e=> (e.id === 'tw_Mapbox'));
 
//initial background
const background = new TileLayer({
    title: 'Achtergrond',
    source: baseMap.source
   });

//initial View 
const viewer = new View({
        center: [464468, 6612547],
        zoom: 9, maxZoom: 21, minZoom: 7,
        extent: [177852,6078083,968831,6920858] 
    });


viewer.on('change', () => {
    let z = viewer.getZoom().toFixed(2);
    let xy = toLonLat( viewer.getCenter() );
    let x= xy[0].toFixed(5); let y = xy[1].toFixed(5);
    let qry = `?logo=${logo}&x=${x}&y=${y}&z=${z}`
    let newurl = location.protocol + "//" + location.host + location.pathname + qry;
    history.pushState({path:newurl},'',newurl);
} );

 const drawLayer = new VectorLayer({
    title: 'draw',
    source: new VectorSource(),
    style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.5)'
        }),
        stroke: new Stroke({
          color: 'rgb(255, 255, 0)', width: 4
        }),
        image: new Circle({
            radius: 7,
            fill: new Fill({
              color: 'rgba(255, 255, 0, 0.5)',
            }), 
        })
      })
  });

const initMap = () => {
    let map = new Map({
        layers: [background, drawLayer],
        view: viewer
    });
    map.addControl(new ScaleLine());
    return map;
}

export {initMap, background, viewer, drawLayer};