import React, { Component } from 'react';
import DishDetail from './DishDetail';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Home from './Home';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Contact from './Contact';
import About from './About';
import { connect } from 'react-redux';
import { postComment, fetchComments, fetchDishes, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  };
}

const mapDispatchtoProps = dispatch => ({
  addComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchComments: () => {dispatch(fetchComments())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
});

class Main extends Component {
  onDishSelect(dishId) {
    this.setState({
      selectedDish: dishId,
    });
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    const DishId = ({ match }) => {
      return (
        <div className="container">
          <DishDetail 
            dish={this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishid, 10))[0]} 
            isLoading={this.props.dishes.isLoading}
            errMsg={this.props.dishes.errMsg}
            comments={this.props.comments.comments.filter(comment => comment.dishId === parseInt(match.params.dishid, 10))}
            commentsErrMsg={this.props.comments.errMsg}
            addComment={this.props.addComment}
          />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={() => <Home
            dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMsg={this.props.dishes.errMsg}
            leader={this.props.leaders.filter(leader => leader.featured)[0]}
            promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
            promosLoading={this.props.promotions.isLoading}
            promosErrMsg={this.props.promotions.errMsg}
          />
          }
          />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishid" component={DishId} />
          <Route exact path='/contact' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Route path='/about' component={() => <About leaders={this.props.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main));