import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, Package, CartItem, UserSession, ToastState } from '../types/store';
import { CURRENCIES, COUPONS } from '../config/config';

interface StoreContextType {
    cart: CartItem[];
    currency: CurrencyCode;
    user: UserSession | null;
    appliedCoupon: { code: string; discountPercent: number } | null;
    toast: ToastState | null;
    activeModalPackage: Package | null;
    giftingPackage: Package | null;
    setCurrency: (code: CurrencyCode) => void;
    formatPrice: (usdPrice: number) => string;
    addToCart: (pkg: Package, giftTo?: string | null) => void;
    updateQuantity: (id: string, giftTo: string | undefined | null, delta: number) => void;
    removeFromCart: (id: string, giftTo: string | undefined | null) => void;
    clearCart: () => void;
    login: (username: string, platform: 'java' | 'bedrock') => void;
    logout: () => void;
    applyCoupon: (code: string) => boolean;
    removeCoupon: () => void;
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    setActiveModalPackage: (pkg: Package | null) => void;
    setGiftingPackage: (pkg: Package | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
        const saved = localStorage.getItem('northsmp_currency');
        return (saved && saved in CURRENCIES) ? (saved as CurrencyCode) : 'USD';
    });

    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem('northsmp_cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [user, setUser] = useState<UserSession | null>(() => {
        try {
            const saved = localStorage.getItem('northsmp_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(() => {
        try {
            const saved = localStorage.getItem('northsmp_coupon');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const [toast, setToast] = useState<ToastState | null>(null);
    const [activeModalPackage, setActiveModalPackage] = useState<Package | null>(null);
    const [giftingPackage, setGiftingPackage] = useState<Package | null>(null);

    useEffect(() => {
        localStorage.setItem('northsmp_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('northsmp_currency', currency);
    }, [currency]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('northsmp_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('northsmp_user');
        }
    }, [user]);

    useEffect(() => {
        if (appliedCoupon) {
            localStorage.setItem('northsmp_coupon', JSON.stringify(appliedCoupon));
        } else {
            localStorage.removeItem('northsmp_coupon');
        }
    }, [appliedCoupon]);

    const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Date.now();
        setToast({ id, message, type });
        setTimeout(() => {
            setToast((prev) => (prev?.id === id ? null : prev));
        }, 3200);
    };

    const formatPrice = (usdPrice: number): string => {
        const curr = CURRENCIES[currency] || CURRENCIES.USD;
        const converted = (usdPrice * curr.rate).toFixed(2);
        return curr.position === 'before'
            ? `${curr.symbol}${converted} ${currency}`
            : `${converted}${curr.symbol} ${currency}`;
    };

    const addToCart = (pkg: Package, giftTo: string | null = null) => {
        setCart((prev) => {
            const cleanGift = giftTo?.trim() || null;
            const existingIndex = prev.findIndex(
                (item) => item.id === pkg.id && (item.giftTo || null) === cleanGift
            );

            if (existingIndex > -1) {
                const next = [...prev];
                next[existingIndex] = {
                    ...next[existingIndex],
                    quantity: next[existingIndex].quantity + 1
                };
                return next;
            }

            return [...prev, { ...pkg, quantity: 1, giftTo: cleanGift }];
        });

        const targetDesc = giftTo ? ` for ${giftTo}` : '';
        showToast(`Added ${pkg.name}${targetDesc} to cart!`, 'success');
    };

    const updateQuantity = (id: string, giftTo: string | undefined | null, delta: number) => {
        const cleanGift = giftTo?.trim() || null;
        setCart((prev) => {
            return prev
                .map((item) => {
                    if (item.id === id && (item.giftTo || null) === cleanGift) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter((item): item is CartItem => item !== null);
        });
    };

    const removeFromCart = (id: string, giftTo: string | undefined | null) => {
        const cleanGift = giftTo?.trim() || null;
        setCart((prev) => prev.filter((item) => !(item.id === id && (item.giftTo || null) === cleanGift)));
        showToast('Item removed from cart', 'info');
    };

    const clearCart = () => {
        setCart([]);
        setAppliedCoupon(null);
    };

    const setCurrency = (code: CurrencyCode) => {
        if (code in CURRENCIES) {
            setCurrencyState(code);
            showToast(`Currency changed to ${code}`, 'info');
        }
    };

    const login = (username: string, platform: 'java' | 'bedrock') => {
        const cleanName = username.trim();
        const avatarUrl = `https://mc-heads.net/avatar/${encodeURIComponent(cleanName)}/64`;
        const session: UserSession = {
            username: cleanName,
            platform,
            avatarUrl,
            loginTime: new Date().toISOString()
        };
        setUser(session);
        showToast(`Welcome back, ${cleanName}!`, 'success');
    };

    const logout = () => {
        setUser(null);
        showToast('Signed out of store session', 'info');
    };

    const applyCoupon = (code: string): boolean => {
        const normalized = code.trim().toUpperCase();
        if (normalized in COUPONS) {
            const discount = COUPONS[normalized];
            setAppliedCoupon({ code: normalized, discountPercent: discount });
            showToast(`Coupon applied! ${discount}% discount applied`, 'success');
            return true;
        } else {
            showToast('Invalid or expired coupon code', 'error');
            return false;
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        showToast('Coupon removed', 'info');
    };

    return (
        <StoreContext.Provider
            value={{
                cart,
                currency,
                user,
                appliedCoupon,
                toast,
                activeModalPackage,
                giftingPackage,
                setCurrency,
                formatPrice,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                login,
                logout,
                applyCoupon,
                removeCoupon,
                showToast,
                setActiveModalPackage,
                setGiftingPackage
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = (): StoreContextType => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
