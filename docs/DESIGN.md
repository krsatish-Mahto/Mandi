# DESIGN.md

## Design System & UI/UX Guidelines

This document outlines the visual design system, component library, color palette, typography, and UI patterns for the Mandi platform.

---

## 1. Design Philosophy

**Mandi's design is built on these core principles:**

- **Rural-First:** Simple, intuitive interfaces for users with varying tech comfort
- **Visual Clarity:** High contrast and readable typography for accessibility
- **Image-Centric:** Product visuals are the hero; information supports the image
- **Instagram-Inspired:** Familiar social platform patterns (feed, cards, interactions)
- **Efficient:** Minimal steps to browse, list, and negotiate
- **Trust-Building:** Clear seller info, engagement metrics, and direct communication

---

## 2. Color Palette

### Primary Colors

| Color | Hex | Usage | RGB |
|-------|-----|-------|-----|
| **Forest Green** | #006400 | Primary actions, buttons, accents | rgb(0, 100, 0) |
| **Almost Black** | #0D0D0D | Text, dark backgrounds, strong contrast | rgb(13, 13, 13) |
| **White** | #FFFFFF | Backgrounds, cards, text on dark | rgb(255, 255, 255) |

### Secondary/Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Success Green** | #28A745 | Confirmations, "Active" status, positive actions |
| **Warning Orange** | #FFC107 | Alerts, "Pending" status, important notices |
| **Error Red** | #DC3545 | Errors, "Sold" status, destructive actions |
| **Info Blue** | #17A2B8 | Information, notifications, secondary actions |
| **Light Gray** | #F8F9FA | Card backgrounds, subtle dividers |
| **Medium Gray** | #6C757D | Secondary text, disabled states |
| **Dark Gray** | #343A40 | Body text, borders |

### Color Usage Examples

```
Buttons:
├─ Primary (Call-to-Action): #006400 (Forest Green)
├─ Secondary: #0D0D0D (Almost Black) with white border
└─ Danger (Delete): #DC3545 (Error Red)

Text:
├─ Primary text: #0D0D0D (Almost Black)
├─ Secondary text: #6C757D (Medium Gray)
├─ On green backgrounds: #FFFFFF (White)
└─ Links: #006400 (Forest Green)

Status Badges:
├─ Active: #28A745 (Success Green)
├─ Sold: #DC3545 (Error Red)
├─ Expired: #FFC107 (Warning Orange)
└─ Inactive: #6C757D (Medium Gray)
```

---

## 3. Typography

### Font Family

**Primary Font:** Inter (or Poppins as fallback)
- Modern, clean, highly readable
- Excellent for both headlines and body text
- Optimal for high contrast scenarios

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### Type Scale

| Element | Font Size | Font Weight | Line Height | Usage |
|---------|-----------|-------------|------------|-------|
| **H1 - Hero** | 2.5rem (40px) | 700 Bold | 1.2 | Page titles, main headlines |
| **H2 - Section** | 2rem (32px) | 600 Semi-Bold | 1.3 | Section headers |
| **H3 - Subsection** | 1.5rem (24px) | 600 Semi-Bold | 1.4 | Card titles, listing titles |
| **H4 - Heading** | 1.25rem (20px) | 600 Semi-Bold | 1.4 | Subheadings |
| **Body - Large** | 1.125rem (18px) | 400 Regular | 1.6 | Large body text |
| **Body - Regular** | 1rem (16px) | 400 Regular | 1.6 | Default body text |
| **Body - Small** | 0.875rem (14px) | 400 Regular | 1.5 | Secondary text, captions |
| **Label** | 0.75rem (12px) | 500 Medium | 1.4 | Form labels, badges |
| **Button** | 1rem (16px) | 600 Semi-Bold | 1.4 | Button text |

### Text Contrast

```
High Contrast (WCAG AA compliant):
├─ #0D0D0D (Almost Black) on #FFFFFF (White) ✓ 18.5:1
├─ #FFFFFF (White) on #006400 (Forest Green) ✓ 7.8:1
├─ #006400 (Forest Green) on #FFFFFF (White) ✓ 7.8:1
└─ #6C757D (Medium Gray) on #FFFFFF (White) ✓ 4.5:1
```

