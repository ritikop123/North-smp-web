import React from 'react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
    const { toast } = useStore();

    if (!toast) return null;

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-circle-xmark';
            default:
                return 'fa-info-circle';
        }
    };

    return (
        <div
            className={`store-toast-alert store-toast-${toast.type}`}
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                color: '#fff',
                padding: '14px 20px',
                borderRadius: '10px',
                border: '1px solid var(--block-border)',
                borderLeft: `5px solid ${toast.type === 'success' ? 'var(--positive, #10B981)' : toast.type === 'error' ? 'var(--negative, #EF4444)' : 'var(--primary-color, #00C0FF)'}`,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 192, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                zIndex: 999999,
                maxWidth: '90vw',
                fontSize: '0.95rem',
                fontWeight: 500,
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            <i
                className={`fa-solid ${getIcon()}`}
                style={{
                    color: toast.type === 'success' ? 'var(--positive, #10B981)' : toast.type === 'error' ? 'var(--negative, #EF4444)' : 'var(--primary-color, #00C0FF)',
                    fontSize: '1.2rem'
                }}
            ></i>
            <span>{toast.message}</span>
        </div>
    );
};
