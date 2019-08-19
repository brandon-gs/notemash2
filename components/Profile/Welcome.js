import { connect } from 'react-redux';

const Welcome = ({ user }) => (
    <main>
        <p>PROFILE { user.username } </p>
    </main>
)

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(Welcome);