---

## 4. Spacing & Layout

### Spacing Scale

```
8px Grid System:
├─ xs: 4px (minimal spacing)
├─ sm: 8px (button padding, minor gaps)
├─ md: 16px (default padding, section spacing)
├─ lg: 24px (component margins)
├─ xl: 32px (section gaps)
├─ 2xl: 48px (major section breaks)
└─ 3xl: 64px (page-level spacing)
```

### Common Spacing Patterns

| Component | Padding | Margin |
|-----------|---------|--------|
| **Button** | 12px 24px (sm vertical, md horizontal) | 8px |
| **Input Field** | 12px 16px | 8px bottom |
| **Card** | 16px | 8px bottom |
| **Section** | 0 (internal) | 32px bottom |
| **Page** | 16px (mobile), 32px (desktop) | 0 |

---

## 5. Icons

### Icon System

**Icon Library:** Feather Icons (adapted) or Material Design Icons
- **Style:** Filled (solid)
- **Size Variations:** 16px, 20px, 24px, 32px
- **Color:** Inherits text color (adaptable)
- **Stroke Width:** 2px (for consistency)

### Common Icons & Usage

| Icon | Name | Usage |
|------|------|-------|
| 🏠 | Home | Home page navigation |
| 💬 | Message | Chat, comments |
| ❤️ | Heart/Interested | Interest button |
| 👍 | Thumbs Up | Like button |
| 📤 | Share | Share listing |
| ➕ | Plus | Create listing, add more |
| ✏️ | Edit | Edit listing, edit profile |
| 🗑️ | Trash | Delete listing |
| 🔍 | Search | Search listings |
| 👤 | User | Profile, seller info |
| ⭐ | Star | Rating |
| 📍 | Map Pin | Location, distance |
| ₹ | Rupee | Price, currency |
| ✓ | Check | Message sent |
| ✓✓ | Double Check | Message seen |
| ⚙️ | Settings | Settings, options |

---

## 6. Buttons

### Button Styles

#### Primary Button (Call-to-Action)

```
Style: Solid & Bold
Background: #006400 (Forest Green)
Text Color: #FFFFFF (White)
Border: None
Padding: 12px 24px
Border-Radius: 6px
Font-Weight: 600
Font-Size: 16px

States:
├─ Default: Full opacity
├─ Hover: Darker green (#004D00), slight shadow
├─ Active: Even darker (#003300), shadow inset
├─ Disabled: Gray (#6C757D), cursor not-allowed
└─ Loading: Spinner animation, disabled state
```

#### Secondary Button

```
Style: Outlined
Background: Transparent
Text Color: #006400 (Forest Green)
Border: 2px solid #006400
Padding: 10px 22px (adjusted for border)
Border-Radius: 6px
Font-Weight: 600

States:
├─ Default: Full opacity
├─ Hover: Light green background (#F0FFF0)
├─ Active: Darker text
└─ Disabled: Gray text & border
```

#### Danger Button (Delete/Remove)

```
Style: Solid & Bold
Background: #DC3545 (Error Red)
Text Color: #FFFFFF (White)
Border: None
Padding: 12px 24px
Border-Radius: 6px

States:
├─ Default: Full opacity
├─ Hover: Darker red, shadow
└─ Active: Even darker, inset shadow
```

### Button Sizes

| Size | Padding | Font Size | Usage |
|------|---------|-----------|-------|
| **Small** | 8px 16px | 14px | Tertiary actions, badge buttons |
| **Medium** | 12px 24px | 16px | Primary actions, main CTAs |
| **Large** | 16px 32px | 18px | Hero CTAs, form submission |

---

## 7. Forms & Input Fields

### Input Field

