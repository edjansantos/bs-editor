import React, { Component } from 'react';
import axios from 'axios';

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.doLogin = this.doLogin.bind(this);
    }
    state = {
        user: '',
        pwd: ''
    }

    componentDidMount() {
        document.body.classList.add('login-body')
    }
    componentWillUnmount() {
        document.body.classList.remove('login-body')
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    doLogin(e) {
        e.preventDefault();
        axios.post('https://bs-app-api.herokuapp.com/auth/', { user: this.state.user, pwd: this.state.pwd })
            .then(response => {
                this.props.onLogin(response.data.token);
            }).catch(error => {
                if (error.response.status === 401) {
                    alert('login inválido');
                }
            });

    }

    render() {
        return (
            <div className="login-box">
                <form noValidate onSubmit={this.doLogin}>
                    <div className="bs-form-control">
                        <div className="logo">
                            <span>MEU<strong>BS</strong> Editor</span>
                        </div>
                    </div>
                    <div className="bs-form-control">
                        <input type="text" name="user" value={this.state.user} onChange={this.handleChange.bind(this)} className="bs-control" id="user" required autoComplete="off" />
                        <label htmlFor="user">Usuário</label>
                    </div>
                    <div className="bs-form-control">
                        <input type="password" name="pwd" value={this.state.pwd} onChange={this.handleChange.bind(this)} className="bs-control" id="pwd" required autoComplete="off" />
                        <label htmlFor="pwd">Senha</label>
                    </div>
                    <div className="bs-form-control">
                        <button className="bs-btn-primary">Entrar</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;