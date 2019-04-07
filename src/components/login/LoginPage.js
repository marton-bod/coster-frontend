import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import LoginForm from './LoginForm'
import { NavLink } from 'react-router-dom'
import { getErrorDisplayMessage, persistAuthCookies } from '../common/Utils'
import axios from 'axios'
import Cookies from 'universal-cookie';



class LoginPage extends Component {

    state = {
        errorMsg: ""
    }

    loginUser = (user) => {
        axios.post(process.env.REACT_APP_USER_MANAGEMENT_SVC_URL + "/auth/login", { 
                emailAddr: user.email,
                password: user.password
            })
            .then(res => {
                persistAuthCookies(res.data.userId, res.data.authToken)
                this.props.onLogin(user.email);
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({
                    errorMsg: getErrorDisplayMessage(error)
                })
            })
    }

    render() {
        return (
            <div className="login-page">
                <PageTitle title="Login" />
                <LoginForm 
                    loginUser={this.loginUser}
                    errorMsg={this.state.errorMsg}
                />
                <NavLink className="register-btn waves-effect waves-light white blue-text"
                    to="/forgotpwd">Forgot password?</NavLink>                
                <NavLink className="register-btn btn waves-effect waves-light white green-text"
                    to="/register">Create an account</NavLink> 
            </div>
        )
    }

}

export default LoginPage