```
Border: 1px solid #D3D3D3 (Light Gray)
Background: #FFFFFF (White)
Padding: 12px 16px
Border-Radius: 6px
Font-Size: 16px
Font-Color: #0D0D0D (Almost Black)
Placeholder Color: #6C757D (Medium Gray)

States:
├─ Default: Light gray border
├─ Focus: #006400 border (2px), shadow
├─ Error: #DC3545 border (2px), error icon
├─ Disabled: #F8F9FA background, gray text
└─ Filled: #0D0D0D text
```

### Select Dropdown

```
Same styling as input field
With dropdown icon (▼) on right
Arrow color: #006400 when focused
```

### Checkbox & Radio

```
Size: 20px × 20px
Border: 2px solid #D3D3D3
Checked: #006400 background, white checkmark
Unchecked: White background, gray border
Focus: Green border highlight
```

### Text Area

```
Same as input field
Min-Height: 120px
Resize: Vertical only
Font-Family: Monospace (for descriptions)
```

---

## 8. Cards & Components

### Listing Card (Instagram-Style)

```
┌─────────────────────────────────────┐
│                                      │
│    [PRODUCT IMAGE] (16:9 or 1:1)    │ ← Flexible aspect ratio
│                                      │
├─────────────────────────────────────┤
│ Fresh Tomatoes                       │ ← Title (H3, bold)
│ ₹50/kg | Distance: 2.5 km           │ ← Price & Distance (emphasized)
│ Rajesh Kumar, Village A              │ ← Seller info (secondary)
├─────────────────────────────────────┤
│ 👍 Like (12) | ❤️ Interested (5)    │ ← Engagement metrics
│ 💬 Comment (3) | 📤 Share           │
├─────────────────────────────────────┤
│ [See Details]                        │ ← Primary CTA
└─────────────────────────────────────┘

Card Styling:
├─ Background: #FFFFFF (White)
├─ Border: 1px solid #E0E0E0
├─ Border-Radius: 8px
├─ Box-Shadow: 0 2px 8px rgba(0,0,0,0.1)
├─ Margin-Bottom: 16px
└─ Hover: Shadow increases to 0 4px 12px rgba(0,0,0,0.15)
```

### Conversation/Message Card

```
┌─────────────────────────────────┐
│ [Avatar] Rajesh Kumar           │ ← Seller name
│ Fresh Tomatoes                  │ ← Listing context
│ "When can you come?" - 2:06 PM  │ ← Last message + time
│ ✓✓ Seen                         │ ← Message status
│ [Delete]                        │ ← Action
└─────────────────────────────────┘

Card Styling:
├─ Padding: 16px
├─ Background: #FFFFFF
├─ Border-Left: 4px solid #006400
├─ Hover: Background #F8F9FA
└─ Margin-Bottom: 8px
```

### User Profile Card

```
┌──────────────────────────────────┐
│ [Avatar] Rajesh Kumar            │
│ Rating: ★★★★☆ (4.5/5)           │
│ Member since: Jan 2024           │
│ Active listings: 5               │
│                                  │
│ Village: Village A               │
│ Bio: "Fresh produce every week"  │
│                                  │
│ [Contact Seller] [View Listings] │
└──────────────────────────────────┘

Styling:
├─ Padding: 20px
├─ Background: #FFFFFF
├─ Border-Radius: 8px
├─ Border: 1px solid #E0E0E0
└─ Center-aligned content
```

---

## 9. Navigation & Layouts

### Bottom Navigation (Mobile)

```
┌─────────────────────────────────┐
│ Content Area                    │
│                                 │
│                                 │
├─────────────────────────────────┤
│ 🏠 Home │ 💬 Chat │ 👤 Profile │
│ Home    │ Messages │ Account   │
└─────────────────────────────────┘

Styling:
├─ Background: #0D0D0D (Almost Black)
├─ Text Color: #FFFFFF (White)
├─ Active Icon: #006400 (Forest Green)
├─ Icon Size: 24px
├─ Height: 64px
└─ Sticky to bottom
```

### Top Navigation (Desktop)

