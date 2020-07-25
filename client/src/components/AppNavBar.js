import React, {Component} from 'react';
import { connect } from 'react-redux';
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
import Sample1 from './Sample1';


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
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Shopping List</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://github.com/chetasborse">GitHub</NavLink>
                        </NavItem>
                        {  ! this.props.isAuthenticated ?
                            (<React.Fragment>
                                <NavItem>
                                    <Sample1 ></Sample1>
                                </NavItem>
                            </React.Fragment>) :
                            (
                                <NavItem>
                                    <h2>logOut</h2>
                                </NavItem>
                            )
                        }   
                        
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        isAuthenticated: state.user.isLoggedIn
    }
}


export default connect(mapStatetoProps)(AppNavBar)