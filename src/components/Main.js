import React, { Component } from 'react';
import { dishes } from '../shared/dishes';
import { comments } from '../shared/comments';
import { leaders } from '../shared/leaders';
import { promotions } from '../shared/promotions';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Home from './Home';
import { Redirect, Route, Switch } from 'react-router-dom';
import Contact from './Contact';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: dishes,
      selectedDish: null,
      dishes: dishes,
      leaders: leaders,
      promotions: promotions,
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
          <Route path="/home" component={() => <Home
            dish={this.state.dishes.filter(dish => dish.featured)[0]}
            leader={this.state.leaders.filter(leader => leader.featured)[0]}
            promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
          />
          }
          />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path='/contact' component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;