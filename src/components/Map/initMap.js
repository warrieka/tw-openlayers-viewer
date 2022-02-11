import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import {ngi} from './baseLayers';

const background = new TileLayer({
    source: ngi
  });

const initMap = () => {
    const map = new Map({
        layers: [background],
        target: 'map',
    
        view: new View({
        center: [485794, 6655284],
        zoom: 10,
        }),
    });
    return map;
}

export {initMap, background};
export default initMap;