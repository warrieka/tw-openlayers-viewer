import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import baseLayers from './baseLayers';
import {ScaleLine} from 'ol/control';

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

const initMap = () => {
    let map = new Map({
        layers: [background],
        view: viewer
    });
    map.addControl(new ScaleLine());
    return map;
}

export {initMap, background, viewer};