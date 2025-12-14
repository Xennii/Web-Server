# How to Add Images - Step by Step

## Easy Method (Recommended)

### 1. Find an Image
Search Google Images for the character/faction you want:
- Example: "Warhammer 40k Emperor" or "Roboute Guilliman"
- Right-click → Save image as

### 2. Save to Correct Folder
Save the image with the **exact filename** to the right folder:

```
Example for Emperor character:
- Filename: emperor.png
- Location: static/images/characters/emperor.png
- Size: Make it roughly 150x200 pixels
```

### 3. Refresh Browser
Go to http://localhost:5000 and refresh - the image appears instantly!

---

## Visual Example

### Before (No Image):
```
[Character Card]
[No Image]        | Name: The God-Emperor
                  | Faction: Imperium of Man
                  | Description: ...
```

### After (Image Added):
```
[Character Card]
[PORTRAIT IMAGE]  | Name: The God-Emperor
  150x200px       | Faction: Imperium of Man
                  | Description: ...
```

---

## File Structure When Done

```
Web-Server/
└── static/
    └── images/
        ├── characters/
        │   ├── emperor.png ✓ (added)
        │   ├── guilliman.png ✓ (added)
        │   ├── abaddon.png
        │   ├── corvus.png
        │   ├── eldrad.png
        │   ├── ghazghkull.png
        │   ├── szarekhan.png
        │   └── omnissiah.png
        ├── factions/
        │   ├── imperium.png ✓ (added)
        │   ├── chaos.png
        │   ├── aeldari.png
        │   ├── orks.png
        │   ├── necrons.png
        │   └── tau.png
        └── gallery/
            ├── emperor-throne.png
            ├── imperium.png
            └── golden-throne.png
```

---

## Tool to Resize Images

### Windows Built-in (Free):
1. Right-click image → Open with → Photos
2. Edit → Crop & rotate
3. Save as PNG

### Online (Free, No Download):
- https://www.pixlr.com (Pixlr Express)
- https://www.photopea.com (Photoshop alternative)
- https://tinypng.com (Quick compress)

### Recommended Dimensions:
- **Characters**: 150×200 pixels (portrait)
- **Factions**: 200×300 pixels (portrait)
- **Gallery**: 800×300 pixels (landscape)

---

## Quick Test - Use These Filenames

Start with just these 3 to test:

1. **emperor.png** (150×200px)
   - Save to: `static/images/characters/emperor.png`
   - Go to: http://localhost:5000/characters

2. **imperium.png** (200×300px)
   - Save to: `static/images/factions/imperium.png`
   - Go to: http://localhost:5000/factions

3. **emperor-throne.png** (800×300px)
   - Save to: `static/images/gallery/emperor-throne.png`
   - Go to: http://localhost:5000 (home page)

Once you refresh the page, all three images will appear automatically!

---

## The HTML Code (Already Written)

Your HTML is already set up to use these images. Example from characters page:

```html
<img src="/static/images/characters/emperor.png" alt="The God-Emperor">
```

The code looks in the correct folder automatically. You just add the image file and it displays!

---

## Troubleshooting

**Image doesn't show?**
- ✓ Check filename matches exactly (case-sensitive on some systems)
- ✓ Check file is in correct folder
- ✓ Hard refresh: Ctrl+Shift+R (clears browser cache)
- ✓ Make sure file has .png or .jpg extension

**Image looks stretched?**
- Use correct dimensions from the guide above
- Or the CSS will stretch/squish it automatically

---

## Python Flask Doesn't Need Any Changes

Your Flask app already serves images from `/static/` folder automatically. No code changes needed - just add image files!

```python
# This is already in your app.py - no changes needed:
from flask import Flask
app = Flask(__name__)
# Static files from /static/ folder work automatically!
```
