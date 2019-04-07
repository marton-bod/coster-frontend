import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import axios from 'axios';

class ForgotPasswordForm extends Component {

    state = {
        email: "",
        errorMsg: ""
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.get(process.env.REACT_APP_USER_MANAGEMENT_SVC_URL + "/auth/forgotpwd?id=" + this.state.email)
            .then(res => {
                this.setState({
                    errorMsg: "Password reset email sent out."
                })
            })
            .catch(error => {
                this.setState({
                    errorMsg: "Something has gone wrong, perhaps email does not exist yet."
                })
            })
    }

    render() {
        const errorMsg = this.state.errorMsg ? 
            (<div className="card-panel red accent-3">{this.state.errorMsg}</div>) : null
        return (
            <div className="login-page">
                <PageTitle title="Send reset email"/>
                <div className="login-form">
                        {errorMsg}
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field">
                                    <input onChange={this.handleInputChange} id="email" type="email" className="validate"/>
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <button className="login-btn btn waves-effect waves-light" type="submit" name="action"> Reset password
                            </button>   
                        </form>
                    </div>
                </div>
        )
    }

}

export default ForgotPasswordForm