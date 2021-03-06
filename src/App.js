import React from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './reducers/authReducer';
import TopSeller from './TopSeller';
import { loadCart } from './reducers/cartReducer';

const App = ({ children, products, categories, user, logout, cart, numberOfOrders, numberOfUsers })=> (
  <div className='container'>
    <h1>PROF's Grace Shopper</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/categories'>Categories ({ categories.length})</Link>
    { ' | ' }
    <Link to='/users'>Users ({ numberOfUsers })</Link>
    { ' | ' }
    {
      (user ) ? (
        <span>
          <a onClick={ logout }>Logout ({ user.name })</a>
          { ' | ' }
          <Link to='/orders'>Orders ({ numberOfOrders })</Link>
        </span>
      ): (
        <Link to='/login'>Login</Link>
      )
    }
    {
      cart  ? (
        <span>
        { ' | ' }
          <Link to='/cart'>Cart ({ cart.lineItems.length } Items in cart)</Link>
        </span>
      ): (
        null
      )
    }
    </div>
    <TopSeller />
    { children }
  </div> 
);

const mapStateToProps = ({ products, categories, auth, cart, orders, users })=>(
  {
    products,
    categories,
    user: auth.user,
    cart,
    numberOfOrders: orders ? orders.length : 0,
    numberOfUsers:  Object.keys(users).length
  }
);

const mapDispatchToProps = (dispatch)=> (
  {
    logout: ()=> {
      dispatch(logout()) 
        .then(()=> dispatch(loadCart()))
        .then(()=> hashHistory.push('/'))
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
