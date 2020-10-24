import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Col, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, Form } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => (val) && (val.length >= len);
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /\S+@\S+\.\S+/.test(val);

class Contact extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    console.log(`Current state: ${JSON.stringify(values)}`);
    this.props.resetFeedbackForm();
    this.props.postFeedback(values);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Contact Us</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address className="address-contact">
              121, Clear Water Bay Road<br />
                Clear Water Bay, Kowloon<br />
                HONG KONG<br />
              <i className="fa fa-phone"></i>: +852 1234 5678<br />
              <i className="fa fa-fax"></i>: +852 8765 4321<br />
              <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <Link role="button" className="btn btn-primary" to="tel:+85212345678"><i className="fa fa-phone"></i> Call</Link>
              <Link role="button" className="btn btn-info" to="#"><i className="fa fa-skype"></i> Skype</Link>
              <Link role="button" className="btn btn-success" to="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</Link>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Send us your Feedback!</h3>
            <div className="col-12 col-md-9">
              <Form model="feedback" onSubmit={values => this.handleSubmit(values)}>
                <Row className="form-group"> 
                  <Label htmlFor="firstName" md={2}>
                    First Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".firstName"
                      className="form-control"
                      id="firstName" 
                      name="firstName"
                      placeholder="First Name"
                      validators={{
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(20),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".firstName"
                      show="touched"
                      messages={{
                        required: "This field cannot be blank\n",
                        minLength: "Firstname should atleast be 2 characters\n",
                        maxLength: "Firstname shouldn't exceed 20 characters\n",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="lastName" md={2}>
                    Last Name
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".lastName"
                      className="form-control"
                      id="lastName" 
                      name="lastName"
                      placeholder="Last Name"
                      validators={{
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(20),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".lastName"
                      show="touched"
                      messages={{
                        required: "This field cannot be blank\n",
                        minLength: "Lastname should atleast be 2 characters\n",
                        maxLength: "Lastname shouldn't exceed 20 characters\n",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="telNum" md={2}>
                    Telephone No.
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".telNum"
                      className="form-control"
                      id="telNum" 
                      name="telNum"
                      placeholder="Telephone No."
                      validators={{
                        required,
                        minLength: minLength(8),
                        maxLength: maxLength(12),
                        isNumber,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".telNum"
                      show="touched"
                      messages={{
                        required: "This field cannot be blank\n",
                        minLength: "Telephone number should atleast be 8 digits\n",
                        maxLength: "Telephone number shouldn't exceed 12 digits\n",
                        isNumber: "This field can only be a number\n"
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="email" md={2}>
                    Email
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".email"
                      className="form-control"
                      id="email" 
                      name="email"
                      placeholder="Email"
                      validators={{
                        required,
                        validEmail,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".email"
                      show="touched"
                      messages={{
                        required: "This field cannot be blank\n",
                        validEmail: "Email not valid\n"
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{size: 6, offset: 2}}>
                    <div className="form-check">
                      <Label check>
                        <Control.checkbox 
                          model=".agree"
                          className="form-check-input" 
                          name="agree" 
                        /> 
                        {' '}
                        <strong>May we contact you?</strong>
                      </Label>
                    </div>
                  </Col>
                  <Col md={{size: 3, offset: 1}}>
                    <Control.select
                      model=".contactType"
                      className="form-control" 
                      name="contactType"
                    >
                      <option>Tel.</option>
                      <option>Email</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="message" md={2}>
                    Your Feedback
                  </Label>
                  <Col md={10}>
                    <Control.textarea
                      model=".message"
                      className="form-control"
                      rows="12"
                      id="message" 
                      name="message"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{size: 10, offset: 2}}>
                    <Button type="submit" color="primary">
                      Send Feedback
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;