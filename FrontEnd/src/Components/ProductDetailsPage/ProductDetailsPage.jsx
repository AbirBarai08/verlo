import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from '@mui/material';
import PrimarySearchAppBar from "../HomePage/NavBar/NavBar.jsx";
import ProductImage from "./ProductImage.jsx";
import ProductInfo from "./ProductInfo.jsx";
import Footer from "../HomePage/Footer/Footer.jsx";
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";
import ReviewPage from "./ReviewPage/ReviewPage.jsx";
import useProductStore from "../../Store/productStore.js";

export default function ProductDetails() {
    const { id } = useParams();
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
    const product = useProductStore((state) => state.product);
    const fetchProduct = useProductStore((state) => state.fetchProduct);

    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        fetchProduct(id);
    }, [fetchProduct , id]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    if (!product) return null;

    return (
        <>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <PrimarySearchAppBar />
            <Box className="flex grow flex-col justify-center items-center lg:flex-row mt-10 pb-10 bg-white mx-6 pt-6 rounded-lg">
                <ProductImage product={product} />
                <ProductInfo product={product} />
            </Box>
            <ReviewPage product={product} />
            <Footer />
        </Box>
        <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    );
}