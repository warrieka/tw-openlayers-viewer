//import useState hook to create menu collapse state
import React, { useState, Component  } from "react";

//import react pro sidebar components
import { ProSidebar, Menu, SubMenu, MenuItem,
  SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";

//import icons and css
import { IconContext } from "react-icons";
import { FaList, FaRegHeart , FaHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { FaMap } from "react-icons/fa";
import { MdOutlineAccountTree } from 'react-icons/md';
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.css";

class Header extends Component {
   constructor(props) {
	   super(props);
	   this.state = {menuCollapse: false, 
	   };
	   this.backgroundMaps = [{id:"lufo", name:"Luchtfoto"},{id: "grb",name: "Basiskaart Vlaanderen"}];
	   //eventhandlers 
	   this.closemenuClick = this.closemenuClick.bind(this);
   }

  closemenuClick = () => {
	this.setState(prevState => ({
      menuCollapse: !prevState.menuCollapse
    }));
  }
  
  activateLasers(msg){
	  console.log( msg )
  }
  
  render() {
	return (
		<>
		  <div id="header">
			<IconContext.Provider value={{ color: "#ccc", className: "global-class-name" }}>
			<ProSidebar collapsed={this.state.menuCollapse}>
			  <SidebarHeader>
				<div style={{paddingLeft: 10}}>
				  <p>{this.state.menuCollapse ? <MdOutlineAccountTree /> :  "Legende"}</p>
				</div>
				<div className="closemenu" onClick={this.closemenuClick}>
				  {this.state.menuCollapse ? (
					<FiArrowRightCircle/>
				  ) : (
					<FiArrowLeftCircle/>
				  )}
				</div>
			  </SidebarHeader>
			  <SidebarContent>
				<Menu iconShape="square">
				  <MenuItem icon={<FiHome />}>
					Home
				  </MenuItem>
				  <SubMenu title="Achtergrond" defaultOpen={true} icon={<FaMap />} >
				  {this.backgroundMaps.map( (o, i) => {
						return <MenuItem onClick={this.activateLasers.bind(this,o.id)} key={o.id}  >{o.name}</MenuItem>	
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