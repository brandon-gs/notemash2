import Link from 'next/link';
import Head from 'next/head';
import React, { Component } from 'react';
import axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


class NavbarIn extends Component {

    state = {
        isOpen: false,
        linksClass: {
            notes: "nav-item"
        }
    }

    changeActive = () => {
        let linksClass = this.state.linksClass;
        switch (this.props.active) {
            case 'notes':
                linksClass.notes += " active"
                break;
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
        await fetch('/logout', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        window.location.href = '/login';
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
                        <Link href="/notes">
                            <a className="navbar-brand">
                                <i className="material-icons align-middle pr-1 pb-1">
                                    assignment </i>
                                NoteMash
                            </a>
                        </Link>
                        <button 
                            className="btn-exit"
                            onClick={this.logOut}
                        >
                            Cerrar sesión   <ExitToAppIcon />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <div className="navbar-nav ml-auto">
                                <div className={this.state.linksClass.notes}>
                                    <Link href="/profile">
                                        <a className="nav-link">Notas</a>
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
