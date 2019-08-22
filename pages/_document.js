// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

// We wrap our scripts below in Fragment to avoid unnecessary mark up
import { Fragment } from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render
        const isProduction = process.env.NODE_ENV === 'production';
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => sheets.collect(<App {...props} />)
            })
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            isProduction,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [
                <React.Fragment key="styles">
                    {initialProps.styles}
                    {sheets.getStyleElement()}
                </React.Fragment>,
            ],
        };
    }

    // Function will be called below to inject
    // script contents onto page
    setGoogleTags() {
        return {
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-145891229-1');
      `
        };
    }

    render() {
        const { isProduction } = this.props;
        return (
            <Html lang="es">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta name="author" content="Gosu" />
                    <meta name="keywords" content="Notemash, notemash, notemash register , notemash registro, notemash login, heroku, app, herokuapp, aplicacion, web, estudiantes, control, notas, control de notas, calificaciones, eventos, pagos, notemash, crear notas, crear recordatorios, registro, register, login, iniciar sesion" />
                    <meta name="google-site-verification" content="xhgcuA61f-hyiQfWC7cuyOUrlRP4xWXb9QT9Cfa21lg" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="static/css/react-datepicker.css" />
                    {
                        // Remplazar todos los siguientes css juntandoos solo en style.css
                    }
                    <link rel="stylesheet" href="static/css/style.css" />
                    <link rel="stylesheet" href="static/css/custom/navbar.css" />
                    <link rel="stylesheet" href="static/css/custom/buttons.css" />
                    <link rel="stylesheet" href="static/css/custom/cards.css" />
                    <link rel="stylesheet" href="static/css/custom/icons.css" />
                    <link rel="stylesheet" href="static/css/custom/links.css" />
                    <link rel="shortcut icon" type="image/x-icon" href="static/favicon.ico" />
                    <link rel="icon" type="image/png" href="static/favicon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"> </script>
                    {/* We only want to add the scripts if in production */}
                    {isProduction && (
                        <Fragment>
                            <script
                                async
                                src="https://www.googletagmanager.com/gtag/js?id=UA-145891229-1"
                            />
                            {/* We call the function above to inject the contents of the script tag */}
                            <script dangerouslySetInnerHTML={this.setGoogleTags()} />
                        </Fragment>
                    )}
                </body>
            </Html>
        );
    }
}

export default MyDocument;