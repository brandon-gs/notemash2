import React, { Component } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { connect } from 'react-redux';
import Link from 'next/link';
import Alert from '../Layout/Alert';

class FormLogin extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        alertVisible: false,
        showPass: 'password',
        iconVisible: 'visibility_off'
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await this.validateInputs();
    }

    validateInputs = async () => {
        const logUser = { 
            username: this.state.username.toLowerCase(),
            password: this.state.password
        }
        const res = await axios.post('/verifyUser', logUser);
        if (res.data.message === 404 || res.data.message === 401) {
            this.activeAlert()
        } else {
            // BUG IF THE PETICION IS WITH AXIOS
            await fetch('/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(res.data.user)
            });
            const user = await axios.post('/getUser');
            this.props.dispatch({
                type: 'GET_USER',
                user: user.data
            });
            window.location.href = '/';
        }
    }

    onInputChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value
        })
    }

    activeAlert = () => {
        this.setState({
            alertVisible: true
        });
    }

    onDismiss = () => {
        this.setState({
            alertVisible: false
        })
    }

    showPassword = () => {
        const showPass = this.state.showPass === "password" ? "text" : "password";
        const iconVisible = this.state.iconVisible === "visibility_off" ? "visibility" : "visibility_off";
        this.setState({
            showPass,
            iconVisible
        });
    }

    render() {
        return (
            <div>
                <div className="card custom-card mx-auto">
                    <div className="card-body">
                        <h3 className="card-title text-center font-weight-bold mb-4">Ingresa</h3>
                        <Alert visible={this.state.alertVisible} onClick={this.onDismiss}>
                            Nombre de usuario, email o contraseña incorrecta
                        </Alert>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="InputUserName">Nombre de usuario o email:</label>
                                <div className="input-group">
                                    <div className="input-group-addon btn m-0 p-0 pr-1">
                                        <i className="material-icons align-middle pr-1 mt-1">account_circle</i>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese su nombre de usuario o email"
                                        id="InputUserName"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onInputChange}
                                        required
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="InputPassword">Contraseña:</label>
                                <div className="input-group">
                                    <div className="input-group-addon icon-visible btn m-0 p-0 pr-1" onClick={this.showPassword}>
                                        <i className="material-icons align-middle pr-1 mt-1">{this.state.iconVisible}</i>
                                    </div>
                                    <input
                                        type={this.state.showPass}
                                        className="form-control"
                                        placeholder="Ingrese su contraseña"
                                        id="InputPassword"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary">
                                        INGRESAR
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <div className="text-center">
                                ¿No tienes cuenta en NoteMash?
                                <Link href="/register" as="registro">
                                    <a className="div-link font-weight-bold link"> Crear cuenta </a>
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
        )
    }
}

export default connect()(FormLogin);

