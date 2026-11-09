import React from 'react';
import { Link } from 'react-router-dom';

export const CoinsPage: React.FC = () => {
    return (
        <div className="coins-page">
            {/* Category Banner */}
            <div className="grid-row">
                <div className="col-12">
                    <div className="category-page-block">
                        <div className="category-page-accent-block"></div>
                        <div className="category-page-header">
                            <h1 className="text-header">Network Points</h1>
                            <p className="text-desc category-page-description">
                                Network Points category is currently under development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation Pills */}
            <div className="category-nav-bar" style={{ marginTop: '1.5rem' }}>
                <Link to="/ranks" className="category-nav-pill">
                    <i className="fa-solid fa-crown"></i> Server Ranks
                </Link>
                <Link to="/coins" className="category-nav-pill active">
                    <i className="fa-solid fa-coins"></i> Network Points
                </Link>
                <Link to="/crates" className="category-nav-pill">
                    <i className="fa-solid fa-key"></i> Crate Keys
                </Link>
            </div>

            {/* Coming Soon Hero Showcase - Clean Minimalist (No glow, no chest) */}
            <div className="coming-soon-container" style={{ marginTop: '1.5rem', marginBottom: '3.5rem' }}>
                <div
                    className="coming-soon-card"
                    style={{
                        background: 'var(--block-color)',
                        border: 'var(--block-border-width) solid var(--block-border)',
                        borderRadius: 'var(--border-radius)',
                        boxShadow: 'var(--box-shadow)',
                        padding: 'clamp(4rem, 8vw, 6rem) 2rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <h2
                            className="text-header"
                            style={{
                                fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                                color: 'var(--text-primary)',
                                margin: 0,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                fontWeight: 800
                            }}
                        >
                            Coming Soon
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
