import React from 'react';
import { connect } from 'react-redux';



const OrdersPage = ({ orders })=> (
  <div className='container'>
    <ul className='list-group'>
    {
      orders.map( order => {
        return (
          <li key={ order.id }>{ order.id }</li>
        );
      }) 
    }
    </ul>
  </div>
);

const mapStateToProps = ({ orders }, ownProps)=> {
  return {
    orders
  }
}

export default connect(mapStateToProps)(OrdersPage);

