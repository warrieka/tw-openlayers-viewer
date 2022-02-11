import React, { Component  } from "react";
import {initMap} from './initMap';
import 'ol/ol.css'; 
import './map.scss';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
       initMap();
       
    }

    render() { 
        return <div id="map" style={{  width: '100vw', height: '100vh' }} ></div>
    }
}

export default Map; 