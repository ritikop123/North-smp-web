import React from 'react';

export const TermsPage: React.FC = () => {
    return (
        <div className="terms-page" style={{ marginBottom: '3rem' }}>
            <div className="grid-row">
                <div className="col-12">
                    <div className="textbox-block" style={{ padding: '30px' }}>
                        <div className="textbox-accent-block"></div>
                        <div className="textbox-content">
                            <h1 className="text-header" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
                                Terms and Conditions of Purchase
                            </h1>

                            <div className="text-desc" style={{ lineHeight: 1.9, fontSize: '0.95rem' }}>
                                <h3 style={{ color: 'var(--primary-color)', marginTop: '15px' }}>1. General Agreement</h3>
                                <p>
                                    By placing an order on the official NorthSMP store, you agree to comply with and be bound by the following terms and conditions. All purchases made on this webstore are for virtual in-game goods to be utilized on the NorthSMP network.
                                </p>

                                <h3 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>2. Delivery of Goods</h3>
                                <p>
                                    All virtual goods, including ranks, points, permissions, and crate keys, are automatically credited to your specified in-game username upon successful payment confirmation. In most circumstances, delivery takes 1 to 5 minutes. If your items do not arrive within 15 minutes, please reach out via our Discord ticket support system.
                                </p>

                                <h3 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>3. Refund &amp; Chargeback Policy</h3>
                                <p>
                                    Because all items are digital non-tangible goods that are consumed or made available immediately upon purchase, all sales are final. Opening a fraudulent dispute or chargeback via PayPal, credit card, or your financial institution will result in an immediate and permanent blacklist from NorthSMP and associated network webstores.
                                </p>

                                <h3 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>4. Server Rules &amp; Moderation</h3>
                                <p>
                                    Purchasing a rank, item, or crate key does not grant immunity from server rules. If you are found violating server gameplay rules (e.g., cheating, exploiting, harassment), staff reserves the right to mute or ban your account according to our standard moderation guidelines without entitlement to a refund.
                                </p>

                                <h3 style={{ color: 'var(--primary-color)', marginTop: '20px' }}>5. Affiliation Disclaimer</h3>
                                <p>
                                    NorthSMP is not affiliated with, endorsed by, or associated with Mojang AB, Microsoft Corporation, or any of their affiliates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
