import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './Loading';

const MenuItem = ({ dish }) => {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const Menu = props => {
  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }

  else if (props.dishes.errMsg) {
    return (
      <div className="container"> 
        <div className="row">
          <h4>{props.dishes.errMsg}</h4>
        </div>
      </div>
    );
  }

  else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Menu
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
          </div>
        </div>
        <div className="row">
          {props.dishes.dishes.map(dish => <div key={dish.id} className="col-12 col-md-5 m-1"><MenuItem dish={dish} /></div>)}
        </div>
      </div>
    );
  }
}

export default Menu;