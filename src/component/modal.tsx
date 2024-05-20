import React from 'react';

interface ModalProps {
    modalMessage: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm,modalMessage }) => {
    if (!isOpen) {
        return null;
    }
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-diag-overlay">
            <div className="modal-diag-content">
                <p>{modalMessage}</p>
                <button type="submit"onClick={onConfirm}>confirm</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};


export default Modal;
