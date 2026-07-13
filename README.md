# Tisso Vision – Gift Guide Landing Page

A fully responsive Shopify Online Store 2.0 section built for the **EcomExperts Hiring Test**.

The project recreates the provided Figma design while integrating with Shopify's product, variant, inventory, and cart systems instead of using static mock data.

---

## Preview

### Desktop

- Responsive Gift Guide landing page
- Interactive product grid
- Product quick view modal
- Variant selection
- Real Shopify Add to Cart

### Mobile

- Dedicated mobile hero layout
- Mobile-specific hero artwork
- Responsive product grid
- Touch-friendly interactions
- Optimized modal experience

---

# Features

## Hero Section

- Pixel-perfect recreation of the supplied Figma design
- Desktop and mobile layouts
- Mobile-specific hero artwork
- Responsive typography
- CTA button with hover animation

---

## Product Grid

- Dynamic Shopify products
- Configurable product hotspots
- Responsive masonry layout
- Hover interactions
- Image optimization

---

## Product Modal

- Product image
- Product title
- Product description
- Product pricing
- Color selector
- Size selector
- Variant availability
- Sold Out handling
- Add to Cart

---

## Shopify Integration

The implementation uses Shopify's native objects instead of hardcoded content.

### Products

- Shopify Products
- Shopify Variants
- Shopify Inventory
- Shopify Images
- Shopify Collections

### Cart

- AJAX Cart API
- Real cart updates
- Cart badge updates
- Loading states
- Success states
- Error handling

### Variant Logic

- Dynamic variant lookup
- Variant availability
- Inventory validation
- Sold Out state
- Disabled unavailable options

---

# Accessibility

- Semantic HTML
- Keyboard navigation
- Focus states
- Accessible buttons
- Accessible forms
- Proper labels
- Screen reader friendly

---

# Performance

- Responsive images
- Lazy loading where appropriate
- Optimized assets
- Minimal JavaScript
- CSS optimized for production
- Native Shopify rendering

---

# Technologies

- Shopify Online Store 2.0
- Liquid
- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Shopify AJAX Cart API

---

# Folder Structure

```
assets/
│
├── gift-guide.css
├── gift-guide.js
├── gift-guide-hero-top.png
├── gift-guide-hero-bottom-right.png
├── gift-guide-hero-top-M.png
└── logo.png

sections/
│
└── gift-guide-hero.liquid
```

---

# Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

3. Login

```bash
shopify login
```

4. Start development

```bash
shopify theme dev
```

---

# Requirements

- Shopify Online Store 2.0
- Dawn Theme
- Shopify CLI
- Node.js 20+

---

# Browser Support

- Chrome
- Edge
- Firefox
- Safari

---

# Responsive Support

- Mobile
- Tablet
- Laptop
- Desktop

---

# Implemented Functionality

- Responsive layout
- Dynamic products
- Product modal
- Variant picker
- Color selection
- Size selection
- Inventory awareness
- Sold Out support
- AJAX Add to Cart
- Cart badge updates
- Loading state
- Success state
- Error state

---

# Design Notes

The implementation follows the provided Figma design while leveraging Shopify's native architecture and best practices.

Where appropriate, Shopify-native functionality replaces static prototype behavior to create a production-ready implementation.

---

# Development Notes

This project intentionally avoids third-party UI libraries.

Everything was implemented using:

- Native Liquid
- Native CSS
- Native JavaScript
- Shopify APIs

to maximize performance and maintainability.

---

# Future Improvements

Potential enhancements include:

- Predictive Search
- Cart Drawer
- Recently Viewed Products
- Product Recommendations
- Wishlist
- Quick Checkout
- Animations using View Transitions API

---

# Author

Ahmed Salah Eldin

Senior Software Engineer

Full Stack Developer

---

# License

This project was created as part of the **EcomExperts Frontend Hiring Assessment** and is intended for evaluation purposes.
