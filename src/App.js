import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ExpensePage from './components/expense/ExpensePage'
import DashboardPage from './components/dashboard/DashboardPage'
import LoginPage from './components/login/LoginPage'
import ForgotPasswordForm from './components/login/ForgotPasswordForm'
import PasswordResetForm from './components/login/PasswordResetForm'
import RegisterPage from './components/register/RegisterPage'
import HomePage from './components/home/HomePage';
import Cookies from 'universal-cookie';

class App extends Component {

  state = {
    logged_in: false,
    email: null
  }

  componentWillMount() {
    const cookies = new Cookies()
    const token = cookies.get('auth_token')
    const email = cookies.get('auth_id')
    if (token && email) {
      this.setState({
        logged_in: true,
        email: email
      })
    }
  }

  setLoginState = (email) => {
      this.setState({
        logged_in: true,
        email: email
      })
  }

  loggedOut = () => {
    const cookies = new Cookies()
    cookies.remove("auth_token")
    cookies.remove("auth_id")

    this.setState({
      logged_in: false,
      email: null
    })
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar 
              isLoggedIn={this.state.logged_in} 
              email={this.state.email}
              logout={this.loggedOut}/>
          <Route exact path="/" component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/expenses" component={ExpensePage} />
          <Route path="/login" render={(routes) => 
              <LoginPage {...routes} onLogin={(email) => this.setLoginState(email)}/>}/>
          <Route path="/register" render={(routes) => 
              <RegisterPage {...routes} onRegister={(email) => this.setLoginState(email)}/>}/>
          <Route path="/forgotpwd" component={ForgotPasswordForm} />
          <Route path="/pwdreset" render={(routes) => 
              <PasswordResetForm {...routes} onLogin={(email) => this.setLoginState(email)}/>}/>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
