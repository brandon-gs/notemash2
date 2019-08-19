import { connect } from 'react-redux';
import NavbarIn from '../components/Layout/NavbarIn';
import Welcome from '../components/Profile/Welcome';
import CardProfile from '../components/Profile/CardProfile';

const Profile = ({ user }) => (
    <>
        <NavbarIn active="profile" title={user.username} />
        <CardProfile />
    </>
)

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(Profile)