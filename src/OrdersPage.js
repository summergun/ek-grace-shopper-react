import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';



const OrdersPage = ({ orders, children, selectedId })=> (
  <div className='container'>
    { 
      orders.length === 0 ? (
        <div>You have no orders yet</div>
    ): (
      null
    )
    }
    <ul className='list-group'>
    {
      orders.map( order => {
        return (
          selectedId == order.id ? (
            <li key={order.id}>
              Order No. { order.id }
            </li>

          ) : (
            <li key={ order.id }>
              <Link to={`/orders/${order.id}`}>
              Order No. { order.id }
              </Link>
              </li>
          )
        );
      }) 
    }
    </ul>
    { children }
  </div>
);

const mapStateToProps = ({ orders }, ownProps)=> {
  return {
    orders,
    selectedId: ownProps.params.id
  }
}

export default connect(mapStateToProps)(OrdersPage);

