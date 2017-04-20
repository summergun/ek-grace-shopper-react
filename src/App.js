import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './authReducer';

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
        <a onClick={ logout }>Logout ({ user.name })({ user.cart.id})</a>
      ): (
        <Link to='/login'>Login</Link>
      )
    }
    </div>
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
