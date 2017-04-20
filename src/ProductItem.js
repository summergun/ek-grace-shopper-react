import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import { createLineItem } from './authReducer';
import { hashHistory } from 'react-router';

const ProductItem = ({ product, user, createLineItem })=> {
  return (
    <li className='list-group-item'>
      { product.name }
      {
        user ? (
          <button className='btn btn-primary pull-right' onClick={()=> createLineItem(user, product) }>Buy Button Goes Here</button>
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

const mapDispatchToProps = (dispatch)=> {
  return {
    createLineItem: (user, product)=> dispatch(createLineItem( user, product )).then( ()=> hashHistory.push('cart'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
