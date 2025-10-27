import { useState , useEffect } from "react";
import ProductsBox from "../CatagoryPage/ProductsBox.jsx";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleApiError from "../../Utils/handleApiError.js";
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";
import { BASE_URL } from "../../Utils/apiConfig.js";

export default function SearchProduct() {
    const [products , setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
    const params = new URLSearchParams(location.search);
    const product = params.get("product");
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    const rating = params.get("rating");
    const catagory = params.get("catagory");
    const discountType = params.get("discountType");
    const discountValue = params.get("discountValue");
  
    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        const fetchSearchProductDetails = async () => {
            try {
                const query = new URLSearchParams();

                if(product) query.append("product" , product.toLowerCase());
                if(minPrice) query.append("minPrice" , minPrice);
                if(maxPrice) query.append("maxPrice" , maxPrice);
                if(rating) query.append("rating" , rating);
                if(catagory) query.append("catagory" , catagory);
                if(discountType) query.append("discountType" , discountType);
                if(discountValue) query.append("discountValue" , discountValue);

                const res = await axios.get(`${BASE_URL}/products/search?${query.toString()}`);
                setProducts(res.data);
            } catch(err) {
                handleApiError(err , navigate);
            }
        }
        fetchSearchProductDetails();
    }, [location.search , navigate , maxPrice , minPrice , rating , product , catagory , discountType , discountValue]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    if(!products) return <div>Loading...</div>;

    return (
        <>
        <ProductsBox products={products} />
        <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    );
}