import axios from 'axios';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const loginUserSuccess = (user)=> ({
  type: LOGIN_SUCCESS,
  user,
  message: `Welcome ${user.name}`
});

const loginFailure = ()=> ({
  type: LOGIN_FAILURE
});

const logoutSuccess = ()=> ({
  type: LOGOUT_SUCCESS
});

const exchangeTokenForUser = (token, dispatch)=> {
  return axios.get(`/api/session/${token}`)
    .then(response => response.data)
    .then(user => dispatch(loginUserSuccess(user)));

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
  logout
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
  }
  return state;
};

export default authReducer;
