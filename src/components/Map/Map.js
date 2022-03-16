import React, { Component  } from "react";
import {initMap} from './initMap';
import Legend from '../Legend/Legend';
import { Layout } from 'antd';
const { Content } = Layout;
//css
import 'ol/ol.css'; 
import './map.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {map: initMap(null) };
    }

    componentDidMount() {
       let target = document.getElementById("olmap");
       this.state.map.setTarget(target)
     }

    render() { 
        return <>
            <Layout>
                <Legend map={this.state.map}/>
                <Content > 
                    <div id="olmap" style={{width:"100%", height:"100vh"}}  >
                        <div id="labelLayer"></div>
                    </div> 
                </Content>
            </Layout>
         </>
    }
}

export default Map; 