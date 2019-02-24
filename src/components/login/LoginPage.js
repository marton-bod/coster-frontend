import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import LoginForm from './LoginForm'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';


class LoginPage extends Component {

    loginUser = (user) => {
        axios.post("http://localhost:9001/auth/login", { 
                emailAddr: user.email,
                password: user.password
            })
            .then(res => {
                if (res.data.valid) {
                    const cookies = new Cookies();
                    let tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    
                    // set cookies
                    cookies.set('auth_id', res.data.userId, { path: '/', expires: tomorrow });
                    cookies.set('auth_token', res.data.authToken, { path: '/', expires: tomorrow });

                    // redirect
                    this.props.history.push("/expenses")
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
                <button className="register-btn btn waves-effect waves-light grey" type="submit" name="action"> 
                    <NavLink style={{ color: 'black' }} 
                    to="/register">Not yet registered? Sign up today</NavLink> 
                </button>
            </div>
        )
    }

}

export default LoginPage