import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import Box from '@mui/material/Box';
import useCartStore from '../../Store/cartStore';

export default function ProductNumUpdate({ product }) {
    const updateProductNumber = useCartStore((state) => state.updateProductNumber);

    return (
        <Box className="flex items-center justify-evenly pt-2 w-30 sm:w-40">
            <RemoveCircleOutlineOutlinedIcon className='cursor-pointer' onClick={(e) => { e.stopPropagation(); updateProductNumber(product._id , product.quantity - 1)}} />
            <span className="text-lg">{product.quantity}</span>
            <AddCircleOutlineOutlinedIcon className='cursor-pointer' onClick={(e) => { e.stopPropagation(); updateProductNumber(product._id , product.quantity + 1)}} />
        </Box>
    )
}