import React from 'react';
import { FaTrash, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; 

const DeleteConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    mode, 
    statusType, 
    message 
}) => {
   
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
   
    return (
        <AnimatePresence>
            {isOpen && (
               
                <motion.div 
                    className="modal-overlay" 
                    onClick={mode === 'status' ? onClose : undefined}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {mode === 'confirm' ? (
                       
                        <motion.div 
                            className="modal-container" 
                            onClick={(e) => e.stopPropagation()} 
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {confirmationContent}
                        </motion.div>
                    ) : (
                    
                        <motion.div 
                            className="toast-container"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                        >
                            {statusContent}
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmationModal;