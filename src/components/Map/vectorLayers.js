import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';
import GML3 from 'ol/format/GML3';
import GeoJSON from 'ol/format/GeoJSON';
import {Stroke, Fill, Style} from 'ol/style';

const tragewegenWFS = new VectorSource({
    format: new GML3(), //{projection: 'EPSG:4326', displayProjection: 'EPSG:3857'}
    url: function (extent) {
      let uri = "https://geoservices.vlaamsbrabant.be/TrageWegen/MapServer/WFSServer?" + 
      "service=wfs&version=2.0.0&request=GetFeature&typeName=dataservices_TrageWegen:F_TrageWegen&outputFormat=GML3&srsname=EPSG:3857&"+
      `bbox=${extent.join(',')},EPSG:3857`;
      return uri;
    },
    strategy: bboxStrategy,
  });
 

const tragewegenStyle = feature => {
    let TW_JUR_STATUUT = feature.get('TW_JUR_STATUUT');
    let TW_TOEGANKELIJK = feature.get("TW_TOEGANKELIJK");
    let TW_ZICHTBAAR = feature.get("TW_TOEGANKELIJK");

    if ( (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == -8) ||
         (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 1) )
    {
        return styleCache.greenline;
    }
    if (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 2)
    {
        return styleCache.greenDot;
    }   
    if (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 2)
    {
        return styleCache.greenDash;
    }
    if ( (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == -8) ||
         (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 1) )
    {
        return styleCache.blueline;
    }
    if (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 2)
    {
        return styleCache.blueDot;
    }   
    if (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 2)
    {
        return styleCache.blueDash;
    }
    return styleCache.gray;
  }

const styleCache = {
  greenline: new Style({
    name: "Rooilijn in Atlas der Buurtwegen - toegankelijk",
    stroke: new Stroke({
      color: '#12db2a',
      width: 2
    })
  }),
  greenDash: new Style({
    name: "Rooilijn in Atlas der Buurtwegen - toegankelijk",
    stroke: new Stroke({
      color: '#12db2a',
      width: 2,
      lineDash: [4,8],
      lineDashOffset: 6
    })
  }),
  greenDot: new Style({
    name: "Rooilijn in Atlas der Buurtwegen - toegankelijk, maar niet zichtbaar op het terrein",
    stroke: new Stroke({
      color: '#12db2a',
      width: 2,
      lineDash: [2,2],
      lineDashOffset: 2
    })
  }),
  blueline: new Style({
    name: "andere - toegankelijk",
    stroke: new Stroke({
    color:  '#1262db',
    width: 2
    })
  }),
  blueDash: new Style({
    name: "andere - ontoegankelijk",
    stroke: new Stroke({
      color:  '#1262db',
      width: 2,
      lineDash: [4,8],
      lineDashOffset: 6
    })
  }),
  blueDot: new Style({
    name: "andere - toegankelijk, maar niet zichtbaar op het terrein",
    stroke: new Stroke({
      color:  '#1262db',
      width: 2,
      lineDash: [2,2],
      lineDashOffset: 2
    })
  }),
  gray: new Style({
    name: "Andere",
    stroke: new Stroke({
    color:  '#aaa',
    width: 1
    })
  })
}

const erfgoedWfs = new VectorSource({
  format: new GeoJSON(),
  url: function (extent) {
    let uri = "https://geo.onroerenderfgoed.be/geoserver/ows?" + 
    "service=wfs&version=2.0.0&request=GetFeature&typeName="
    +"vioe_geoportaal:bouwkundig_geheel&outputFormat=json&srsname=EPSG:3857&"+
    `bbox=${extent.join(',')},EPSG:3857`;
    return uri;
  },
  strategy: bboxStrategy,
});


const vectorsources = [ 
  {id:"trw", source: tragewegenWFS, name: "Trage wegen", style: tragewegenStyle},
  {id:"erf", source: erfgoedWfs, name: "Bouwkundig erfgoed", style: new Style({
    stroke: new Stroke({
      color: 'rgba(0, 0, 255, 1.0)',
      width: 2,
      }),
      fill: new Fill({
        color:'rgba(0, 0, 255, .4)',
      })
    })
  }    
];

export {vectorsources};
export default vectorsources;