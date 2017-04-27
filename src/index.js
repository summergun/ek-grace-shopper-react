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
import { loadCart } from './reducers/cartReducer';
import OrdersPage from './OrdersPage';
import OrderPage from './OrderPage';
import UsersPage from './UsersPage';
import UserPage from './UserPage';

import {connect} from 'react-redux';

import { loadProductsSuccess } from './reducers/productsReducer';
import { loadOrders } from './reducers/ordersReducer';
import { loadCategories } from './reducers/categoriesReducer';
import { attemptLogin } from './reducers/authReducer';
import { loadLineItems } from './reducers/lineItemsReducer';
import { loadUsers } from './reducers/usersReducer';

const root = document.getElementById('root');

const Routes = ({ init })=> (
  <Router history={ hashHistory }>
    <Route path='/' component={ App } onEnter={ init }>
      <IndexRoute component={ Home } />
      <Route path='login' component={ LoginPage } />
      <Route path='users' component={UsersPage}>
        <Route path=':id' component={ UserPage } />
      </Route>
      <Route path='categories' component={CategoriesPage} />
      <Route path='orders' component={OrdersPage}>
        <Route path=':id' component={OrderPage} />
      </Route>
      <Route path='cart' component={CartPage} />
      <Route path='categories/:name' component={ProductsPage} />
    </Route>
  </Router>
);

const mapDispatchToProps = (dispatch)=> (
  {
    init: ()=> {
      dispatch(loadUsers());
      dispatch(loadCategories())
        .then((categories)=> {
          const products = categories.reduce((memo, category)=> {
            memo = memo.concat(category.products);
            return memo;
          }, []);
          dispatch(loadProductsSuccess(products));
        });
      dispatch(attemptLogin())
        .then(()=> dispatch(loadCart()))
        .then(()=> dispatch(loadOrders()))
        .catch(()=> dispatch(loadCart()));
      dispatch(loadLineItems());
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
