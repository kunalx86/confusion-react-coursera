import React, { Component } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';
import { FadeTransform, Stagger, Fade } from 'react-animation-components';

const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => (val) && (val.length >= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    default="1"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        minLength: "Name should atleast be 2 characters\n",
                        maxLength: "Name shouldn't exceed 15 characters\n",
                      }}
                    />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={2}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea 
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="12"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{size: 12}}>
                  <Button type="submit" value="Submit" color="primary">Submit</Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal> 
      </>
    )
  }
}

const Dish = ({ dish }) => {
  return (
    <>
      {
        dish ?
        <div className="col-12 col-md-5 m-1">
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
            }}
          >
            <Card> 
              <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle> <h4> {dish.name} </h4> </CardTitle>
                <CardText> {dish.description} </CardText>
              </CardBody>
            </Card>
          </FadeTransform>
        </div> :
        <div></div>
      }
    </>
  );
}

const Comment = ({ comment }) => {
  return (
    <>
      <div className="m-3">
        {comment.comment}
      </div>
      <div className="m-3">
        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date))) }
      </div>
    </>
  );
}

const Comments = ({ dishId, addComment, comments }) => {
  return (
    <>
      {
        comments ? 
        <>
          <h4> Comments </h4>
          <Stagger in>
            {comments.map(comment => <Fade in key={comment.id}><Comment comment={comment}/></Fade>)}
          </Stagger>
        </> :
        <div></div>
      }
      <CommentForm dishId={dishId} addComment={addComment}/>
    </>
  );
}

const DishDetail = props => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }

  else if (props.errMsg) {
    return (
      <div className="container">
        <div className="row">
          {props.errMsg}
        </div>
      </div>
    );
  }
  
  else {
    return (
      <div className="row">
        <Dish dish={props.dish} />
        <div className="col-12 col-md-5 m-1 list-unstyled">
          <Comments dishId={props.dish.id} addComment={props.addComment} comments={props.comments} />
       </div>
      </div>
    );
  }
}

export default DishDetail;