/**
 * NorthSMP Webstore Central Configuration
 * Edit server details, links, sale dates, packages, and Tebex keys here.
 */
const NORTH_CONFIG = {
    server: {
        name: "NorthSMP",
        ip: "northsmp.fun",
        bedrockIp: "northsmp.fun",
        bedrockPort: "19036",
        bedrockPrefix: ".", // GeyserMC Bedrock prefix
        discordUrl: "https://discord.gg/jfDn6n74Gr",
        websiteUrl: "https://northsmp.net"
    },
    sale: {
        enabled: true,
        discountPercent: 25,
        tag: "25%",
        name: "SUMMER LAUNCH SALE",
        // Rolling 7 days promo or set a specific ISO date:
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        couponCodes: {
            "NORTH25": 25,
            "SUMMER25": 25,
            "WELCOME": 10,
            "NORTH10": 10
        }
    },
    ranks: [
        { id: "rank-lime", name: "Lime [Permanent]", price: 6.99, image: "assets/images/lime.png" },
        { id: "rank-mango", name: "Mango [Permanent]", price: 11.99, image: "assets/images/mango.png" },
        { id: "rank-coconut", name: "Coconut [Permanent]", price: 15.99, image: "assets/images/coconut.png" },
        { id: "rank-cherry", name: "Cherry [Permanent]", price: 22.99, image: "assets/images/cherry.png" },
        { id: "rank-berry", name: "Berry [Permanent]", price: 32.99, image: "assets/images/berry.png" }
    ],
    crates: [
        { id: "key-keyall", name: "Keyall Crate Key", price: 2.00, image: "assets/images/keyallkey.png" },
        { id: "key-palm", name: "Palm Crate Key", price: 3.00, image: "assets/images/palmkey.png" },
        { id: "key-shell", name: "Shell Crate Key", price: 4.00, image: "assets/images/shellkey.png" },
        { id: "key-coral", name: "Coral Crate Key", price: 5.00, image: "assets/images/coralkey.png" },
        { id: "key-tropical", name: "Tropical Crate Key", price: 6.00, image: "assets/images/tropicalkey.png" }
    ],
    goal: {
        title: "Community Goal - Dedicated High-RAM Node",
        currentAmount: 320,
        targetAmount: 500,
        percentage: 64
    },
    tebex: {
        enabled: false, // Set to true when you input your Tebex Webstore Ident
        ident: ""       // Insert your Tebex public ident here
    },
    recentPayments: [
        { player: "FrostByte", package: "North King [Permanent]", time: "5 mins ago", avatar: "https://mc-heads.net/avatar/FrostByte/32" },
        { player: "ArcticFox", package: "Mythic Key 5x", time: "19 mins ago", avatar: "https://mc-heads.net/avatar/ArcticFox/32" },
        { player: "VortexMC", package: "10,000 Network Points", time: "42 mins ago", avatar: "https://mc-heads.net/avatar/VortexMC/32" },
        { player: "ShadowBlade", package: "Viking [Permanent]", time: "1 hour ago", avatar: "https://mc-heads.net/avatar/ShadowBlade/32" },
        { player: "LunaCraft", package: "Monthly Crate Key 10x", time: "2 hours ago", avatar: "https://mc-heads.net/avatar/LunaCraft/32" }
    ],
    topCustomer: {
        player: "NorthEmperor",
        total: "$124.50",
        avatar: "https://mc-heads.net/avatar/NorthEmperor/64"
    }
};

window.NORTH_CONFIG = NORTH_CONFIG;

