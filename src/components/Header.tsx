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
        <header className="header">
            {/* Top Navigation Bar */}
            <nav className="nav-bar">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link
                            to="/"
                            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                        >
                            <i className="fa-solid fa-house"></i> Home
                        </Link>
                    </div>

                    <div className="nav-right">
                        {/* Currency Selector */}
                        <div className="currency-selector-container">
                            <i className="fa-solid fa-coins currency-icon" aria-hidden="true"></i>
                            <select
                                className="currency-select"
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
                        </div>

                        {/* Discord Invite Button */}
                        <a
                            href={SERVER_CONFIG.discordUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-link discord-link"
                            aria-label="Join our Discord Server"
                        >
                            <i className="fa-brands fa-discord"></i> Discord
                        </a>
                    </div>
                </div>
            </nav>

            {/* Server Branding & Action Bar */}
            <div className="header-container">
                <div className="header-content">
                    {/* Left: Play Now / Copy IP */}
                    <div className="header-left">
                        <button
                            type="button"
                            className={`header-primary-button ${copied ? 'copied' : ''}`}
                            onClick={handleCopyIp}
                            title="Click to copy server IP"
                        >
                            <div className="header-primary-icon">
                                <i className={`fa-solid ${copied ? 'fa-check' : 'fa-play'}`}></i>
                            </div>
                            <div className="header-primary-text">
                                <span className="button-title">
                                    {copied ? 'IP COPIED!' : 'PLAY NOW'}
                                </span>
                                <span className="button-subtitle">{SERVER_CONFIG.ip}</span>
                            </div>
                        </button>
                    </div>

                    {/* Center: NorthSMP Logo & Welcome Subtitle */}
                    <div className="header-center">
                        <Link to="/" className="header-logo-link" aria-label="NorthSMP Store Home">
                            <img
                                src="/assets/images/northsmp.png"
                                alt="NorthSMP Server Logo"
                                className="header-logo pulse-glow"
                            />
                        </Link>
                        <p className="header-server-subtitle">{SERVER_CONFIG.storeSubtitle}</p>
                    </div>

                    {/* Right: Login / Player Profile & Cart */}
                    <div className="header-right">
                        <Link
                            to="/login"
                            className={`header-secondary-button ${user ? 'logged-in' : ''}`}
                            aria-label={user ? `Logged in as ${user.username}` : 'Login to store'}
                        >
                            <div className="header-secondary-icon">
                                {user ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={user.username}
                                        style={{ width: 22, height: 22, borderRadius: 4, display: 'block' }}
                                    />
                                ) : (
                                    <i className="fa-solid fa-user"></i>
                                )}
                            </div>
                            <span className="button-text">
                                {user ? user.username : 'Login'}
                            </span>
                        </Link>

                        <Link
                            to="/basket"
                            className="header-secondary-button cart-btn"
                            aria-label="View Shopping Cart"
                        >
                            <div className="cart-badge">
                                <i className="fa-solid fa-cart-shopping"></i>
                                {totalCartCount > 0 && (
                                    <span className="cart-count-pill">{totalCartCount}</span>
                                )}
                            </div>
                            <span className="button-text">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
