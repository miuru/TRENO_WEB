import React, { Component } from 'react'
import BusStationAdd from './Station.Management.Add';
import BusStationDelete from './Station.Management.Delete';

export default class StationManagement extends Component {
    render() {
        return (
            <div>
                <div style={{width:'34%',border:'1px solid black',borderRadius:8,marginLeft:'1%',backgroundColor:'black',opacity:0.9,float:'left'}}>
                     <BusStationAdd/>
                </div>
                <div style={{width:'54%',border:'1px solid black',borderRadius:8,marginLeft:'1%',backgroundColor:'black',opacity:0.9,float:'left'}}>
                    <BusStationDelete/>
                </div>
            </div>
        )
    }
}
