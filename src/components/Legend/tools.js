import {Vector as VectorLayer} from 'ol/layer';

export const addVectorLayer = (map, dataSource, style, title) => {
    let vector = new VectorLayer({
        title: title, 
        source: dataSource, minZoom: 14,
        style: style
        });
    map.addLayer(vector);
    return vector;
}