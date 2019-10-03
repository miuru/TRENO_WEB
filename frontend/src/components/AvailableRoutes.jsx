import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import blueIcon from '../assets/blueiconlarge.png'

import axios from 'axios';

class AvailableRoutes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMarkers:false,
            routes: [],
            modal: false,
            selected: {},
            currentLatLng: {},
            currentBus: {
                Name: '',
                From: '',
                To: '',
                Duration: '',
                Distance: 0,
                Stops:[]
            },
            
        };
        this.getGeoLocation();
        this.getGeoLocation = this.getGeoLocation.bind(this);
        this.onChangeRoute = this.onChangeRoute.bind(this);
        this.toggle = this.toggle.bind(this);
        this.renderBusStops = this.renderBusStops.bind(this);
        axios.get('http://localhost:4000/bus').then((res)=>{
            console.log(res.data);
            this.setState({
               routes:res.data
            });
        }).catch((err)=>{
           console.log(err);
        });
    }

    toggle(data) {
        if (data.ArrivalStation) {
            console.log(data.Stops);
            this.setState({
                currentBus: {
                    Name: data.BusId,
                    From: data.DepartureStation,
                    To: data.ArrivalStation,
                    Duration: data.Duration,
                    Distance: data.Miles,
                    Stops:data.Stops
                },
                modal: !this.state.modal
            });
        } else {
            this.setState({
                modal: !this.state.modal
            });
        }
    }

    onChangeRoute(data) {
        this.setState({
            viewMarkers:true
        })
    }

    renderBusStops(data){
        console.log(data);
        this.setState({
            currentBus: {
                Name: data.BusId,
                From: data.DepartureStation,
                To: data.ArrivalStation,
                Duration: data.Duration,
                Distance: data.Miles,
                Stops:data.Stops
            },
            viewMarkers:!this.state.viewMarkers,
        })
    }

    getGeoLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }));
                }
            );
        } else {

        }
    };

    render() {
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={14}
                defaultCenter={this.state.currentLatLng}
            >
                {true && <Marker position={this.state.currentLatLng} />}
                {
                    this.state.currentBus.Stops.map((stop,i)=>{
                        return (<Marker icon={blueIcon} position={stop.Coordinates}/>);
                    })
                }
            </GoogleMap>
        ));

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>{this.state.currentBus.Name + " Bus details"}</ModalHeader>
                    <ModalBody>
                        {
                            "Route: " + this.state.currentBus.From + "-" + this.state.currentBus.To + "\n" +
                            "Distance: " + this.state.currentBus.Distance + "KM\n" +
                            "Average duration: " + this.state.currentBus.Duration + "Minutes"
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={()=>{this.state.currentBus.Stops.forEach((data)=>{alert(data.Name)})}}>Show bus-stops</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <h3 style={{fontFamily: 'Noto Serif',textDecoration:'underline'}} className="text-light"><u>AvailableRoutes</u></h3>
                <div style={{borderRadius:8,backgroundColor:'black',width:'80%',marginLeft:'10%',opacity:0.96}} className="form-inline justify-content-center">
                    <div className="col-sm-4">
                        <table className="table table-hover text-light">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Route</th>
                                    <th>More details</th>
                                    <th>View stops on Map</th>
                                </tr>
                            </thead>
                            <tbody >
                                {/*{*/}
                                    {/*this.state.routes.map((item, key) => {*/}
                                        {/*return <tr key={key}>*/}
                                            {/*<td>{item.BusId}</td>*/}
                                            {/*<td>{item.DepartureStation + "-" + item.ArrivalStation}</td>*/}
                                            {/*<td><button className="btn btn-dark" onClick={() => { this.toggle(item) }}>View more</button></td>*/}
                                            {/*<td><button className="btn btn-dark" onClick={() => {this.renderBusStops(item)}}>View on Map</button></td>*/}
                                        {/*</tr>*/}
                                    {/*})*/}
                                {/*}*/}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-4 border-red">
                        <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAfjTAgs0nZrC7b6WJVS5rh5mcooDJZ93I"
                            loadingElement={<div style={{ height: `100%`,marginTop:'5%' }} />}
                            containerElement={<div style={{ height: `400px`,marginTop:'5%' }} />}
                            mapElement={<div style={{ height: `100%`, borderRadius: '8px' }} />}
                        >
                        </MyMapComponent>
                        <h4 style={{fontFamily:'Rubik',fontSize:15}} className="text-light">(Red pointer is your location)</h4>
                    </div>
                </div>
            </div>
        );
    }
}

export default AvailableRoutes;
