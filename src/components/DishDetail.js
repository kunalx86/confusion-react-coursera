import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

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
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'];
    const commentText = comments.map(comment => {
      let parsedDate = comment.date.split('T')[0].split('-');
      return (
        <div key={comment.id}>
          <div className="m-3">
            {comment.comment}
          </div>
          <div className="m-3">
            -- {comment.author}, {months[parsedDate[1]-1] + ' ' + parsedDate[2] + ', ' + parsedDate[0]}
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
      <>
        {this.renderDish(this.props.dish)}
        <div className="col-12 col-md-5 m-1 list-unstyled">
          {this.props.dish ? this.renderComments(this.props.dish.comments) : ''}
       </div>
      </>
    );
  }
}

export default DishDetail;