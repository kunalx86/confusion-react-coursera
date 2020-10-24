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
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
  postFeedback: (feedback) => postFeedback(feedback),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
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
    this.props.fetchLeaders();
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
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={() => <Home
                dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMsg={this.props.dishes.errMsg}
                leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMsg={this.props.leaders.errMsg}
                promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMsg={this.props.promotions.errMsg}
              />
              }
              />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
              <Route path="/menu/:dishid" component={DishId} />
              <Route exact path='/contact' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
              <Route path='/about' component={() => <About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading} errMsg={this.props.leaders.errMsg} />} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Main));