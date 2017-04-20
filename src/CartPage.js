import React from 'react';
import { connect } from 'react-redux';

const CartPage = ({ cart })=> {
  if(!cart)
    return null;
  return (
    <ul className='list-group'>
      {
        cart.lineItems.map( lineItem => {
          return <li className='list-group-item' key={lineItem.id }>{ lineItem.product.name }</li>
        })
      }
    </ul>
  );
}

const mapStateToProps = ({ auth })=> {
  let cart;
  if(auth.user){
    cart = auth.user.cart;
  }
  return {
    cart
  };
};

export default connect(mapStateToProps)(CartPage);
