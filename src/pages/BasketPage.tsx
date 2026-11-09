import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const BasketPage: React.FC = () => {
    const {
        cart,
        formatPrice,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        user,
        showToast
    } = useStore();

    const [couponInput, setCouponInput] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [agreeAccount, setAgreeAccount] = useState(false);
    const [orderSuccessModal, setOrderSuccessModal] = useState<any | null>(null);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    const handleApplyCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (!couponInput.trim()) return;
        applyCoupon(couponInput);
        setCouponInput('');
    };

    const handleCheckout = () => {
        if (!agreeTerms || !agreeAccount) {
            showToast('Please accept the agreements to proceed', 'error');
            return;
        }

        const orderId = 'NSMP-' + Math.floor(100000 + Math.random() * 900000);
        const orderData = {
            orderId,
            items: [...cart],
            total: finalTotal,
            targetUser: user?.username || 'Player',
            date: new Date().toLocaleDateString()
        };

        setOrderSuccessModal(orderData);
        clearCart();
    };

    return (
        <div className="basket-page" style={{ marginBottom: '3rem' }}>
            {/* Category Banner */}
            <div className="grid-row">
                <div className="col-12">
                    <div className="category-page-block">
                        <div className="category-page-accent-block"></div>
                        <div className="category-page-header">
                            <h1 className="text-header">Your Shopping Cart</h1>
                            <p className="text-desc category-page-description">
                                Review your selected packages and complete your secure transaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {cart.length === 0 && !orderSuccessModal ? (
                /* Empty Cart State */
                <div
                    style={{
                        background: 'var(--block-color)',
                        border: 'var(--block-border-width) solid var(--block-border)',
                        borderRadius: 'var(--border-radius)',
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        marginTop: '1.5rem'
                    }}
                >
                    <i
                        className="fa-solid fa-cart-shopping"
                        style={{ fontSize: '3.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}
                    ></i>
                    <h2 className="text-header" style={{ marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                        Browse our ranks and crates to add items to your cart.
                    </p>
                    <Link to="/ranks" className="primary-button" style={{ display: 'inline-flex', padding: '12px 24px' }}>
                        <i className="fa-solid fa-crown" style={{ marginRight: '8px' }}></i> Browse Server Ranks
                    </Link>
                </div>
            ) : (
                <div className="grid-row" style={{ marginTop: '1.5rem' }}>
                    {/* Cart Items List */}
                    <div className="col-8">
                        <div
                            style={{
                                background: 'var(--block-color)',
                                border: 'var(--block-border-width) solid var(--block-border)',
                                borderRadius: 'var(--border-radius)',
                                padding: '1.5rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--block-border)', paddingBottom: '0.75rem' }}>
                                <h3 className="text-title" style={{ margin: 0 }}>Items ({cart.length})</h3>
                                <button
                                    type="button"
                                    onClick={clearCart}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--negative, #EF4444)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    <i className="fa-solid fa-trash"></i> Empty Cart
                                </button>
                            </div>

                            <div className="cart-items-list">
                                {cart.map((item, idx) => (
                                    <div
                                        key={`${item.id}-${item.giftTo || 'self'}-${idx}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '1rem 0',
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        {/* Image & Title */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 200px' }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                                                onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).src = '/assets/images/keys.png';
                                                }}
                                            />
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                                    {item.name}
                                                </div>
                                                {item.giftTo && (
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                        <i className="fa-solid fa-gift"></i> Gift for: {item.giftTo}
                                                    </span>
                                                )}
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                    Unit: {formatPrice(item.price)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.id, item.giftTo, -1)}
                                                style={{
                                                    background: 'var(--block-dark)',
                                                    border: '1px solid var(--block-border)',
                                                    color: 'var(--text-primary)',
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.id, item.giftTo, 1)}
                                                style={{
                                                    background: 'var(--block-dark)',
                                                    border: '1px solid var(--block-border)',
                                                    color: 'var(--text-primary)',
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Total & Remove */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ fontWeight: 700, color: 'var(--primary-color)', minWidth: '80px', textAlign: 'right' }}>
                                                {formatPrice(item.price * item.quantity)}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id, item.giftTo)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--negative, #EF4444)',
                                                    cursor: 'pointer',
                                                    padding: '6px'
                                                }}
                                                aria-label="Remove item"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Coupon Form */}
                            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--block-border)' }}>
                                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '10px', maxWidth: '400px' }}>
                                    <input
                                        type="text"
                                        placeholder="Promo Code (e.g. NORTH25)"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        style={{
                                            flex: 1,
                                            background: 'var(--block-dark)',
                                            border: '1px solid var(--block-border)',
                                            borderRadius: '6px',
                                            padding: '8px 12px',
                                            color: 'var(--text-primary)',
                                            textTransform: 'uppercase'
                                        }}
                                    />
                                    <button type="submit" className="secondary-button" style={{ padding: '8px 16px' }}>
                                        Apply
                                    </button>
                                </form>

                                {appliedCoupon && (
                                    <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                            Coupon {appliedCoupon.code} ({appliedCoupon.discountPercent}% OFF)
                                        </span>
                                        <button
                                            type="button"
                                            onClick={removeCoupon}
                                            style={{ background: 'none', border: 'none', color: 'var(--negative, #EF4444)', cursor: 'pointer', fontSize: '0.8rem' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Agreements */}
                    <div className="col-4">
                        <div
                            style={{
                                background: 'var(--block-color)',
                                border: 'var(--block-border-width) solid var(--block-border)',
                                borderRadius: 'var(--border-radius)',
                                padding: '1.5rem'
                            }}
                        >
                            <h3 className="text-title" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--block-border)', paddingBottom: '0.75rem' }}>
                                Order Summary
                            </h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            {appliedCoupon && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#10B981' }}>
                                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                                    <span>-{formatPrice(discountAmount)}</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--block-border)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--primary-color)' }}>{formatPrice(finalTotal)}</span>
                            </div>

                            {/* Checkbox Agreements */}
                            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        style={{ marginTop: '3px' }}
                                    />
                                    <span>I agree to the <Link to="/terms" target="_blank" style={{ color: 'var(--primary-color)' }}>Terms of Service</Link> and acknowledge all purchases are digital &amp; non-refundable.</span>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={agreeAccount}
                                        onChange={(e) => setAgreeAccount(e.target.checked)}
                                        style={{ marginTop: '3px' }}
                                    />
                                    <span>I confirm my Minecraft IGN is accurate for automatic reward delivery.</span>
                                </label>
                            </div>

                            <button
                                type="button"
                                className="primary-button"
                                onClick={handleCheckout}
                                disabled={!agreeTerms || !agreeAccount}
                                style={{
                                    width: '100%',
                                    marginTop: '1.5rem',
                                    padding: '14px',
                                    justifyContent: 'center',
                                    opacity: (!agreeTerms || !agreeAccount) ? 0.5 : 1,
                                    cursor: (!agreeTerms || !agreeAccount) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <i className="fa-solid fa-lock" style={{ marginRight: '8px' }}></i>
                                Complete Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Order Confirmation Modal */}
            {orderSuccessModal && (
                <div
                    className="legend-modal show"
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
                >
                    <div className="legend-modal-content" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                        <div className="legend-modal-accent-block"></div>
                        <i className="fa-solid fa-circle-check" style={{ fontSize: '4rem', color: '#10B981', marginTop: '1rem', marginBottom: '1rem' }}></i>
                        <h2 className="text-header" style={{ marginBottom: '0.5rem' }}>Purchase Successful!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            Order Reference: <strong style={{ color: 'var(--text-primary)' }}>{orderSuccessModal.orderId}</strong>
                        </p>
                        <div style={{ background: 'var(--block-dark)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'left' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                <strong>Player Target:</strong> {orderSuccessModal.targetUser}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                <strong>Total Paid:</strong> {formatPrice(orderSuccessModal.total)}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#10B981', marginTop: '8px' }}>
                                <i className="fa-solid fa-bolt"></i> Rewards will arrive in-game within 1-3 minutes!
                            </div>
                        </div>
                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => setOrderSuccessModal(null)}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Return to Store
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
