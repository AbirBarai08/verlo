import { Box, Typography, Button, Divider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import handleApiError from '../../Utils/handleApiError.js';
import useProductStore from '../../Store/productStore.js';
import { useState } from 'react';
import SnackBar from '../SnackBar/SnackBar.jsx';

export default function Order({ orderItems }) {
  const navigate = useNavigate();
  const cancelOrder = useProductStore((state) => state.cancelOrder);
  const [isCancelling, setIsCancelling] = useState(false);
  const [open , setOpen] = useState(false);

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`https://verlo-server.onrender.com/products/${id}`);
      navigate(`/products/${id}`, { state: { productData: response.data } });
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  const deleteOrder = async (e, productId) => {
    e.stopPropagation();
    setIsCancelling(true);
    try {
      await cancelOrder(productId);
    } catch (err) {
      console.error("Cancel failed:", err);
      setIsCancelling(false);
    } finally {
      setTimeout(() => {
        setIsCancelling(false);
        setOpen(true);
      }, 1500);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  if (isCancelling) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.85)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          color: '#fff',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Cancelling your order...
        </Typography>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <>
    <Box className="flex flex-col grow mt-8 mx-4 sm:mx-12 md:mx-16 lg:mx-20">
      <Typography variant="h5" gutterBottom className="p-4 font-semibold">
        My Orders({orderItems.length})
      </Typography>

      {orderItems.map((order) => (
        <Box
          key={order.product._id}
          onClick={() => fetchProductDetails(order.product._id)}
          className="flex flex-col sm:flex-row items-start sm:items-center bg-white rounded-lg shadow-md mb-6 p-4 cursor-pointer hover:shadow-lg transition-shadow"
        >
          {/* Product Image */}
          <Box className="w-full sm:w-40 h-40 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-6">
            <img
              src={order.product.images[0].url}
              alt={order.product.name}
              className="w-full h-full object-fill rounded-lg"
            />
          </Box>

          {/* Product Info */}
          <Box className="flex-1">
            <Typography variant="subtitle1" className="font-medium mb-2 line-clamp-2">
              {order.product.details}
            </Typography>

            <Divider className="my-2" />

            <Box className="flex flex-wrap gap-4 items-center mt-2">
              <Typography variant="h6" className="text-green-700 font-bold">
                ₹{(order.product.price * order.quantity).toLocaleString('en-IN')}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                Purchased On:{' '}
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(order.purchaseDate))}
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#333333',
                },
                marginTop: '0.5rem',
              }}
              onClick={(e) => deleteOrder(e, order.product._id)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
    <SnackBar open={open} onClose={handleClose} message={"Order canceled successfully"} type={"success"}/>
    </>
  );
}