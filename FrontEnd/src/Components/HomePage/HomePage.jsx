import PrimarySearchAppBar from "./NavBar/NavBar.jsx";
import ScrollToTopButton from "./ScrollToTopButton/ScrollToTopButton.jsx";
import HeroImgs from "./HeroSection/HeroImgs.jsx";
import MainAllProductBox from "./AllProducts/MainAllProductBox.jsx";
import MainCatagoryProductBox from "./CatagoryProducts/MainCatagoryProductBox.jsx";
import Footer from "./Footer/Footer.jsx";
import Box from '@mui/material/Box';
import { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import handleApiError from '../../Utils/handleApiError.js';
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from "../../hook/useLocatioSnackBar.js";
import useProductStore from "../../Store/productStore.js";

export default function HomePage() {
    const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);
    const products = useProductStore((state) => state.products);
    const heroImgs = useProductStore((state) => state.heroImgs);
    const [loading , setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [snack , setSnack] = useState({ message: '' , type: ''});

    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        const allProducts = async () => {
            try {
                await fetchAllProducts();
                setLoading(false);
            } catch(err) {
                handleApiError(err , navigate);
            }
        };
        allProducts();
    }, [fetchAllProducts , navigate]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <Box className="flex flex-col min-h-screen">
                <PrimarySearchAppBar />
                <HeroImgs heroImgs={heroImgs}/>
                <MainAllProductBox products={products} loading={loading}/>
                <MainCatagoryProductBox/>
                <Box className="grow bg-white mx-4 sm:mx-12 md:mx-16 lg:mx-20 rounded-lg shadow-md"></Box>
                <Footer/>
                <ScrollToTopButton />
            </Box>
            <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}