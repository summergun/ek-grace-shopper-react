import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from './authReducer';
import { Link } from 'react-router';
import { loadCart, consolidateCart } from './cartReducer';

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
    return(
      <div>
        { 
          this.props.error ? (
            <div className='alert alert-danger'>
              { this.props.error }
            </div>
          ):( null)
        }
        { 
          this.props.message ? (
            <div className='alert alert-success'>
              { this.props.message }
              <br />
              <Link to='/categories' className='btn btn-primary'>Start Shopping</Link>
            </div>
          ):( null)
        }
      {
        !this.props.user ? (
          <div>
            <form onSubmit={ this.onLogin }>
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
            <a className='btn btn-primary' href='/google/login'>... or login with google account</a>
          </div>
        
        ):(null)
      }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> (
  {
    login: (credentials)=> {
      let user, cart;
      return dispatch(login(credentials))
                              .then( _user => {
                                user = _user;
                                return dispatch( loadCart() )
                              }) 
                              .then( cart => {
                                dispatch( consolidateCart(user, cart))
                              })
    }
  }
);

const mapStateToProps = ({ auth })=> (
  {
    user: auth.user,
    error: auth.error,
    message: auth.message
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
