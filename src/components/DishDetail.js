import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  renderDish(dish) {
    if (dish) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card> 
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle> <h4> {dish.name} </h4> </CardTitle>
              <CardText> {dish.description} </CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }  

  renderComments(comments) {
    const commentText = comments.map(comment => {
      return (
        <div key={comment.id}>
          <div className="m-3">
            {comment.comment}
          </div>
          <div className="m-3">
            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date))) }
          </div>
        </div>
      );
    });
    return (
      <>
        {
          commentText ? 
          <>
            <h4> Comments </h4>
            {commentText}
          </> :
          <div></div>
        }
      </>
    );
  }

  render() {
    return (
      <div className="row">
        {this.renderDish(this.props.dish)}
        <div className="col-12 col-md-5 m-1 list-unstyled">
          {this.props.dish ? this.renderComments(this.props.dish.comments) : ''}
       </div>
      </div>
    );
  }
}

export default DishDetail;