import {Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';

const addVectorLayer = (map, dataSource, style, title, minZ=11) => {
    let vector = new VectorLayer({
        title: title, 
        source: dataSource, minZoom: minZ,
        style: style
        });
    map.addLayer(vector);
    return vector;
}

const urlParams = () => {
    const params = (new URL(document.location)).searchParams;
    const trues = ["true", "1", "yes", ''];
    const logo = params.get("logo") ? trues.includes( params.get("logo").toLowerCase() ) : true;
    let x = parseFloat( params.get("x"));
    let y = parseFloat( params.get("y"));
    let z = parseInt( params.get("z"));
    let xy = [464468, 6612547]; 
    if( x && y ) {
        xy = fromLonLat([x,y]); 
    }
    z= z ? z : 8; 
    return { center: xy, zoom: z, logo: logo }
}

const VectorLegendSVG = (styleCache, viewBoxWidth) => {
    let step = 30;
    let viewBoxHeight = (styleCache.length * step) + 20;
    return (
      <svg width={viewBoxWidth} height={viewBoxHeight} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
          {styleCache.map( (o,i) => {
             let stroke = o.style.getStroke();
             /// TODO: other geometry types. 
            //  let fill =  o.style.getFill()
            //  let icon =  o.style.getImage()
             ///
             let[strokeClr, width, dash]= ['','',''];

             if(stroke){
                strokeClr = stroke.getColor();
                width = stroke.getWidth() ? stroke.getWidth().toString() : '';
                dash= stroke.getLineDash() ? stroke.getLineDash().join(' '): '';
             }
             return <g key={o.id}  >
                  <text fill='#002140' x="0"  y={(i*step +20).toString()}>{o.name}</text>
                  <line 
                    x1={(viewBoxWidth * 0.2).toString()} 
                    x2={(viewBoxWidth * 0.8).toString()} 
                    y1={(i*step +30).toString()} 
                    y2={(i*step +30).toString()} 
                   stroke={strokeClr} strokeWidth={width} strokeDasharray={dash} /> 
                </g>
          } )}
      </svg>
    );
  };

export {addVectorLayer, urlParams, VectorLegendSVG};