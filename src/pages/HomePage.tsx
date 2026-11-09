import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
    // Live countdown timer for the 25% Summer Sale
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 14,
        mins: 30,
        secs: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.secs > 0) {
                    return { ...prev, secs: prev.secs - 1 };
                } else if (prev.mins > 0) {
                    return { ...prev, mins: prev.mins - 1, secs: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
                }
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatNum = (num: number) => String(num).padStart(2, '0');

    return (
        <div className="home-page">
            {/* Sale Promotion Banner */}
            <div className="sale-banner-block">
                <div className="sale-banner-content">
                    <div className="sale-badge">
                        <i className="fa-solid fa-fire"></i>
                        <span>LIMITED TIME OFFER</span>
                    </div>
                    <h2 className="sale-title">
                        <span>25% OFF</span> SUMMER STORE SALE!
                    </h2>
                    <p className="sale-subtitle">
                        Use promo coupon code <strong className="sale-code">NORTH25</strong> at checkout for 25% off all ranks and crates!
                    </p>
                    <div className="sale-countdown">
                        <div className="countdown-unit">
                            <strong className="text-header countdown-days">{formatNum(timeLeft.days)}</strong>
                            <small>DAYS</small>
                        </div>
                        <div className="countdown-unit">
                            <strong className="text-header countdown-hours">{formatNum(timeLeft.hours)}</strong>
                            <small>HRS</small>
                        </div>
                        <div className="countdown-unit">
                            <strong className="text-header countdown-mins">{formatNum(timeLeft.mins)}</strong>
                            <small>MIN</small>
                        </div>
                        <div className="countdown-unit">
                            <strong className="text-header countdown-secs">{formatNum(timeLeft.secs)}</strong>
                            <small>SEC</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Store Categories Grid (Symmetrical 3 Cards) */}
            <div className="category-grid" style={{ marginTop: '2rem' }}>
                <div className="grid-row">
                    {/* Economy Ranks */}
                    <div className="col-4">
                        <Link to="/ranks" className="category-button">
                            <div className="category-eclipse"></div>
                            <div className="category-content">
                                <h2 className="text-header">Economy Ranks</h2>
                                <p className="text-title">Click to view</p>
                            </div>
                            <div className="category-image-container">
                                <img
                                    src="/assets/images/berry.png"
                                    alt="Economy Ranks"
                                    style={{ maxHeight: '130px', objectFit: 'contain' }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Network Points (Coming Soon) */}
                    <div className="col-4">
                        <Link to="/coins" className="category-button">
                            <div className="category-eclipse"></div>
                            <div className="category-content">
                                <h2 className="text-header">Network Points</h2>
                                <p className="text-title" style={{ color: '#64D2F9', fontWeight: 600 }}>Coming Soon</p>
                            </div>
                            <div className="category-image-container">
                                <img
                                    src="/assets/images/tressurechest.png"
                                    alt="Network Points"
                                    style={{ maxHeight: '130px', objectFit: 'contain' }}
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Crate Keys */}
                    <div className="col-4">
                        <Link to="/crates" className="category-button">
                            <div className="category-eclipse"></div>
                            <div className="category-content">
                                <h2 className="text-header">Crate Keys</h2>
                                <p className="text-title">Click to view</p>
                            </div>
                            <div className="category-image-container">
                                <img
                                    src="/assets/images/keys.png"
                                    alt="Crate Keys"
                                    style={{ maxHeight: '130px', objectFit: 'contain' }}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Information & Security Notice Grid */}
            <div className="notice-grid" style={{ marginTop: '2rem' }}>
                <div className="grid-row">
                    <div className="col-6">
                        <div className="textbox-block">
                            <div className="textbox-accent-block"></div>
                            <div className="textbox-content">
                                <div className="textbox-icon-bg">#</div>
                                <div className="textbox-header">
                                    <h2 className="text-title textbox-title">Information</h2>
                                </div>
                                <div className="textbox-description text-desc">
                                    We work relentlessly to provide the highest performance, zero lag, and regular feature updates for NorthSMP. Purchasing from our store directly funds server hosting, anti-cheat upgrades, custom plugin development, and exciting community events. Thank you for supporting our server!
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="textbox-block">
                            <div className="textbox-accent-block"></div>
                            <div className="textbox-content">
                                <div className="textbox-icon-bg">#</div>
                                <div className="textbox-header">
                                    <h2 className="text-title textbox-title">Security &amp; Delivery</h2>
                                </div>
                                <div className="textbox-description text-desc">
                                    All payments are securely encrypted and processed instantly. Once checkout is complete, your packages, ranks, or crate keys are credited automatically to your in-game account within 1-3 minutes. If you experience any delay, our 24/7 staff support is available on Discord.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Community Goal Module */}
            <div className="module-grid" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <div className="col-12">
                    <div className="payment-goal-block">
                        <div className="community-goal-accent-block"></div>
                        <div className="payment-goal-content">
                            <div className="payment-goal-icon-bg">$</div>
                            <div className="payment-goal-header">
                                <h2 className="text-title payment-goal-title">Community Goal - Dedicated High-RAM Node</h2>
                            </div>
                            <div className="payment-goal-progress-container">
                                <div className="payment-goal-progress-bar">
                                    <div className="payment-goal-progress-fill" style={{ width: '0%', minWidth: '45px' }}>
                                        <span className="payment-goal-percentage">0%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
