# Custom Background Images

## How to Add Your Own Background

### Step 1: Prepare Your Image
- Find or create an image you want as background
- Recommended size: **1920x1080px** or larger (for desktop)
- Supported formats: **PNG, JPG, WebP**
- File size: Keep under **2-3 MB** for fast loading

### Step 2: Save to This Folder
Save your image as one of these filenames:
- `background.jpg` (or `.png` or `.webp`)

Location: `static/images/backgrounds/background.jpg`

### Step 3: Refresh Browser
- Go to http://localhost:5000
- Hard refresh: **Ctrl+Shift+R**
- Your background image will appear!

---

## Customization Options

### Change Background Opacity
Edit `static/style.css` and find the `body` section. Look for:

```css
background-attachment: fixed;
```

You can adjust the transparency by modifying the overlay effects. The current setup has:
- Radial gradients (depth layers)
- Tech grid pattern overlay

These will appear on top of your background image, creating a layered effect.

### Remove Overlays (Optional)
If you want just your image without the tech patterns:

1. In `style.css`, find `body::after` section
2. Change `opacity: 0.3;` to `opacity: 0;`

This will hide the grid/tech pattern overlay while keeping your background image visible.

---

## Recommended Background Types

### For Warhammer 40K Theme
- Space/starfield backgrounds (stars, nebulas)
- Grimdark industrial scenes
- Sci-fi architectural elements
- Battle scenes or war zones
- Ancient ruins or gothic structures

### Best Practices
- Choose dark backgrounds (since text is light colored)
- Avoid overly busy patterns (affects readability)
- High contrast helps text legibility
- Consider using darker images with the tech overlay for professional look

---

## Multiple Backgrounds (Advanced)

You can also add backgrounds for specific pages:

- `background-home.jpg` - Home page only
- `background-factions.jpg` - Factions page only
- `background-lore.jpg` - Lore/History page only
- `background-characters.jpg` - Characters page only

(These require CSS updates to enable)

---

## Current Setup

**Default**: Currently using CSS gradients + tech pattern overlay

**With Your Image**: The tech patterns will layer over your image, creating a professional grimdark aesthetic

The image will be **fixed** (doesn't scroll with content) for better parallax effect.
