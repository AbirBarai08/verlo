import { useState , useEffect } from 'react';
import useProductStore from '../../Store/productStore.js';
import Order from './Order.jsx';
import Snackbar from "../SnackBar/SnackBar.jsx";
import useLocationSnackbar from '../../hook/useLocatioSnackBar.js';
import PageLayout from '../PageLayout.jsx';

export default function OrderPage() {
    const fetchOrderItems = useProductStore((state) => state.fetchOrderItems);
    const orderItems = useProductStore((state) => state.orderItems);
    const message = useProductStore((state) => state.message);
    const type = useProductStore((state) => state.type);
    const [open , setOpen] = useState(false);
    const [snack , setSnack] = useState({ message: "" , type: ""});
    
    useLocationSnackbar(setSnack , setOpen);

    useEffect(() => {
        if(!snack.message) {
            if(message && type === "info"){
                setSnack({ message: message , type: type })
                setOpen(true)
            }
        }
    }, [message , type , snack.message])

    useEffect(() => {
        fetchOrderItems();
    }, [fetchOrderItems]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
        <PageLayout>
            <Order orderItems={orderItems} />
        </PageLayout>
        <Snackbar open={open} onClose={handleClose} message={snack.message} type={snack.type}/>
        </>
    )
}