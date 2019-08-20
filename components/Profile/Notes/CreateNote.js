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
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                {title}
                            </h5>
                            <button type="button"
                                class="close"
                                onClick={handleClose}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {body}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}