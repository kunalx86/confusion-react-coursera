import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Jumbotron, NavItem, Nav, Collapse, NavbarToggler, Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input, Form } from 'reactstrap'; 

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.toggleModal();
    alert(`Username: ${this.username.value} \nPassword: ${this.password.value} \n Remember Me: ${this.remember.checked}`);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
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
              <Nav className="ml-auto">
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg"></span> Log In
                  </Button>
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
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => this.username = input}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">
                  Pasword
                </Label>
                <Input 
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => this.password = input}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input 
                    type="checkbox"
                    name="remember"
                    innerRef={input => this.remember = input}
                  />
                  Remember Me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">Log In</Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Header;