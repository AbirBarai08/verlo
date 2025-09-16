import Product from '../AllProducts/Product.jsx';
import Box from '@mui/material/Box';
import { useEffect , useState } from 'react';
import axios from 'axios';
import ProductSkeleton from '../AllProducts/ProductSkeleton.jsx';

export default function CatagoryProducts({ catagory }) {
    const [loading , setLoading] = useState(true);
    const [products , setProducts] = useState([]);

    useEffect(() => {
        const fetchCatagoryProducts = async () => {
            const encodedCatagory = encodeURIComponent(catagory.toLowerCase());
            try {
                const res = await axios.get(`https://e-commerce-website-1-g5ui.onrender.com/products?catagory=${encodedCatagory}`);
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching catagory products:", error);
                setLoading(false);
            }
        };
        fetchCatagoryProducts();
    }, [catagory]);

    return (
        <Box className='mt-8 bg-white mx-4 sm:mx-12 md:mx-16 lg:mx-20 rounded-lg shadow-md'>
            <Box className='text-3xl px-4 pt-4'>
                <h2>Best of {catagory}</h2>
            </Box>
            <Box
                className="flex flex-wrap justify-evenly sm:gap-5 md:gap-10 lg:gap-15 items-center pt-8"
                sx={{ width: '100%',
                    '@media (max-width : 428px)' : {
                    justifyContent : '',
                    }
                }}
            > 
                {
                    loading ? 
                        <Box sx={{ display: 'flex' , flexWrap: 'wrap' , justifyContent: 'space-evenly' , bgcolor: '#fff',
                            p: 8,
                            width: '100%',
                            height: '40%'}}>
                            {
                            [...Array(4)].map((_ , index) => (
                                <ProductSkeleton key={index}/>
                            ))
                            }
                        </Box>
                    :
                    products.map(product => (
                        <Product key={product._id} product={product}/>
                    ))
                }
            </Box>
        </Box>
    )
}