```
┌─────────────────────────────────────────┐
│ Mandi Logo  [Home] [Chat] [Profile]    │
│                              [Settings] │
└─────────────────────────────────────────┘

Styling:
├─ Background: #FFFFFF
├─ Height: 64px
├─ Border-Bottom: 1px solid #E0E0E0
├─ Padding: 0 32px
├─ Display: Flex, center-aligned
└─ Logo color: #006400
```

### Filter Bar

```
┌────────────────────────────────────────┐
│ Distance: [2km ▼] Price: [Any ▼]      │
│ Category: [All ▼] Buy/Sell: [Buy ▼]   │
│ Search: [_______] [🔍]                │
└────────────────────────────────────────┘

Styling:
├─ Background: #F8F9FA
├─ Padding: 16px
├─ Border-Radius: 6px
├─ Sticky to top (below nav)
├─ Responsive: Stack on mobile
└─ Gap between filters: 12px
```

---

## 10. Modals & Dialogs

### Confirmation Dialog

```
┌──────────────────────────────────────┐
│ ⚠️ Delete Listing?                   │
├──────────────────────────────────────┤
│                                       │
│ Are you sure you want to delete      │
│ "Fresh Tomatoes"? This action       │
│ cannot be undone.                   │
│                                       │
│ [Cancel]  [Delete]                   │
│           (Red button)               │
└──────────────────────────────────────┘

Styling:
├─ Overlay: rgba(0,0,0,0.5) semi-transparent
├─ Modal Background: #FFFFFF
├─ Border-Radius: 8px
├─ Padding: 24px
├─ Max-Width: 400px
├─ Shadow: 0 10px 30px rgba(0,0,0,0.3)
└─ Buttons: Center-aligned, 12px gap
```

### Alert/Notification

```
┌───────────────────────────────────┐
│ ✓ Listing created successfully!   │
└───────────────────────────────────┘

Styling:
├─ Success: #28A745 background, white text
├─ Error: #DC3545 background, white text
├─ Info: #17A2B8 background, white text
├─ Padding: 12px 16px
├─ Border-Radius: 6px
├─ Position: Top-right, fixed
├─ Animation: Slide in from top
└─ Auto-dismiss: 4 seconds
```

---

## 11. Message Status Indicators

### Chat Message Status

```
Sent: ✓
Seen: ✓✓
Pending: ⏱️
Failed: ❌

Example:
User: "When can you come?" ✓
Seller: "Today at 2 PM" ✓✓
```

### Styling

```
Icon Size: 14px
Color: #6C757D (Medium Gray) for sent
Color: #006400 (Forest Green) for seen
Color: #DC3545 (Error Red) for failed
Margin-Left: 8px
```

---

## 12. Image Gallery

### Listing Images (Multiple)

```
Primary Image (Large):
├─ Display first image
├─ Size: 100% width (responsive)
├─ Aspect Ratio: Flexible (16:9 or 1:1)
├─ Border-Radius: 6px (top corners)
└─ Object-Fit: Cover

Thumbnail Strip (Below):
├─ Show 3-5 thumbnails
├─ Each: 60px × 60px
├─ Border-Radius: 4px
├─ Hover: Opacity 0.7
├─ Click to switch main image
├─ Navigation arrows if more than 5
└─ Spacing: 8px between thumbnails

Lightbox on Click:
├─ Full-screen image viewer
├─ Previous/Next arrows
├─ Close button (X)
├─ Image counter (1/5)
└─ Swipe gesture support (mobile)
```

---

## 13. Responsive Design

### Breakpoints

```
Mobile:    0px - 480px    (extra small)
Tablet:    480px - 768px  (small to medium)
Desktop:   768px - 1024px (large)
Wide:      1024px+        (extra large)
```

### Responsive Patterns

#### Listing Card - Mobile vs Desktop

**Mobile (< 768px):**
```
┌──────────────┐
│   [Image]    │ ← Full width
├──────────────┤
│ Title        │ ← 1 listing per screen
│ Price/Dist   │
│ Seller       │
│ [See Details]│
└──────────────┘

Single column layout
Full-width cards
Bottom navigation
```

