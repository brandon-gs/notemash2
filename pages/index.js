import NavbarOut from '../components/Layout/NavbarOut';
import FormRegister from '../components/Register/FormRegister';
import Footer from '../components/Layout/Footer';

import Link from 'next/link';

import Head from 'next/head';

const Index = () => (
    <>
        <main className="index">
            <Head>
                <meta name="author" content="Gosu" />
                <meta name="keywords" content="Notemash, heroku, app, herokuapp, aplicacion, web, estudiantes, control, notas, control de notas, calificaciones, eventos, pagos, notemash, crear notas, crear recordatorios, registro, register, login, iniciar sesion" />
                <meta name="description" content="Notemash heroku app es una aplicacion web para ayudar a los estudiantes a tener mayor control en todo lo relacionado a su escuela, peuden administrar sus tareas, crear recordatorios, crear sus notas, agregar su horario de clase, llevar un control sobre sus calificaciones y sus aprendizajes más importantes de cada materia no son necesarios muchos datos para tu registro" />
            </Head>
            <NavbarOut active="home" title="Notemash" />
            <header className="masthead d-flex">
                <div className="container text-center">
                    <h1 className="masthead-title mb-1">NOTEMASH</h1>
                    <h2 className="mb-5">
                        <em>¡Guarda tus notas importantes!</em>
                    </h2>
                    <Link href="/register" as="/registro">
                        <a className="btn btn-primary">
                            Empieza ahora
                    </a>
                    </Link>
                </div>
                <div className="overlay"></div>
            </header>
        </main>
        <div className="mt-10">
            <Footer />
        </div>
    </>
)

export default Index;