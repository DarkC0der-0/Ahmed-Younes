# Tisso Vision Gift Guide

A production-ready Shopify Online Store 2.0 experience built for the EcomExperts Frontend Hiring Assessment.

The project recreates the supplied Figma design across desktop and mobile, while integrating directly with Shopify products, variants, inventory, and the AJAX Cart API.

The implementation was built from scratch using Shopify Liquid, CSS, and Vanilla JavaScript without jQuery or third-party UI libraries.

---

## Project Overview

The Gift Guide is an interactive Shopify storefront experience that allows customers to:

- Browse a curated product grid
- Open product quick-view modals
- Select product colors and sizes
- Resolve the correct Shopify variant dynamically
- Detect unavailable and sold-out variants
- Add products to the Shopify cart
- Receive clear loading, success, and error feedback
- Automatically receive a bonus product when the required conditions are met

The Gift Guide is configured as the Shopify homepage, allowing reviewers to access the complete experience directly from the theme preview URL.

---

## Key Features

### Responsive Hero Experience

- Dedicated desktop and mobile layouts
- Desktop artwork assembled from separate Figma exports
- Dedicated mobile hero artwork exported directly from Figma
- Responsive typography and spacing
- Animated CTA buttons
- Mobile navigation header
- Pixel-focused implementation based on the supplied Figma prototype

### Dynamic Product Grid

- Products loaded directly from Shopify
- Shopify handles mapped to the required products
- Responsive three-column desktop layout
- Responsive two-column tablet and mobile layout
- Product-specific hotspot positioning
- Image hover interactions
- Optimized Shopify product images

### Product Quick-View Modal

Each product modal contains:

- Shopify product image
- Product title
- Product description
- Product price
- Animated color selector
- Custom size dropdown
- Scrollable size options
- Variant-specific image and price updates
- Availability and inventory states
- Add-to-cart feedback
- Accessible close controls

### Shopify Variant Management

The implementation dynamically matches the selected options against Shopify variant data.

Supported behaviors include:

- Color selection
- Size selection
- Variant ID resolution
- Variant image updates
- Variant price updates
- Available variant handling
- Sold-out variant handling
- Invalid combination handling
- Disabled Add to Cart until the required options are selected

### Shopify AJAX Cart Integration

Products are added through Shopify's native AJAX Cart API.

Implemented cart behavior:

- Real Shopify variant IDs
- AJAX cart requests
- Add-to-cart loading state
- Successful addition state
- Error state
- Double-click prevention
- Cart quantity updates
- Cart badge updates

### Conditional Bonus Product

When a customer selects:

```text
Color: Black
Size: Medium
```

the selected product and the configured **Soft Winter Jacket** bonus product are added together in a single Shopify cart request.

The bonus product is configurable through the Shopify Theme Editor.

---

## Technology Stack

- Shopify Online Store 2.0
- Shopify Liquid
- HTML5
- CSS3
- Vanilla JavaScript ES6+
- Shopify AJAX Cart API
- Shopify Product and Variant Objects
- Shopify Theme CLI
- Dawn Theme foundation

No jQuery or frontend component library is used.

---

## Project Structure

```text
.
├── assets
│   ├── gift-guide.css
│   ├── gift-guide.js
│   ├── gift-guide-hero-top.png
│   ├── gift-guide-hero-bottom-right.png
│   ├── gift-guide-hero-top-M.png
│   └── logo.png
│
├── sections
│   ├── gift-guide-hero.liquid
│   └── gift-guide-products.liquid
│
├── templates
│   ├── index.json
│   └── page.gift-guide.json
│
├── layout
│   └── theme.liquid
│
├── config
│   ├── settings_data.json
│   └── settings_schema.json
│
├── locales
├── snippets
├── README.md
└── .gitignore
```

---

## File Responsibilities

### `sections/gift-guide-hero.liquid`

Responsible for:

