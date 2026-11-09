import React from 'react';
import { Link } from 'react-router-dom';
import { RANKS_DATA } from '../config/config';
import { PackageCard } from '../components/PackageCard';

export const RanksPage: React.FC = () => {
    return (
        <div className="ranks-page">
            {/* Category Banner */}
            <div className="grid-row">
                <div className="col-12">
                    <div className="category-page-block">
                        <div className="category-page-accent-block"></div>
                        <div className="category-page-header">
                            <h1 className="text-header">Server Ranks</h1>
                            <p className="text-desc category-page-description">
                                Unlock permanent perks, in-game commands, weekly kits, custom prefixes, private vaults, and claim blocks across NorthSMP.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Navigation Pills */}
            <div className="category-nav-bar" style={{ marginTop: '1.5rem' }}>
                <Link to="/ranks" className="category-nav-pill active">
                    <i className="fa-solid fa-crown"></i> Server Ranks
                </Link>
                <Link to="/coins" className="category-nav-pill">
                    <i className="fa-solid fa-coins"></i> Network Points
                </Link>
                <Link to="/crates" className="category-nav-pill">
                    <i className="fa-solid fa-key"></i> Crate Keys
                </Link>
            </div>

            {/* Packages Grid Section */}
            <div className="packages-section" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
                <div className="packages-grid-container">
                    <div className="grid-row">
                        {RANKS_DATA.map((pkg, idx) => {
                            // If it's the last rank (Berry, 5th item), center it symmetrically
                            const isLastOdd = idx === RANKS_DATA.length - 1 && RANKS_DATA.length % 2 !== 0;
                            const columnClass = isLastOdd ? 'col-center-6' : 'col-6';
                            return <PackageCard key={pkg.id} pkg={pkg} columnClass={columnClass} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
