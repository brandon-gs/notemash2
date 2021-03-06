import NavbarOut from '../components/Layout/NavbarOut';
import FormLogin from '../components/Login/FormLogin';
import Footer from '../components/Layout/Footer';


import Head from 'next/head';

const Index = () => (
     <main className="index" style={{ 
            backgroundImage: 'url(/static/img/index_background.jpg)',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
     }}>
        <Head>
            <meta name="author" content="Gosu" />
            <meta name="keywords" content="notemash, notemash register, notemash registro, heroku, app, herokuapp, aplicacion, web, estudiantes, control, notas, control de notas, calificaciones, eventos, pagos, notemash, crear notas, crear recordatorios, registro, register, login, iniciar sesion" />
            <meta name="description" content="Inicia sesion en notemash heroku app es una aplicacion web para ayudar a los estudiantes a tener mayor control en todo lo relacionado a su escuela, peuden administrar sus tareas, crear recordatorios, crear sus notas, agregar su horario de clase, llevar un control sobre sus calificaciones y sus aprendizajes más importantes de cada materia solo necesitas una cuenta para iniciar" />
        </Head>
        <NavbarOut active="login" title="Ingresa | NoteMash" />
        <div className="div-flex">
            <FormLogin />
        </div>
        <Footer />
    </main>
)

export default Index;
