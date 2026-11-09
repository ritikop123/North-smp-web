import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const GiftModal: React.FC = () => {
    const { giftingPackage, setGiftingPackage, addToCart, showToast } = useStore();
    const [recipient, setRecipient] = useState('');

    if (!giftingPackage) return null;

    const handleClose = () => {
        setGiftingPackage(null);
        setRecipient('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanName = recipient.trim();
        if (!cleanName) {
            showToast("Please enter the recipient's Minecraft username", 'error');
            return;
        }

        addToCart(giftingPackage, cleanName);
        handleClose();
    };

    const trimmed = recipient.trim();
    const avatarUrl = trimmed ? `https://mc-heads.net/avatar/${encodeURIComponent(trimmed)}/64` : '';

    return (
        <div
            className="legend-modal show"
            id="giftModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="giftModalTitle"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="legend-modal-content">
                <div className="legend-modal-accent-block"></div>
                <button
                    type="button"
                    className="legend-package-modal-close-btn"
                    onClick={handleClose}
                    aria-label="Close modal"
                >
                    <i className="fa-solid fa-times"></i>
                </button>

                <div className="legend-modal-header">
                    <h5 className="legend-modal-title" id="giftModalTitle">
                        <i className="fa-solid fa-gift" style={{ color: 'var(--primary-color)', marginRight: '8px' }}></i>
                        Gift {giftingPackage.name}
                    </h5>
                </div>

                <div className="legend-modal-body">
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        Enter the Minecraft username of the player you would like to send this package to:
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="gift-input-group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter recipient's Minecraft IGN"
                                className="gift-input"
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>

                        {trimmed && (
                            <div className="gift-recipient-preview" style={{ display: 'flex', marginTop: '1rem' }}>
                                <img
                                    src={avatarUrl}
                                    alt="Skin"
                                    className="gift-recipient-avatar"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/64';
                                    }}
                                />
                                <div>
                                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                                        {trimmed}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--positive)' }}>
                                        Recipient Target
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="legend-modal-actions" style={{ marginTop: '1.25rem', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="primary-button gift-submit-btn"
                                disabled={!trimmed}
                            >
                                <i className="fa-solid fa-gift"></i> Confirm Gift
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
