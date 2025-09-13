import Box from '@mui/material/Box';
import Product from "../HomePage/AllProducts/Product.jsx";
import NavBar from "../HomePage/NavBar/NavBar.jsx";
import Footer from "../HomePage/Footer/Footer.jsx";

export default function ProductsBox({ products }) {
    return (
        <Box className='flex flex-col min-h-dvh'>
            <NavBar />
            <Box className='mt-8 grow bg-white mx-4 sm:mx-12 md:mx-16 lg:mx-20 rounded-lg shadow-md'>
                <Box
                    className="flex flex-wrap justify-evenly items-center sm:gap-2 md:gap-10 lg:gap-15 pt-8"
                    sx={{ width: '100%',
                        '@media (max-width : 428px)' : {
                        justifyContent : '',
                        }
                    }}
                >
                    {
                        products.map((product) => (
                            <Product
                                key={product._id}
                                product={product}
                            />
                        ))
                    }
                </Box>
            </Box>
            <Footer />
        </Box>
    );
}