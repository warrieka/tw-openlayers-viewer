import {Vector as VectorLayer} from 'ol/layer';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';
import GML3 from 'ol/format/GML3';
import {Stroke, Style} from 'ol/style';


const tragewegenWFS = new VectorSource({
    format: new GML3({projection: 'EPSG:4326', displayProjection: 'EPSG:3857'}),
    url: function (extent) {
      let uri = "https://geoservices.vlaamsbrabant.be/TrageWegen/MapServer/WFSServer?" + 
      "service=wfs&version=2.0.0&request=GetFeature&typeName=dataservices_TrageWegen:F_TrageWegen&outputFormat=GML3&srsname=EPSG:3857&"+
      `bbox=${extent.join(',')},EPSG:3857`;
      return uri;
    },
    strategy: bboxStrategy,
  });


const vectorsources = [ {id:"trw", source: tragewegenWFS, name: "Trage wegen"},
                      ]

const addVectorLayer = (map, dataSource) => {
    let vector = new VectorLayer({
        source: dataSource, minZoom: 14,
        style: new Style({
            stroke: new Stroke({
              color: 'rgba(0, 0, 255, 1.0)',
              width: 2,
            })
          })
        });
    map.addLayer(vector);
    return vector;
}

export {addVectorLayer, vectorsources};
export default vectorsources;