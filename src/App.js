import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const App = ({ children, products, categories })=> (
  <div className='container'>
    <h1>React Redux Template</h1>
    <div className='container'>
    <Link to='/'>Home</Link>
    { ' | ' }
    <Link to='/categories'>Categories ({ categories.length})</Link>
    { ' | ' }
    <Link to='/login'>Login</Link>
    </div>
    { children }
  </div> 
);

const mapStateToProps = ({ products, categories })=>(
  { products, categories }
);

export default connect(mapStateToProps)(App);
