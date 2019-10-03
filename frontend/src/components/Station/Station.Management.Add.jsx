import React, { Component } from 'react'
import axios from 'axios';

export default class StationManagementAdd extends Component {
    
    constructor(props){
        super(props);

        this.state={
            BusStationCode:0,
            Longitude:0,
            Latitude:0,
            Name:'',
            City:'Colombo',
        }

        this.onChangeBusStationCode = this.onChangeBusStationCode.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);        
        this.onChangeLatitude = this.onChangeLatitude.bind(this);        
        this.onChangeName = this.onChangeName.bind(this);        
        this.onChangeCity = this.onChangeCity.bind(this);   
        this.onSubmit = this.onSubmit.bind(this);         
    }

    onChangeBusStationCode(e){
        this.setState({
            BusStationCode:e.target.value
        });
    }

    onChangeLongitude(e){
        this.setState({
            Longitude:e.target.value
        });
    }

    onChangeLatitude(e){
        this.setState({
            Latitude:e.target.value
        });
    }

    onChangeName(e){
        this.setState({
            Name:e.target.value
        });
    }

    onChangeCity(e){
        this.setState({
            City:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const Obj = {
            BusStationCode:this.state.BusStationCode,
            Coordinates:{lng:this.state.Longitude,lat:this.state.Latitude},
            Name:this.state.Name,
            City:this.state.City   
        }
        axios.post('http://localhost:4000/station/add',Obj).then((res)=>{
            let resObj = res.data;
            alert(resObj.message);
            window.location.reload();
        }).catch((err=>{
            alert('Error while adding station. Please check console.');
            console.log(err.message);
        }));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <h3 style={{fontFamily: 'Noto Serif',textDecoration:'underline'}} className="text-light">Add Bus Station</h3>
                <div>
                    <div className="form-group row">
                        <label className="col-5 col-form-label text-light">Bus Station Code(Staion Number): </label>
                        <input className="form-control col-3" type="number" value={this.state.BusStationCode} onChange={this.onChangeBusStationCode} placeholder="Number" />
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-form-label text-light">Logitude: </label>
                        <input className="form-control col-3" type="number" value={this.state.Longitude} onChange={this.onChangeLongitude} placeholder="76.23634" />
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-form-label text-light">Latitude: </label>
                        <input className="form-control col-3" type="number" value={this.state.Latitude} onChange={this.onChangeLatitude} placeholder="68.13443" />
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-form-label text-light">Name: </label>
                        <input className="form-control col-3" type="text" value={this.state.Name} onChange={this.onChangeName} placeholder="Pettah" />
                    </div>
                    <div className="form-group row">
                        <label className="col-5 col-form-label text-light">City: </label>
                        <select className="form-control col-3" value={this.state.City} onChange={this.onChangeCity}>
                            <option value={'Colombo'}>{'Colombo'}</option>                    
                            <option value={'Dehiwala'}>{'Dehiwala'}</option>                                    
                            <option value={'Mount-Lavinia'}>{'Mount-Lavinia'}</option>                                    
                            <option value={'Moratuwa'}>{'Moratuwa'}</option>                                    
                            <option value={'Jaffna'}>{'Jaffna'}</option>                                    
                            <option value={'Kohuwala'}>{'Kohuwala'}</option>
                            <option value={'Pettah'}>{'Pettah'}</option>
                            <option value={'Thibirigasyaya'}>{'Thibirigasyaya'}</option>
                            <option value={'Pamankada'}>{'Pamankada'}</option>
                            <option value={'Nugegoda'}>{'Nugegoda'}</option>
                            <option value={'Maharagama'}>{'Maharagama'}</option>
                            <option value={'Kottawa'}>{'Kottawa'}</option>
                            <option value={'Homagama'}>{'Homagama'}</option>
                            <option value={'Boralesgamuwa'}>{'Boralesgamuwa'}</option>
                            <option value={'Piliyandala'}>{'Piliyandala'}</option>
                            <option value={'Kesbawa'}>{'Kesbawa'}</option>
                            <option value={'Kahathuduwa'}>{'Kahathuduwa'}</option>                                    
                            <option value={'Horana'}>{'Horana'}</option>
                            <option value={'Dambulla'}>{'Dambulla'}</option>
                            <option value={'Galle'}>{'Galle'}</option>
                            <option value={'Ella'}>{'Ella'}</option>
                            <option value={'Kandy'}>{'Kandy'}</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}
