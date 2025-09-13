import './Product.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import BuyButton from './BuyButton';
import LikeButton from './LikeButton';
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {
  const navigate = useNavigate();

  const fetchProductDetails = async (id) => {
    navigate(`/products/${id}`);
  }

  return (
    <Card className='product-card' onClick={() => fetchProductDetails(product._id)} sx={{
      position: 'relative',
      maxWidth: { xs: 160, sm: 235, md: 300 },
      maxHeight: { xs: 300, sm: 450 },
      width: '100%',
      margin: 2,
      transition: 'background-color 0.3s ease',
      backgroundColor: '#fff', // default
      '&:hover': {
        backgroundColor: '#f9f9f9'
      },
      cursor: "pointer"
    }}>
      <Box sx={{ cursor: 'pointer' }}>
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: { xs: 160, sm: 235, md: 300 },
            objectFit: 'fill',
          }}
          image={product.images[0].url}
          alt={product.name}
          className='product-image'
        />
        <LikeButton
          product={product}
        />
        <CardContent>
          <Typography
            gutterBottom
            component="div"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {product.details}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 1 , sm: 2} }}>
            <Typography className='product-ratings-number' variant="body2" sx={{ fontSize: '0.85rem' }}>
              {product.rating.toFixed(1)}
            </Typography>
            <Rating
              name="size-small"
              readOnly
              value={product.rating}
              precision={0.1}
              size="small"
              className='product-ratings'
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
            <Typography className="product-price" sx={{ fontWeight: '900', fontSize: {xs: 12 , sm: 20} }}>
              {'\u20B9'}{product.price.toLocaleString('en-IN')}
            </Typography>
            <BuyButton productId={product._id}/>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}