import Link from 'next/link';
import Head from 'next/head';
import React, { Component } from 'react';

class NavbarOut extends Component {

  state = {
    linksClass: {
      home: "nav-item",
      login: "nav-item"
    }
  }

  changeActive = () => {
    let linksClass = this.state.linksClass;
    switch (this.props.active) {
      case 'home':
        linksClass.home += " active"
        break;
      case 'login':
        linksClass.login += " active"
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

  render() {
    return (
      <>
        <style global jsx>
          {`
                    body {
                        background-color:black;
                        background: rgba(0,0,0,0.4), url("static/img/index_background.jpg");
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-attachment: fixed;
                    }
                `}
        </style>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar mb-3">
          <div className="container">
            <Link href="/profile">
              <a className="navbar-brand">
                <i className="material-icons align-middle pr-1 pb-1">
                  assignment
                </i>
                NoteMash
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <div className="navbar-nav ml-auto">
                <div className={this.state.linksClass.home}>
                  <Link href="/">
                    <a className="nav-link">Inicio</a>
                  </Link>
                </div>
                <div className={this.state.linksClass.login + " ml-2"}>
                  <Link href="/login">
                    <a className="nav-link">Ingresar</a>
                  </Link>
                </div>
                <div className="nav-item ml-3">
                  <Link href="/register" as="/registro">
                    <a className="nav-link btn btn-register">Crear cuenta</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default NavbarOut;
