import { Box , Typography } from '@mui/material';
import LikeButton from '../HomePage/AllProducts/LikeButton.jsx';
import { useNavigate } from 'react-router-dom';
import handleApiError from '../../Utils/handleApiError.js';

export default function Wishlist({ products }) {
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().split("T")[0];

    const fetchProductDetails = async (id) => {
        try {
        const response = await fetch(`https://verlo-server.onrender.com/products/${id}`);
        const data = await response.json();
        navigate(`/products/${id}`, { state: { productData: data } });
        }
        catch(err) {
            handleApiError(err , navigate);
        }
    }

    return (
        <Box className='flex flex-col grow mt-8 bg-white mx-4 sm:mx-12 md:mx-16 lg:mx-20 rounded-lg shadow-md'>
            <Typography variant="h5" gutterBottom className='p-4'>
                My Wishlist ({products.length})
            </Typography>
            {products.map(product => (
                <Box
                    className="flex flex-row items-center border-t-1 border-gray-600 p-4 gap-4"
                    key={product._id}
                    onClick={() => fetchProductDetails(product._id)}
                >
                    <Box className="w-30 h-30 sm:w-40 sm:h-40 rounded-lg relative shrink-0">
                        <img
                            className="w-full h-full object-fill rounded-lg"
                            src={product.images[0].url}
                            alt={product.name}
                        />
                        <LikeButton product={product} />
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
                            <Typography variant="subtitle1" gutterBottom sx={{ color: '#484848', textDecoration: "line-through"}}>
                                {'\u20B9'}{
                                    product.discountType === "percentage" ? Math.floor(product.price / (1 - product.discountValue / 100)).toLocaleString('en-IN')
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
                    </Box>
                </Box>
            ))}
        </Box>
    )
}