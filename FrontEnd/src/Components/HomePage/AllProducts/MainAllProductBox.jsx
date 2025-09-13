import Product from './Product.jsx';
import Box from '@mui/material/Box';
import ProductSkeleton from './ProductSkeleton';

export default function MainAllProductBox({ products , loading }) {
  return (
    <Box className='mt-8 bg-white mx-4 sm:mx-12 md:mx-16 lg:mx-20 rounded-lg shadow-md'>
      <Box className='text-3xl px-4 pt-4'>
        <h2>All Products</h2>
      </Box>
      <Box
        className="flex flex-wrap justify-evenly items-center sm:gap-2 md:gap-10 lg:gap-15 pt-8"
        sx={{ width: '100%',
            '@media (max-width : 428px)' : {
              justifyContent : '',
            }
        }}
      >
        {
          loading ? 
          <Box sx={{ display: 'flex' , flexWrap: 'wrap' , justifyContent: 'space-evenly' , bgcolor: '#fff',
              pt: 8,
              width: '100%',
              height: '40%'}}>
            {
              [...Array(8)].map((_ , index) => (
                <ProductSkeleton key={index}/>
              ))
            }
          </Box> :
          products.slice(0 , 20)
            .map(product => (
              <Product
                key={product._id}
                product={product}
              />
          ))
        }
      </Box>
    </Box>
  );
}