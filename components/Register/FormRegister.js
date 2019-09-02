import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';
import InputError from '../Layout/InputError';


const emailRegex = RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
)

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    return valid;
}

class FormRegister extends Component {

    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        inputClass: {
            name: '',
            username: '',
            password: '',
            password2: ''
        },
        formErrors: {
            name: '',
            username: '',
            password: '',
            password2: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(formValid(this.state.formErrors)){
            const newUser = {
                name: this.state.name.toUpperCase(),
                username: this.state.username.toLowerCase(),
                email: this.state.email,
                password: this.state.password
            }
            await fetch('/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            const user = await axios.post('/getUser');
            this.props.dispatch({
                type: 'GET_USER',
                user: user.data
            });
            window.location.href = '/';
        }
    }

    handleChange = async e => {
        const { name, value } = e.target;
        await this.setState({
            [name]: value
        });
        this.validateInputs(name, value);
    }

    validateInputs = async (name, value) => {
        let formErrors = this.state.formErrors;
        let inputClass = this.state.inputClass;
        switch (name) {
            case 'name':
                formErrors.name =
                    value.length < 3 && value.length >= 0
                        ? "El nombre debe contener al menos 3 carácteres"
                        : "";
                inputClass.name =
                    formErrors.name.length > 0
                        ? "is-invalid"
                        : "is-valid"
                break;
            case 'username':
                formErrors.username =
                    value.length < 2 && value.length >= 0
                        ? "El nombre de usuario debe contener al menos 2 carácteres"
                        : "";
                if (formErrors.username.length <= 0) {
                    let res = await axios.post('/checkUser', { username: value.toLowerCase() });
                    formErrors.username =
                        res.data.using
                            ? "El nombre de usuario ya esta registrado"
                            : "";
                }
                inputClass.username =
                    formErrors.username.length > 0
                        ? "is-invalid"
                        : "is-valid"
                break;
            case 'email':
                formErrors.email =
                    !emailRegex.test(value)
                        ? "Formato inválido. (ejemplo: something@example.com)"
                        : "";
                if (formErrors.email.length <= 0) {
                    let res = await axios.post('/checkEmail', { email: value });
                    formErrors.email =
                        res.data.using
                            ? "El email ya esta registrado"
                            : "";
                }
                inputClass.email =
                    formErrors.email.length > 0
                        ? "is-invalid"
                        : "is-valid"
                break;
            case 'password':
                formErrors.password =
                    value.length < 8 && value.length > 0
                        ? "La contraseña debe contener al menos 8 caracteres"
                        : "";
                inputClass.password =
                    formErrors.password.length > 0
                        ? "is-invalid"
                        : "is-valid"
                break;
            case 'password2':
                formErrors.password2 =
                    this.state.password != value
                        ? "Las contraseñas no coinciden"
                        : "";
                inputClass.password2 =
                    formErrors.password2.length > 0
                        ? "is-invalid"
                        : "is-valid"
                break;
            default:
                break;
        }
        // Nota: si se cambiaba la primer contraseña la segunda seguida siendo correcta
        if (name === "password" || name === "password2") {
            formErrors.password2 =
                this.state.password != this.state.password2
                    ? "Las contraseñas no coinciden"
                    : "";
            inputClass.password2 =
                formErrors.password2.length > 0
                    ? "is-invalid"
                    : "is-valid"
        }
        this.setState({
            formErrors,
            inputClass
        })
    }

    render() {
        return (
            <div className="card custom-card mx-auto p-1 mb-5">
                <div className="card-body">
                    <h3 className="form-title card-title text-center font-weight-bold">Crear una cuenta</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="InputName">Nombre:</label>
                            <input
                                type="text"
                                id="InputName"
                                className={"form-control " + this.state.inputClass.name}
                                name="name"
                                onChange={this.handleChange}
                                value={this.state.name}
                                placeholder="Nombre completo"
                                required
                            />
                            <InputError>
                                {this.state.formErrors.name}
                            </InputError>
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputUserName">Nombre de usuario:</label>
                            <input
                                type="text"
                                id="InputUsername"
                                className={"form-control " + this.state.inputClass.username}
                                name="username"
                                onChange={this.handleChange}
                                value={this.state.username}
                                placeholder="Nombre de usuario"
                                required
                            />
                            <InputError>
                                {this.state.formErrors.username}
                            </InputError>
                        </div>
                        <div className="form-group">
                            <label htmlFor="InputEmail">Email:</label>
                            <input
                                type="email"
                                id="InputEmail"
                                className={"form-control " + this.state.inputClass.email}
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                placeholder="something@example.com"
                                required
                            />
                            <InputError>
                                {this.state.formErrors.email}
                            </InputError>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="InputPassword">Contraseña:</label>
                                <input
                                    type="password"
                                    id="InputPassword"
                                    className={"form-control " + this.state.inputClass.password}
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    placeholder="Contraseña"
                                    required
                                />
                                <InputError>
                                    {this.state.formErrors.password}
                                </InputError>
                            </div>
                            <div className="form-group" className="col-md-6 mb-1">
                                <label htmlFor="InputPassword2">Confirmar contraseña:</label>
                                <input
                                    type="password"
                                    id="InputPassword2"
                                    className={"form-control " + this.state.inputClass.password2}
                                    name="password2"
                                    onChange={this.handleChange}
                                    value={this.state.password2}
                                    placeholder="Confirmar contraseña"
                                    required
                                />
                                <InputError>
                                    {this.state.formErrors.password2}
                                </InputError>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary">
                                    CREA TU CUENTA
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className="text-center">
                            ¿Ya tienes estás registrado en NoteMash?
                            <Link href="/login">
                                <a className="div-link font-weight-bold link"> Ingresa </a>
                            </Link>
                        </div>
                    </form>
                </div>
            </div >
        )
    }
}

export default connect()(FormRegister);

