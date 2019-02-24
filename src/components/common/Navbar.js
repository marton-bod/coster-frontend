import React, {Component} from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';

class Navbar extends Component {

    state = {
      logged_in: false,
      email: null
    }

    componentDidMount() {
      const cookies = new Cookies()
      setInterval(() => {
        let token = cookies.get('auth_token');
        let email = cookies.get('auth_id')
        if (token) {
          this.setState({logged_in: true, email: email})
        } else {
          this.setState({logged_in: false})
        }
      }, 2000)
    }

    logout = () => {
      const cookies = new Cookies()
      cookies.remove("auth_token")
      cookies.remove("auth_id")
      this.props.history.push("/")
    }

    render() {
      let dashboard = null;
      let expenses = null;
      let welcomeMessage = null;
      let signInElem = (<li><NavLink to="/login"><i className="material-icons right">exit_to_app</i>Sign in</NavLink></li>);

      if (this.state.logged_in) {
        dashboard = (<li><NavLink to="/dashboard"><i className="material-icons right">multiline_chart</i>Dashboard</NavLink></li>)
        expenses = (<li><NavLink to="/expenses"><i className="material-icons right">list</i>Expenses</NavLink></li>)
        welcomeMessage = (<li>Welcome, {this.state.email}!</li>)
        signInElem = signInElem = (<li onClick={this.logout}><a><i  className="material-icons right">exit_to_app</i>Logout</a></li>)
      }

      return (
          <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">Coster.io</a>
            <ul className="right hide-on-med-and-down">
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
