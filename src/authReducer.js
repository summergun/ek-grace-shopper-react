import axios from 'axios';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginUserSuccess = (user)=> ({
  type: LOGIN_SUCCESS,
  user
});

const loginFailure = ()=> ({
  type: LOGIN_FAILURE
});

const exchangeTokenForUser = (token, dispatch)=> {
  return axios.get(`/api/session/${token}`)
    .then(response => response.data)
    .then(user => dispatch(loginUserSuccess(user)));

};

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
  login
};


const authReducer = (state={}, action)=> {
  switch(action.type){
    case LOGIN_SUCCESS:
      state = Object.assign({}, state, { user: action.user }); 
      break;
    case LOGIN_FAILURE:
      state = {}; 
      break;
  }
  return state;
};

export default authReducer;
