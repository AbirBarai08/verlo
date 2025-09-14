import axios from 'axios';
import { useState , useEffect } from 'react';
import useWishlistStore from '../../Store/wishlistStore.js';
import Wishlist from './Wishlist.jsx';
import SnackBar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from '../../hook/useLocatioSnackBar.js';
import PageLayout from '../PageLayout.jsx';

export default function WishlistPage() {
    const [products , setProducts] = useState([]);
    const { fetchLikedItems , likedItems , message , type } = useWishlistStore();
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
        
    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        fetchLikedItems();
    }, [fetchLikedItems]);

    useEffect(() => {
        if(!snack.message){
            if(message && message !== "Added to wishlist"){
                setSnack({ message , type });
                setOpen(true);
            }
        }
    }, [message , type , snack.message]);

    useEffect(() => {
        if (likedItems.length > 0) {
            const fetchWishlistItems = async () => {
                const res = await axios.post("https://e-commerce-website-1-g5ui.onrender.com/products/wishlist", {
                ids: likedItems
            });
            setProducts(res.data);
        };
            fetchWishlistItems();
        } else {
            setProducts([]);
        }
    }, [likedItems]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
        <PageLayout>
            <Wishlist products={products} />
        </PageLayout>
        <SnackBar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}