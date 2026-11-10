import { CurrencyCode, CurrencyConfig, Package } from '../types/store';

export const SERVER_CONFIG = {
    name: 'NorthSMP',
    ip: 'northsmp.fun',
    bedrockPort: 19036,
    discordUrl: 'https://discord.gg/jfDn6n74Gr',
    storeSubtitle: 'Welcome to North SMP Store!',
    goalTarget: 500,
    goalCurrent: 0,
};

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
    USD: { symbol: '$', rate: 1.0, position: 'before' },
    EUR: { symbol: '€', rate: 0.92, position: 'before' },
    GBP: { symbol: '£', rate: 0.79, position: 'before' },
    CAD: { symbol: 'C$', rate: 1.36, position: 'before' },
    INR: { symbol: '₹', rate: 83.5, position: 'before' },
    AUD: { symbol: 'A$', rate: 1.52, position: 'before' }
};

export const COUPONS: Record<string, number> = {
    'NORTH25': 25,
    'WELCOME': 10
};

export const RANKS_DATA: Package[] = [
    {
        id: 'rank-lime',
        name: 'Lime [Permanent]',
        price: 6.99,
        originalPrice: 8.99,
        image: '/assets/images/lime.png',
        category: 'Ranks',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🍋 LIME RANK PERKS &amp; PRIVILEGES:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li><span style="color:#A3E635; font-weight:bold;">[Lime]</span> Chat Prefix &amp; Glowing Tablist Color</li>
                    <li><strong>/craft</strong> - Portable crafting table</li>
                    <li><strong>/hat</strong> - Wear any block on your head</li>
                    <li><strong>/near</strong> - Scan for nearby players</li>
                    <li><strong>3x Homes</strong> (/sethome)</li>
                    <li><strong>1x Private Player Vault</strong> (/pv 1)</li>
                    <li><strong>+2,500 Claim Blocks</strong></li>
                    <li>Priority Server Queue</li>
                    <li><strong>Weekly Kit Lime</strong> (Iron Gear &amp; Supplies)</li>
                </ul>
            </div>
        `
    },
    {
        id: 'rank-mango',
        name: 'Mango [Permanent]',
        price: 11.99,
        originalPrice: 15.99,
        image: '/assets/images/mango.png',
        category: 'Ranks',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🥭 MANGO RANK PERKS &amp; PRIVILEGES:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Includes all <strong>Lime</strong> perks</li>
                    <li><span style="color:#F59E0B; font-weight:bold;">[Mango]</span> Sunset Orange-Gold Prefix &amp; Title</li>
                    <li><strong>/feed</strong> - Replenish hunger bar (15m cooldown)</li>
                    <li><strong>/anvil</strong> - Portable anvil access</li>
                    <li><strong>/enderchest</strong> (/ec) - Portable Ender Chest</li>
                    <li><strong>6x Homes</strong> (/sethome)</li>
                    <li><strong>2x Private Player Vaults</strong> (/pv 1-2)</li>
                    <li><strong>+6,000 Claim Blocks</strong></li>
                    <li><strong>Weekly Kit Mango</strong> (Diamond Gear Protection III)</li>
                </ul>
            </div>
        `
    },
    {
        id: 'rank-coconut',
        name: 'Coconut [Permanent]',
        price: 15.99,
        originalPrice: 21.99,
        image: '/assets/images/coconut.png',
        category: 'Ranks',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🥥 COCONUT RANK PERKS &amp; PRIVILEGES:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Includes all <strong>Mango</strong> perks</li>
                    <li><span style="color:#06B6D4; font-weight:bold;">[Coconut]</span> Tropical Aqua-White Prefix &amp; Title</li>
                    <li><strong>/heal</strong> - Restore full health &amp; hunger (10m cooldown)</li>
                    <li><strong>/grindstone</strong> - Portable enchantment removal</li>
                    <li><strong>/fly</strong> in your claimed lands!</li>
                    <li><strong>10x Homes</strong> (/sethome)</li>
                    <li><strong>4x Private Player Vaults</strong> (/pv 1-4)</li>
                    <li><strong>+12,000 Claim Blocks</strong></li>
                    <li><strong>Weekly Kit Coconut</strong> (Protection IV Diamond Gear &amp; Tools)</li>
                </ul>
            </div>
        `
    },
    {
        id: 'rank-cherry',
        name: 'Cherry [Permanent]',
        price: 22.99,
        originalPrice: 29.99,
        image: '/assets/images/cherry.png',
        category: 'Ranks',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🍒 CHERRY RANK PERKS &amp; PRIVILEGES:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Includes all <strong>Coconut</strong> perks</li>
                    <li><span style="color:#EC4899; font-weight:bold;">[Cherry]</span> Blossom Crimson-Pink Glowing Prefix</li>
                    <li><strong>/repair</strong> - Repair item in hand (without exp)</li>
                    <li><strong>/condense</strong> - Automatically compress ingots to blocks</li>
                    <li><strong>/speed</strong> - Toggle increased walking speed</li>
                    <li><strong>16x Homes</strong> (/sethome)</li>
                    <li><strong>7x Private Player Vaults</strong> (/pv 1-7)</li>
                    <li><strong>+22,000 Claim Blocks</strong></li>
                    <li><strong>2x Rare Crate Keys</strong> included on purchase!</li>
                    <li><strong>Weekly Kit Cherry</strong> (Full Netherite Gear with Sharpness V)</li>
                </ul>
            </div>
        `
    },
    {
        id: 'rank-berry',
        name: 'Berry [Permanent]',
        price: 32.99,
        originalPrice: 43.99,
        image: '/assets/images/berry.png',
        category: 'Ranks',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🫐 BERRY ULTIMATE TIER PERKS:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Includes all <strong>Cherry</strong> perks</li>
                    <li><strong>UNLIMITED Server Access</strong> (bypass all full queues)</li>
                    <li><span style="color:#A855F7; font-weight:bold;">[Berry]</span> Animated Royal Indigo-Purple Crown Prefix</li>
                    <li><strong>/fly</strong> - Infinite Survival Flight Everywhere!</li>
                    <li><strong>/god</strong> - Toggleable invulnerability mode</li>
                    <li><strong>/repair all</strong> - Repair entire inventory instantly</li>
                    <li><strong>/back</strong> - Return to previous location upon death</li>
                    <li><strong>25x Homes</strong> (/sethome)</li>
                    <li><strong>10x Private Player Vaults</strong> (/pv 1-10)</li>
                    <li><strong>+40,000 Claim Blocks</strong></li>
                    <li><strong>5x Mythic Crate Keys</strong> included on purchase!</li>
                    <li>Direct private Discord channel with Server Leadership</li>
                    <li><strong>Weekly Kit Berry</strong> (Maxed God Netherite Armor, Tools &amp; Notch Apples)</li>
                </ul>
            </div>
        `
    }
];

export const CRATES_DATA: Package[] = [
    {
        id: 'key-keyall',
        name: 'Keyall Crate Key',
        price: 2.00,
        originalPrice: 2.99,
        image: '/assets/images/keyallkey.png',
        category: 'Crates',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🎉 KEYALL PARTY KEY:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Triggers an instant <strong>Server-Wide Keyall Party</strong>!</li>
                    <li>Gives a random crate key to <strong>EVERY online player</strong></li>
                    <li>Your name broadcasted in chat as the party sponsor</li>
                    <li>Receive <strong>2x Bonus Keys</strong> for yourself!</li>
                </ul>
            </div>
        `
    },
    {
        id: 'key-palm',
        name: 'Palm Crate Key',
        price: 3.00,
        originalPrice: 4.49,
        image: '/assets/images/palmkey.png',
        category: 'Crates',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🌴 PALM CRATE KEY REWARDS:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Palm Wood bundles, Coconuts &amp; Tropical saplings</li>
                    <li>Enchanted Golden Apples &amp; Survival Boosters</li>
                    <li>Diamond Tools (Efficiency V &amp; Fortune III)</li>
                    <li><strong>+3,000 Bonus Claim Blocks</strong> &amp; $25,000 In-Game Cash</li>
                </ul>
            </div>
        `
    },
    {
        id: 'key-shell',
        name: 'Shell Crate Key',
        price: 4.00,
        originalPrice: 5.49,
        image: '/assets/images/shellkey.png',
        category: 'Crates',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🐚 SHELL CRATE KEY REWARDS:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Nautilus Shells (8x) &amp; Heart of the Sea (Conduit Power)</li>
                    <li>Mending &amp; Unbreaking III Enchantment Books</li>
                    <li>Netherite Ingots &amp; Upgrade Smithing Templates</li>
                    <li><strong>+8,000 Claim Blocks</strong> &amp; $50,000 In-Game Cash</li>
                </ul>
            </div>
        `
    },
    {
        id: 'key-coral',
        name: 'Coral Crate Key',
        price: 5.00,
        originalPrice: 6.99,
        image: '/assets/images/coralkey.png',
        category: 'Crates',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🪸 CORAL CRATE KEY REWARDS:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>High-Tier Netherite Gear (Protection IV &amp; Sharpness V)</li>
                    <li>Elytra with Unbreaking III &amp; Mending</li>
                    <li>Shulker Boxes loaded with building supplies</li>
                    <li><strong>+12,000 Claim Blocks</strong> &amp; $75,000 In-Game Cash</li>
                </ul>
            </div>
        `
    },
    {
        id: 'key-tropical',
        name: 'Tropical Crate Key',
        price: 6.00,
        originalPrice: 8.49,
        image: '/assets/images/tropicalkey.png',
        category: 'Crates',
        perksHtml: `
            <div class="pkg-perks-container">
                <h4><strong>🌺 TROPICAL CRATE KEY [TOP TIER]:</strong></h4>
                <ul style="line-height: 1.8; margin-top: 8px;">
                    <li>Loyalty III &amp; Riptide III Enchanted Tridents</li>
                    <li>God Netherite Armor Set &amp; Enchanted Golden Apples</li>
                    <li>Depth Strider III Netherite Boots</li>
                    <li><strong>+20,000 Claim Blocks</strong> &amp; $100,000 In-Game Cash</li>
                    <li>Server-wide celebration announcement in chat!</li>
                </ul>
            </div>
        `
    }
];
