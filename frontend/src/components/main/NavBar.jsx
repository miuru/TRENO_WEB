import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

import Home from '../Home'
import AvailableRoutes from '../AvailableRoutes';
import FAQ from '../FAQ';
import SignUp from '../SignUp';
import Login from '../signIn';
import About from '../About';
import ContactUs from '../ContactUs';
import Logout from '../logOut';
import MyAccount from '../myAccount';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
		let un = sessionStorage.getItem('loggedIn');
       if(un ==='true'){
		    let profileImg = sessionStorage.getItem('imageId')
            let image = 'http://localhost:4000/file/' + profileImg
		 return (
					<Router>
						<Navbar color="dark" dark expand="md">
							<NavbarBrand><Link className={'link'} to={"/"}>Treno</Link></NavbarBrand>
							<NavbarToggler onClick={this.toggle} />
							<Collapse isOpen={this.state.isOpen} navbar>
								<Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <img style={{width: 50, height: 50, borderRadius: 40,}} src={image}/>
                                    </NavItem>
									<NavItem>
										<NavLink><Link className={'link'} to={"/avroutes"}>Available Routes</Link></NavLink>
									</NavItem>
									<NavItem>
										<NavLink><Link className={'link'} to={"/faq"}>FAQ</Link></NavLink>
									</NavItem>
									<NavItem>
										<NavLink><Link className={'link'} to={"/about"}>About</Link></NavLink>
									</NavItem>
									<NavItem>
										<NavLink><Link className={'link'} to={"/contact"}>Contact Us</Link></NavLink>
									</NavItem>
									<NavItem>
										<NavLink><Link className={'link'} to={"/myAccount"}>My Account</Link></NavLink>
									</NavItem>
									<NavItem>
										<NavLink><Link className={'link'} to={"/logout/"}>Logout</Link></NavLink>
									</NavItem>
								</Nav>
							</Collapse>
						</Navbar>
						<Route exact path={"/"} component={SignUp}/>
                        <Route path={"/home"} component={Home}/>
						<Route path={"/myAccount"} component={MyAccount}/>
						<Route path={"/avroutes"} component={AvailableRoutes}/>
						<Route path={"/faq"} component={FAQ}/>
						<Route path={"/about"} component={About}/>
						<Route path={"/contact"} component={ContactUs}/>
						<Route path={"/register"} component={SignUp}/>
						<Route path={"/login"} component={Login}/>
						<Route path={"/account"} component={SignUp}/>
						<Route path={"/logout"} component={Logout}/>
					</Router>
				);
       }else{
        return (
            <Router>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand><Link className={'link'} to={"/"}>Treno</Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink><Link className={'link'} to={"/avroutes"}>Available Routes</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link className={'link'} to={"/faq"}>FAQ</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link className={'link'} to={"/about"}>About</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link className={'link'} to={"/contact"}>Contact Us</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link className={'link'} to={"/login/"}>Login</Link></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink><Link className={'link'} to={"/register/"}>SignUp</Link></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Route exact path={"/"} component={SignUp}/>
                <Route path={"/home"} component={Home}/>
                <Route path={"/avroutes"} component={AvailableRoutes}/>
                <Route path={"/faq"} component={FAQ}/>
                <Route path={"/about"} component={About}/>
                <Route path={"/contact"} component={ContactUs}/>
                <Route path={"/register"} component={SignUp}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/myAccount"} component={MyAccount}/>
            </Router>
        );
       }
    }
}
