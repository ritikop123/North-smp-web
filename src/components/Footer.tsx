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
            showToast(`Copied ${SERVER_CONFIG.ip} to clipboard!`, 'success');
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
                        {/* Server IP Info */}
                        <div className="footer-column">
                            <h4 className="footer-title">
                                <i className="fa-solid fa-server"></i> Server Address
                            </h4>
                            <p className="footer-text">
                                Connect to NorthSMP using Java Edition or Bedrock Edition.
                            </p>
                            <div className="footer-ip-box" onClick={handleCopyIp} title="Click to copy IP">
                                <span className="ip-text">{SERVER_CONFIG.ip}</span>
                                <button type="button" className="copy-btn">
                                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                                </button>
                            </div>
                            <span className="footer-subtext">Bedrock Port: {SERVER_CONFIG.bedrockPort}</span>
                        </div>

                        {/* Discord Community */}
                        <div className="footer-column">
                            <h4 className="footer-title">
                                <i className="fa-brands fa-discord"></i> Community
                            </h4>
                            <p className="footer-text">
                                Join our thriving Discord server for updates, announcements, giveaways, and 24/7 staff support.
                            </p>
                            <a
                                href={SERVER_CONFIG.discordUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-discord-btn"
                            >
                                <i className="fa-brands fa-discord"></i> Join Discord
                            </a>
                        </div>

                        {/* Quick Links & Legal */}
                        <div className="footer-column">
                            <h4 className="footer-title">
                                <i className="fa-solid fa-shield-halved"></i> Store Information
                            </h4>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/"><i className="fa-solid fa-chevron-right"></i> Home</Link>
                                </li>
                                <li>
                                    <Link to="/ranks"><i className="fa-solid fa-chevron-right"></i> Server Ranks</Link>
                                </li>
                                <li>
                                    <Link to="/crates"><i className="fa-solid fa-chevron-right"></i> Crate Keys</Link>
                                </li>
                                <li>
                                    <Link to="/terms"><i className="fa-solid fa-chevron-right"></i> Terms of Service</Link>
                                </li>
                                <li>
                                    <Link to="/privacy"><i className="fa-solid fa-chevron-right"></i> Privacy Policy</Link>
                                </li>
                            </ul>
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
                    </div>
                </div>
            </div>
        </footer>
    );
};
