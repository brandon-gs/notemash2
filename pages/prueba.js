import { connect } from 'react-redux';
import NavbarIn from '../components/Layout/NavbarIn';

import Head from 'next/head';


const Prueba = ({ user }) => (
    <main>
        <NavbarIn active="profile" />
        <p>Username test: { user.username } </p>
        <p>Username test: { user._id } </p>
        <p>Username test: { user.email } </p>
        <p>Username test: { user.createdAt } </p>
        <p>Username test: { user.name } </p>
    </main>
)

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(Prueba)