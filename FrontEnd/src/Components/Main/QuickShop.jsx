import { Routes , Route } from 'react-router-dom';
import HomePage from "../HomePage/HomePage.jsx";
import ProductDetails from "../ProductDetailsPage/ProductDetailsPage.jsx";
import Catagory from '../CatagoryPage/Catagory.jsx';
import AllProducts from '../ShopPage/AllProducts.jsx';
import WishlistPage from '../WishlistPage/WishlistPage.jsx';
import SearchProduct from '../SearchPage/SearchProduct.jsx';
import CartPage from '../CartPage/CartPage.jsx';
import Error from '../ErroPage/Error.jsx';
import LoginPage from "../LoginPage/LoginPage.jsx";
import SignupPage from "../SignupPage/SignupPage.jsx";
import OAuthSuccess from '../OAuthSuccess/OAuthSuccess.jsx';
import ProfilePage from '../ProfilePage/ProfilePage.jsx';
import AddAddressPage from '../AddAddressPage/AddAddressPage.jsx';
import EditAddressPage from '../EditAddressPage/EditAddressPage.jsx';
import AddDetailsPage from '../AddProductsPage/AddDetailsPage.jsx';
import AddPricePage from '../AddProductsPage/AddPricePage.jsx';
import AddImagesPage from '../AddProductsPage/AddImagesPage.jsx';
import ShowPage from '../ShowPage/ShowPage.jsx';
import UpdateDetailsPage from '../UpdateProductPage/UpdateDetailsPage.jsx';
import UpdatePricePage from '../UpdateProductPage/UpdatePricePage.jsx';
import UpdateImagesPage from '../UpdateProductPage/UpdateImagesPage.jsx';
import BuyNowPage from '../BuyNowPage/ButNowPage.jsx';
import OrderPage from '../OrderPage/OrderPage.jsx';
import AddHeroImageDetailsPage from '../AddHeroImage/AddHeroImageDetailsPage.jsx';
import AddHeroImagePage from '../AddHeroImage/AddHeroImagePage.jsx';
import AboutUsPage from '../AboutUs/AboutUsPage.jsx';
import ContactUsPage from '../ContactUs/ContactUsPage.jsx';

export default function QuickShop() {
    return (
        <Routes>
            <Route path="/oauth-success" element={<OAuthSuccess/>}/>
            <Route path="/" element={<HomePage/>} />
            <Route path="/aboutus" element={<AboutUsPage/>}/>
            <Route path="/contactus" element={<ContactUsPage/>}/>
            <Route path="/products/:id" element={<ProductDetails/>}/>
            <Route path="/products" element={<Catagory/>} />
            <Route path="/products/allproducts" element={<AllProducts/>}/>
            <Route path="/products/wishlist" element={<WishlistPage/>}/>
            <Route path="/products/search" element={<SearchProduct/>}/>
            <Route path="/products/cart" element={<CartPage/>}/>
            <Route path="/products/addproducts/adddetails" element={<AddDetailsPage/>}/>
            <Route path="/products/addproducts/addprice" element={<AddPricePage/>}/>
            <Route path="/products/addproducts/addimages" element={<AddImagesPage/>}/>
            <Route path="/products/addheroimagedetails" element={<AddHeroImageDetailsPage/>}/>
            <Route path="/products/addheroimage" element={<AddHeroImagePage/>}/>
            <Route path="/products/updateproduct/updatedetails" element={<UpdateDetailsPage/>}/>
            <Route path="/products/updateproduct/updateprice" element={<UpdatePricePage/>}/>
            <Route path="/products/updateproduct/updateimages" element={<UpdateImagesPage/>}/>
            <Route path="/products/showproducts" element={<ShowPage/>}/>
            <Route path="/products/buynow/:productId" element={<BuyNowPage/>}/>
            <Route path="/products/order" element={<OrderPage/>}/>
            <Route path="/error" element={<Error/>}/>
            <Route path="/users/signup" element={<SignupPage/>}/>
            <Route path="/users/login" element={<LoginPage/>}/>
            <Route path="/users/profile" element={<ProfilePage/>}/>
            <Route path="/users/addaddress" element={<AddAddressPage/>}/>
            <Route path="users/editaddress" element={<EditAddressPage/>}/>
            <Route path="*" element={<Error/>} />
        </Routes>
    )
}