import axios from 'axios';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const CREATE_LINE_ITEM_SUCCESS = 'CREATE_LINE_ITEM_SUCCESS';

const loginUserSuccess = ({ user, cart })=> {
  user.cart = cart;
  return {
    type: LOGIN_SUCCESS,
    user,
    message: `Welcome ${user.name}`
  };
};

const loginFailure = ()=> ({
  type: LOGIN_FAILURE
});

const logoutSuccess = ()=> ({
  type: LOGOUT_SUCCESS
});

const createLineItemSuccess = (lineItem)=> ({
  type: CREATE_LINE_ITEM_SUCCESS,
  lineItem
});

const exchangeTokenForUser = (token, dispatch)=> {
  return axios.get(`/api/session/${token}`)
    .then(response => response.data)
    .then(userAndCart => dispatch(loginUserSuccess(userAndCart)));

};

const createLineItem = (user, product)=> {
  return (dispatch)=> {
    const token = localStorage.getItem('token');
    return axios.post(`/api/cart/${user.cart.id}/lineItems/${token}`, {
      productId: product.id
    })
    .then(response => response.data)
    .then(lineItem => dispatch(createLineItemSuccess(lineItem)));
  }
};

const attemptLogin = (dispatch)=> {
  const token = localStorage.getItem('token');
  if(!localStorage.getItem('token'))
    return {
      type: 'NOOPS'
    };
  return (dispatch)=> {
    return exchangeTokenForUser(token, dispatch);
  };
};

const logout = (dispatch)=> {
  localStorage.removeItem('token');
  return logoutSuccess();
}

const login = (credentials)=> {
  return (dispatch)=> {
    return axios.post('/api/session', credentials)
      .then(response => response.data)
      .then(data => localStorage.setItem('token', data.token))
      .then( ()=> exchangeTokenForUser(localStorage.getItem('token'), dispatch))
      .catch((er)=> {
        localStorage.removeItem('token');
        dispatch(loginFailure());
      });
  };
};


export {
  login,
  attemptLogin,
  logout,
  createLineItem
};


const authReducer = (state={}, action)=> {
  switch(action.type){
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, { message: action.message, user: action.user, error: null }); 
      break;
    case LOGIN_FAILURE:
      state = { error: 'Error logging in'}; 
      break;
    case LOGOUT_SUCCESS:
      state = {}; 
      break;
    case CREATE_LINE_ITEM_SUCCESS:
      const user = Object.assign({}, state.user);
      user.cart.lineItems = [...user.cart.lineItems, action.lineItem]; 
      state = Object.assign({}, state, { user }); 
      break;
  }
  return state;
};

export default authReducer;
