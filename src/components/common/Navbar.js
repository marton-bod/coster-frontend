import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {

    state = {
      logged_in: false
    }

    render() {
      return (
          <nav>
          <div className="nav-wrapper">
            <a href="/dashboard" className="brand-logo">Coster.io</a>
            <ul className="right hide-on-med-and-down">
              <li><NavLink to="/dashboard"><i className="material-icons right">multiline_chart</i>Dashboard</NavLink></li>
              <li><NavLink to="/expenses"><i className="material-icons right">list</i>Expenses</NavLink></li>
              <li><NavLink to="/login"><i className="material-icons right">exit_to_app</i>Sign in</NavLink></li>
            </ul>
          </div>
        </nav>
      )
    }
}

export default Navbar
