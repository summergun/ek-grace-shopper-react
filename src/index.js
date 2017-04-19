import React, { Component} from 'react';
import { render } from 'react-dom';
import App from './App';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import ProductsPage from './ProductsPage'; 
import CategoriesPage from './CategoriesPage'; 
import { Provider } from 'react-redux';
import store from './store';
import Home from './Home';

import {connect} from 'react-redux';

import { loadProducts} from './productsReducer';
import { loadCategories } from './categoriesReducer';

const LoginPage = ()=> {
  return <div>Hi</div>;
};



const root = document.getElementById('root');

const Routes = ({ fetchData })=> (
  <Router history={ hashHistory }>
    <Route path='/' component={ App } onEnter={ fetchData }>
      <IndexRoute component={ Home } />
      <Route path='login' component={ LoginPage } />
      <Route path='categories' component={CategoriesPage} />
      <Route path='categories/:name' component={ProductsPage} />
    </Route>
  </Router>
);

const mapDispatchToProps = (dispatch)=> (
  {
    fetchData: ()=> {
      dispatch(loadProducts());
      dispatch(loadCategories());
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
