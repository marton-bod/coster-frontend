import React, {Component} from 'react'

class RegisterForm extends Component {

    state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirm: ""
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.password_confirm) {
            this.props.registerUser(this.state)
        }
    }

    render() {
        return (
            <div className="add-expense-form">
                    <form onSubmit={this.handleSubmit} className="col s4">
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="first_name" type="text" className="validate"/>
                                <label htmlFor="first_name">First Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="last_name" type="text" className="validate"/>
                                <label htmlFor="last_name">Last Name</label>
                            </div>
                        </div>
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
                        <div className="row">
                            <div className="input-field col s4">
                                <input onChange={this.handleInputChange} id="password_confirm" type="password" className="validate"/>
                                <label htmlFor="password_confirm">Password confirm</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action"> Register
                            <i className="material-icons right">exit_to_app</i>
                        </button>   
                    </form>
                </div>
        )
    }

}

export default RegisterForm