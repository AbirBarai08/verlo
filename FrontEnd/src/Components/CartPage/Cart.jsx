import { Box, Typography, Button , TextField , MenuItem , Divider , CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../Store/cartStore';
import ProductNumUpdate from './ProductNumUpdate';
import axios from 'axios';
import handleApiError from '../../Utils/handleApiError.js';
import { useEffect , useState } from 'react';
import userStore from '../../Store/userStore.js';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import OrderSummery from './OrderSummery.jsx';

export default function Cart() {
    const navigate = useNavigate();
    const fetchUser = userStore((state) => state.fetchUser)
    const user = userStore((state) => state.user);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const currentDate = new Date().toISOString().split("T")[0];
    const [products , setProducts] = useState([]);
    const fetchCartItems = useCartStore((state) => state.fetchCartItems);
    const cartItems = useCartStore((state) => state.cartItems);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCheckmark, setShowCheckmark] = useState(false);

    useEffect(() => {
        fetchUser();
    }, [fetchUser])

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    useEffect(() => {
        if(cartItems.length > 0) {
            const fetchCartProducts = async () => {
                const ids = cartItems.map(item => item.id);

                const res = await axios.post("http://localhost:5000/products/cart" , {
                    ids
                });

                const enrichedProducts = res.data.map(product => {
                    const matchedCartItem = cartItems.find(item => item.id === product._id);
                    return {
                        ...product , 
                        quantity: matchedCartItem.quantity || 1,
                    }
                })

                setProducts(enrichedProducts);
            }
            fetchCartProducts();
        } else {
            setProducts([]);
        }
    } , [cartItems]);

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            navigate(`/products/${id}`, { state: { productData: response.data } });
        } catch (err) {
            handleApiError(err, navigate);
        }
    };

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
        <Box className="flex flex-col grow lg:flex-row gap-6 mt-8 mx-4 sm:mx-12 md:mx-16 lg:mx-20">
            {/* Cart Items */}
            <Box className="flex flex-col grow bg-white rounded-lg shadow-md">
                <Typography variant="h5" gutterBottom className="p-4">
                    My Cart
                </Typography>
                {products.map(product => (
                    <Box
                        className="flex flex-row items-center border-t-1 border-gray-600 p-4 pb-10 gap-4"
                        key={product._id}
                        onClick={() => fetchProductDetails(product._id)}
                    >
                        <Box className="w-30 h-30 sm:w-40 sm:h-40 rounded-lg relative shrink-0">
                            <img
                                className="w-full h-full object-fill rounded-lg"
                                src={product.images[0].url}
                                alt={product.name}
                            />
                            <ProductNumUpdate product={product} />
                        </Box>

                        <Box className="flex-1 overflow-hidden">
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                className="overflow-hidden text-ellipsis whitespace-nowrap pr-4"
                            >
                                {product.details}
                            </Typography>
                            <Box className="flex gap-3 items-center">
                                <Typography gutterBottom sx={{
                                    fontSize: {
                                        xs: '1.25rem',
                                        sm: '1.5rem',
                                        md: '1.75rem',
                                    },
                                    fontWeight: 500,
                                }}>
                                    {'\u20B9'}{product.price.toLocaleString('en-IN')}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom sx={{ color: '#484848', textDecoration: "line-through" }}>
                                    {'\u20B9'}{
                                        product.discountType === "percentage"
                                            ? Math.floor(product.price / (1 - product.discountValue / 100)).toLocaleString('en-IN')
                                            : Math.floor(product.price + product.discountValue).toLocaleString('en-IN')
                                    }
                                </Typography>
                                <Typography variant='subtitle2' sx={{ color: 'green' }}>
                                    {product.discountType === "percentage" ? product.discountValue + "% off" : "Save " + product.discountValue}
                                </Typography>
                                <Box>
                                    {new Date(product.validUntil).toISOString().split("T")[0] < currentDate ? (
                                        <Typography variant="subtitle2" sx={{ color: 'red', fontWeight: 'bold' }}>
                                            Expired
                                        </Typography>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
                                </Box>
                            </Box>
                            <Button
                                variant='contained'
                                sx={{
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#333333',
                                    },
                                    marginTop: '0.5rem',
                                }}
                                onClick={async (e) => {
                                    e.stopPropagation();
                                    await removeFromCart(product._id);
                                }}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
            <OrderSummery products={products} user={user} setIsSubmitting={setIsSubmitting} setShowCheckmark={setShowCheckmark}/>
        </Box>    
    );
}