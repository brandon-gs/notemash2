import { connect } from 'react-redux';

const InfoProfile = ({ user, className }) => {
    return (
        <div className={"card mx-auto mb-2 text-center" + className}>
            <h5 className="card-title mt-2 text-center">
                Bienvenido {user.username} 
            </h5>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(InfoProfile);