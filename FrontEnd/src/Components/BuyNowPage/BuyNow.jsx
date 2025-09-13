import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
  Paper,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import userStore from '../../Store/userStore';
import useProductStore from '../../Store/productStore';
import SignupBackImg from '../SignupPage/SingnupBackImg';

export default function BuyNow() {
  const navigate = useNavigate();
  const { productId } = useParams();

  const fetchUser = userStore((state) => state.fetchUser);
  const user = userStore((state) => state.user);
  const fetchProduct = useProductStore((state) => state.fetchProduct);
  const product = useProductStore((state) => state.product);
  const buyProduct = useProductStore((state) => state.buyProduct);

  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const address = user?.address ?? {};
  const deliveryAddress = `${address.city}, ${address.landmark}, ${address.district}, ${address.state}, ${address.pincode}`;

  const price = product?.price ?? 0;
  const subtotal = price * quantity;
  const tax = Number((subtotal * 0.02).toFixed(2));
  const total = (subtotal + tax).toFixed(2);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchProduct(productId);
  }, [productId, fetchProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await buyProduct({ productId, quantity });

      setTimeout(() => {
        setShowCheckmark(true);

        setTimeout(() => {
          navigate('/products/order', {
            state: {
              message: 'Order placed successfully',
              type: 'success',
            },
          });
        }, 1500);
      }, 2000);
    } catch (err) {
      console.error('Order failed:', err);
      setIsSubmitting(false);
    }
  };

  // Full-page loader with checkmark
  if (isSubmitting) {
    return (
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#1c1c1c',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {!showCheckmark ? (
          <>
            <CircularProgress color="success" />
            <Typography sx={{ mt: 2 }}>Placing your order...</Typography>
          </>
        ) : (
          <>
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'limegreen' }} />
            <Typography sx={{ mt: 2, fontSize: '1.25rem' }}>
              Order placed successfully!
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={{
        height: '100vh',
        mx: { xs: 2, sm: 4, md: 6 },
        my: 4,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 4,
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Left Panel */}
      <Grid
        size={{ xs: 12 , md: 6 }}
        sx={{
          backgroundColor: '#1c1c1c',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            backgroundColor: '#2a2a2a',
            width: '100%',
            maxWidth: 420,
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700, color: '#fff', textAlign: 'center' }}
          >
            🛒 Confirm Your Order
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Address Selection */}
            <TextField
              fullWidth
              label="Delivery Address"
              name="address"
              value={address.city ? deliveryAddress : ''}
              margin="normal"
              required
              select
              variant="outlined"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{ color: 'white' }}
            >
              {address.city && (
                <MenuItem value={deliveryAddress}>{deliveryAddress}</MenuItem>
              )}
              <MenuItem
                value="delivery-address"
                onClick={() => {
                  sessionStorage.setItem('redirectUrl', window.location.pathname);
                  address.city
                    ? navigate('/users/editaddress', { state: { id: user._id } })
                    : navigate('/users/addaddress', { state: { id: user._id } });
                }}
              >
                <AddIcon sx={{ mr: 1 }} /> Add Address
              </MenuItem>
            </TextField>

            {/* Quantity Input */}
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = Math.max(1, parseInt(e.target.value) || 1);
                setQuantity(val);
              }}
              inputProps={{ min: 1 }}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                input: { color: '#fff' },
                label: { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#888' },
                  '&:hover fieldset': { borderColor: '#aaa' },
                },
              }}
            />

            <Divider sx={{ my: 3, backgroundColor: '#555' }} />

            {/* Pricing Summary */}
            {!product ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress color="inherit" />
                <Typography variant="body2" sx={{ mt: 2, color: '#aaa' }}>
                  Loading product details...
                </Typography>
              </Box>
            ) : (
              <Box sx={{ color: '#fff' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">Item Price × {quantity}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    ₹{subtotal}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Free
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tax (2%)</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ₹{tax}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2, backgroundColor: '#555' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    ₹{total}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: '1rem',
                color: '#fff',
              }}
            >
              Place Order
            </Button>
          </Box>
        </Paper>
      </Grid>

      {/* Right Panel */}
      <SignupBackImg />
    </Grid>
  );
}