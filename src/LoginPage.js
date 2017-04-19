import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from './authReducer';

class LoginPage extends Component{
  constructor(){
    super();
    this.state = {
      name: '',
      password: ''
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin(ev){
    ev.preventDefault();
    this.props.login(this.state);
  }
  onNameChange(ev){
    this.setState({ name: ev.target.value });
  }
  onPasswordChange(ev){
    this.setState({ password: ev.target.value });
  }
  render(){
    const name = this.props.user ? this.props.user.name : '';
    return(
      <form onSubmit={ this.onLogin }>
        { name }
        <div className='form-group'>
          <label>Name</label>
          <input className='form-control' value={ this.state.name } onChange={ this.onNameChange } />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input className='form-control' value={ this.state.password } onChange={ this.onPasswordChange } />
        </div>
        <button className='btn btn-primary'>Login</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> (
  {
    login: (credentials)=> dispatch(login(credentials)) 
  }
);

const mapStateToProps = ({ auth })=> (
  {
    user: auth.user
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
