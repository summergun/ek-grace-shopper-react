import axios from 'axios';
const LOAD_CART_SUCCESS = 'LOAD_CART_SUCCESS';
const CREATE_LINE_ITEM_SUCCESS = 'CREATE_LINE_ITEM_SUCCESS';
const DELETE_LINE_ITEM_SUCCESS = 'DELETE_LINE_ITEM_SUCCESS';

const loadCartSuccess = (cart)=> {
  return {
    type: LOAD_CART_SUCCESS,
    cart,
  };
};

const createLineItemSuccess = (lineItem)=> ({
  type: CREATE_LINE_ITEM_SUCCESS,
  lineItem
});

const deleteLineItemSuccess = (lineItem)=> ({
  type: DELETE_LINE_ITEM_SUCCESS,
  lineItem
});

const loadCart = ()=> {
  const token = localStorage.getItem('token');
  if(!localStorage.getItem('token'))
    return {
      type: 'NOOPS'
    };
  return (dispatch) => {
    return axios.get(`/api/cart/${token}`)
      .then(response => response.data)
      .then(cart => dispatch(loadCartSuccess(cart)));
  }

};

const createLineItem = (user, product, cart)=> {
  return (dispatch)=> {
    const token = localStorage.getItem('token');
    return axios.post(`/api/cart/${cart.id}/lineItems/${token}`, {
      productId: product.id
    })
    .then(response => response.data)
    .then(lineItem => dispatch(createLineItemSuccess(lineItem)));
  }
};

const deleteLineItem = (user, lineItem, cart)=> {
  return (dispatch)=> {
    const token = localStorage.getItem('token');
    return axios.delete(`/api/cart/${cart.id}/lineItems/${lineItem.id}/${token}`)
    .then(response => response.data)
    .then(() => dispatch(deleteLineItemSuccess(lineItem)));
  }
};

export {
  loadCart,
  createLineItem,
  deleteLineItem
};


const cartReducer = (state={ lineItems: [] }, action)=> {
  switch(action.type){
    case LOAD_CART_SUCCESS:
      state = action.cart;
      break;
    case CREATE_LINE_ITEM_SUCCESS:
      state = Object.assign({}, state, { lineItems: [...state.lineItems, action.lineItem]});
      break;
    case DELETE_LINE_ITEM_SUCCESS:
      console.log(action);
      state = Object.assign({}, state, { lineItems: state.lineItems.filter( lineItem => lineItem.id != action.lineItem.id) });
      console.log(action.lineItem.id);
      break;
  }
  return state;
};

export default cartReducer;
