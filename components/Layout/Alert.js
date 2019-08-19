const Alert = ({ visible, onClick, children }) => {
    if (visible) {
        return (
            <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
                {children}
                <button type="button" className="close" onClick={onClick}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
    return null;
}

export default Alert;