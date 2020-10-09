import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { Loading } from './Loading';

const RenderCard = ({ item, isLoading, errMsg }) => {
  if (isLoading) {
    return (
      <Loading />
    );
  }

  else if (errMsg) {
    return (
      <h4>{errMsg}</h4>
    );
  }

  else {
    return (
      <Card>
        <CardImg src={item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {
            item.designation ? 
            <CardSubtitle>{item.designation}</CardSubtitle> : 
            null
          }
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

const Home = props => {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard 
            isLoading={props.dishesLoading} 
            errMsg={props.dishesErrMsg} 
            item={props.dish} 
          />          
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion} />          
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />          
        </div>
      </div>
    </div>
  );
}

export default Home;