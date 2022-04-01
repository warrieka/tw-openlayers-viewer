
import {drawLayer} from './initMap'
import Feature from 'ol/Feature';

class popup{
  constructor(map, callback){
    this.map = map;
    this.map.on('click', evt => {
      map.forEachFeatureAtPixel(evt.pixel, this.onFeature(callback), {hitTolerance: 6});
    });
  }

  onFeature(callback) {
    return (feature, layer) => {
      if (layer) {
        let title = layer.get("title") ;
        if ( !(title == "Achtergrond" || title == 'draw') ) {
          let geom = feature.getGeometry();
          drawLayer.getSource().addFeature(new Feature({geometry: geom}));

          let attrs = Object.entries(
            feature.getProperties()).filter(e => (typeof e[1] == 'number' || typeof e[1] == 'string'));
          callback(title, attrs, geom);
        }
        return;
      }
    };
  }
}

export default popup;