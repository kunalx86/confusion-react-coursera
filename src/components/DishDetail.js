import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';

const Dish = ({ dish }) => {
  return (
    <>
      {
        dish ?
        <div className="col-12 col-md-5 m-1">
          <Card> 
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle> <h4> {dish.name} </h4> </CardTitle>
              <CardText> {dish.description} </CardText>
            </CardBody>
          </Card>
        </div> :
        <div></div>
      }
    </>
  );
}

const Comment = ({ comment }) => {
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
}

const Comments = ({ comments }) => {
  return (
    <>
      {
        comments ? 
        <>
          <h4> Comments </h4>
          {comments.map(comment => <Comment comment={comment}/>)}
        </> :
        <div></div>
      }
    </>
  );
}

const DishDetail = props => {
  console.log(props);
  return (
    <div className="row">
      <Dish dish={props.dish} />
      <div className="col-12 col-md-5 m-1 list-unstyled">
        {props.dish ? <Comments comments={props.comments} /> : ''}
     </div>
    </div>
  );
}

export default DishDetail;