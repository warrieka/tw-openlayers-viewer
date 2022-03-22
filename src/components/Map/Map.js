import React, { Component  } from "react";
import {initMap} from './initMap';
import Legend from '../Legend/Legend';
import { Modal, Layout, Button} from 'antd';
import { FiMapPin } from "react-icons/fi";
const { Content } = Layout;
import popup from "./popup";
//css
import 'ol/ol.css'; 
import './map.css';
import 'antd/dist/antd.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {map: initMap() , popupTitle: '', popupContent: [], popupVisible: false };
    }

    componentDidMount(){
       let target = document.getElementById("olmap");
       this.state.map.setTarget(target);
       new popup(this.state.map, this.infoFound);
     }


    infoFound = (title, content) => {
        this.setState({popupVisible: true, popupContent: content, popupTitle: title });
    }

    cancel = () => this.setState({popupVisible: false})

    render() { 
        return <>
            <Modal title={this.state.popupTitle} onCancel={this.cancel}
                   footer={<Button onClick={this.cancel} >Sluiten</Button>} 
                   visible={this.state.popupVisible}
                   bodyStyle={{height: document.body.scrollHeight /2 , overflowY:'scroll'}}
                   >
    
                {this.state.popupContent.map( (e,i) =>{
                    return (
                        <span key={i} ><b>{e[0]}</b>: {e[1]}<br/></span>
                    )
                })} 
            </Modal>
            <Layout>
                <Legend map={this.state.map} />
                <Content > 
                    <div id="olmap" style={{width:"100%", height:"100vh"}}  >
                        <div id="idPopup"><FiMapPin size={20} /></div>
                    </div> 
                </Content>
            </Layout>
         </>
    }
}

export default Map; 