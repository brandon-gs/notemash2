import Modal from '@material-ui/core/Modal';

export default function SimpleModal({ open, handleClose, title, body, action }) {

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {title}
                            </h5>
                            <button type="button"
                                className="close"
                                onClick={handleClose}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {body}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}




