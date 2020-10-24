import React from 'react';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';
import { FadeTransform } from 'react-animation-components';

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
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}
      >
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
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
      </FadeTransform>
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
          <RenderCard 
            item={props.promotion} 
            isLoading={props.promosLoading}
            errMsg={props.promosErrMsg}
          />          
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} />          
        </div>
      </div>
    </div>
  );
}

export default Home;