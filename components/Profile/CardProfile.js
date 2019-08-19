import { connect } from 'react-redux';

import InfoProfile from './InfoProfile';
import NoteList from './NoteList';
import NavbarBot from './NavbarBot';

const CardProfile = ({ user }) => {
    return (
        <div className="container mt-5 pt-3">
            <div className="card-columns cards-profile">
                <InfoProfile/>
                <NoteList />
                <NoteList />
            </div>
            <div className="row">
                <div className="col mx-auto">
                    <NavbarBot />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(CardProfile);