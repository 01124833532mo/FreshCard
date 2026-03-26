# FreshCart 🛒

A fully responsive e-commerce single-page application built with **Angular 16**, backed by the [Route Misr E-Commerce API](https://ecommerce.routemisr.com).

🔗 **Live Demo:** [https://01124833532mo.github.io/FreshCard/](https://01124833532mo.github.io/FreshCard/)

---

## ✨ Features

- **User Authentication** — Register, login, logout, and forgot-password flow with JWT
- **Product Browsing** — Paginated product listing with live search
- **Product Details** — Full product info page with add-to-cart and wishlist actions
- **Categories & Brands** — Browse products by category or brand
- **Shopping Cart** — Add, update quantity, remove items, and clear cart
- **Wishlist** — Save favourite products across sessions
- **Checkout & Payments** — Stripe-powered checkout session with shipping address
- **Order History** — View all past orders
- **Route Guards** — Protected routes for authenticated users only
- **Loading Spinner** — Global HTTP loading indicator via interceptor
- **Toast Notifications** — User-friendly success/error feedback
- **404 Page** — Custom not-found component

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Angular 16](https://angular.io/) | Framework (standalone components + lazy loading) |
| [Bootstrap 5](https://getbootstrap.com/) | UI layout and responsive design |
| [Font Awesome 6](https://fontawesome.com/) | Icons |
| [ngx-owl-carousel-o](https://github.com/vitalii-andriiovskyi/ngx-owl-carousel-o) | Homepage image sliders |
| [ngx-toastr](https://github.com/scttcper/ngx-toastr) | Toast notifications |
| [ngx-spinner](https://github.com/Napster2210/ngx-spinner) | Loading spinner |
| [ngx-pagination](https://github.com/michaelbromley/ngx-pagination) | Product list pagination |
| [jwt-decode](https://github.com/auth0/jwt-decode) | Decoding JWT tokens on the client |

---

## 📁 Project Structure

```
src/app/
├── components/         # Feature components (home, products, cart, wishlist, …)
├── core/
│   ├── guard/          # Auth guard (protects authenticated routes)
│   ├── interceptors/   # HTTP token injection & loading spinner
│   ├── interfaces/     # TypeScript interfaces (Product, Category, …)
│   ├── pipe/           # Custom pipes (text truncation, search filter)
│   └── services/       # Auth, Cart, Product, Wishlist, ForgotPassword services
└── layouts/
    ├── auth-layout/    # Layout for login/register pages
    └── blank-layout/   # Layout for authenticated app pages
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [Angular CLI](https://angular.io/cli) v16

### Installation

```bash
git clone https://github.com/01124833532mo/FreshCard.git
cd FreshCard
npm install
```

### Running locally

```bash
npm start
# App is served at http://localhost:4200
```

### Running tests

```bash
npm test
```

### Production build

```bash
npm run build
```

---

## 🔐 Authentication

Tokens are stored in `localStorage` under the key `etoken` and automatically attached to every outgoing HTTP request via `MyhttpInterceptor`.

---

## 📄 License

This project is open-source and available for learning and reference purposes.