# Font Files

Place your font files in this directory (`public/fonts/`).

## Required Font Files

The application expects the following font files:

### Cinzel (Serif - Headings)
- `Cinzel-Regular.woff2` (or `.woff`, `.ttf`)
- `Cinzel-Bold.woff2` (or `.woff`, `.ttf`)

### Lato (Sans-serif - Body)
- `Lato-Regular.woff2` (or `.woff`, `.ttf`)
- `Lato-Light.woff2` (or `.woff`, `.ttf`)
- `Lato-Bold.woff2` (or `.woff`, `.ttf`)

## Font Loading

Fonts are automatically loaded from this directory via `@font-face` declarations in `src/index.css`.

The CSS will try to load fonts in this order:
1. `.woff2` (preferred - best compression)
2. `.woff` (fallback)
3. `.ttf` (fallback)

If font files are not found, the browser will fall back to Google Fonts (if available) or system fonts.