**Desktop (≥ 768px):**
```
┌──────────────┬──────────────┬──────────────┐
│   [Image]    │   [Image]    │   [Image]    │
│ Title        │ Title        │ Title        │
│ Price/Dist   │ Price/Dist   │ Price/Dist   │
│ [See Details]│ [See Details]│ [See Details]│
└──────────────┴──────────────┴──────────────┘

Multi-column grid (2-3 columns)
Sidebar navigation
Larger cards
```

#### Create Listing Form - Mobile vs Desktop

**Mobile:**
```
┌──────────────────┐
│ Listing Type     │
├──────────────────┤
│ Category         │
├──────────────────┤
│ Title            │
├──────────────────┤
│ Description      │
├──────────────────┤
│ Quantity/Unit    │
├──────────────────┤
│ Price            │
├──────────────────┤
│ Images Upload    │
├──────────────────┤
│ [Create]         │
└──────────────────┘

Vertical stack
Full-width inputs
One form per page
```

**Desktop:**
```
┌────────────────────────────────────────┐
│ Listing Type: [Sell▼]  Category: [▼]  │
├────────────────────────────────────────┤
│ Title: [_____________]                │
├────────────────────────────────────────┤
│ Description:                           │
│ [______________________________]       │
│ [______________________________]       │
├────────────────────────────────────────┤
│ Quantity: [___]  Unit: [Kg▼]  Price:[_]│
├────────────────────────────────────────┤
│ Images: [Upload] [+Add More]           │
│ [Img1] [Img2] [Img3]                  │
├────────────────────────────────────────┤
│ [Cancel]                   [Create]    │
└────────────────────────────────────────┘

Two-column layout
Compact inputs
Better space utilization
```

---

## 14. Accessibility Features

### Color & Contrast

