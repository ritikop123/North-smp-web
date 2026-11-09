import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SERVER_CONFIG, CURRENCIES } from '../config/config';
import { CurrencyCode } from '../types/store';

export const Header: React.FC = () => {
    const { currency, setCurrency, cart, user, showToast } = useStore();
    const location = useLocation();
    const [copied, setCopied] = useState(false);

    const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleCopyIp = () => {
        navigator.clipboard.writeText(SERVER_CONFIG.ip).then(() => {
            setCopied(true);
            showToast(`Copied ${SERVER_CONFIG.ip} to clipboard!`, 'success');
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            showToast(`Server IP: ${SERVER_CONFIG.ip}`, 'info');
        });
    };

    return (
        <header>
            {/* Navigation Bar */}
            <div className="navigation-row">
                <div className="navigation-left">
                    <Link
                        to="/"
                        className={`navigation-link text-navigation ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        <i className="fa-solid fa-house"></i> Home
                    </Link>
                </div>

                <div className="navigation-right">
                    {/* Currency Selector */}
                    <select
                        className="currency-selector"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                        aria-label="Select Store Currency"
                    >
                        {Object.keys(CURRENCIES).map((code) => (
                            <option key={code} value={code}>
                                {code} ({CURRENCIES[code as CurrencyCode].symbol})
                            </option>
                        ))}
                    </select>

                    {/* Discord Link */}
                    <a
                        href={SERVER_CONFIG.discordUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navigation-link text-navigation"
                    >
                        <i className="fa-brands fa-discord"></i> Discord
                    </a>
                </div>
            </div>

            {/* Header Block */}
            <div className="header-block">
                <div className="header-left">
                    <button
                        type="button"
                        className="btn-copy-ip"
                        onClick={handleCopyIp}
                        title="Click to copy server IP"
                    >
                        <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>

                    <div className="store-info">
                        <h1 className="store-title text-title">{SERVER_CONFIG.name}</h1>
                        <p className="store-subtitle text-subtitle">{SERVER_CONFIG.storeSubtitle}</p>
                    </div>
                </div>

                <div className="header-center">
                    <Link to="/" className="store-logo-link" aria-label="NorthSMP Store">
                        <img
                            src="/assets/images/northsmp.png"
                            alt="NorthSMP"
                            className="store-logo is-pulsing"
                            style={{ maxWidth: '360px', maxHeight: '180px', width: 'auto', height: 'auto', objectFit: 'contain' }}
                        />
                    </Link>
                </div>

                <div className="header-right">
                    <Link to="/login" className="header-primary-button">
                        {user ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.username}
                                style={{ width: 22, height: 22, borderRadius: 4, display: 'inline-block' }}
                            />
                        ) : (
                            <i className="fa-solid fa-user"></i>
                        )}
                        <span className="button-text">
                            {user ? user.username : 'Login'}
                        </span>
                    </Link>

                    <Link to="/basket" className="header-secondary-button">
                        <div className="cart-badge" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            {totalCartCount > 0 && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-10px',
                                        background: 'var(--primary-color, #00C0FF)',
                                        color: '#fff',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        padding: '2px 6px',
                                        borderRadius: '10px',
                                        minWidth: '16px',
                                        textAlign: 'center'
                                    }}
                                >
                                    {totalCartCount}
                                </span>
                            )}
                        </div>
                        <span className="button-text">Cart</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};
