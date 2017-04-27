import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';



const UsersPage = ({ users, children, selectedId })=> (
  <div className='container'>
    { 
      users.length === 0 ? (
        <div>You have no users yet</div>
    ): (
      null
    )
    }
    <ul className='list-group'>
    {
      users.map( user => {
        return (
          selectedId == user.id ? (
            <li key={user.id}>
              User { user.name }
            </li>

          ) : (
            <li key={ user.id }>
              <Link to={`/users/${user.id}`}>
              User { user.name }
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

const mapStateToProps = ({ users }, ownProps)=> {
  const _users = Object.keys(users).reduce((memo, key)=>{
    memo.push(users[key]);
    return memo;
  }, []);

  return {
    users: _users,
    selectedId: ownProps.params.id
  }
}

export default connect(mapStateToProps)(UsersPage);

