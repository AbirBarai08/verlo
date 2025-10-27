import { Box , Typography , Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SnackBar from "../SnackBar/SnackBar.jsx";
import { useState , useEffect } from 'react';
import axios from 'axios';
import handleApiError from '../../Utils/handleApiError.js';
import useProductStore from '../../Store/productStore.js';
import { Backdrop, CircularProgress } from "@mui/material";
import { BASE_URL } from '../../Utils/apiConfig.js';

export default function Show({ products }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const {deleteProduct , message , type , status} = useProductStore();
    const [snack , setSnack] = useState({snackMsg: "" , snackType: ""});
    const [loading, setLoading] = useState(false);
    const [submitted , setSubmitted] = useState(false);
    const currentDate = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const showSnackbar = sessionStorage.getItem("showSnackbar");
        const snackMsg = sessionStorage.getItem("snackMessage");
        const snackType = sessionStorage.getItem("snackType");
        if(showSnackbar === "true") {
            setSnack({ snackMsg: snackMsg , snackType: snackType });
            setOpen(true)
        }
        sessionStorage.removeItem("showSnackbar");
        sessionStorage.removeItem("snackMessage");
        sessionStorage.removeItem("snackType");
    }, [])

    useEffect(() => {
        if(submitted) {
            if(status === 200) {
                setTimeout(() => {
                    sessionStorage.setItem("showSnackbar", "true");
                    sessionStorage.setItem("snackMessage", message);
                    sessionStorage.setItem("snackType", type);
                    window.location.reload();
                }, 1000);
            }else {
                setOpen(true);
            }
        }
    }, [submitted , type , message , status])

    const fetchProductDetails = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/products/${id}`);
            navigate(`/products/${id}`, { state: { productData: response.data } });
        }
        catch(err) {
            handleApiError(err , navigate);
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const updateProduct = (product) => {
        sessionStorage.setItem("product" , JSON.stringify(product));
        navigate("/products/updateproduct/updatedetails")
    }

    const DeleteProduct = async(id) => {
        setLoading(true);
        await deleteProduct(id); 
        setSubmitted(true);
    }

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box className='flex flex-col grow mt-8 bg-white mx-4 sm:mx-12 md:mx-16 lg:mx-20 rounded-lg shadow-md'>
                <Typography variant="h5" gutterBottom className='p-4'>
                    My Products
                </Typography>
                {Array.isArray(products) && products.map(product => (
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
                            <Box className="flex items-center justify-start gap-4">
                                <Button variant='contained' 
                                    sx={{
                                        color: '#555',
                                        backgroundColor: '#f5f5f5',
                                        '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                        },
                                        marginTop: '0.5rem',
                                    }}
                                    onClick={async(e) => { e.stopPropagation(); await DeleteProduct(product._id)}}
                                >
                                    Delete
                                </Button>
                                <Button variant='contained' 
                                    sx={{
                                        backgroundColor: '#000000',
                                        color: '#ffffff',
                                        '&:hover': {
                                        backgroundColor: '#333333',
                                        },
                                        marginTop: '0.5rem',
                                    }}
                                    onClick={(e) => { e.stopPropagation(); updateProduct(product)}}
                                >
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
            <SnackBar open={open} onClose={handleClose} message={snack.snackMsg} type={snack.snackType} />
        </>
    )
}