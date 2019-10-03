import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class NavLoginBar extends Component {

    render() {

        let un = sessionStorage.getItem('loggedIn');
        if (un === 'true') {
            let profileImg = sessionStorage.getItem('imageId')
            let image = 'http://localhost:4000/file/' + profileImg
            return (
                <div style={{width: 500}}>
                    <ul className="navbar-nav mr-auto">
                        <img style={{width: 50, height: 50, borderRadius: 40,}} src={image}/>
                        <li className="navbar-item">
                            <Link to="/myAccount" className="nav-link">My Account</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/myAccount/Logout" className="nav-link">Logout</Link>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <li className="navbar-item">
                    <Link to="/signIn" className="nav-link">Login</Link>
                </li>
            );
        }

    }
}