import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import LoginForm from './LoginForm'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';


class LoginPage extends Component {

    loginUser = (user) => {
        axios.post(process.env.REACT_APP_USER_MANAGEMENT_SVC_URL + "/auth/login", { 
                emailAddr: user.email,
                password: user.password
            })
            .then(res => {
                if (res.data.valid) {
                    const cookies = new Cookies();
                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    
                    // set cookies
                    cookies.set('auth_id', res.data.userId, { path: '/', expires: tomorrow, domain: process.env.REACT_APP_COOKIE_DOMAIN });
                    cookies.set('auth_token', res.data.authToken, { path: '/', expires: tomorrow, domain: process.env.REACT_APP_COOKIE_DOMAIN});
                    
                    // change state to logged_in
                    this.props.onLogin(user.email);

                    this.props.history.push("/")

                } else {
                    // error message
                    console.log(res)
                }
            })
    }

    render() {
        return (
            <div className="login-page">
                <PageTitle title="Login" />
                <LoginForm loginUser={this.loginUser}/>
                   <NavLink style={{ color: 'black' }} className="register-btn btn waves-effect waves-light grey"
                    to="/register">Not yet registered? Sign up today</NavLink> 
            </div>
        )
    }

}

export default LoginPage