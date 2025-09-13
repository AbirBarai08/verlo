import { useState , useEffect } from 'react';
import useCartStore from '../../Store/cartStore.js';
import Cart from './Cart.jsx';
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from '../../hook/useLocatioSnackBar.js';
import PageLayout from '../PageLayout.jsx';

export default function CartPage() {
    const message = useCartStore((state) => state.message);
    const type = useCartStore((state) => state.type);
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
    
    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        if(!snack.message) {
            if ( message && message !== "Added to cart" ) {
                setSnack({ message, type });
                setOpen(true);
            }
        }
    }, [message , type , snack.message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
        <PageLayout>
            <Cart />
        </PageLayout>
        <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}