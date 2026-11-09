import React from 'react';
import { useStore } from '../context/StoreContext';

export const PackageModal: React.FC = () => {
    const {
        activeModalPackage,
        setActiveModalPackage,
        setGiftingPackage,
        formatPrice,
        addToCart
    } = useStore();

    if (!activeModalPackage) return null;

    const handleClose = () => {
        setActiveModalPackage(null);
    };

    const handleGift = () => {
        const pkg = activeModalPackage;
        setActiveModalPackage(null);
        setGiftingPackage(pkg);
    };

    const handleAddToCart = () => {
        addToCart(activeModalPackage);
        setActiveModalPackage(null);
    };

    return (
        <div
            className="legend-package-modal show"
            id="legendPackageModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div className="legend-package-modal-content">
                <div className="legend-package-modal-accent-block"></div>
                <button
                    type="button"
                    className="legend-package-modal-close-btn"
                    onClick={handleClose}
                    aria-label="Close modal"
                >
                    <i className="fa-solid fa-times"></i>
                </button>

                <div className="legend-package-modal-header">
                    <h5 className="legend-package-modal-title" id="modalTitle">
                        {activeModalPackage.name}
                    </h5>
                </div>

                <div className="legend-package-modal-body">
                    {/* Package Visual Header */}
                    <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                        <img
                            src={activeModalPackage.image}
                            alt={activeModalPackage.name}
                            style={{ width: '90px', height: '90px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Perks description */}
                    <div
                        className="legend-package-modal-description"
                        dangerouslySetInnerHTML={{ __html: activeModalPackage.perksHtml || '' }}
                    />

                    {/* Modal Footer / Actions */}
                    <div className="legend-package-modal-footer">
                        <div className="legend-package-modal-pricing">
                            {activeModalPackage.originalPrice && (
                                <span className="modal-price-old">
                                    {formatPrice(activeModalPackage.originalPrice)}
                                </span>
                            )}
                            <span className="modal-price-current">
                                {formatPrice(activeModalPackage.price)}
                            </span>
                        </div>

                        <div className="legend-package-modal-actions">
                            <button
                                type="button"
                                className="legend-modal-gift-btn"
                                onClick={handleGift}
                                title="Gift this package to a friend"
                            >
                                <i className="fa-solid fa-gift"></i> Gift
                            </button>
                            <button
                                type="button"
                                className="primary-button"
                                onClick={handleAddToCart}
                            >
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
