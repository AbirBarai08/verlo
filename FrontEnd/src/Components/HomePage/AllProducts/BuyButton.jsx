import { Button , useMediaQuery , useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

export default function BuyButton({ productId }) {
    const navigate = useNavigate()
    const theme = useTheme();
    const isMediumDown = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Button
            onClick={(e) => {e.stopPropagation(); navigate(`/products/buynow/${productId}`)}}
                
            variant="outlined"
            endIcon={isMediumDown ? null : <ShoppingCartIcon/>}
            sx={{
            color: '#555',
            borderColor: '#ccc',
            backgroundColor: '#f5f5f5',
            fontSize: { xs: '0.55rem', sm: '1rem' },  // smaller text on mobile
            '&:hover': {
                backgroundColor: '#e0e0e0'
            },
            }}
            className='product-buy-button'
        >
            {isSmallDown ? "Buy" : "Buy Now"}
        </Button>
    )
}