import React from 'react';
import { Link } from 'react-router-dom';
import { CRATES_DATA } from '../config/config';
import { PackageCard } from '../components/PackageCard';

export const CratesPage: React.FC = () => {
    return (
        <div className="crates-page">
            {/* Category Banner */}
            <div className="grid-row">
                <div className="col-12">
                    <div className="category-page-block">
                        <div className="category-page-accent-block"></div>
                        <div className="category-page-header">
                            <h1 className="text-header">Crate Keys</h1>
                            <p className="text-desc category-page-description">
                                Open mystery crates at spawn for rare enchants, god armor, netherite equipment, claim blocks, and exclusive rewards.
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
                <Link to="/coins" className="category-nav-pill">
                    <i className="fa-solid fa-coins"></i> Network Points
                </Link>
                <Link to="/crates" className="category-nav-pill active">
                    <i className="fa-solid fa-key"></i> Crate Keys
                </Link>
            </div>

            {/* Packages Grid Section */}
            <div className="packages-section" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
                <div className="packages-grid-container">
                    <div className="grid-row">
                        {CRATES_DATA.map((pkg, idx) => {
                            // If it's the last crate (Tropical Key, 5th item), center it symmetrically
                            const isLastOdd = idx === CRATES_DATA.length - 1 && CRATES_DATA.length % 2 !== 0;
                            const columnClass = isLastOdd ? 'col-center-6' : 'col-6';
                            return <PackageCard key={pkg.id} pkg={pkg} columnClass={columnClass} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
