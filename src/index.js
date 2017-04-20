import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ProductsPage from './ProductsPage'; 
import CategoriesPage from './CategoriesPage'; 
import LoginPage from './LoginPage';
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';
import CartPage from './CartPage';

import {connect} from 'react-redux';

import { loadProducts} from './productsReducer';
import { loadCategories } from './categoriesReducer';
import { attemptLogin } from './authReducer';


const root = document.getElementById('root');

const Routes = ({ init })=> (
  <Router history={ hashHistory }>
    <Route path='/' component={ App } onEnter={ init }>
      <IndexRoute component={ Home } />
      <Route path='login' component={ LoginPage } />
      <Route path='categories' component={CategoriesPage} />
      <Route path='cart' component={CartPage} />
      <Route path='categories/:name' component={ProductsPage} />
    </Route>
  </Router>
);

const mapDispatchToProps = (dispatch)=> (
  {
    init: ()=> {
      dispatch(loadProducts());
      dispatch(loadCategories());
      dispatch(attemptLogin());
    }
  }
);
const RoutesContainer = connect(null, mapDispatchToProps)(Routes);

const routes = (
  <Provider store = {store }>
    <RoutesContainer />
  </Provider>
);


render(routes, root);
