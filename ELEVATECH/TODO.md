# TODO: Stripe Payment Verification Feature

## Steps

- [x] Step 1: Update `retrieve_session` in `stripe_service.py` to include `expand=["payment_intent"]`
- [x] Step 2: Add `retrieve_session` import in `checkout.py`
- [x] Step 3: Add `/verify/<session_id>` GET route in `checkout.py`
- [x] Step 4: Update `checkout-success.jsx` with session verification fetch logic
- [x] Step 5: Verify everything compiles/runs correctly