- ✅ All text meets WCAG AA contrast requirements (4.5:1 minimum)
- ✅ High contrast mode available (#0D0D0D on #FFFFFF)
- ✅ Don't rely on color alone to convey information (use icons + text)

### Typography

- ✅ Minimum font size: 14px for body text
- ✅ Line height: 1.5+ for readability
- ✅ Font weights: Clear visual hierarchy with bold/regular

### Interactive Elements

- ✅ Minimum touch target: 44px × 44px (mobile)
- ✅ Minimum click target: 32px × 32px (desktop)
- ✅ Focus states visible (highlight or border)
- ✅ Keyboard navigation supported

### Images

- ✅ All images have descriptive alt text
- ✅ Product images describe: product type, condition, size
- ✅ Icons have aria-labels for screen readers

### Forms

- ✅ Labels associated with input fields
- ✅ Error messages descriptive and actionable
- ✅ Required fields clearly marked
- ✅ Help text available for complex fields

---

## 15. Dark Mode (Future)

### Dark Mode Palette (Optional - Phase 2)

```
Background: #1A1A1A (very dark gray)
Card: #2A2A2A (dark gray)
Text: #FFFFFF (white)
Text Secondary: #BFBFBF (light gray)
Accent: #00C800 (lighter green for contrast)
Border: #404040 (medium gray)
```

---

## 16. Component Library Summary

| Component | Purpose | Notes |
|-----------|---------|-------|
| **Button** | Actions, CTAs | Primary, Secondary, Danger |
| **Card** | Container for listings, messages | High shadow on hover |
| **Input** | Form fields, search | Green focus state |
| **Select** | Dropdown filters | Consistent styling |
| **Badge** | Status labels, counts | Multiple colors semantic |
| **Avatar** | User profile pictures | 40px-60px sizes |
| **Icon** | Visual indicators | Filled, 20-24px |
| **Modal** | Dialogs, confirmations | Overlay, centered |
| **Alert** | Notifications | Auto-dismiss |
| **Gallery** | Image carousel | Lightbox support |
| **Rating** | Star reviews | 5-star display |

---

## 17. Loading States

### Skeleton Screen

```
┌──────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← Shimmer effect
├──────────────────┤
│ ▓▓▓▓▓▓▓ ▓▓▓▓▓▓   │
│ ▓▓▓▓  ▓▓▓▓▓▓▓▓▓  │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└──────────────────┘

Animation: Gradient shimmer from left to right
Duration: 1.5 seconds
Repeat: Loop until content loads
```

### Loading Spinner

```
    ⟳ Loading...

Style:
├─ Rotation: 360° animation (1 second)
├─ Color: #006400 (Forest Green)
├─ Size: 24px (or 32px for modals)
├─ Display: Center of content area
└─ Message: "Loading..." or "Fetching..."
```

---

## 18. Error States

### Empty State (No Listings Found)

```
┌─────────────────────────────────┐
│                                 │
│    📭 No Listings Found         │
│                                 │
│    Try adjusting your filters   │
│    or check back later.         │
│                                 │
│    [Clear Filters]              │
│                                 │
└─────────────────────────────────┘

Styling:
├─ Icon: 64px, #999999
├─ Heading: "No Listings Found" (H2)
├─ Message: Secondary gray text
├─ Button: Secondary style
└─ Center-aligned, padding: 48px
```

### Error Message

```
┌──────────────────────────────────┐
│ ❌ Something went wrong           │
│                                   │
│ Unable to load listings. Please   │
│ check your connection and try     │
│ again.                            │
│                                   │
│ [Retry]                           │
└──────────────────────────────────┘

Styling:
├─ Background: #FFE5E5 (light red)
├─ Border: 1px solid #DC3545
├─ Icon: ❌ in red
├─ Text: #DC3545
├─ Padding: 16px
└─ Border-Radius: 6px
```

---

## 19. Animation & Transitions

### Standard Transitions

```
Hover effects:    200ms ease-in-out
Page transitions: 300ms fade in/out
Modal open:       250ms scale + fade
Button click:     100ms active state
Scroll effects:   smooth
```

### Common Animations

1. **Button Hover:** Scale 1.02x + shadow increase
2. **Card Hover:** Shadow increase + slight Y-translate (-2px)
3. **Page Fade:** Opacity 0 → 1 (300ms)
4. **Modal Open:** Scale 0.95 → 1 + fade (250ms)
5. **Toast Slide:** Slide in from top, slide out after 4s

---

## 20. Wireframes

### Home Page Wireframe

```
Desktop (1024px+):
┌─────────────────────────────────────────────────────┐
│ Mandi    [Home] [Chat] [Messages] [Profile]      ⚙️ │
├─────────────────────────────────────────────────────┤
│ [+ Create] | Distance: [2km▼] Price: [Any▼] [Categ▼]│
├─────────────────────────────────────────────────────┤
│                                                      │
│ ┌──────────────┬──────────────┬──────────────┐     │
│ │  [Image]     │  [Image]     │  [Image]     │     │
│ │ Tomatoes     │ Onion        │ Goat         │     │
│ │ ₹50/kg|2.5km │ ₹30/kg|4km  │ ₹5000|3.5km │     │
│ │ Rajesh,VilA  │ Priya,VilB   │ Amit,VilC    │     │
│ │ [Details]    │ [Details]    │ [Details]    │     │
│ └──────────────┴──────────────┴──────────────┘     │
│                                                      │
│ ┌──────────────┬──────────────┬──────────────┐     │
│ │  [Image]     │  [Image]     │  [Image]     │     │
│ │ [...]        │ [...]        │ [...]        │     │
│ └──────────────┴──────────────┴──────────────┘     │
│                                                      │
└─────────────────────────────────────────────────────┘

Mobile (< 480px):
┌────────────────────────────┐
│ Mandi         [+ Create]   │
├────────────────────────────┤
│ Distance: [2km▼]  Price:[▼]│
├────────────────────────────┤
│                            │
│ ┌──────────────────────┐   │
│ │   [Image]            │   │
│ │ Tomatoes             │   │
│ │ ₹50/kg | 2.5km       │   │
│ │ Rajesh, Village A    │   │
│ │ [See Details]        │   │
│ └──────────────────────┘   │
│                            │
│ ┌──────────────────────┐   │
│ │   [Image]            │   │
│ │ Onion                │   │
│ │ ₹30/kg | 4km        │   │
│ │ Priya, Village B     │   │
│ │ [See Details]        │   │
│ └──────────────────────┘   │
│                            │
├────────────────────────────┤
│ 🏠 [💬] [👤]              │
└────────────────────────────┘
```

### Listing Detail Wireframe

```
┌─────────────────────────────────────┐
│ ← Back                              │
├─────────────────────────────────────┤
│     [Image Carousel with dots]      │
│     (swipe for more images)         │
├─────────────────────────────────────┤
│ Fresh Tomatoes                      │
│ ₹50/kg | Distance: 2.5 km           │
│ Quantity: 50 kg | Negotiable: Yes   │
├─────────────────────────────────────┤
│ Seller: Rajesh Kumar                │
│ ⭐ 4.5/5 | Member since Jan 2024    │
│ Village A | Last active: 2h ago     │
├─────────────────────────────────────┤
│ Description:                        │
│ Fresh, organic tomatoes picked      │
│ today. Perfect for cooking.         │
├─────────────────────────────────────┤
│ More from Seller:                   │
│ [Onion ₹30/kg] [Potato ₹20/kg]     │
├─────────────────────────────────────┤
│ 👍 (12) ❤️ (5) 💬 (3) 📤            │
├─────────────────────────────────────┤
│ Comments:                           │
│ [Avatar] Priya: "Can deliver?"     │
│ └─ Rajesh: "Yes, ₹50 extra"       │
│                                     │
│ [Type comment...] [Post]           │
├─────────────────────────────────────┤
│ [Direct Chat with Seller]          │
└─────────────────────────────────────┘
```

### Chat Wireframe

```
┌─────────────────────────────────┐
│ Rajesh Kumar - Fresh Tomatoes   │
│ ← Back                          │
├─────────────────────────────────┤
│ Rajesh online    (dot indicator)│
├─────────────────────────────────┤
│                                 │
│ [Rajesh] "When?" (2:06 PM)    │
│ ✓✓ Seen                        │
│                                 │
│              [You] "Today 2pm"  │
│              ✓ Sent            │
│                                 │
│ [Rajesh] "Cool" (2:07 PM)     │
│ ✓✓ Seen                        │
│                                 │
├─────────────────────────────────┤
│ [Type message...]    [Send ➤]  │
└─────────────────────────────────┘
```

---

## 21. CSS Variables (Design Tokens)

```css
:root {
  /* Colors */
  --color-primary: #006400;
  --color-dark: #0D0D0D;
  --color-white: #FFFFFF;
  --color-success: #28A745;
  --color-warning: #FFC107;
  --color-error: #DC3545;
  --color-info: #17A2B8;
  --color-light-gray: #F8F9FA;
  --color-medium-gray: #6C757D;
  --color-dark-gray: #343A40;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 40px;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  
  /* Transitions */
  --transition-fast: 100ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}
```

---

## 22. Design Principles Recap

1. **Image First:** Product visuals are the hero; information supports
2. **High Contrast:** Accessibility and readability for all users
3. **Instagram-Inspired:** Familiar patterns reduce cognitive load
4. **Rural-Friendly:** Simple, intuitive, no unnecessary complexity
5. **Trust-Building:** Clear seller info, engagement metrics, direct communication
6. **Efficient:** Minimal steps from discovery to transaction
7. **Mobile-First:** Design for small screens first, scale up
8. **Responsive:** Equal experience across mobile, tablet, desktop

---

## 23. Implementation Checklist

- [ ] Set up design tokens/CSS variables
- [ ] Create button component variations
- [ ] Build card component library
- [ ] Design form inputs with error states
- [ ] Create modal/dialog templates
- [ ] Build responsive grid layouts
- [ ] Set up image gallery with lightbox
- [ ] Implement loading/error states
- [ ] Add animation transitions
- [ ] Test color contrast (WCAG AA)
- [ ] Test keyboard navigation
- [ ] Test on multiple screen sizes
- [ ] Create component storybook (optional)

---

This design system ensures Mandi is accessible, visually consistent, and optimized for rural users across all devices.
