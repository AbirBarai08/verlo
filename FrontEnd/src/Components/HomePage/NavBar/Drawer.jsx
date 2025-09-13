import { Drawer, IconButton, Divider, List, ListItem, ListItemButton, ListItemText , Box , Typography , Slider , Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import { useNavigate , useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function DrawerMenu({ open, handleClose }) {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [rating, setRating] = useState(3);
  const isCatagoryPage = path === "/products";
  const isSearchPage = path === "/products/search";
  const isAllProductsPage = path === "/products/allproducts";
  const [priceTouched , setPriceTouched] = useState(false);
  const [ratingTouched , setRatingTouched] = useState(false);
  const existingCatagory = new URLSearchParams(location.search).get("catagory");
  const existingProduct = new URLSearchParams(location.search).get("product");
  const drawerWidth = 240;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const fetchProducts = async(catagory) => {
    const encodedCatagory = encodeURIComponent(catagory.toLowerCase());
    navigate(`/products?catagory=${encodedCatagory}`);
  }

  const handleSubmit = () => {
    const query = new URLSearchParams();
    query.append("minPrice" , priceRange[0]);

    if(priceTouched) {
      query.append("maxPrice" , priceRange[1]);
    }

    if(ratingTouched && rating > 0) {
      query.append("rating" , rating);
    }

    if(existingCatagory) {
      query.append("catagory" , existingCatagory);
    }

    if(existingProduct) {
      query.append("product" , existingProduct);
    }

    if(isAllProductsPage) {
      navigate(`/products/allproducts?${query.toString()}`)
    } else if(isCatagoryPage) {
      navigate(`/products?${query.toString()}`)
    } else {
      navigate(`/products/search?${query.toString()}`)
    }
  }

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['Fashion', 'Mobiles', 'Electronics', 'Home & Furniters' , 'Appliances' , 'Toys'].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={async () => {handleClose(); await fetchProducts(text)}}>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {
        (isCatagoryPage || isAllProductsPage || isSearchPage) && (
          <>
            <Divider />
            <Box sx={{ px: 2, py: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Price Range (₹)</Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => {setPriceRange(newValue); setPriceTouched(true)}}
                valueLabelDisplay="auto"
                min={0}
                max={50000}
                step={10}
                sx={{
                  color: '#333', 
                  '& .MuiSlider-thumb': {
                    borderColor: '#333',
                    backgroundColor: '#333',
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                      boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)', 
                    },
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#333',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#ccc', 
                  },
                }}
              />
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Minimum Rating</Typography>
              <Slider
                value={rating}
                onChange={(e, newValue) => {setRating(newValue); setRatingTouched(true)}}
                valueLabelDisplay="auto"
                min={1}
                max={5}
                step={0.5}
                sx={{
                  color: '#333', 
                  '& .MuiSlider-thumb': {
                    borderColor: '#333',
                    backgroundColor: '#333',
                    '&:hover, &.Mui-focusVisible, &.Mui-active': {
                      boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)', 
                    },
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#333',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#ccc', 
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                  mt: 3,
                }}
                onClick={() => {
                  if(priceTouched || ratingTouched) {
                    handleSubmit();
                  } 
                  handleClose();                 
                }}
              >
                Apply Filters
              </Button>
            </Box>
          </>
        )
      }
    </Drawer>
  );
}