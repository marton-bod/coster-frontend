import React, {Component} from 'react'

class LoginForm extends Component {

    state = {
        email: "",
        password: ""
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state)
    }

    render() {
        const errorMsg = this.props.errorMsg ? 
            (<div className="card-panel red accent-3">{this.props.errorMsg}</div>) : null
        return (
            <div className="add-expense-form">
                    {errorMsg}
                    <form onSubmit={this.handleSubmit} className="col s4">
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="email" type="email" className="validate"/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="password" type="password" className="validate"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action"> Login
                            <i className="material-icons right">exit_to_app</i>
                        </button>   
                    </form>
                </div>
        )
    }

}

export default LoginForm