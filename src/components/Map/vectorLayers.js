import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';
import GML3 from 'ol/format/GML3';
import {Stroke, Style} from 'ol/style';


// Wijzigingen Oost-Vlaanderen 
const tw_wijz_OVL_wfs = new VectorSource({
  format: new GML3(), // GML because ESRI does noet support GeoJSON
  url: function (extent) {
    let typeName = 'OVL_buurtwegen_en_wijzigingen:wijzigingen';
    let outputFormat = "GML3";
    let uri = "https://geodiensten.oost-vlaanderen.be/arcgis/services/MOB/OVL_buurtwegen_en_wijzigingen/MapServer/WFSServer?" + 
    `service=wfs&version=2.0.0&request=GetFeature&typeName=${typeName}&outputFormat=${outputFormat}&srsname=EPSG:3857&`+
    `bbox=${extent.join(',')},EPSG:3857`;
    return uri;
  },
  strategy: bboxStrategy,
});

// Wijzigingen Vlaams-Brabant	
const tw_wijz_VLBr_wfs = new VectorSource({
  format: new GML3(), // GML because ESRI does noet support GeoJSON
  url: function (extent) {
    let typeName = 'dataservices_AtlasBuurtwegen_wijzigingen:Buurtwegwijzigingen';
    let outputFormat = "GML3";
    let uri = "https://geoservices.vlaamsbrabant.be/AtlasBuurtwegen_wijzigingen/MapServer/WFSServer?" + 
    `service=wfs&version=2.0.0&request=GetFeature&typeName=${typeName}&outputFormat=${outputFormat}&srsname=EPSG:3857&`+
    `bbox=${extent.join(',')},EPSG:3857`;
    return uri;
  },
  strategy: bboxStrategy,
});

//Trage wegen
const tragewegenWFS = new VectorSource({
    format: new GML3(), // GML because ESRI does noet support GeoJSON
    url: function (extent) {
      let typeName = 'dataservices_TrageWegen:F_TrageWegen';
      let outputFormat = "GML3";
      let uri = "https://geoservices.vlaamsbrabant.be/TrageWegen/MapServer/WFSServer?" + 
      `service=wfs&version=2.0.0&request=GetFeature&typeName=${typeName}&outputFormat=${outputFormat}&srsname=EPSG:3857&`+
      `bbox=${extent.join(',')},EPSG:3857`;
      return uri;
    },
    strategy: bboxStrategy,
  });
 
//styling functie voor trage wegen
function tragewegenStyle(feature) {
  let TW_JUR_STATUUT = feature.get('TW_JUR_STATUUT');
  let TW_TOEGANKELIJK = feature.get("TW_TOEGANKELIJK");
  let TW_ZICHTBAAR = feature.get("TW_TOEGANKELIJK");

  if ((TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == -8) ||
    (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 1)) {
    return tw_styleCache.find(e => (e.id == "greenline")).style;
  }
  if (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 2) {
    return tw_styleCache.find(e => (e.id == "greenDot")).style;
  }
  if (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 2) {
    return tw_styleCache.find(e => (e.id == "greenDash")).style;
  }
  if ((TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == -8) ||
    (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 1)) {
    return tw_styleCache.find(e => (e.id == "blueline")).style;
  }
  if (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 2) {
    return tw_styleCache.find(e => (e.id == "blueDot")).style;
  }
  if (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 2) {
    return tw_styleCache.find(e => (e.id == "blueDash")).style;
  }
}

//styling cache voor trage wegen
const tw_styleCache = [
 {
  id: "greenline",
  name: "Rooilijn in Atlas der Buurtwegen - toegankelijk",
  style: new Style({
    stroke: new Stroke({
      color: '#12db2a',
      width: 2
    })
  })
 }, {
    id: "greenDash",
    name: "Rooilijn in Atlas der Buurtwegen - ontoegankelijk",
    style: new Style({
      stroke: new Stroke({
        color: '#12db2a',
        width: 2,
        lineDash: [4,8],
        lineDashOffset: 6
      })
  })
}, {
  id: 'greenDot',
  name: "Rooilijn in Atlas der Buurtwegen - toegankelijk, maar niet zichtbaar op het terrein",
  style: new Style({
    stroke: new Stroke({
      color: '#12db2a',
      width: 2,
      lineDash: [2,2],
      lineDashOffset: 2
    })
  })
}, {
  id: 'blueline',
  name: "andere - toegankelijk",
  style: new Style({
    stroke: new Stroke({
    color:  '#1262db',
    width: 2
    })
  })
}, {
  id: 'blueDash',
  name: "andere - ontoegankelijk",
  style: new Style({
    stroke: new Stroke({
      color:  '#1262db',
      width: 2,
      lineDash: [4,8],
      lineDashOffset: 6
    })
  }),
}, {
  id: 'blueDot',
  name: "andere - toegankelijk, maar niet zichtbaar op het terrein",
  style : new Style({
    stroke: new Stroke({
      color:  '#1262db',
      width: 2,
      lineDash: [2,2],
      lineDashOffset: 2
    })
  })
}]


//styling Wijzigingen Oost Vlaanderen
let tw_wijz_OVL_stl = new Style({
  stroke: new Stroke({
    color: '#138732', width: 2
  })
})
let ttw_wijz_OVL_cache = [ {
  id: 'darkgreenline',
  name: "Wijzigingen Atlas Buurtwegen Oost-Vlaanderen", 
  style : tw_wijz_OVL_stl
}]

//styling Wijzigingen Vlaams-Brabant
let tw_wijz_VLBr_stl = new Style({
  stroke: new Stroke({
    color: '#a83232', width: 2
  })
})

let tw_wijz_VLBr_cache = [ {
  id: 'redline',
  name: "Wijzigingen Atlas Buurtwegen Vlaams-Brabant", 
  style : tw_wijz_VLBr_stl
}]

const vectorsources = [ 
  {id:"trw", source: tragewegenWFS, name: "Trage wegen", style: tragewegenStyle, styleCache: tw_styleCache, minZ: 12 } ,
  {id:"tw_wijz_VLBr_wfs", source: tw_wijz_VLBr_wfs, name: "Wijz. Vlaams-Brabant", style: 
                                    tw_wijz_VLBr_stl, styleCache: tw_wijz_VLBr_cache, minZ: 12 } ,
  {id:"tw_wijz_OVL_wfs", source: tw_wijz_OVL_wfs, name: "Wijz. Oost-Vlaanderen", style: 
                                    tw_wijz_OVL_stl, styleCache: ttw_wijz_OVL_cache, minZ: 12 } ,

];

export default vectorsources;