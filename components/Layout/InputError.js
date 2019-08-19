const InputError = ({ visible, children }) => {
    if (children != '') {
        return (
            <div className="invalid-feedback d-block">
                {children}
            </div>
        )
    }
    return null;
}

export default InputError;