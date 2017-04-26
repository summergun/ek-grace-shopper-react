import axios from 'axios';
const LOAD_ORDERS_SUCCESS = 'LOAD_ORDERS_SUCCESS';

const loadOrdersSuccess = (orders)=> {
  return {
    type: LOAD_ORDERS_SUCCESS,
    orders
  };
};


const loadOrders = ()=> {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    return axios.get(`/api/orders/${token}`)
      .then(response => response.data)
      .then(orders => {
        dispatch(loadOrdersSuccess(orders))
        return cart;
      });
  }
};


export {
  loadOrders,
};


const ordersReducer = (state=[], action)=> {
  switch(action.type){
    case LOAD_ORDERS_SUCCESS:
      state = action.orders;
      break;
  }
  return state;
};

export default ordersReducer;