- Custom Gift Guide header
- Desktop hero layout
- Mobile hero layout
- Desktop artwork
- Mobile-specific artwork
- Hero title and description
- Shop Now CTA
- Sustainability statement

The desktop and mobile layouts are rendered independently to prevent breakpoint conflicts and artwork overlap.

### `sections/gift-guide-products.liquid`

Responsible for:

- Shopify product retrieval
- Product grid rendering
- Product hotspot positioning
- Product modal markup
- Color options
- Size dropdown markup
- Product variant JSON
- Bonus-product configuration
- Add-to-cart form structure

### `assets/gift-guide.css`

Contains all Gift Guide styles, including:

- Desktop and mobile hero styles
- Product grid
- Product hotspots
- Product modal
- Animated color selector
- Animated size dropdown
- CTA hover effects
- Add-to-cart loading, success, and error states
- Responsive breakpoints
- Accessibility focus states
- Reduced-motion support

### `assets/gift-guide.js`

Handles all interactive functionality:

- Modal opening and closing
- Backdrop closing
- Escape-key closing
- Color selection animation
- Size dropdown interactions
- Variant matching
- Variant image updates
- Variant price updates
- Availability detection
- Sold-out detection
- Shopify cart requests
- Bonus-product logic
- Cart count updates
- Loading, success, and error states

### `templates/index.json`

Configures the Gift Guide as the Shopify homepage.

The homepage contains:

1. Gift Guide Hero
2. Gift Guide Products

This ensures the reviewer sees the completed challenge immediately when opening the theme preview.

### `templates/page.gift-guide.json`

Provides an additional standalone Gift Guide page template.

This template can be assigned to a Shopify page when the Gift Guide needs to be used as an internal landing page instead of the homepage.

---

## Product Data

Products are not hardcoded as static HTML.

The implementation retrieves real Shopify product data through Liquid:

```liquid
{% assign product = all_products[product_handle] %}
```

The following values come directly from Shopify:

- Product title
- Product description
- Product image
- Product price
- Variant IDs
- Variant option values
- Variant availability
- Variant inventory status

Product data originally supplied through CSV must be imported into the Shopify store before running the theme.

---

## Required Shopify Products

The implementation expects products with the configured Shopify handles used inside the products section.

Example handles include:

```text
black-leather-bag
blue-silk-tuxedo
chequered-red-shirt
classic-leather-jacket
classic-varsity-top
dark-denim-top
```

If the handles differ after CSV import, update the product handle list inside:

```text
sections/gift-guide-products.liquid
```

---

## Bonus Product Configuration

The bonus product is selected through the Shopify Theme Editor.

Navigate to:

```text
Online Store
→ Themes
→ Customize
→ Home page
→ Gift Guide Products
→ Black + Medium bonus product
```

Select:

```text
Soft Winter Jacket
```

Then save the theme settings.

The bonus product must have at least one available variant.

---

## Local Development

### Prerequisites

- Shopify Partner or development store
- Shopify CLI
- Node.js 20 or newer
- Access to the target Shopify store

### Install Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

### Authenticate

```bash
shopify auth login
```

### Start Development

From the theme root directory:

```bash
shopify theme dev --store your-store.myshopify.com
```

The Gift Guide is configured as the homepage, so open:

```text
http://127.0.0.1:9292
```

The standalone Gift Guide page is also available through:

```text
http://127.0.0.1:9292/pages/gift-guide?view=gift-guide
```

---

## Theme Validation

Run Shopify Theme Check before deployment:

```bash
shopify theme check
```

The final theme should contain:

- No Liquid syntax errors
- No missing assets
- No missing image dimensions
- No invalid schema definitions
- No JavaScript console errors
- No failed AJAX cart requests

---

## Deployment

### Upload as an Unpublished Theme

```bash
shopify theme push \
  --unpublished \
  --strict \
  --store your-store.myshopify.com
```

Recommended theme name:

```text
EcomExperts Gift Guide Final
```

After upload:

1. Open the generated preview URL
2. Test the homepage
3. Test desktop and mobile layouts
4. Test variants
5. Test Add to Cart
6. Test the bonus product
7. Test sold-out states
8. Confirm there are no console or network errors

### Publish the Theme

Only publish after completing the final QA:

```bash
shopify theme publish \
  --store your-store.myshopify.com
```

Publishing is not required when an unpublished preview link is sufficient for assessment.

---

## Testing Checklist

### Visual Testing

Test these viewport sizes:

```text
1440 × 900
1280 × 800
768 × 1024
430 × 932
390 × 844
375 × 812
```

Verify:

- Hero alignment
- Typography
- Artwork scaling
- CTA positioning
- Product grid layout
- Modal dimensions
- Dropdown behavior
- No horizontal overflow

### Functional Testing

Verify:

- Product hotspots open the correct modal
- Modal closes using the X button
- Modal closes using the backdrop
- Modal closes using the Escape key
- Color selection updates correctly
- Size selection updates correctly
- The correct Shopify variant is resolved
- Variant image updates correctly
- Variant price updates correctly
- Invalid combinations show `Unavailable`
- Inventory-zero variants show `Sold Out`
- Add to Cart sends the correct variant ID
- Cart quantity updates after addition
- Black + Medium adds the bonus product
- Add-to-cart success state is visible
- API failures display an error state

### Network Testing

Successful cart behavior should produce:

```text
POST /cart/add.js → 200
GET /cart.js → 200
```

---

## Accessibility

Accessibility considerations include:

- Semantic section structure
- Proper button elements
- Accessible modal labels
- Keyboard navigation
- Escape-key modal closing
- Visible focus states
- Screen-reader labels
- `aria-expanded` for dropdown controls
- `aria-selected` for size options
- Reduced-motion support
- Decorative images using empty alt text

---

## Performance Considerations

- Shopify-generated responsive product images
- Lazy loading for product images
- Eager loading for critical hero assets
- Explicit image width and height attributes
- Minimal external dependencies
- No frontend framework overhead
- Native JavaScript event delegation
- Reduced layout shift
- Optimized asset loading
- Mobile-specific hero image to avoid unnecessary desktop composition logic

---

## Browser Support

Tested for modern versions of:

- Google Chrome
- Safari
- Microsoft Edge
- Mozilla Firefox

---

## Responsive Breakpoints

```text
Desktop: 1200px and above
Laptop: 900px–1199px
Tablet: 750px–899px
Mobile: 749px and below
```

---

## Production Readiness

The project includes:

- Shopify-native data rendering
- Real variant handling
- Real inventory handling
- Functional AJAX cart integration
- Responsive desktop and mobile layouts
- Error handling
- Loading and success feedback
- Accessibility support
- Theme Editor configuration
- Theme Check compatibility
- Deployment-ready structure

---

## Potential Future Enhancements

Possible future improvements include:

- Shopify Cart Drawer integration
- Product recommendations
- Recently viewed products
- Wishlist functionality
- Predictive search
- Quick checkout
- Localization support
- Theme setting controls for hotspot coordinates
- Dynamic product blocks instead of a fixed product handle list
- Automated visual regression testing
- Playwright end-to-end testing

---

## Author

**Ahmed Younes**

Senior Software Engineer  
Full Stack Developer

---

## Assessment Context

This project was created as part of the EcomExperts Frontend Hiring Assessment.

The implementation demonstrates:

- Accurate Figma-to-Shopify translation
- Shopify Liquid architecture
- Responsive frontend engineering
- Dynamic product and variant handling
- Vanilla JavaScript proficiency
- Shopify AJAX Cart API integration
- Production-focused code organization

---

## License

This repository is intended for technical assessment, portfolio demonstration, and educational review.

Commercial redistribution of the supplied Figma assets or assessment materials may require permission from their respective owners.
