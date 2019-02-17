import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import ExpensePage from './components/expense/ExpensePage'
import DashboardPage from './components/dashboard/DashboardPage'
import LoginPage from './components/login/LoginPage'
import RegisterPage from './components/register/RegisterPage'

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/expenses" component={ExpensePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
