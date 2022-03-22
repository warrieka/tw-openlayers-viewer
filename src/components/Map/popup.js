import Overlay from 'ol/Overlay';

export default class popup{
  constructor(map, callback){
    this.popup = new Overlay({
      element: document.getElementById('idPopup'),
      positioning: 'center-center',
      stopEvent: false, 
      offset: [0,-10]
    });

    map.addOverlay(this.popup);
    map.on('click', evt => {
      map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer){
           if (layer.get("title") !== "Achtergrond") {
              this.popup.setPosition(evt.coordinate);
              let attrs = Object.entries(feature.getProperties()).filter(e=> 
                            (typeof e[1] == 'number' || typeof e[1] == 'string'));
              callback(layer.get("title") , attrs  );
           }
           return; //== only for the first one
        }
      }, {hitTolerance: 6});
    });
  }
}