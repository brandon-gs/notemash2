import Link from 'next/link';
import Head from 'next/head';
import React, { Component } from 'react';
import axios from 'axios';

class NavbarIn extends Component {

    state = {
        isOpen: false,
        linksClass: {
            profile: "nav-item",
            notes: "nav-item",
            calificaciones: "nav-item"
        }
    }

    changeActive = () => {
        let linksClass = this.state.linksClass;
        switch (this.props.active) {
            case 'profile':
                linksClass.profile += " active"
                break;
            case 'notes':
                linksClass.notes += " active"
                break;
            case 'calificaciones':
                linksClass.calificaciones += " active"
            default:
                break;
        }
        this.setState({
            linksClass
        })
    }

    componentDidMount() {
        this.changeActive();
    }

    logOut = async () => {
        await axios.post('/logout');
        window.location.href = '/login'
    }

    render() {
        return (
            <>
                <style global jsx>
                    {`
                    body {
                        background: #373B44;  /* fallback for old browsers */
                        background: -webkit-linear-gradient(to right, #4286f4, #373B44);  /* Chrome 10-25, Safari 5.1-6 */
                        background: linear-gradient(to right, #4286f4, #373B44); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    }
                `}
                </style>
                <Head>
                    <title>{this.props.title}</title>
                </Head>
                <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
                    <div className="container">
                        <Link href="/profile">
                            <a className="navbar-brand">
                                <i className="material-icons align-middle pr-1 pb-1">
                                    assignment </i>
                                NoteMash
                            </a>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="navbar-nav ml-auto">
                                <div className={this.state.linksClass.profile}>
                                    <Link href="/profile">
                                        <a className="nav-link">Notas</a>
                                    </Link>
                                </div>
                                <div className={this.state.linksClass.calificaciones}>
                                    <Link href="/calificaciones">
                                        <a className="nav-link">Calificaciones</a>
                                    </Link>
                                </div>
                                <div className="nav-item">
                                    <a onClick={this.logOut} className="nav-link">Cerrar sesión</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

export default NavbarIn;