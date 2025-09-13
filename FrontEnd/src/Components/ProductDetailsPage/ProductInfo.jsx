import { Box , Button , useMediaQuery , useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import DiscountTimer from './DiscountExpairyDate.jsx';
import useCartStore from '../../Store/cartStore.js';
import { useState } from 'react';
import SnackBar from "../SnackBar/SnackBar.jsx";
import { useNavigate } from 'react-router-dom';
import userStore from '../../Store/userStore.js';

export default function ProductInfo({product}) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const addToCart = useCartStore((state) => state.addToCart);
    const message = useCartStore((state) => state.message);
    const type = useCartStore((state) => state.type);
    const isLoggedIn = userStore((state) => state.isLoggedIn);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    return (
        <>
            <Box className="w-[85%] lg:w-[25%] mt-10 lg:mt-0 px-10 lg:px-4"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {
                    isMobile ? <Typography variant="h5" gutterBottom>{product.name}</Typography> : <Typography variant="h4" gutterBottom>{product.name}</Typography>
                }               
                <Box className="flex gap-5">
                    <Rating
                        name="size-medium"
                        readOnly
                        value={product.rating}
                        precision={0.1}
                        size="small"
                        className='product-ratings'
                    />
                    <Typography className='product-ratings-number' variant="body2">
                        {product.rating.toFixed(1)}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#484848', fontFamily: 'Poppins'}}>
                    {product.details}
                </Typography>
                <Box className="flex gap-5">
                    <Typography variant="h5" gutterBottom>
                        {'\u20B9'}{product.price.toLocaleString('en-IN')}
                    </Typography> 
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#484848', fontFamily: 'Poppins' , textDecoration: "line-through" , paddingTop: "0.375rem"}}>
                        {'\u20B9'}{
                            product.discountType === "percentage" ? Math.floor(product.price / (1 - product.discountValue / 100)).toLocaleString('en-IN')
                            : Math.floor(product.price + product.discountValue).toLocaleString('en-IN')
                        }
                    </Typography>
                </Box>
                <Box className="flex gap-5">
                    {product.stock === 0 && (
                        <Typography variant="subtitle2" sx={{ color: 'red', fontWeight: 'bold' }}>
                        Out of Stock
                        </Typography>
                    )}

                    {product.stock > 0 && product.stock < 5 && (
                        <Typography variant="subtitle2" sx={{ color: 'orange', fontWeight: '600' }}>
                        Only {product.stock} left!
                        </Typography>
                    )}

                    {product.stock >= 5 && (
                        <Typography variant="subtitle2" sx={{ color: 'green' }}>
                        In Stock
                        </Typography>
                    )}
                    <DiscountTimer expiryDate={product.validUntil} />
                </Box>
                <Box className="flex justify-between">
                    <Button variant="outlined" className="w-[40%]" sx={{
                            borderColor: '#ccc',
                            color: '#555',
                            backgroundColor: '#f5f5f5',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            }
                        }}
                        onClick={async () => {
                            await addToCart(product._id);
                            setOpen(true);
                        }}
                    >
                        {isMobile ? "Cart" : "Add to Cart"}
                    </Button>
                    <Button variant="contained" className="w-[50%] md:w-[40%]" 
                    onClick={() => {
                        !isLoggedIn ? ( sessionStorage.setItem("redirectUrl" , window.location.pathname), navigate("/users/login"))
                            : navigate(`/products/buynow/${product._id}`)
                    }} 
                    sx={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        '&:hover': {
                            backgroundColor: '#333333',
                        }
                    }}
                    >
                    {isMobile ? "Buy" : "Buy Now"}
                    </Button>
                </Box>           
            </Box>
            <SnackBar open={open} onClose={handleClose} message={message} type={type} />
        </>
    )
}