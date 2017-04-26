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

const getLocalCart = () => {
  let cart;
  try{
    cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart.lineItems)
      throw 'error';

  }
  catch(er){
    localStorage.setItem('cart', JSON.stringify({ lineItems: []}));
    cart = JSON.parse(localStorage.getItem('cart'));
  }
  return cart;
}

const loadCart = ()=> {
  const token = localStorage.getItem('token');
  if(!localStorage.getItem('token')){
    return (dispatch)=> {
      const cart = getLocalCart();
      dispatch(loadCartSuccess(cart));
      return Promise.resolve();
    };
  }
  return (dispatch) => {
    return axios.get(`/api/cart/${token}`)
      .then(response => response.data)
      .then(cart => {
        dispatch(loadCartSuccess(cart))
        return cart;
      });
  }

};

const createLineItem = (user, product, cart)=> {
  if(!user){
    return (dispatch)=> {
      const lineItem = { product, id: Math.floor(Math.random()*1000) };
      const cart = getLocalCart();
      cart.lineItems.push(lineItem);
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(loadCartSuccess(cart));
      return Promise.resolve();
    };
  }
  return (dispatch)=> {
    const token = localStorage.getItem('token');
    return axios.post(`/api/cart/${cart.id}/lineItems/${token}`, {
      productId: product.id
    })
    .then(response => response.data)
    .then(lineItem => dispatch(createLineItemSuccess(lineItem)));
  }
};

const createOrder = (user, cart)=> {
  return (dispatch)=> {
    const token = localStorage.getItem('token');
    return axios.put(`/api/cart/${cart.id}/${token}`, {
      state: 'ORDER'
    })
    .then(response => response.data)
    .then(() => dispatch(loadCart()));
  }
};

const deleteLineItem = (user, lineItem, cart)=> {
  if(!user){
    return (dispatch)=> {
      const cart = getLocalCart();
      cart.lineItems = cart.lineItems.filter( _lineItem => _lineItem.id !== lineItem.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(loadCartSuccess(cart));
      return Promise.resolve();
    };
  }
  return (dispatch)=> {
    const token = localStorage.getItem('token');
    return axios.delete(`/api/cart/${cart.id}/lineItems/${lineItem.id}/${token}`)
    .then(response => response.data)
    .then(() => dispatch(deleteLineItemSuccess(lineItem)));
  }
};

const consolidateCart = (user, cart) => {
  let savedCart;
  return (dispatch)=> {
    try{
      savedCart = JSON.parse(localStorage.getItem('cart'));
      savedCart.lineItems.forEach((lineItem)=> {
        dispatch(createLineItem(user, lineItem.product, cart));
      });
      localStorage.removeItem('cart');

    }
    catch(er){
      localStorage.removeItem('cart');
    }
  }
};

export {
  loadCart,
  createLineItem,
  deleteLineItem,
  consolidateCart,
  createOrder
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
      state = Object.assign({}, state, { lineItems: state.lineItems.filter( lineItem => lineItem.id != action.lineItem.id) });
      console.log(action.lineItem.id);
      break;
  }
  return state;
};

export default cartReducer;
