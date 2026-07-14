# Backend Flask task tracker

## Step 1: Backend folder structure
- [x] Create blueprint files under `backend/app/routes/` (auth, products, pages, cart)
- [x] Create model files under `backend/app/models/` (user, category, product, cart)
- [x] Ensure `backend/app/models/__init__.py` exports models
- [x] Ensure `backend/app/routes/__init__.py` registers blueprints
- [x] Update `backend/app.py` to use `backend/app/routes/init_routes`
- [x] Update `backend/init_db.py` imports to use `backend/app/models`
- [x] Normalize roles: `customer` + `admin` in auth and seed data

## Step 2: Database
- [ ] Verify/adjust Flask config + migrations setup for Postgres

## Step 3: Authentication
- [ ] Confirm JWT-protected admin role checks (and any role values used by frontend)

## Step 4: Categories
- [ ] Add/verify category endpoints match expected frontend payload

## Step 5: Brands
- [ ] Add Brand model + migration + seed data

## Step 6: Products
- [ ] Expand Product model to include Brand relationship + update endpoints

