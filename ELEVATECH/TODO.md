# TODO - BX-Tech Digital World

## Account Area (Frontend)
- [x] Create account folder structure under `frontend/src/pages/account`, `components/account`, `context`, `services`. 
- [x] Implement `AuthContext.jsx` for token storage, `logout`, protected route helper.
- [x] Implement `services/authService.js` for login/logout/me calls.
- [x] Implement account pages: `Dashboard`, `Profile`, `Orders`, `OrderDetails`, `Wishlist`, `Addresses`, `ChangePassword`.
- [x] Implement account components: `Sidebar`, `OrderCard`, `AddressCard`, `ProfileCard`.
- [x] Update `src/App.jsx` routes to include authenticated `/account/*` routes.
- [x] Update `src/pages/Login.jsx` to call backend login, store token, redirect to `/account/Dashboard`.
- [x] Run frontend dev server and ensure routes render (API may need backend alignment).

