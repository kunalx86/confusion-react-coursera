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
      comments: comments,
    };
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId,
    });
  }

  render() {
    const DishId = ({ match }) => {
      return (
        <div className="container">
          <DishDetail 
            dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishid, 10))[0]} 
            comments={this.state.comments.filter(comment => comment.dishId === parseInt(match.params.dishid, 10))}
          />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() => <Home
            dish={this.state.dishes.filter(dish => dish.featured)[0]}
            leader={this.state.leaders.filter(leader => leader.featured)[0]}
            promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
          />
          }
          />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishid" component={DishId} />
          <Route exact path='/contact' component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;