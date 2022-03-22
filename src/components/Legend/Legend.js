//import UI
import React, { Component  } from "react";
import { AutoComplete, Layout, Menu, Checkbox } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

//import icons and css
import { IconContext } from "react-icons";
import { FiLayers } from "react-icons/fi";
import { FaMap } from "react-icons/fa";
import "./Legend.css";
import 'antd/dist/antd.css';
import logo from '../../images/logo.svg';

// maps 
import {background, viewer} from '../Map/initMap';
import {addVectorLayer} from './tools'
import {fromLonLat} from 'ol/proj';
import {vectorsources} from '../Map/vectorLayers';
import baselayers from '../Map/baseLayers';

class Legend extends Component {
   constructor(props) {
      super(props);
   //  window.map=  props.map;
      this.state = { menuCollapse: false, adressuggestions: [],
                     map: props.map,
                     vectors: vectorsources.map(o => {
                                   o.lyr = addVectorLayer(props.map, o.source, o.style, o.name); 
                                   return o;}),
                     basemap: 'tw_Mapbox',
                     basemaps: baselayers
                    };
  }
  adresSearchChange = async val => {
      let geoUri = "https://loc.geopunt.be/v4/Suggestion?q=" + val;
      let resp= await fetch(geoUri).then(r => r.json());
      this.setState({adressuggestions: resp.SuggestionResult.map(e => ( {value: e} )) }) 
  }
  adresSearchSelect = async () => {
      if( this.state.adressuggestions.length == 0 ){ return; }
      let q = this.state.adressuggestions[0].value;
      let geoUri = "https://loc.geopunt.be/v4/Location?q=" + q;
      let resp= await fetch(geoUri).then(r => r.json());
      if(resp.LocationResult.length == 0){ return; }
      let geoLoc = resp.LocationResult[0];
      let center  = fromLonLat([geoLoc.Location.Lon_WGS84, geoLoc.Location.Lat_WGS84]);
      let LowerLeft = fromLonLat([geoLoc.BoundingBox.LowerLeft.Lon_WGS84, geoLoc.BoundingBox.LowerLeft.Lat_WGS84]);
      let UpperRight = fromLonLat([geoLoc.BoundingBox.UpperRight.Lon_WGS84, geoLoc.BoundingBox.UpperRight.Lat_WGS84]);
      let bbox = [LowerLeft[0] -50, LowerLeft[1] -50,
                   UpperRight[0]+50, UpperRight[1] +50];
      viewer.fit(bbox);	
  }
  closemenuClick = () => {
    this.setState(prevState => ({
      menuCollapse: !prevState.menuCollapse
    }));
  }
  toggleVector = idx => {
     let vectors = this.state.vectors;
     let v = !vectors[idx].lyr.getVisible();
     vectors[idx].lyr.setVisible( v );
     this.setState({vectors:vectors});
  }
  activateBasemap = (lyrId, idx) => {
     let lyr = this.state.basemaps[idx]
     background.setSource(lyr.source);
     this.setState({basemap:lyrId});
  }

  render() {
    return (
        <IconContext.Provider value={{ color: "#ccc"}}>
          <Sider style={{height:"100vh", overflowY:'auto', overflowX: 'hidden'}}
                    collapsible width={200} collapsed={this.state.menuCollapse} trigger={null}
                    className="site-layout-background">
              <div style={{paddingTop: 10}}>
                  <img src={logo} id="Logo" style={{width: this.state.menuCollapse ? 40 : 100, alignSelf: 'center' }} />
              </div> 
              <AutoComplete  style={{padding:10, width:200}}  
                     onChange={this.adresSearchChange} 
                     onSelect={this.adresSearchSelect}
                     onKeyDown={e =>{ if(e.key === 'Enter') this.adresSearchSelect(); } } 
                     notFoundContent="Geen adressen gevonden"
                     options={this.state.adressuggestions} 
                     placeholder="Zoek een Adres" />
              <Menu theme="dark" mode="inline"  inlineIndent={10}
                  defaultOpenKeys={['background', 'layers']} >
                <SubMenu key="layers" title="Lagen" icon={<FiLayers />} > 
                  {this.state.vectors.map( (o,i) => {
                        return (
                        <Menu.Item key={o.id} disabled >
                            <Checkbox style={{padding: '5px', color: 'white'}}
                                onChange={this.toggleVector.bind(this, i)} 
                                checked={this.state.vectors[i].lyr.getVisible() }>
                            {o.name}</Checkbox>
                        </Menu.Item>
                        )
                  })}
                  </SubMenu>
                  <SubMenu key="background" title="Achtergrond" icon={<FaMap />} >
                  {this.state.basemaps.map( (o,i) => {
                        return ( 
                        <Menu.Item className={ this.state.basemap == o.id  ?"ant-menu-item-selected":''}
                          onClick={this.activateBasemap.bind(this, o.id, i)} key={o.id} >
                            {o.name}
                        </Menu.Item> 
                        )	
                  })}
                  </SubMenu>
              </Menu>
          </Sider>
        </IconContext.Provider> )
    }
}
export default Legend;