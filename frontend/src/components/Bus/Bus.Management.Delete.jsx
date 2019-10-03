import React, { Component } from 'react'
import axios from 'axios';


export default class BusManagementDelete extends Component {

    constructor(props){
        super(props);
        this.state={
            buses:[
                {
                    BusId:'No',
                    DepartureTime:'Bus',
                    ArrivalTime:'Record',
                    Duration:'is',
                    DepartureStation:'Available',
                    ArrivalStation:'In',
                    Miles:'the',
                    Price:'System',
                    Stops:'!'
                }
            ]
        };
        this.getStops = this.getStops.bind(this);
        this.deleteBus =this.deleteBus.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:4000/bus').then((res)=>{
            let Obj = res.data;
            this.setState({
                buses:Obj
            });
            console.log(Obj);
        });
    }

    getStops(stopsArr){
        if(stopsArr.length){
            let stopsStr='';
            for(let x=0;x<stopsArr.length;x++){
                stopsStr += stopsArr[x].Name+" ";
             if(x===stopsArr.length-1){
                 alert(stopsStr);
             }
            }
        }else
            alert('Stops are empty. There might be something wrong');
    }

    deleteBus(id){
        console.log(id);
        axios.delete('http://localhost:4000/bus/delete/'+id).then((res)=>{
            alert(res.data.message);
        }).catch((err)=>{
            alert(err.message);
        })
    }

    render() {
        return (
            <div className="container text-light">
                <h3 style={{fontFamily: 'Noto Serif',textDecoration:'underline'}}>Delete Bus</h3>
                <div>
                    <table style={{width:'55%'}} className="table table-hover text-light">
                        <thead>
                            <tr>
                                <th>Bus Route Number</th>
                                <th>Departure Time</th>
                                <th>Departure Station</th>
                                <th>Arrival Time</th>
                                <th>Arrival Station</th>
                                <th>Duration</th>
                                <th>Miles</th>
                                <th>Price</th>
                                <th>View Stops</th>
                                <th>Delete Bus</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.buses.map((bus,i)=>{
                                        return(<tr key={i}>
                                            <td>{bus.BusId}</td>
                                            <td>{bus.DepartureTime}</td>
                                            <td>{bus.DepartureStation}</td>
                                            <td>{bus.ArrivalTime}</td>
                                            <td>{bus.ArrivalStation}</td>
                                            <td>{bus.Duration}</td>
                                            <td>{bus.Miles}</td>
                                            <td>{bus.Price}</td>
                                            <td><button onClick={()=>{this.getStops(bus.Stops)}} className="btn btn-dark">View Stops</button></td>
                                            <td><button onClick={()=>{this.deleteBus(bus._id)}} className="btn btn-danger">Delete</button></td>
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
