import { connect } from 'react-redux';

const NoteList = ({ user }) => {
    return(
        <div>NoteList</div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(NoteList);