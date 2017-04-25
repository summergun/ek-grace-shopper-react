import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import { createLineItem } from './cartReducer';
import { hashHistory } from 'react-router';

const ProductItem = ({ product, user, createLineItem, cart })=> {
  return (
    <li className='list-group-item'>
      { product.name }
      {
        user ? (
          <button className='btn btn-primary pull-right' onClick={()=> createLineItem(user, product, cart) }>Buy Button Goes Here</button>
        ) : (
          null
        )
      }
      <br style={{ clear: 'both' }} />
    </li>
  );
};

const mapStateToProps = ({ auth, cart })=> {
  return {
    user: auth.user,
    cart
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createLineItem: (user, product, cart)=> dispatch(createLineItem( user, product, cart )).then( ()=> hashHistory.push('cart'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
