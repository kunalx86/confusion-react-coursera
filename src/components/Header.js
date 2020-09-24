import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Jumbotron, NavItem, Nav, Collapse, NavbarToggler } from 'reactstrap'; 

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                width="41"
                height="30"
                alt="Ristorante Con Fuusion"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <Link className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/about">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/contact">
                    <span className="fa fa-address-card fa-lg"></span> Contact Us
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante Con Fusion</h1>
                <p>We take inspiration from the World's best cuisines,
                and create a unique fusion experience. Our lipsmacking
                creations will tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </>
    );
  }
}

export default Header;