import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    Button, Alert,
    Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';

class FormRegister extends Component {

    state = {
        name: '',
        username: '',
        email: '',
        password: '',
        password2: '',
        inputValid: new Array(5).fill(false),
        inputInvalid: new Array(5).fill(false),
        messages: new Array(5).fill(''),
        visible: false,
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.inputValid.every(elemento => elemento === true)) {
            const newUser = {
                name: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            await fetch('/register', {
                method: 'POST',
                headers: {
                    // Check what headers the API needs. A couple of usuals right below
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
            Router.push('/profile');
        } else {
            this.setState({
                visible: true
            })
        }
    }

    activeFormFeedback = (number, active, state) => {
        if (state === "VALID") {
            let newState = this.state.inputValid;
            newState[number] = active;
            this.setState({
                inputValid: newState
            })
        } else {
            let newState = this.state.inputInvalid;
            newState[number] = active;
            this.setState({
                inputInvalid: newState
            })
        }
    }

    getNumber = (field) => {
        if (field === "name") {
            return 0;
        } else if (field === "username") {
            return 1;
        } else if (field === "email") {
            return 2;
        } else if (field === "password") {
            return 3;
        }
        return 4;
    }

    isEmpty = (field) => {
        if (field.trim() === "") {
            return true
        }
        return false
    }

    validateInput = async (e) => {
        const field = [e.target.name][0];
        const { value } = e.target;
        const number = this.getNumber(field);
        let messages = this.state.messages;
        switch (field) {
            case "name":
                return this.activeFormFeedback(number, true, "VALID");
            case "username":
                let res = await axios.post('/checkUser', { username: e.target.value });
                if (res.data.using) {
                    messages[number] = "El nombre de usuario ya existe";
                    this.setState({ messages });
                    return this.activeFormFeedback(number, true, "INVALID");
                }
                return this.activeFormFeedback(number, true, "VALID");
            case "email":
                res = await axios.post('/checkEmail', { email: e.target.value });
                if (res.data.using) {
                    messages[number] = "El email ya esta en uso";
                    this.setState({ messages });
                    return this.activeFormFeedback(number, true, "INVALID");
                }
                if (!value.includes('@') || !value.includes('.')) {
                    messages[number] = 'El formato de email es: "something@example.com"';
                    this.setState({ messages });
                    return this.activeFormFeedback(number, true, "INVALID");
                }
                return this.activeFormFeedback(number, true, "VALID");
            case "password":
                return this.validPassword(value, number);
            case "password2":
                if (value != this.state.password) {
                    messages[number] = "Las contraseñas no coinciden";
                    this.setState({ messages });
                    return this.activeFormFeedback(number, true, "INVALID");
                }
                return this.activeFormFeedback(number, true, "VALID");
            default:
                console.log("Error");
        }
    }

    showIsEmpty = (e, bool) => {
        const field = [e.target.name][0];
        const number = this.getNumber(field);
        const message = this.isEmpty(e.target.value);
        const condition = bool ? message : !message;
        if (condition) {
            let newMessageState = this.state.messages;
            newMessageState[number] = "Este campo es requerido";
            this.setState({
                messages: newMessageState
            });
            this.activeFormFeedback(number, bool, "INVALID")
            return true;
        }
        return false;
    }

    validPassword = (value, number) => {
        let messages = this.state.messages;
        if (value.length < 8 && value.length > 0) {
            messages[number] = "La contraseña debe tener al menos 8 caracteres";
            this.setState({ messages });
            return this.activeFormFeedback(number, true, "INVALID");
        }
        return this.activeFormFeedback(number, true, "VALID");
    }

    onInputChange = (e) => {
        const field = [e.target.name][0];
        const number = this.getNumber(field);
        const { value } = e.target;

        this.setState({
            [e.target.name]: value
        });

        const isEmpty = this.showIsEmpty(e, false);
        let isEmpty2 = this.showIsEmpty(e, true);
        if (!isEmpty2) {
            this.validateInput(e);
        }
        let messages = this.state.messages;
        if (!isEmpty) {
            this.activeFormFeedback(number, true, "VALID")
        }

        if (field === "password") {
            this.validPassword(value, number);
        }
        if (field === "password2") {
            if (value != this.state.password) {
                messages[number] = "Las contraseñas no coinciden";
                this.setState({ messages });
                return this.activeFormFeedback(number, true, "INVALID");
            }
            return this.activeFormFeedback(number, true, "VALID");
        }
    }

    onDismiss = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <div className="p-1">
                <div className="custom-card mx-auto">
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        Todos los campos deben ser validos
                        </Alert>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="InputName">Nombre:</Label>
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="Nombre completo"
                                id="InputName"
                                name="name"
                                required
                                value={this.state.name}
                                onChange={this.onInputChange}
                                valid={this.state.inputValid[0]}
                                invalid={this.state.inputInvalid[0]}
                            />
                            <FormFeedback>{this.state.messages[0]}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="InputUserName">Nombre de usuario:</Label>
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de usuario"
                                id="InputUserName"
                                name="username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                                valid={this.state.inputValid[1]}
                                invalid={this.state.inputInvalid[1]}
                                required
                            />
                            <FormFeedback>{this.state.messages[1]}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="InputEmail">Email:</Label>
                            <Input
                                type="email"
                                className="form-control"
                                placeholder="Correo eléctronico"
                                id="InputEmail"
                                name="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                                valid={this.state.inputValid[2]}
                                invalid={this.state.inputInvalid[2]}
                                required
                            />
                            <FormFeedback>{this.state.messages[2]}</FormFeedback>
                        </FormGroup>
                        <div className="form-row">
                            <FormGroup className="col-md-6">
                                <Label htmlFor="InputPassword">Contraseña:</Label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    id="InputPassword"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onInputChange}
                                    valid={this.state.inputValid[3]}
                                    invalid={this.state.inputInvalid[3]}
                                    required
                                />
                                <FormFeedback>{this.state.messages[3]}</FormFeedback>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label htmlFor="InputPassword2">Confirmar contraseña:</Label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirmar contraseña"
                                    id="InputPassword2"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.onInputChange}
                                    valid={this.state.inputValid[4]}
                                    invalid={this.state.inputInvalid[4]}
                                    required
                                />
                                <FormFeedback>{this.state.messages[4]}</FormFeedback>
                            </FormGroup>
                        </div>
                        <Button type="submit" outline color="primary">
                            CREA TU CUENTA
                            </Button>
                        <hr />
                        <p>
                            ¿Ya tienes estás registrado en NoteMash? Ingresa
                            </p>
                    </Form>
                </div>
            </div>

        )
    }
}

export default connect()(FormRegister);

