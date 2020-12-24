import './LoginPage.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Message from './Massage';
import Error from './Error';
import {
  COMMON_FIELDS,
  REGISTRATION_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from './MassageBundle';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      password: '',
      error: false,
      loginSuccess: false,
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };


  onSubmit = async (e) => {
    const data = {
      user_name: this.state.user_name,
      password: this.state.password,
    };
    const loginResult = false;
    if (loginResult !== true) {
      this.setState({
        error: true,
        loginSuccess: false,
      });
    } else
      this.setState({
        loginSuccess: true,
        error: false,
      });
  };
  
 
  render() {
    const { loginSuccess, error } = this.state;

    return (
      <div className="Login">
        <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1> {' '}
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="fields">
                <br />
              <p> {COMMON_FIELDS.USER_NAME} </p>    {' '}
              <input
                type="text"
                name="Username"
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required
              />
            </div>
            <div className="fields">
              <br />
              <p> {COMMON_FIELDS.PASSWORD} </p>    
              <input
                type="password"
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="Password"
                required
              />
            </div>
            
            <br />
            <div className="buttons">
             
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-primary"
              >
               
                  {LOGIN_FIELDS.LOGIN}  
              </button>
              {" "}
                  <Link to="/">
                     {REGISTRATION_FIELDS.REGISTER} </Link> 
               
            </div>
               
          </div>
           
        </form>
        <br />
            {loginSuccess && <Message message={LOGIN_MESSAGE} />}    
        {error && <Error message={ERROR_IN_LOGIN} />}    
      </div>
    );
  }
}





/*
const LoginPage = () => {
    
  


 

    
    return (
      <div className="Login">
        <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1> {' '}
        <form >
          <div>
            <div className="fields">
              <p> {COMMON_FIELDS.USER_NAME} </p>    {' '}
              <input
                type="text"
                name="Username"
                autoComplete="Username"
                required
              />
            </div>{' '}
            {' '}
            <div className="fields">
              <br />
              <p> {COMMON_FIELDS.PASSWORD} </p>    {' '}
              <input
                type="password"
                name="Password"
                autoComplete="Password"
                required
              />
            </div>
            <div className="buttons">
              
              <br />
              <button
                type="button"
                className="btn btn-primary"
                
              >
                  {LOGIN_FIELDS.LOGIN}
                  
              </button>
              {' '}
                  <Link to="/">
                     {REGISTRATION_FIELDS.REGISTER} </Link> 
               
            </div>  
          </div>
        </form>
      </div>
    );
};
*/
export default LoginPage;