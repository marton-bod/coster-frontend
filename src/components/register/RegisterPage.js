import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import RegisterForm from './RegisterForm'

class RegisterPage extends Component {
    
    state = {
        showRegisterForm: false
    }

    toggleRegisterForm = () => {
        this.setState({
            showRegisterForm: true
        })
    }

    render() {
        return (
            <div className="login-page">
                <PageTitle title="Register" />
                <RegisterForm />
            </div>
        )
    }

}

export default RegisterPage