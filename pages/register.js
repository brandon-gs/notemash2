import NavbarOut from '../components/Layout/NavbarOut';
import FormRegister from '../components/Register/FormRegister';

import Head from 'next/head';

const Register = () => (
    <>
        <Head>
            <meta name="author" content="Gosu" />
            <meta name="keywords" content="notemash, notemash register, notemash registro, heroku, app, herokuapp, aplicacion, web, estudiantes, control, notas, control de notas, calificaciones, eventos, pagos, notemash, crear notas, crear recordatorios, registro, register, login, iniciar sesion" />
            <meta name="description" content="Registrate en notemash heroku app es una aplicacion web para ayudar a los estudiantes a tener mayor control en todo lo relacionado a su escuela, peuden administrar sus tareas, crear recordatorios, crear sus notas, agregar su horario de clase, llevar un control sobre sus calificaciones y sus aprendizajes más importantes de cada materia no son necesarios muchos datos para tu registro" />
        </Head>
        <NavbarOut title="Registro | NoteMash" activo="registro" />
        <div className="container">
            <FormRegister />
        </div>
    </>
)

export default Register;