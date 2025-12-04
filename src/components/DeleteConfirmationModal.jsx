import React from 'react';
import { FaTrash, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const DeleteConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    mode, 
    statusType, 
    message 
}) => {
    if (!isOpen) return null;

    // --- Modal Content for CONFIRMATION Mode ---
    const confirmationContent = (
        <>
            <div className="modal-header confirm-header">
                <FaExclamationTriangle size={30} style={{ marginRight: '10px' }} />
                <h3>Confirm Deletion</h3>
            </div>
            <p className="modal-body-text">
                Are you sure you want to delete this vehicle? This action cannot be undone.
            </p>
            <div className="modal-actions">
                <button 
                    className="modal-btn cancel-btn" 
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button 
                    className="modal-btn confirm-btn" 
                    onClick={onConfirm}
                >
                    <FaTrash style={{ marginRight: '5px' }} />
                    Yes, Delete
                </button>
            </div>
        </>
    );

    // --- Modal Content for STATUS (Toast) Mode ---
    const getStatusIcon = () => {
        switch (statusType) {
            case 'success':
                return <FaCheckCircle size={25} className="status-icon success-icon" />;
            case 'error':
                return <FaTimesCircle size={25} className="status-icon error-icon" />;
            case 'info':
            default:
                return <FaExclamationTriangle size={25} className="status-icon info-icon" />;
        }
    };

    const statusContent = (
        <div className={`toast-content ${statusType}`}>
            {getStatusIcon()}
            <p className="toast-message">{message}</p>
        </div>
    );
    
    // RENDER: Main Modal Structure
    return (
        <div className="modal-overlay" onClick={mode === 'status' ? onClose : undefined}>
            {mode === 'confirm' ? (
                <div 
                    className="modal-container" 
                    onClick={(e) => e.stopPropagation()} 
                >
                    {confirmationContent}
                </div>
            ) : (
                <div className="toast-container">
                    {statusContent}
                </div>
            )}
        </div>
    );
};

export default DeleteConfirmationModal;