import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-footer text-white">
            <div className="container p-2">
                <div className="row">
                    <div className="mx-auto text-center">
                        <p className="text-footer">NoteMash de ScriptMash | &copy; Copyright 2019, Todos los derechos reservados</p>
                        <p>
                            <a className="icon-contact" href="https://www.facebook.com/ScriptMash-112988803409290/" rel="noopener noreferrer">
                                <i className="fab fa-facebook-square fa-2x"></i>
                            </a>
                            <a className="icon-contact" href="https://www.linkedin.com/in/brandon-garc%C3%ADa-s%C3%A1nchez-991264186/" rel="noopener noreferrer">
                                <i className="fab fa-linkedin fa-2x"></i>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;