import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import LoginForm from './LoginForm'
import { NavLink } from 'react-router-dom'
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
                const cookies = new Cookies();
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                // set cookies
                cookies.set('auth_id', res.data.userId, { path: '/', expires: tomorrow });
                cookies.set('auth_token', res.data.authToken, { path: '/', expires: tomorrow });
                
                // change state to logged_in
                this.props.onLogin(user.email);
                // redirect
                this.props.history.push("/")
            })
            .catch(error => {
                console.log(error.response)
                this.setState({
                    errorMsg: error.response.data.errorMsg.split("\n")[0]
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
                <NavLink className="register-btn btn waves-effect waves-light purple"
                    to="/register">Not yet registered? Sign up today</NavLink> 
            </div>
        )
    }

}

export default LoginPage