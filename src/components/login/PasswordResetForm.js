import React, {Component} from 'react'
import PageTitle from '../common/PageTitle'
import axios from 'axios';
import queryString from 'query-string';
import { persistAuthCookies } from '../common/Utils'


class PasswordResetForm extends Component {

    state = {
        password: "",
        password_confirm: "",
        errorMsg: ""
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const params = queryString.parse(this.props.location.search)
        if (this.state.password === this.state.password_confirm) {
            axios.post(process.env.REACT_APP_USER_MANAGEMENT_SVC_URL + "/auth/pwdreset", { 
                userId: params.id,
                password: this.state.password,
                token: params.token
            })
            .then(res => {
                persistAuthCookies(res.data.userId, res.data.authToken)
                this.props.onLogin(params.id)
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({
                    errorMsg: "Unexpected error occurred during password reset operation."
                })
            })
        } else {
            this.setState({
                errorMsg: "Password and password confirm must match."
            })
        }
    }

    componentWillMount() {
        const params = queryString.parse(this.props.location.search)
        if (!params.id || !params.token) {
            this.props.history.push("/")
        }
    }

    render() {
        const errorMsg = this.state.errorMsg ? 
            (<div className="card-panel red accent-3">{this.state.errorMsg}</div>) : null
        return (
            <div className="login-page">
                <PageTitle title="Password Reset"/>
                <div className="login-form">
                        {errorMsg}
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field">
                                    <input onChange={this.handleInputChange} id="password" type="password" className="validate"/>
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field">
                                    <input onChange={this.handleInputChange} id="password_confirm" type="password" className="validate"/>
                                    <label htmlFor="password_confirm">Password confirm</label>
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

export default PasswordResetForm