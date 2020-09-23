import React, { Component } from 'react';
import { dishes } from '../shared/dishes';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Home from './Home';
import { Redirect, Route, Switch } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: dishes,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId,
    });
  }

  render() {
    return (
      <div>
        <Header />
        {/* <Menu
         dishes={this.state.dishes}
         onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <div className="container">
          <DishDetail dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]} />
        </div> */}
        <Switch>
          <Route path="/home" component={() => <Home />} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;