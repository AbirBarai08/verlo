import { useEffect, useState } from 'react';
import CatagoryProducts from './CatagoryProducts.jsx';
import { v4 as uuidv4} from 'uuid';

export default function MainCatagoryProductBox() {
    const [products, setProducts] = useState([]);
    const [loading , setLoading] = useState(true);

    const catagories = ["Fashion" , "Mobiles", "Electronics", "Home & Furniters" , "Appliances", "Toys"]

    useEffect(() => {
        fetch("https://e-commerce-website-1-g5ui.onrender.com")
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setLoading(false)});
    }, []);

    return (
        <>
            {catagories.map(catagory => (
                <CatagoryProducts key={uuidv4()} products={products} loading={loading} catagory={catagory}/>
            ))}
        </>
    )
}