import glob

files = glob.glob("*.html")
for filename in files:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Update favicon
    old_favicon = '<link rel="icon" type="image/svg+xml" href="assets/images/logo.svg">'
    new_favicon = '<link rel="icon" type="image/png" href="assets/images/northsmp.png">'
    content = content.replace(old_favicon, new_favicon)

    # Update logo image
    old_logo_with_style = '<img src="assets/images/logo.svg" alt="NorthSMP" class="store-logo is-pulsing" style="max-height: 90px; width: auto;">'
    new_logo = '<img src="assets/images/northsmp.png" alt="NorthSMP" class="store-logo is-pulsing">'
    content = content.replace(old_logo_with_style, new_logo)

    # In case there's any other logo.svg reference in header
    old_logo_plain = '<img src="assets/images/logo.svg" alt="NorthSMP" class="store-logo is-pulsing">'
    content = content.replace(old_logo_plain, new_logo)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Updated {filename}")

