import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from './authReducer';
import TopSeller from './TopSeller';
import { loadCart } from './cartReducer';

const App = ({ children, products, categories, user, logout, cart })=> (
  <div className='container'>
    <h1>PROF's Grace Shopper</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/categories'>Categories ({ categories.length})</Link>
    { ' | ' }
    {
      (user ) ? (
        <span>
          <a onClick={ logout }>Logout ({ user.name })</a>
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

const mapStateToProps = ({ products, categories, auth, cart })=>(
  { products, categories, user: auth.user, cart }
);

const mapDispatchToProps = (dispatch)=> (
  {
    logout: ()=> {
      dispatch(logout()) 
        .then(()=> dispatch(loadCart()));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
