import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {tw_Mapbox} from './baseLayers';
import {ScaleLine} from 'ol/control';

//initial background
const background = new TileLayer({
    title: 'Achtergrond',
    source: tw_Mapbox
   });

//initial View 
const viewer = new View({
        center: [464468, 6612547],
        zoom: 9, maxZoom: 21, minZoom: 7,
        extent: [206631, 6296658, 748135, 6805302]
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