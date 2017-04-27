import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';



const UserPage = ({ user })=> {
  if(!user)
    return null;


  return (
    <div className='container'>
      { user.name }
    </div>
  );
};

const mapStateToProps = ({ users }, ownProps)=> {
  return {
    user: users[ownProps.params.id]
  }
}

export default connect(mapStateToProps)(UserPage);

