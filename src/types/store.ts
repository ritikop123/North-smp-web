export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'INR' | 'AUD';

export interface CurrencyConfig {
    symbol: string;
    rate: number;
    position: 'before' | 'after';
}

export interface Package {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: 'Ranks' | 'Points' | 'Crates' | 'General';
    badge?: string;
    perksHtml?: string;
}

export interface CartItem extends Package {
    quantity: number;
    giftTo?: string | null;
}

export interface UserSession {
    username: string;
    platform: 'java' | 'bedrock';
    avatarUrl: string;
    loginTime: string;
}

export interface ToastState {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}
