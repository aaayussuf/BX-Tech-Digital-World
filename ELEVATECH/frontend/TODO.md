# TODO - Phase 11: Customer Account

## Step 0 - Repo alignment
- [x] Identified existing account pages/components and current routing protection.

## Step 11.1 - Folder structure
- [ ] Ensure `layouts/AccountLayout.jsx` exists.
- [ ] Ensure `services/accountService.js` exists.

## Step 11.2 - Dashboard layout
- [ ] Update `pages/account/Dashboard.jsx` to match provided “CUSTOMER ACCOUNT” layout.
- [ ] Add live dashboard stats (Total Orders, Wishlist Count, Saved Addresses, Recent Orders, Recent Wishlist Items).

## Step 11.3 - Sidebar navigation
- [ ] Update/ensure `components/account/Sidebar.jsx` matches required navigation labels/links.
- [ ] Ensure all account pages use the same sidebar.

## Step 11.4 - React routes
- [ ] Update `App.jsx` routes to match:
  - `/account`
  - `/account/profile`
  - `/account/orders`
  - `/account/orders/:id`
  - `/account/addresses`
  - `/account/wishlist`
  - `/account/change-password`

## Step 11.5 - Services
- [ ] Implement `services/accountService.js` with required functions.

## Step 11.6 - Protected routes
- [ ] Implement `components/ProtectedRoute.jsx` (or equivalent) using `AuthContext`.
- [ ] Refactor `App.jsx` to use it for protected account routes.

## Step 11.7 - Dashboard statistics
- [ ] Wire Dashboard stats to `accountService`.

## Followup
- [ ] Run frontend checks: `npm run build` (and dev if needed).

