import React from 'react';

export const PrivacyPage: React.FC = () => {
    return (
        <div className="privacy-page" style={{ marginBottom: '3rem' }}>
            <div className="grid-row">
                <div className="col-12">
                    <div className="textbox-block" style={{ padding: '30px' }}>
                        <div className="textbox-accent-block"></div>
                        <div className="textbox-content">
                            <h1 className="text-header" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
                                Privacy Policy
                            </h1>

                            <div className="text-desc" style={{ lineHeight: 1.9, fontSize: '0.95rem' }}>
                                <h3 style={{ color: 'var(--primary-color)', marginTop: '15px' }}>1. Information We Collect</h3>
                                <p>
                                    When you use the NorthSMP webstore, we collect only the necessary details to fulfill your in-game purchase. This includes your Minecraft username (IGN), IP address, and transaction identifier. We do not store financial account numbers, credit card details, or banking passwords directly on our servers.
                                </p>

                                <h3 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>2. Payment Processing</h3>
                                <p>
                                    All payment transactions are encrypted and processed by authorized third-party gateways (including Tebex Limited, PayPal, and Stripe). Payment processors handle your financial information under their respective global security standards and PCI-DSS compliance.
                                </p>

                                <h3 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>3. Use of Local Storage</h3>
                                <p>
                                    We use modern browser local storage exclusively to preserve your active shopping cart items, selected currency preference, and logged-in Minecraft username across store pages. We do not track you across unrelated third-party websites.
                                </p>

                                <h3 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>4. Data Protection &amp; Contact</h3>
                                <p>
                                    Your data is never sold, leased, or traded to third parties. If you have inquiries regarding your account data or wish to request data deletion, please contact our administrative team via our official Discord support server.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
