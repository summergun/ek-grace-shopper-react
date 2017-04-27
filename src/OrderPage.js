import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';



const OrderPage = ({ order, products })=> {
  if(!order)
    return null;

  const { lineItems } = order;

  return (
    <div className='container'>
      LineItems:
      {
        lineItems.map( lineItem => <li key={ lineItem.id }>Product Id: { products[lineItem.productId] ? products[lineItem.productId].name : '-' }</li>)
      }
    </div>
  );
};

const mapStateToProps = ({ orders, products }, ownProps)=> {
  let filtered = orders.filter( order => order.id == ownProps.params.id );
  const order = filtered.length ? filtered[0] : null;
  return {
    order,
    products
  }
}

export default connect(mapStateToProps)(OrderPage);

