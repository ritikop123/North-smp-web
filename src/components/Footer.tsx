import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVER_CONFIG } from '../config/config';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
    const { showToast } = useStore();
    const [copied, setCopied] = useState(false);

    const handleCopyIp = () => {
        navigator.clipboard.writeText(SERVER_CONFIG.ip).then(() => {
            setCopied(true);
            showToast(`Server IP (${SERVER_CONFIG.ip}) copied to clipboard!`, 'success');
            setTimeout(() => setCopied(false), 2000);
        }).catch(() => {
            showToast(`Server IP: ${SERVER_CONFIG.ip}`, 'info');
        });
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-container">
                    <div className="footer-grid">
                        {/* Section 1: Play Now / Copy Server IP */}
                        <div className="footer-section">
                            <h3 className="footer-title">
                                <i className="fa-solid fa-server" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                                Play Now
                            </h3>
                            <p className="footer-description">
                                Start your adventure today on NorthSMP! Join with Java &amp; Bedrock editions to build your legacy.
                            </p>
                            <div>
                                <button
                                    type="button"
                                    className="footer-secondary-button"
                                    onClick={handleCopyIp}
                                    title="Click to copy server IP"
                                >
                                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                                    <span className="button-text">{SERVER_CONFIG.ip}</span>
                                </button>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--footer-description)', opacity: 0.85 }}>
                                Bedrock Port: <strong style={{ color: 'var(--text-primary)' }}>{SERVER_CONFIG.bedrockPort}</strong>
                            </div>
                        </div>

                        {/* Section 2: Discord Community */}
                        <div className="footer-section">
                            <h3 className="footer-title">
                                <i className="fa-brands fa-discord" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                                Discord Community
                            </h3>
                            <p className="footer-description">
                                Join our thriving Discord server for updates, announcements, giveaways, and 24/7 staff support.
                            </p>
                            <div>
                                <a
                                    href={SERVER_CONFIG.discordUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-primary-button"
                                >
                                    <i className="fa-brands fa-discord"></i>
                                    <span className="button-text">Join Discord</span>
                                </a>
                            </div>
                        </div>

                        {/* Section 3: Legal & Information */}
                        <div className="footer-section">
                            <h3 className="footer-title">
                                <i className="fa-solid fa-shield-halved" style={{ marginRight: '8px', color: 'var(--primary-color)' }}></i>
                                Store Information
                            </h3>
                            <p className="footer-description">
                                Purchases directly support server hardware, anti-cheat upgrades, and development.
                            </p>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <Link
                                    to="/terms"
                                    className="footer-secondary-button"
                                    style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
                                >
                                    <i className="fa-solid fa-file-contract"></i>
                                    <span className="button-text">Terms of Service</span>
                                </Link>
                                <Link
                                    to="/privacy"
                                    className="footer-secondary-button"
                                    style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
                                >
                                    <i className="fa-solid fa-lock"></i>
                                    <span className="button-text">Privacy Policy</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <div className="footer-bottom-content">
                        <div className="footer-copyright">
                            <p><strong>{SERVER_CONFIG.name} © 2026.</strong> All Rights Reserved.</p>
                            <p className="footer-disclaimer">
                                We are not affiliated with Mojang Studios, Minecraft, or Microsoft Corporation.
                            </p>
                        </div>
                        <div className="footer-credits">
                            <p>Developed by: <strong>ritik</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
