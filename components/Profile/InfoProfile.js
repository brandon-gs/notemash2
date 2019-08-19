import { connect } from 'react-redux';

const InfoProfile = ({ user, className }) => {
    return (
        <div className={"card mx-auto mb-2" + className}>
            <div className="row">
                <img className="card-img-top img-profile ml-4 mt-2" src="/static/img/profile_test.jpg" alt="Img Profile" />
                <h5 className="card-title mt-5 ml-4">{user.username}</h5>
            </div>
            <div className="card-body">
                <p className="text-muted">{user.name}</p>
                <p className="text-muted">{user.createdAt}</p>
                <button className="btn btn-primary">
                    Agregar amigo
            </button>
                <button className="btn btn-primary">
                    Mensaje
            </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, {})(InfoProfile);