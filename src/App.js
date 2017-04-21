import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './authReducer';
import TopSeller from './TopSeller';

const App = ({ children, products, categories, user, logout })=> (
  <div className='container'>
    <h1>PROF's Grace Shopper</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/categories'>Categories ({ categories.length})</Link>
    { ' | ' }
    {
      user ? (
        <span>
          <a onClick={ logout }>Logout ({ user.name })</a>
          {' | '} 
          <Link to='/cart'>Cart ({ user.cart.lineItems.length } Items in cart)</Link>
          </span>
      ): (
        <Link to='/login'>Login</Link>
      )
    }
    </div>
    <TopSeller />
    { children }
  </div> 
);

const mapStateToProps = ({ products, categories, auth })=>(
  { products, categories, user: auth.user }
);

const mapDispatchToProps = (dispatch)=> (
  {
    logout: ()=> dispatch(logout()) 
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
