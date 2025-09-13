import { Box, Typography, Button , TextField , MenuItem , Divider } from '@mui/material';
import userStore from '../../Store/userStore.js';
import useProductStore from '../../Store/productStore.js';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function OrderSummery({ products , user , setIsSubmitting , setShowCheckmark }) {
    const navigate = useNavigate();
    const isLoggedIn = userStore((state) => state.isLoggedIn);
    const buyCartProducts = useProductStore((state) => state.buyCartProducts);
    const { message , type } = useProductStore();

    const address = user?.address ?? {};
    const deliveryAddress = `${address.city}, ${address.landmark}, ${address.district}, ${address.state}, ${address.pincode}`;

    const totalPrice = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const priceWithTax = (totalPrice * 0.02).toFixed(2);
    const totalPriceWithTax = Number(totalPrice) + Number(priceWithTax);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const buyProducts = products.map(product => ({
                productId: product._id,
                quantity: product.quantity
            }))
            console.log(buyProducts);
            await buyCartProducts({ items : buyProducts });
            setTimeout(() => {
                setShowCheckmark(true);
                setTimeout(() => {
                    navigate('/products/order', {
                        state: {
                            message,
                            type
                        },
                    });
                }, 1500);
            }, 2000);
        } catch (err) {
            console.log(err);
            setIsSubmitting(false);
        }
    };

    return (
        <>
        {
            isLoggedIn && (
                <Box
                    className="bg-white rounded-lg shadow-md p-6 w-full lg:w-[350px] shrink-0"
                    sx={{
                        height: 'fit-content',
                        alignSelf: 'start',
                    }}
                    component="form"
                    onSubmit={products.length > 0 ? handleSubmit : undefined}
                    noValidate
                >
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <TextField
                        fullWidth
                        label="Delivery Address"
                        name="address"
                        value={address.city ? deliveryAddress : ''}
                        margin="normal"
                        required
                        select
                        variant="outlined"
                        InputLabelProps={{ style: { color: 'black' } }}
                        InputProps={{ style: { color: 'black' } }}
                        sx={{ color: 'black' }}
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
                    
                    <Divider sx={{ my: 3, backgroundColor: '#555' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1">ITEMS</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {products.length}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Price</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ₹{totalPrice.toLocaleString('en-IN')}
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
                        ₹{priceWithTax.toLocaleString('en-IN')}
                    </Typography>
                    </Box>
                    <Divider sx={{ my: 2, backgroundColor: '#555' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            ₹{totalPriceWithTax.toLocaleString('en-IN')}
                        </Typography>
                    </Box>
                    <Button
                        type='submit'
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#333333',
                            },
                            marginTop: '1rem',
                        }}
                    >
                        Proceed to Buy
                    </Button>
                </Box>
            )
        }
        </>
    )
}