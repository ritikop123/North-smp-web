# NorthSMP In-Game Command Execution Matrix

This reference documents the exact server console commands to configure in your store plugin (Tebex, CraftingStore, or Buycraft) when players purchase items on the webstore.

---

## 👑 Server Ranks (LuckPerms & GriefPrevention)

### 1. Lime Rank ($6.99)
```text
lp user {username} parent add lime
acb {username} 2500
broadcast &f[&bNorth&3SMP&f] &a{username} &7has unlocked &a[Lime Rank]&7!
```

### 2. Mango Rank ($11.99)
```text
lp user {username} parent add mango
acb {username} 6000
broadcast &f[&bNorth&3SMP&f] &e{username} &7has unlocked &6[Mango Rank]&7!
```

### 3. Coconut Rank ($15.99)
```text
lp user {username} parent add coconut
acb {username} 12000
broadcast &f[&bNorth&3SMP&f] &b{username} &7has unlocked &3[Coconut Rank]&7!
```

### 4. Cherry Rank ($22.99)
```text
lp user {username} parent add cherry
acb {username} 22000
crate give {username} rare 2
broadcast &f[&bNorth&3SMP&f] &d{username} &7has unlocked &c[Cherry Rank]&7!
```

### 5. Berry Rank [Top Tier] ($32.99)
```text
lp user {username} parent add berry
acb {username} 40000
crate give {username} mythic 5
broadcast &f[&bNorth&3SMP&f] &5{username} &7has unlocked the ultimate &d&l[Berry Rank]&7!
```

---

## 🔑 Crate Keys (ExcellentCrates / GoldenCrates / CrazyCrates)

> Replace `crate give` with your server crate plugin syntax if different (e.g., `cc give physical <crate> <amount> {username}`).

### 1. Keyall Crate Key ($2.00)
```text
crate giveall keyall 1
crate give {username} keyall 2
broadcast &f[&bNorth&3SMP&f] &a{username} &7has sponsored a &e&lSERVER-WIDE KEYALL PARTY&7! Everyone received 1x Keyall Key!
```

### 2. Palm Crate Key ($3.00)
```text
crate give {username} palm 1
acb {username} 3000
eco give {username} 25000
```

### 3. Shell Crate Key ($4.00)
```text
crate give {username} shell 1
acb {username} 8000
eco give {username} 50000
```

### 4. Coral Crate Key ($5.00)
```text
crate give {username} coral 1
acb {username} 12000
eco give {username} 75000
```

### 5. Tropical Crate Key [Top Tier] ($6.00)
```text
crate give {username} tropical 1
acb {username} 20000
eco give {username} 100000
broadcast &f[&bNorth&3SMP&f] &b{username} &7has acquired a &d[Tropical Crate Key]&7!
```
