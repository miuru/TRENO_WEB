import React,{Component} from 'react';

export default class Logout extends Component{

    render(){
        sessionStorage.setItem('loggedIn','false');

        sessionStorage.removeItem('UserID');
        sessionStorage.removeItem('imageId');
        sessionStorage.removeItem('nic');
        sessionStorage.removeItem('mobileNo');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('postalCode');

        let{history} = this.props;
        history.push({
            pathname:'/register',
        });
        window.location.reload();
        return(
            <div></div>
        );
    }
}