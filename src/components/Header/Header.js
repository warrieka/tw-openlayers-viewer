//import UI
import React, { Component  } from "react";
import { ProSidebar, Menu, SubMenu, MenuItem,
  SidebarHeader, SidebarContent } from "react-pro-sidebar";

//import icons and css
import { IconContext } from "react-icons";
import { FiSearch, FiArrowLeftCircle, FiPrinter, 
		 FiArrowRightCircle, FiLayers, FiCalendar } from "react-icons/fi";
import { FaMap } from "react-icons/fa";
import "./Header.scss";
import logo from '../../images/logo.svg';

// maps 
import {background} from '../Map/initMap';
import baselayers from '../Map/baseLayers';

class Header extends Component {
   constructor(props) {
	   super(props);
	   this.state = {menuCollapse: false, 
	   };
	   this.backgroundMaps = baselayers;
	   //eventhandlers 
	   this.closemenuClick = this.closemenuClick.bind(this);
   }

  closemenuClick = () => {
	this.setState(prevState => ({
      menuCollapse: !prevState.menuCollapse
    }));
  }
  
  activateBasemap(basemapId){
	    let lyr = this.backgroundMaps.find( e => e.id === basemapId )
		if (lyr != undefined) background.setSource(lyr.source)
  }
  
  render() {
	return (
		<>
		  <div id="header">
			<IconContext.Provider value={{ color: "#ccc"}}>
			<ProSidebar collapsed={this.state.menuCollapse}>
			  <SidebarHeader>
				<div style={{paddingLeft: 10}}><p>
				<img src={logo} alt="Logo"  width={this.state.menuCollapse ? "40" : "100" } />
				</p>
				</div>
				<div className="closemenu" onClick={this.closemenuClick}>
				  {this.state.menuCollapse ? <FiArrowRightCircle/> : <FiArrowLeftCircle/>}
				</div>
			  </SidebarHeader>
			  <SidebarContent>
				<Menu iconShape="square">
				  <SubMenu title="Zoek adres" defaultOpen={false} icon={<FiSearch />}>
				  <MenuItem >
					<input placeholder="adres" ></input>
				  </MenuItem>
				  </SubMenu>
				  <SubMenu title="Print" defaultOpen={false} icon={<FiPrinter />} > </SubMenu>
				  <SubMenu title="Lagen" defaultOpen={false} icon={<FiLayers />} > </SubMenu>
				  <SubMenu title="Historische kaart" defaultOpen={false} icon={<FiCalendar />} > </SubMenu>
				  <SubMenu title="Achtergrond" defaultOpen={true} icon={<FaMap />} >
				  {this.backgroundMaps.map( (o, i) => {
						return <MenuItem onClick={this.activateBasemap.bind(this,o.id)} key={o.id}  >{o.name}</MenuItem>	
				  })}
				  </SubMenu>
				</Menu>
			  </SidebarContent>
			</ProSidebar>
			</IconContext.Provider>
		  </div>
		</>
	  );
	}
}
export default Header;