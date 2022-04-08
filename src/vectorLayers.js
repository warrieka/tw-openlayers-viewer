// Configure the foreground vector layers
// https://openlayers.org/en/latest/apidoc/
import {bbox} from 'ol/loadingstrategy';
import VectorSource from 'ol/source/Vector';
import GML3 from 'ol/format/GML3';
import {Stroke, Style} from 'ol/style';

// Wijzigingen Oost-Vlaanderen 
///info: https://geodiensten.oost-vlaanderen.be/arcgis/services/MOB/OVL_buurtwegen_en_wijzigingen/MapServer/WFSServer?service=wfs&request=GetCapabilities&version=1.1.0
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
  strategy: bbox,
});

// Wijzigingen Vlaams-Brabant	
///info: https://geoservices.vlaamsbrabant.be/AtlasBuurtwegen_wijzigingen/MapServer/WFSServer?service=wfs&request=GetCapabilities&version=1.1.0
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
  strategy: bbox,
});

//Trage wegen
///info: https://geoservices.vlaamsbrabant.be/TrageWegen/MapServer/WFSServer?service=wfs&request=GetCapabilities&version=1.1.0
const tragewegen_wfs = new VectorSource({
    format: new GML3(), // GML because ESRI does noet support GeoJSON
    url: function (extent) {
      let typeName = 'dataservices_TrageWegen:F_TrageWegen';
      let outputFormat = "GML3";
      let uri = "https://geoservices.vlaamsbrabant.be/TrageWegen/MapServer/WFSServer?" + 
      `service=wfs&version=2.0.0&request=GetFeature&typeName=${typeName}&outputFormat=${outputFormat}&srsname=EPSG:3857&`+
      `bbox=${extent.join(',')},EPSG:3857`;
      return uri;
    },
    strategy: bbox,
  });
 
//styling functie voor trage wegen
function tragewegen_stl(feature, resolution) {
  let TW_JUR_STATUUT = feature.get('TW_JUR_STATUUT');
  let TW_TOEGANKELIJK = feature.get("TW_TOEGANKELIJK");
  let TW_ZICHTBAAR = feature.get("TW_TOEGANKELIJK");

  if ((TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == -8) ||
    (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 1)) {
    return tragewegen_cache.find(e => (e.id == "greenline")).style;
  }
  if (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 2) {
    return tragewegen_cache.find(e => (e.id == "greenDot")).style;
  }
  if (TW_JUR_STATUUT == 2 && TW_TOEGANKELIJK == 2) {
    return tragewegen_cache.find(e => (e.id == "greenDash")).style;
  }
  if ((TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == -8) ||
    (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 1)) {
    return tragewegen_cache.find(e => (e.id == "blueline")).style;
  }
  if (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 1 && TW_ZICHTBAAR == 2) {
    return tragewegen_cache.find(e => (e.id == "blueDot")).style;
  }
  if (TW_JUR_STATUUT != 2 && TW_TOEGANKELIJK == 2) {
    return tragewegen_cache.find(e => (e.id == "blueDash")).style;
  }
}

//styling cache voor trage wegen
const tragewegen_cache = [
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
  name: "Rooilijn in Atlas der Buurtwegen, toegankelijk, maar niet zichtbaar op terrein",
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
  name: "Andere - toegankelijk",
  style: new Style({
    stroke: new Stroke({
    color:  '#1262db',
    width: 2
    })
  })
}, {
  id: 'blueDash',
  name: "Andere - ontoegankelijk",
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
  name: "Andere - toegankelijk, maar niet zichtbaar op terrein",
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
const tw_wijz_OVL_stl = new Style({
  stroke: new Stroke({
    color: '#138732', width: 2
  })
})
const tw_wijz_OVL_cache = [ {
  id: 'darkgreenline',
  name: "Wijzigingen Atlas Buurtwegen Oost-Vlaanderen", 
  style : tw_wijz_OVL_stl
}]

const tw_wijz_OVL_tmpl = feat => `
<b>detailplanNr:${feat.detailplanNr}</b>
<p>gemeentenr: ${feat.gemeentenr}</p>
<p>ID: ${feat.IDwijziging}</p>
<p>Datum:  ${feat.datum}</p>
<p><a target="_blank" href="${feat.scan}">scan</a></p>`

//styling Wijzigingen Vlaams-Brabant
const tw_wijz_VLBr_stl = new Style({
  stroke: new Stroke({
    color: '#a83232', width: 2
  })
})
const tw_wijz_VLBr_cache = [ {
  id: 'redline',
  name: "Wijzigingen Atlas Buurtwegen Vlaams-Brabant", 
  style : tw_wijz_VLBr_stl
}]

const tw_wijz_VLBr_tmpl = feat => `
<b>ID: ${feat.DocumentID} </b> 
<a href="${feat.rasterbeeld}" target="_blank" >
 <img src="${feat.rasterbeeld}" width="500" />
</a>
<p>Omschrijving: ${feat.Omschrijving}</p> 
<p>Datum:  ${(new Date( Date.parse(feat.DATUM))).toLocaleDateString(
    'nl-be', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p> 
`

// LIJST 
const vectorsources = [ 
  {id:"trw", source: tragewegen_wfs, name: "Trage wegen", visible: true, 
        style: tragewegen_stl,   styleCache: tragewegen_cache,   minZ: 12 } ,
  {id:"tw_wijz_VLBr_wfs", source: tw_wijz_VLBr_wfs, name: "Wijz. Vlaams-Brabant",  visible: false, 
        style: tw_wijz_VLBr_stl, styleCache: tw_wijz_VLBr_cache, minZ: 12 , template: tw_wijz_VLBr_tmpl } ,
  {id:"tw_wijz_OVL_wfs",  source: tw_wijz_OVL_wfs,  name: "Wijz. Oost-Vlaanderen", visible: false, 
        style: tw_wijz_OVL_stl,  styleCache: tw_wijz_OVL_cache, minZ: 12 , template: tw_wijz_OVL_tmpl } ];

export {vectorsources};
export default vectorsources;