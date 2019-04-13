import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import RegisterForm from './RegisterForm'
import { getErrorDisplayMessage, persistAuthCookies } from '../common/Utils'
import axios from 'axios'

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
                persistAuthCookies(res.data.userId, res.data.authToken)
                this.props.onRegister(user.email);
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