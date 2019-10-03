import React, {Component} from 'react';

import BusManagementAdd from './Bus.Management.Add';
import BusManagementDelete from './Bus.Management.Delete';

class BusManagement extends Component {
    render() {
        return (
            <div>
                <div style={{width:'34%',border:'1px solid black',borderRadius:8,marginLeft:'1%',backgroundColor:'black',opacity:0.9,float:'left'}}>
                    <BusManagementAdd/>
                </div>
                <div style={{width:'54%',border:'1px solid black',borderRadius:8,marginLeft:'1%',backgroundColor:'black',opacity:0.9,float:'left'}}>
                    <BusManagementDelete/>
                </div>
            </div>
        );
    }
}

export default BusManagement;
