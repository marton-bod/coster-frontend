import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import RegisterForm from './RegisterForm'
import { getErrorDisplayMessage } from '../common/Utils'
import axios from 'axios'
import Cookies from 'universal-cookie';

class RegisterPage extends Component {
    
    state = {
        showRegisterForm: false,
        registerError: ""
    }

    toggleRegisterForm = () => {
        this.setState({
            showRegisterForm: true
        })
    }

    registerUser = (user) => {
        axios.post(process.env.REACT_APP_USER_MANAGEMENT_SVC_URL + "/auth/register", { 
                emailAddr: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                password: user.password
            })
            .then(res => {
                const cookies = new Cookies();
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                // set cookies
                cookies.set('auth_id', res.data.userId, { path: '/', expires: tomorrow, domain: process.env.REACT_APP_COOKIE_DOMAIN });
                cookies.set('auth_token', res.data.authToken, { path: '/', expires: tomorrow, domain: process.env.REACT_APP_COOKIE_DOMAIN });
                
                // change state to logged_in
                this.props.onRegister(user.email);
                // redirect
                this.props.history.push("/expenses")
            })
            .catch(error => {
                this.setState({
                    registerError: getErrorDisplayMessage(error)
                })
            })
    }

    render() {
        return (
            <div className="login-page">
                <PageTitle title="Register" />
                <RegisterForm 
                    registerUser={this.registerUser}
                    errorMsg={this.state.registerError}    
                />
            </div>
        )
    }

}

export default RegisterPage