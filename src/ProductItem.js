import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';

const ProductItem = ({ product, user })=> {
  return (
    <li className='list-group-item'>
      { product.name }
      {
        user ? (
          <button className='btn btn-primary pull-right'>Buy Button Goes Here</button>
        ) : (
          null
        )
      }
      <br style={{ clear: 'both' }} />
    </li>
  );
};

const mapStateToProps = ({ auth })=> {
  return {
    user: auth.user
  };
};

export default connect(mapStateToProps)(ProductItem);
