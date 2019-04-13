import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import logo from '../../images/logo_snippet.png';


class Navbar extends Component {

    logout = () => {
      this.props.logout()
      this.props.history.push("/")
    }

    render() {
      let dashboard = null;
      let expenses = null;
      let welcomeMessage = null;
      let signInElem = (<li><NavLink to="/login"><i className="material-icons right">exit_to_app</i>Sign in</NavLink></li>);

      if (this.props.isLoggedIn) {
        dashboard = (<li><NavLink to="/dashboard"><i className="material-icons right">multiline_chart</i>Dashboard</NavLink></li>)
        expenses = (<li><NavLink to="/expenses"><i className="material-icons right">list</i>Expenses</NavLink></li>)
        welcomeMessage = (<li>Welcome, {this.props.email}!</li>)
        signInElem = signInElem = (<li onClick={this.logout}><a><i  className="material-icons right">exit_to_app</i>Logout</a></li>)
      }

      return (
          <nav>
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">Coster.io</NavLink>
            <img src={logo} className="navbar-logo"/>
            <ul className="right">
              {dashboard}
              {expenses}
              {welcomeMessage}
              {signInElem}
            </ul>
          </div>
        </nav>
      )
    }
}

export default withRouter(Navbar)
