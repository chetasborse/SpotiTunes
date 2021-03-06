import React, {Component} from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';
import './AppNavBar.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import MyTunes from './MyTunes';
import Search from './Search';
import Logout from './Logout';


class AppNavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isauth: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return(
            <Router>
        <Navbar color="dark" dark expand="sm" className="mb-5" fixed="top">
            <Container>
                <NavbarBrand>SpotiTunes</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    
                        <Nav className="ml-auto" navbar> 
                            <NavItem>
                                <Link className="linkclass" to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="linkclass" to="/Search">Search </Link>
                            </NavItem>
                            
                            <NavItem>
                                <Link className="linkclass" to="/MyTunes">MyTunes</Link>
                            </NavItem>
                            
                            <NavItem>
                                <Link className="linkclass" to="/Logout">Logout </Link>
                            </NavItem>
                            <NavItem>
                                <ProfilePage />
                            </NavItem>
                            
                        </Nav> 
                        </Collapse>
            </Container>
        </Navbar>

                        <Switch>

                            <Route path="/MyTunes">
                                <MyTunes />
                            </Route>
                                
                            <Route path="/Search">
                                <Search />
                            </Route>

                            <Route path="/Logout">
                                <Logout />
                            </Route>
                            <Route path="/">
                                <HomePage />                               
                            </Route>

                            

                        </Switch>  
                    
                
        </Router>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        isAuthenticated: state.user.isLoggedIn
    }
}


export default connect(mapStatetoProps)(AppNavBar)