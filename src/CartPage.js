import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { loadCart, createLineItem, deleteLineItem, createOrder } from './reducers/cartReducer';
import { loadOrders } from './reducers/ordersReducer';

const CartPage = ({ cart, user, createLineItem, deleteLineItem, createOrder })=> {
  if(!cart)
    return null;
  const _createOrder = (ev)=> {
    ev.preventDefault();
    createOrder(user, cart);
  }
  return (
    <form>
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
      {
        (user && cart && cart.lineItems.length) ? (
          <button className='btn btn-primary' onClick={ _createOrder }>Create Order</button>
        ) : (null)
      }
    </form>
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
    deleteLineItem: (user, lineItem, cart)=> dispatch(deleteLineItem(user, lineItem, cart)),
    createOrder: (user, cart)=> {
      let order;
      dispatch(createOrder(user, cart))
        .then((_order)=> order = _order)
        .then(()=> dispatch(loadCart()))
        .then(()=> dispatch(loadOrders()))
        .then(()=> hashHistory.push(`/orders/${order.id}`));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
