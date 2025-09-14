import ProductsBox from "../CatagoryPage/ProductsBox.jsx";
import { useState , useEffect } from "react";
import { Box } from "@mui/material";
import ProductSkeleton from "../HomePage/AllProducts/ProductSkeleton.jsx";
import axios from 'axios';
import handleApiError from "../../Utils/handleApiError.js";
import { useNavigate } from "react-router-dom";
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";

export default function AllProducts() {
    const navigate = useNavigate();
    const [products , setProducts] = useState([]);
    const [loading , setLoading] = useState(true);
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
    const params = new URLSearchParams(location.search);
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    const rating = params.get("rating");
    
    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        const fetchAllProductsDetails = async () => {
            try {
                const query = new URLSearchParams();

                if(minPrice) query.append("minPrice" , minPrice);
                if(maxPrice) query.append("maxPrice" , maxPrice);
                if(rating) query.append("rating" , rating);

                const res = await axios.get(`https://e-commerce-website-1-g5ui.onrender.com/products/allproducts?${query.toString()}`);
                setProducts(res.data);
                setLoading(false);
            } catch(err) {
                handleApiError(err , navigate);
            }
        }
        fetchAllProductsDetails();
    }, [navigate , maxPrice , minPrice , rating]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            {
                loading ? 
                <Box sx={{ display: 'flex' , flexWrap: 'wrap' , justifyContent: 'space-evenly' , bgcolor: '#fff',
                    pt: 8,
                    width: '100%',
                    height: '40%'}}>
                    {
                    [...Array(6)].map((_ , index) => (
                        <ProductSkeleton key={index}/>
                    ))
                    }
                </Box> :
                <ProductsBox products={products} />
            }
            <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>            
        </>
    )
}