import axios from 'axios';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';

const loadUsersSuccess = (users)=> ({
  type: LOAD_USERS_SUCCESS,
  users
});

const loadUsers = ()=> {
  return (dispatch)=> {
    return axios.get('/api/users')
      .then(response => dispatch(loadUsersSuccess(response.data)));
  };
};


export {
  loadUsers
};


const usersReducer = (state={}, action)=> {
  switch(action.type){
    case LOAD_USERS_SUCCESS:
      const usersMap = action.users.reduce((memo, user)=> {
        memo[user.id] = user;
        return memo;
      }, {});
      state =  Object.assign({}, state, usersMap);
      break;
  }
  return state;
};

export default usersReducer;
