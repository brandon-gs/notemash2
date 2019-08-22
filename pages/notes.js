import { connect } from 'react-redux';
import NavbarIn from '../components/Layout/NavbarIn';

// Components Mobile and Desktop
import HelloUser from '../components/Notes/HelloUser';

// Components Desktop
import NotePage from '../components/Notes/NotesDesktop/NotePage';

// Components Mobile
import MobilePage from '../components/MobilePage/MobilePages';

const Profile = ({ user }) => (
    <>
        <NavbarIn active="notes" title={user.username} />
        <div className="container mt-5 pt-3">
            <HelloUser />
            <NotePage />
            <MobilePage />
        </div>
    </>
)

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(Profile)