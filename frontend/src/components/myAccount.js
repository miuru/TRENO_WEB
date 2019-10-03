import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/PermIdentityTwoTone';
import PhoneIcon from "@material-ui/icons/PermPhoneMsgTwoTone";
import LockOutlinedIcon from '@material-ui/icons/MailOutline';
import Button from '@material-ui/core/Button';
import NICIcon from "@material-ui/icons/CardMembershipTwoTone"
import LocationIcon from "@material-ui/icons/AddLocationTwoTone"
import PostalIcon from "@material-ui/icons/Code"
import Label from '@material-ui/core/FormLabel';
import Input from "./signIn";
import Icon from '@material-ui/core/Icon';
var QRCode = require('qrcode.react');

export default class Home extends Component {
    //                     TODO

    constructor(props) {
        super(props);
        let userid = sessionStorage.getItem('UserID');
        let userName = sessionStorage.getItem('name');
        let mobile = sessionStorage.getItem('mobileNo');
        let email = sessionStorage.getItem('email');
        let nic = sessionStorage.getItem('nic');
        let district= sessionStorage.getItem('district');
        let province = sessionStorage.getItem('province');
        let postalCode = sessionStorage.getItem('postalCode');
        this.state = {
            UserId: userid,
            UserName: userName,
            Phone : mobile,
            Email : email,
            NIC : nic,
            Province : province,
            District : district,
            PostalCode : postalCode
        }
    }

    render() {
        const downloadQR = () => {
            const canvas = document.getElementById(this.state.UserId);
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = this.state.UserId + ".png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        if(!this.state.UserId){
            this.state.UserId = 123456;
        }

        let profileImg = sessionStorage.getItem('imageId')
        let image = 'http://localhost:4000/file/' + profileImg
        return (
            <div>
                <div style={{width:'34%',border:'1px solid black',borderRadius:8,marginLeft:'1%',backgroundColor:'black',opacity:0.9,float:'left',marginTop:20}}>
                    <div style={{  paddingTop: '4vmin',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '50vmin',
                        height: '100vmin',
                        position: 'relative'}}>
                        <div>
                            <img style={{  width: '40vmin',
                                height: '40vmin',
                                zIndex: 1,
                                position: 'relative',
                                marginLeft: '0vmin',
                                marginRight: 'auto',
                                borderRadius: '100%',
                                marginTop: "0.5vmin"}} src={image}/>
                        </div>
                        <div style={{marginTop:8}}>
                            <QRCode

                                id={this.state.UserId}
                                value={this.state.UserId}
                                size={250}
                                level={"H"}
                                includeMargin={true}
                            />
                            <Button
                                  style={{paddingLeft:20,width:220,backgroundColor:'#004dcf',color:'white' }} onClick={downloadQR}> Download QR</Button>
                        </div>
                    </div>
                </div>
                <div style={{width:'54%',border:'1px solid black',borderRadius:8,marginLeft:'1%',opacity:0.9,float:'left',marginTop:20,background:'#1e1c22'}}>
                    <div style={{  paddingTop: '4vmin',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '50vmin',
                        height: '100vmin',
                        position: 'relative'}}>
                        <div>
                            <h  style= {{fontSize: 32, fontFamily: 'Sans-serif', fontStyle: 'normal',
                            fontWeight: 'bold', paddingLeft: '2vmin', color: '#5300eb' }}>
                                Account Details
                            </h>
                        </div>
                        <div style={{marginTop:'15%'}}>
                            <label style={{fontSize:26,display:'flex',fontFamily: 'Noto Serif',color:'white'}}>  <Avatar style={{color:'primary'}} >
                                <UserIcon/>
                            </Avatar>{this.state.UserName} </label>
                        </div>
                        <div>
                            <label style={{fontSize:24,display:'flex',fontFamily: 'Noto Serif',fontWeight:'bold',color:'white'}}>  <Avatar style={{color:'primary'}} >
                                <PhoneIcon />
                            </Avatar>{this.state.Phone} </label>
                        </div>
                        <div>
                            <label style={{fontSize:24,display:'flex',fontFamily: 'Noto Serif',fontWeight:'bold',color:'white'}}>  <Avatar style={{color:'primary'}} >
                                <NICIcon />
                            </Avatar>{this.state.NIC} </label>
                        </div>
                        <div>
                            <label style={{fontSize:24,display:'flex',fontFamily: 'Noto Serif',fontWeight:'bold',color:'white'}}>  <Avatar style={{color:'primary'}} >
                                <LocationIcon />
                            </Avatar>{this.state.District} </label>
                        </div>
                        <div>
                            <label style={{fontSize:24,display:'flex',fontFamily: 'Noto Serif',fontWeight:'bold',color:'white'}}>  <Avatar style={{color:'primary'}} >
                                <LocationIcon />
                            </Avatar>{this.state.Province} </label>
                        </div>
                        <div>
                            <label style={{fontSize:24,display:'flex',fontFamily: 'Noto Serif',fontWeight:'bold',color:'white'}}>  <Avatar style={{color:'primary'}} >
                                <PostalIcon />
                            </Avatar>{this.state.PostalCode} </label>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}