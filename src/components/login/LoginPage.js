import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import LoginForm from './LoginForm'
import { NavLink } from 'react-router-dom'


class LoginPage extends Component {
    
    state = {

    }

    render() {
        return (
            <div className="login-page">
                <PageTitle title="Login" />
                <LoginForm />
                <button class="register-btn btn waves-effect waves-light grey" type="submit" name="action"> 
                    <NavLink to="/register">Not yet registered? Sign up today</NavLink> 
                </button>
            </div>
        )
    }

}

export default LoginPage