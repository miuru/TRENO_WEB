import React, {Component} from 'react';
import axios from 'axios';

const Stations=(props)=>(
        <option name={props.station.Name} value={props.station.Name}>{props.station.Name}</option>
    );

class BusManagementAdd extends Component {

    constructor(props){
        super(props);
        this.state={
            BusID:0,
            ArrStation:'',
            DeptStation:'',
            ArrTime:'',
            DeptTime:'',
            Miles:0,
            Price:0,
            Duration:0,
            canSubmit:false,
            stopsIterations:0,
            availableStations:[]
        };
        this.toggleSubmit = this.toggleSubmit.bind(this);
        this.onChangeStopIterations = this.onChangeStopIterations.bind(this);
        this.onChangeBusID = this.onChangeBusID.bind(this);
        this.onChangeArrStation = this.onChangeArrStation.bind(this);
        this.onChangeDeptStations = this.onChangeDeptStations.bind(this);
        this.onChangeArrTime = this.onChangeArrTime.bind(this);
        this.onChangeDeptTime =this.onChangeDeptTime.bind(this);
        this.onChangeMiles = this.onChangeMiles.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.mapStations = this.mapStations.bind(this);
        this.fieldGenerator = this.fieldGenerator.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/station').then((res)=>{
            let obj = res.data;
            this.setState({
                availableStations:obj,
                ArrStation:obj[0].Name,
                DeptStation:obj[0].Name
            })
        }).catch((err)=>{
            console.log(err);
        });
    }

    toggleSubmit(){
        this.setState({
            canSubmit:true
        })
    }

    onChangeStopIterations(e){
        this.setState({
            stopsIterations:e.target.value
        })
    }

    onChangeBusID(e){
        this.setState({
            BusID:e.target.value
        })
    }

    onChangeArrStation(e){
        this.setState({
            ArrStation:e.target.value
        })
    }

    onChangeDeptStations(e){
        this.setState({
            DeptStation:e.target.value
        })
    }

    onChangeArrTime(e){
        this.setState({
            ArrTime:e.target.value
        })
    }

    onChangeDeptTime(e){
        this.setState({
            DeptTime:e.target.value
        })
    }

    onChangeMiles(e){
        this.setState({
            Miles:e.target.value
        })
    }

    onChangePrice(e){
        this.setState({
            Price:e.target.value
        })
    }

    onChangeDuration(e){
        this.setState({
            Duration:e.target.value
        })
    }
    fieldGenerator(){
        if(this.state.stopsIterations){
           for(let i=0;i<this.state.stopsIterations;i++){
               let div = document.getElementById('stops');
               let subDiv = document.createElement('div');
               subDiv.setAttribute('class',"form-group row");
               let label = document.createElement('label');
               label.setAttribute('class','col-3 col-form-label');
               let labelTEXT = document.createTextNode("Stop "+(i+1)+": ");
               label.appendChild(labelTEXT);
               let selectBox = document.createElement('select');
               for(let k=0;k<this.state.availableStations.length;k++){
                   let option = document.createElement('option');
                   let optionText = document.createTextNode(this.state.availableStations[k].Name);
                   option.setAttribute('value',k.toString());
                   option.appendChild(optionText);
                   selectBox.appendChild(option);
               }
               selectBox.setAttribute('class','form-control col-3');
               selectBox.setAttribute('id',"Stop"+(i+1));
               subDiv.appendChild(label);
               subDiv.appendChild(selectBox);
               div.appendChild(subDiv);
               this.toggleSubmit();
           }
        }else{
            alert('There should be at-least 1 stop');
        }
    }

    onSubmit(e){
        e.preventDefault();
        const stopsArr=[];
        for(let k=0;k<this.state.stopsIterations;k++){
            let stop = document.getElementById('Stop'+(k+1)).value;
            if(stop){
                stopsArr.push(this.state.availableStations[stop]);
            }
            if(k===this.state.stopsIterations.length-1){
                const Bus = {
                    BusId:this.state.BusID,
                    DepartureTime:this.state.DeptTime,
                    ArrivalTime:this.state.ArrTime,
                    Duration:this.state.Duration,
                    DepartureStation:this.state.DeptStation,
                    ArrivalStation:this.state.ArrStation,
                    Miles:this.state.Miles,
                    Price:this.state.Price,
                    Stops:stopsArr
                };
                axios.post('http://localhost:4000/bus/add',Bus).then((res)=>{
                    let Obj =res.data;
                    alert(Obj.message);
                    window.location.reload();
                }).catch((err)=>{
                    console.log(err);
                    alert('Error occurred see console for more.');
                })
            }
        }
    }
    mapStations(){
        return this.state.availableStations.map((station, i)=>{
            return <Stations station={station} key={i} />;
        })
    }

    render() {
        return (
            <div className="center-block text-light">
                <h3 style={{fontFamily: 'Noto Serif',textDecoration:'underline'}}>Add Bus to the System</h3>
                <form onSubmit={this.onSubmit}>
                <div style={{marginLeft:'20%'}}>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Bus ID(Route Number): </label>
                        <input className="form-control col-5" type="number" value={this.state.BusID} onChange={this.onChangeBusID} placeholder="Bus ID"/>
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Departure Time: </label>
                        <input className="form-control col-5" type="time" value={this.state.DeptTime} onChange={this.onChangeDeptTime} />
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Arrival Time: </label>
                        <input className="form-control col-5" type="time" value={this.state.ArrivalTime} onChange={this.onChangeArrTime}/>
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Departure Station: </label>
                        <select className="form-control col-5" onChange={this.onChangeDeptStations}>
                            {
                                this.mapStations()
                            }
                        </select>
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Arrival Station: </label>
                        <select className="form-control col-5" onChange={this.onChangeArrStation}>
                            {
                                this.mapStations()
                            }
                        </select>
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Miles: </label>
                        <input className="form-control col-5" type="number" value={this.state.Miles} onChange={this.onChangeMiles} placeholder="Miles"/>
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Duration(in Minutes): </label>
                        <input className="form-control col-5" type="number" value={this.state.Duration} onChange={this.onChangeDuration} placeholder="in Minutes"/>
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Price(Maximum ticket): </label>
                        <input className="form-control col-5" type="number" value={this.state.Price} onChange={this.onChangePrice} placeholder="LKR"/>
                    </div>
                    <div className="form-group row text-light">
                        <label className="col-5 col-form-label">Stops: </label>
                        <input className="form-control col-5" value={this.state.stopsIterations} onChange={this.onChangeStopIterations} type="number" placeholder="Number of Stops" min={1}/>
                    </div>
                    <div className="form-group col-5 align-content-center" id={'stops'}/>
                    <div className="form-group col-5 align-content-center">
                        <button className="btn btn-outline-dark" disabled={this.state.canSubmit} onClick={()=>{this.fieldGenerator()}}>Generate Fields</button>
                        <button className="btn btn-outline-primary" disabled={!this.state.canSubmit} onClick={()=>{}}>Submit</button>
                    </div>
                </div>
            </form>
            </div>
        );
    }
}

export default BusManagementAdd;
