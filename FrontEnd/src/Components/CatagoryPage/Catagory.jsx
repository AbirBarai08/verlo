import ProductsBox from "./ProductsBox.jsx";
import { useState, useEffect } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ProductSkeleton from "../HomePage/AllProducts/ProductSkeleton.jsx";
import axios from 'axios';
import handleApiError from "../../Utils/handleApiError.js";
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";

export default function Catagory() {
    const [products, setProducts] = useState([]);
    const [loading , setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const catagory = params.get("catagory");
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    const rating = params.get("rating");
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});

    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        const fetchCatagoryDetails = async () => {
            try {
                const query = new URLSearchParams();

                if(catagory) query.append("catagory" , catagory);
                if(minPrice) query.append("minPrice" , minPrice);
                if(maxPrice) query.append("maxPrice" , maxPrice);
                if(rating) query.append("rating" , rating);

                const res = await axios.get(`https://e-commerce-website-1-g5ui.onrender.com/products?${query.toString()}`);
                setProducts(res.data);
                setLoading(false);
            } catch(err) { handleApiError(err , navigate); }
        };
        fetchCatagoryDetails();
    }, [catagory , navigate , maxPrice , minPrice , rating]);

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
    );
}