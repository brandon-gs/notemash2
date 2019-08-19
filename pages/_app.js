// pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import axios from 'axios';
import makeStore from '../store/store';
import { trackPageView } from '../helpers';
import Router from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline';


class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    async componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
        // OBTENER DATOS DE USUARIO
        const res = await axios.post('/getUser');
        if (res.data.username) {
            this.props.store.dispatch(
                {
                    type: 'GET_USER',
                    user: res.data
                }
            );
        }

        Router.onRouteChangeComplete = async url => {
            await trackPageView(url);
        };

    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);