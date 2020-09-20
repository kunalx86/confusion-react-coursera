import React, { useState } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

const MenuItem = ({ dish, onClick }) => {
  return (
    <div key={dish.id} className="col-12 col-md-5 m-1">
      <Card onClick={() => onClick(dish.id)}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Card>
    </div>
  );
}

const Menu = props => {
  return (
    <div className="container">
      <div className="row">
        {props.dishes.map(dish => <MenuItem dish={dish} onClick={props.onClick} />)} 
      </div>
    </div>
  );
}

export default Menu;