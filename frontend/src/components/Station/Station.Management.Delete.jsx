import React, { Component } from 'react'
import axios from "axios";

export default class StationManagementDelete extends Component {
    constructor(props){
        super(props);
        this.state={
            stations:[]
        };
        this.deleteBusStation =this.deleteBusStation.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:4000/station').then((res)=>{
            let Obj = res.data;
            this.setState({
                stations:Obj
            });
            console.log(Obj);
        });
    }

    deleteBusStation(id){
        console.log(id);
        axios.delete('http://localhost:4000/station/delete/'+id).then((res)=>{
            alert(res.data.message);
        }).catch((err)=>{
            alert(err.message);
        })
    }

    render() {
        return (
            <div className="container text-light">
                <h3 style={{fontFamily: 'Noto Serif',textDecoration:'underline'}}>Delete Bus Station</h3>
                <div>
                    <table style={{width:'55%',marginLeft:'15%'}} className="table table-hover text-light">
                        <thead>
                            <tr>
                                <th>Bus Station Code</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.stations.map((station,i)=>{
                                        return(<tr key={i}>
                                            <td>{station.BusStationCode}</td>
                                            <td>{station.Coordinates.lat}</td>
                                            <td>{station.Coordinates.lng}</td>
                                            <td>{station.Name}</td>
                                            <td>{station.City}</td>
                                            <td><button onClick={()=>{this.deleteBusStation(station._id)}} className="btn btn-danger">Delete</button></td>
                                        </tr>)
                                    })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
