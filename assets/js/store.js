/**
 * NorthSMP Webstore Engine
 * Features: Cart, Multi-Currency, Auth State, Modals, Promo Countdown, Toast, Live Server Ping, Recent Payments
 */

// Global Configuration fallback
const STORE_CONFIG = window.NORTH_CONFIG || {
    server: {
        name: "NorthSMP",
        ip: "northsmp.fun",
        bedrockPort: "19036",
        discordUrl: "https://discord.gg/jfDn6n74Gr",
        bedrockPrefix: "."
    },
    sale: {
        enabled: true,
        discountPercent: 25,
        tag: "25%",
        name: "SUMMER LAUNCH SALE",
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        couponCodes: { "NORTH25": 25, "WELCOME": 10 }
    },
    recentPayments: [
        { player: "FrostByte", package: "North King [Permanent]", time: "5 mins ago", avatar: "https://mc-heads.net/avatar/FrostByte/32" },
        { player: "ArcticFox", package: "Mythic Key 5x", time: "19 mins ago", avatar: "https://mc-heads.net/avatar/ArcticFox/32" },
        { player: "VortexMC", package: "10,000 Network Points", time: "42 mins ago", avatar: "https://mc-heads.net/avatar/VortexMC/32" }
    ],
    currencies: {
        USD: { symbol: "$", rate: 1.00 },
        EUR: { symbol: "€", rate: 0.92 },
        GBP: { symbol: "£", rate: 0.79 },
        CAD: { symbol: "CA$", rate: 1.36 },
        INR: { symbol: "₹", rate: 85.50 },
        AUD: { symbol: "AU$", rate: 1.52 }
    }
};

if (!STORE_CONFIG.currencies) {
    STORE_CONFIG.currencies = {
        USD: { symbol: "$", rate: 1.00 },
        EUR: { symbol: "€", rate: 0.92 },
        GBP: { symbol: "£", rate: 0.79 },
        CAD: { symbol: "CA$", rate: 1.36 },
        INR: { symbol: "₹", rate: 85.50 },
        AUD: { symbol: "AU$", rate: 1.52 }
    };
}

class StoreEngine {
    constructor() {
        this.cart = this.loadCart();
        this.user = this.loadUser();
        this.currency = localStorage.getItem("north_currency") || "USD";
        this.theme = localStorage.getItem("north_theme") || "arctic";
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.updateHeaderAuth();
        this.updateCartBadge();
        this.setupEventListeners();
        this.initPromoClock();
        this.initModals();
        
    }

    // Local Storage Helpers
    loadCart() {
        try {
            return JSON.parse(localStorage.getItem("north_cart") || "[]");
        } catch (e) {
            return [];
        }
    }

    saveCart() {
        localStorage.setItem("north_cart", JSON.stringify(this.cart));
        this.updateCartBadge();
    }

    loadUser() {
        try {
            return JSON.parse(localStorage.getItem("north_user") || "null");
        } catch (e) {
            return null;
        }
    }

