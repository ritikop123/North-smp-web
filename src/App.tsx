import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PackageModal } from './components/PackageModal';
import { GiftModal } from './components/GiftModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { RanksPage } from './pages/RanksPage';
import { CoinsPage } from './pages/CoinsPage';
import { CratesPage } from './pages/CratesPage';
import { BasketPage } from './pages/BasketPage';
import { LoginPage } from './pages/LoginPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Scroll to top automatically on route changes
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export const App: React.FC = () => {
    return (
        <StoreProvider>
            <BrowserRouter>
                <ScrollToTop />
                <div className="everfront-app">
                    <Header />

                    {/* Main Content Area */}
                    <main className="content-container">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/ranks" element={<RanksPage />} />
                            <Route path="/ranks.html" element={<RanksPage />} />
                            <Route path="/coins" element={<CoinsPage />} />
                            <Route path="/coins.html" element={<CoinsPage />} />
                            <Route path="/crates" element={<CratesPage />} />
                            <Route path="/crates.html" element={<CratesPage />} />
                            <Route path="/basket" element={<BasketPage />} />
                            <Route path="/basket.html" element={<BasketPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/login.html" element={<LoginPage />} />
                            <Route path="/terms" element={<TermsPage />} />
                            <Route path="/terms.html" element={<TermsPage />} />
                            <Route path="/privacy" element={<PrivacyPage />} />
                            <Route path="/privacy.html" element={<PrivacyPage />} />
                            <Route path="*" element={<HomePage />} />
                        </Routes>
                    </main>

                    {/* Global Modals and Notifications */}
                    <PackageModal />
                    <GiftModal />
                    <Toast />

                    <Footer />
                </div>
            </BrowserRouter>
        </StoreProvider>
    );
};

export default App;
