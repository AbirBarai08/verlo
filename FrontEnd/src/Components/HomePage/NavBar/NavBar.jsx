import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar, Box, Toolbar, IconButton, Badge, MenuItem, Menu, CssBaseline
} from '@mui/material';
import {
  Menu as MenuIcon,
  SearchOutlined as SearchOutlinedIcon,
  AccountCircle,
  LocalPhoneOutlined as LocalPhoneOutlinedIcon,
  MoreVert as MoreIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  StoreOutlined as StoreOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo2copy.png';
import Input from './Input.jsx';
import DrawerMenu from './Drawer.jsx';
import useCartStore from '../../../Store/cartStore.js';
import userStore from '../../../Store/userStore.js';
import SnackBar from "../../SnackBar/SnackBar.jsx";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  border: '1px solid rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  boxShadow: '0 0 12px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',

  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
  },

  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [submitted , setSubmitted] = React.useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const cartItems = useCartStore((state) => state.cartItems);
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const isMediumDown = useMediaQuery(theme.breakpoints.down('md'));
  const { logoutUser , message , type , status, setIsLoggedIn, isLoggedIn, fetchUser, user } = userStore();

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser])

  const fetchAllProductDetails = () => navigate("/products/allproducts");
  const fetchWishlistItems = () => navigate("/products/wishlist");
  const fetchExistingCartItems = () => navigate("/products/cart");
  const fetchSignupForm = () => {
    sessionStorage.setItem("redirectUrl" , window.location.pathname);
    navigate("/users/signup")
  };
  const fetchLoginForm = () => {
    sessionStorage.setItem("redirectUrl" , window.location.pathname);
    navigate("/users/login")
  };
  const fetchProfile = () => navigate("/users/profile");
  const addProducts = () => {
    sessionStorage.setItem("redirectUrl" , window.location.pathname);
    navigate("/products/addproducts/adddetails")
  };
  const showProducts = () => {
    navigate("/products/showproducts")
  }
  const fetchOrders = () => {
    navigate("/products/order")
  }
  const fetchAddHeroImgForm = () => {
    navigate("/products/addheroimagedetails")
  }
  const fetchContactUs = () => {
    navigate("/contactus")
  }
  const fetchAboutUs = () => {
    navigate("/aboutus")
  }

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
  const handleLogoutUser = async() => {
    await logoutUser();
    setSubmitted(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  React.useEffect(() => {
    if(submitted) {
      if(status === 200) {
        setIsLoggedIn(false);
        navigate("/" , {
          state: {
            message , type
          }, replace: true
        })
      } else {
        setOpen(true)
      }
    }
  }, [submitted , message , navigate , status , type, setIsLoggedIn]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        handleClose();
        {
          isLoggedIn ? fetchProfile() : fetchLoginForm();
        } 
      }}>
        Profile
      </MenuItem>
      {
        isLoggedIn && (
          <MenuItem onClick={() => { handleMenuClose(); fetchOrders()}}>My Orders</MenuItem>
        )
      }
      <MenuItem onClick={async () => {handleMenuClose(); await fetchWishlistItems()}}>Wishlist</MenuItem>
      {
        !isLoggedIn && [
          <MenuItem key="signup" onClick={() => { handleMenuClose(); fetchSignupForm(); }}>
            Sign Up
          </MenuItem>,
          <MenuItem key="login" onClick={() => { handleMenuClose(); fetchLoginForm(); }}>
            Log In
          </MenuItem>
        ]
      }
      {
        isLoggedIn && (
          <MenuItem onClick={() => {handleMenuClose(); handleLogoutUser();}}>Log Out</MenuItem>
        )
      }
      {
        isLoggedIn && user.type === "sellers" && [
          <MenuItem key="add" onClick={() => { handleMenuClose(); addProducts();}}>
            {isMediumDown ? "Add" : "Add Products"}
          </MenuItem>,
          <MenuItem key="show" onClick={() => {handleMenuClose(); showProducts()}}>
            {isMediumDown ? "Products" : "Show Products"}
          </MenuItem>
        ]
      }
      {
        isLoggedIn && user.type === "admin" && (
          <MenuItem key="add" onClick={() => { handleMenuClose(); fetchAddHeroImgForm()}}>
            {isMediumDown ? "Add" : "Add HeroImage"}
          </MenuItem>
        )
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={fetchAllProductDetails}>
        <IconButton size="large" color="inherit">
          <StoreOutlinedIcon />
        </IconButton>
        <p>Shop</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <LocalPhoneOutlinedIcon />
        </IconButton>
        <p>Contact Us</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <InfoOutlinedIcon />
        </IconButton>
        <p>About Us</p>
      </MenuItem>
      <MenuItem onClick={fetchExistingCartItems}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: 'inherit',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <Box>
              <Link to="/">
                <Box
                  component="img"
                  src={logo}
                  alt="Verlo Logo"
                  sx={{
                    height: { xs: 20, md: 40 },
                    width: { xs: 100, md: 'auto' },
                    objectFit: 'contain',
                    backgroundColor: 'white',
                    display: 'block',
                  }}
                />
              </Link>
            </Box>
            <Search sx={{ flexGrow: 0.8, minWidth: 0, maxWidth: '100%' }}>
              <SearchIconWrapper>
                <SearchOutlinedIcon />
              </SearchIconWrapper>
              <Input
                value={searchValue}
                setValue={setSearchValue}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    backgroundColor: 'rgba(33, 150, 243, 0.15)',
                    paddingLeft: '40px',
                    borderRadius: 1,
                  }
                }}
              />
            </Search>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex' } }}>
            <MenuItem onClick={fetchAllProductDetails}>
              <IconButton size="large" color="inherit">
                <StoreOutlinedIcon />
              </IconButton>
              <p>Shop</p>
            </MenuItem>
            <MenuItem onClick={fetchContactUs}>
              <IconButton size="large" color="inherit">
                <LocalPhoneOutlinedIcon />
              </IconButton>
              <p>Contact Us</p>
            </MenuItem>
            <MenuItem onClick={fetchAboutUs}>
              <IconButton size="large" color="inherit">
                <InfoOutlinedIcon />
              </IconButton>
              <p>About Us</p>
            </MenuItem>
            <MenuItem onClick={fetchExistingCartItems}>
              <IconButton size="large" color="inherit">
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
              <p>Cart</p>
            </MenuItem>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { md: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 📦 Temporary Drawer Overlay */}
      <DrawerMenu open={drawerOpen} handleClose={() => setDrawerOpen(false)} />
      <Toolbar/>
      {/* Menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
    <SnackBar open={open} onClose={handleClose} message={message} type={type} />
    </>
  );
}