    saveUser(user) {
        if (user) {
            localStorage.setItem("north_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("north_user");
        }
        this.user = user;
        this.updateHeaderAuth();
    }

    // Currency Switcher
    setCurrency(code) {
        if (STORE_CONFIG.currencies[code]) {
            this.currency = code;
            localStorage.setItem("north_currency", code);
            this.refreshDisplayedPrices();
        }
    }

    formatPrice(amountUSD) {
        const curr = STORE_CONFIG.currencies[this.currency] || STORE_CONFIG.currencies.USD;
        const converted = (amountUSD * curr.rate).toFixed(2);
        return `${curr.symbol}${converted} ${this.currency}`;
    }

    refreshDisplayedPrices() {
        document.querySelectorAll("[data-base-price]").forEach(el => {
            const base = parseFloat(el.getAttribute("data-base-price"));
            if (!isNaN(base)) {
                el.textContent = this.formatPrice(base);
            }
        });
        if (typeof renderCheckoutTable === "function") {
            renderCheckoutTable();
        }
    }

    // Theme Switcher
    applyTheme(themeName) {
        this.theme = themeName;
        localStorage.setItem("north_theme", themeName);
        if (themeName === "crimson") {
            document.documentElement.setAttribute("data-theme", "crimson");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
    }

    toggleTheme() {
        const nextTheme = this.theme === "crimson" ? "arctic" : "crimson";
        this.applyTheme(nextTheme);
        this.showToast(`Switched theme to ${nextTheme.toUpperCase()}`, "success");
    }

    // Cart Operations
    addToCart(pkg) {
        const existing = this.cart.find(item => item.id === pkg.id && item.giftTo === pkg.giftTo);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            this.cart.push({
                id: pkg.id,
                name: pkg.name,
                price: parseFloat(pkg.price),
                originalPrice: pkg.originalPrice ? parseFloat(pkg.originalPrice) : null,
                image: pkg.image || "",
                category: pkg.category || "General",
                quantity: 1,
                giftTo: pkg.giftTo || null
            });
        }
        this.saveCart();
        this.showToast(`Added "${pkg.name}" to your cart!`, "success");
    }

    removeFromCart(id, giftTo = null) {
        this.cart = this.cart.filter(item => !(item.id === id && item.giftTo === giftTo));
        this.saveCart();
        if (typeof renderCheckoutTable === "function") {
            renderCheckoutTable();
        }
    }

    updateQuantity(id, delta, giftTo = null) {
        const item = this.cart.find(item => item.id === id && item.giftTo === giftTo);
        if (item) {
            item.quantity = Math.max(1, (item.quantity || 1) + delta);
            this.saveCart();
            if (typeof renderCheckoutTable === "function") {
                renderCheckoutTable();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    getCartCount() {
        return this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }

    getCartTotal() {
        return this.cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    }

    updateCartBadge() {
        const count = this.getCartCount();
        const badges = document.querySelectorAll(".cart-badge");
        badges.forEach(badge => {
            let countEl = badge.querySelector(".cart-count");
            if (count > 0) {
                if (!countEl) {
                    countEl = document.createElement("span");
                    countEl.className = "cart-count";
                    badge.appendChild(countEl);
                }
                countEl.textContent = count;
                badge.classList.add("has-items");
            } else {
                if (countEl) countEl.remove();
                badge.classList.remove("has-items");
            }
        });
    }

    // Header Auth Component
    updateHeaderAuth() {
        const headerRight = document.querySelector(".header-right");
        if (!headerRight) return;

        const existingLoginBtn = headerRight.querySelector(".header-primary-button");
        const existingUserBadge = headerRight.querySelector(".header-user-badge");

        if (this.user && this.user.username) {
            if (existingLoginBtn) existingLoginBtn.remove();
            if (!existingUserBadge) {
                const badge = document.createElement("div");
                badge.className = "header-user-badge";
                const cleanName = this.user.username.startsWith(".") ? this.user.username.substring(1) : this.user.username;
                const avatar = `https://mc-heads.net/avatar/${encodeURIComponent(cleanName)}/48`;
                badge.innerHTML = `
                    <img src="${avatar}" alt="${this.user.username}" class="header-user-avatar" onerror="this.src='https://mc-heads.net/avatar/Steve/48'">
                    <span>${this.user.username}</span>
                    <i class="fa-solid fa-right-from-bracket header-user-logout" title="Log Out" onclick="window.store.logout(event)"></i>
                `;
                badge.onclick = (e) => {
                    if (!e.target.classList.contains("header-user-logout")) {
                        window.location.href = "login.html";
                    }
                };
                headerRight.prepend(badge);
            } else {
                const nameSpan = existingUserBadge.querySelector("span");
                if (nameSpan) nameSpan.textContent = this.user.username;
            }
        } else {
            if (existingUserBadge) existingUserBadge.remove();
            if (!existingLoginBtn) {
                const loginLink = document.createElement("a");
                loginLink.href = "login.html";
                loginLink.className = "header-primary-button";
                loginLink.innerHTML = `
                    <i class="fa-solid fa-user"></i>
                    <span class="button-text">Login</span>
                `;
                headerRight.prepend(loginLink);
            }
        }
    }

    login(username, platform = "java") {
        if (!username || !username.trim()) return;
        const cleanName = username.trim();
        this.saveUser({
            username: cleanName,
            platform: platform,
            loginTime: new Date().toISOString()
        });
        this.showToast(`Logged in as ${cleanName}!`, "success");
    }

    logout(e) {
        if (e) e.stopPropagation();
        this.saveUser(null);
        this.showToast("Logged out successfully.", "success");
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    // Toast Notification System
    showToast(message, type = "success") {
        let toast = document.getElementById("copy-toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "copy-toast";
            toast.className = "copy-toast";
            toast.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i> <span id="toast-message"></span>`;
            document.body.appendChild(toast);
        }
        const text = toast.querySelector("#toast-message") || toast;
        toast.classList.remove("toast-success", "toast-error");
        toast.classList.add(type === "error" ? "toast-error" : "toast-success");
        text.textContent = message;
        toast.classList.add("show");

        clearTimeout(this._toastTimeout);
        this._toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3200);
    }

    // Clipboard Copy
    copyIp(ip = STORE_CONFIG.server?.ip || "northsmp.fun") {
        navigator.clipboard.writeText(ip).then(() => {
            const btn = document.querySelector(".btn-copy-ip");
            if (btn) {
                btn.classList.add("copied");
                setTimeout(() => btn.classList.remove("copied"), 2000);
            }
            this.showToast(`Server IP (${ip}) copied to clipboard!`, "success");
        }).catch(() => {
            this.showToast("Failed to copy IP to clipboard", "error");
        });
    }

    // Promotional Countdown Timer
    initPromoClock() {
        const update = () => {
            const now = new Date();
            const targetDateStr = STORE_CONFIG.sale?.endDate || new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString();
            const target = new Date(targetDateStr);
            let diff = target - now;
            if (diff <= 0) {
                diff = 0;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            const pad = n => (n < 10 ? "0" + n : n);

            const daysEl = document.querySelector(".countdown-days");
            const hoursEl = document.querySelector(".countdown-hours");
            const minsEl = document.querySelector(".countdown-mins");
            const secsEl = document.querySelector(".countdown-secs");

            if (daysEl) daysEl.textContent = pad(days);
            if (hoursEl) hoursEl.textContent = pad(hours);
            if (minsEl) minsEl.textContent = pad(mins);
            if (secsEl) secsEl.textContent = pad(secs);
        };

        update();
        setInterval(update, 1000);
    }

    // Modal Handlers
    initModals() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closePackageModal();
                this.closeGiftModal();
            }
        });

        const pkgModal = document.getElementById("legendPackageModal");
        if (pkgModal) {
            pkgModal.addEventListener("click", (e) => {
                if (e.target === pkgModal) this.closePackageModal();
            });
        }

        const giftModal = document.getElementById("giftModal");
        if (giftModal) {
            giftModal.addEventListener("click", (e) => {
                if (e.target === giftModal) this.closeGiftModal();
            });

            // Live Gift Avatar Preview
            const giftInput = giftModal.querySelector("input[name='username']");
            if (giftInput) {
                giftInput.addEventListener("input", (e) => {
                    this.handleGiftUsernameInput(e.target.value);
                });
            }
        }

        // Accordion FAQ Items
        document.querySelectorAll(".faq-question").forEach(q => {
            q.addEventListener("click", () => {
                const item = q.closest(".faq-item");
                const wasActive = item.classList.contains("active");
                document.querySelectorAll(".faq-item").forEach(other => other.classList.remove("active"));
                if (!wasActive) {
                    item.classList.add("active");
                }
            });
        });
    }

    handleGiftUsernameInput(val) {
        clearTimeout(this._giftDebounce);
        const previewBox = document.getElementById("giftRecipientPreview");
        const avatarImg = document.getElementById("giftRecipientAvatar");
        const nameLabel = document.getElementById("giftRecipientName");
        if (!previewBox || !avatarImg || !nameLabel) return;

        const clean = val.trim();
        if (!clean) {
            previewBox.style.display = "none";
            return;
        }

        previewBox.style.display = "flex";
        nameLabel.textContent = clean;
        this._giftDebounce = setTimeout(() => {
            const lookup = clean.startsWith(".") ? clean.substring(1) : clean;
            avatarImg.src = `https://mc-heads.net/avatar/${encodeURIComponent(lookup)}/64`;
        }, 250);
    }

    openPackageModal(btn) {
        const d = btn.dataset;
        this._lastActivePackage = d;

        const modal = document.getElementById("legendPackageModal");
        if (!modal) return;

        const titleEl = document.getElementById("legendPackageModalTitle");
        const descEl = document.getElementById("legendPackageModalDescription");
        const pricingEl = document.getElementById("legendPackageModalPricing");
        const actionsEl = document.getElementById("legendPackageModalActions");

        if (titleEl) titleEl.textContent = d.pkgName || "Package";

        const tmpl = document.querySelector(`template.pkg-description-tmpl[data-pkg-id="${d.pkgId}"]`);
        if (descEl) {
            descEl.innerHTML = tmpl ? tmpl.innerHTML : "<p>No description provided.</p>";
        }

        if (pricingEl) {
            let priceHtml = "";
            if (d.pkgOriginalPrice) {
                priceHtml += `<span class="package-original-price" data-base-price="${d.pkgOriginalPrice}">${this.formatPrice(parseFloat(d.pkgOriginalPrice))}</span> `;
            }
            priceHtml += `<span class="package-price" data-base-price="${d.pkgPrice}">${this.formatPrice(parseFloat(d.pkgPrice))}</span>`;
            pricingEl.innerHTML = priceHtml;
        }

        if (actionsEl) {
            actionsEl.innerHTML = `
                <button type="button" class="legend-package-modal-action-btn legend-package-modal-btn-gift" title="Gift to a friend" onclick="window.store.openGiftModalFromActive()">
                    <i class="fa-solid fa-gift"></i>
                </button>
                <button type="button" class="legend-package-modal-action-btn legend-package-modal-btn-cart" title="Add to Cart" onclick="window.store.addActiveToCart()">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
            `;
        }

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    closePackageModal() {
        const modal = document.getElementById("legendPackageModal");
        if (modal) {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
        }
        const giftModal = document.getElementById("giftModal");
        if (!giftModal || !giftModal.classList.contains("show")) {
            document.body.style.overflow = "";
        }
    }

    addActiveToCart() {
        if (!this._lastActivePackage) return;
        const d = this._lastActivePackage;
        this.addToCart({
            id: d.pkgId,
            name: d.pkgName,
            price: d.pkgPrice,
            originalPrice: d.pkgOriginalPrice,
            image: d.pkgImage,
            category: d.pkgCategory
        });
        this.closePackageModal();
    }

    openGiftModalFromActive() {
        if (!this._lastActivePackage) return;
        this.closePackageModal();
        setTimeout(() => {
            this.openGiftModal(this._lastActivePackage);
        }, 200);
    }

    openGiftModal(pkgData) {
        this._giftingPackage = pkgData;
        const modal = document.getElementById("giftModal");
        if (!modal) return;
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
        const input = modal.querySelector("input[name='username']");
        if (input) {
            input.value = "";
            setTimeout(() => input.focus(), 80);
        }
    }

    closeGiftModal() {
        const modal = document.getElementById("giftModal");
        if (modal) {
            modal.classList.remove("show");
        }
        document.body.style.overflow = "";
    }

    submitGift() {
        const modal = document.getElementById("giftModal");
        if (!modal || !this._giftingPackage) return;
        const input = modal.querySelector("input[name='username']");
        const recipient = input ? input.value.trim() : "";
        if (!recipient) {
            this.showToast("Please enter a Minecraft username to gift to.", "error");
            return;
        }

        const d = this._giftingPackage;
        this.addToCart({
            id: d.pkgId,
            name: `${d.pkgName} (Gift to ${recipient})`,
            price: d.pkgPrice,
            originalPrice: d.pkgOriginalPrice,
            image: d.pkgImage,
            category: d.pkgCategory,
            giftTo: recipient
        });

        this.closeGiftModal();
        this.showToast(`Gift added to cart for ${recipient}!`, "success");
    }

    setupEventListeners() {
        document.addEventListener("click", (e) => {
            const addBtn = e.target.closest(".quick-add-btn");
            if (addBtn) {
                e.preventDefault();
                const d = addBtn.dataset;
                this.addToCart({
                    id: d.pkgId,
                    name: d.pkgName,
                    price: d.pkgPrice,
                    originalPrice: d.pkgOriginalPrice,
                    image: d.pkgImage,
                    category: d.pkgCategory
                });
            }
        });
    }
}

// Global functions accessible in templates
window.copyToClipboard = (text) => window.store.copyIp(text);
window.openLegendPackageModal = (btn) => window.store.openPackageModal(btn);
window.closeLegendPackageModal = () => window.store.closePackageModal();
window.openGiftModal = (pkgId) => window.store.openGiftModal({ pkgId: pkgId, pkgName: "Item" });
window.closeGiftModal = () => window.store.closeGiftModal();

document.addEventListener("DOMContentLoaded", () => {
    window.store = new StoreEngine();
});
