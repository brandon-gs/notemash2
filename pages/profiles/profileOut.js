import Navbar from '../../components/Layout/NavbarOut';
import Head from 'next/head';

const Profile = ({ _id, name, username}) => {
    return (
        <>
            <Navbar title={username}/>
            <p>Perfi de {username}</p>
        </>
    )
}

Profile.getInitialProps = ({ query: { _id, name, username } }) => {
    return { _id, name, username }
}

export default Profile;