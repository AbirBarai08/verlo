import { useEffect, useState } from 'react';
import CatagoryProducts from './CatagoryProducts.jsx';
import { v4 as uuidv4} from 'uuid';
import useProductStore from '../../../Store/productStore.js';

export default function MainCatagoryProductBox() {
    const fetchAllProducts = useProductStore((state) => state.fetchAllProducts);
    const products = useProductStore((state) => state.products);
    const [loading , setLoading] = useState(true);

    const catagories = ["Fashion" , "Mobiles", "Electronics", "Home & Furniters" , "Appliances", "Toys"]

    useEffect(() => {
        const allProducts = async () => {
            await fetchAllProducts();
            setLoading(false)
        };
        allProducts();
    }, [fetchAllProducts]);

    return (
        <>
            {catagories.map(catagory => (
                <CatagoryProducts key={uuidv4()} products={products} loading={loading} catagory={catagory}/>
            ))}
        </>
    )
}