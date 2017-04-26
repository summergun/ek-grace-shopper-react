import React from 'react';
import { connect } from 'react-redux';
import { createLineItem } from './cartReducer';
import { deleteLineItem } from './cartReducer';

const CartPage = ({ cart, user, createLineItem, deleteLineItem })=> {
  if(!cart)
    return null;
  return (
    <ul className='list-group'>
      {
        cart.lineItems.map( (lineItem, idx) => {
          return (
            <li className='list-group-item' key={lineItem.id || idx }>
              { lineItem.product.name }
              <button className='btn btn-primary pull-right' onClick={ ()=> createLineItem(user, lineItem.product, cart)}>Buy again</button>
              <button className='btn btn-danger pull-right' onClick={ ()=> deleteLineItem(user, lineItem, cart)}>Remove</button>
              <br style={{ clear: 'both' }} />
            </li>
          );
        })
      }
    </ul>
  );
}

const mapStateToProps = ({ cart, auth })=> {
  return {
    cart,
    user: auth.user
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    createLineItem: (user, product, cart)=> dispatch(createLineItem( user, product, cart )),
    deleteLineItem: (user, lineItem, cart)=> dispatch(deleteLineItem(user, lineItem, cart))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
