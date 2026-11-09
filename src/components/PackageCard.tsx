import React from 'react';
import { Package } from '../types/store';
import { useStore } from '../context/StoreContext';

interface PackageCardProps {
    pkg: Package;
    columnClass?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, columnClass = 'col-6' }) => {
    const { formatPrice, addToCart, setActiveModalPackage } = useStore();

    return (
        <div className={columnClass}>
            <div className="grid-package-block">
                <div className="grid-eclipse"></div>
                <div className="grid-image-container">
                    <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="grid-image"
                        onError={(e) => {
                            // Fallback to keys.png or logo.svg if specific image fails to load
                            (e.currentTarget as HTMLImageElement).src = '/assets/images/keys.png';
                        }}
                    />
                </div>
                <div className="grid-content">
                    <div className="grid-header">
                        <h2 className="text-title grid-title">{pkg.name}</h2>
                    </div>
                    <div className="grid-price-container">
                        {pkg.originalPrice && (
                            <span className="grid-price-old text-subtitle">
                                {formatPrice(pkg.originalPrice)}
                            </span>
                        )}
                        <span className="grid-price-sale text-subtitle">
                            {formatPrice(pkg.price)}
                        </span>
                    </div>
                    <div className="grid-buttons">
                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => setActiveModalPackage(pkg)}
                            aria-label={`View perks for ${pkg.name}`}
                            title="View perks"
                        >
                            <i className="fa-solid fa-info"></i>
                        </button>
                        <button
                            type="button"
                            className="secondary-button quick-add-btn"
                            onClick={() => addToCart(pkg)}
                            aria-label={`Add ${pkg.name} to cart`}
                            title="Add to cart"
                        >
                            <i className="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
