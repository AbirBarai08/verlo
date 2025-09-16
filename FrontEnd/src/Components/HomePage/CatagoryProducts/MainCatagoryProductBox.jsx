import CatagoryProducts from './CatagoryProducts.jsx';
import { v4 as uuidv4} from 'uuid';

export default function MainCatagoryProductBox() {
    const catagories = ["Fashion" , "Mobiles", "Electronics", "Home & Furniters" , "Appliances", "Toys"]

    return (
        <>
            {catagories.map(catagory => (
                <CatagoryProducts key={uuidv4()} catagory={catagory}/>
            ))}
        </>
    )
}