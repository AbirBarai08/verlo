import NavBar from "../HomePage/NavBar/NavBar.jsx";
import Footer from "../HomePage/Footer/Footer.jsx";
import { Box } from "@mui/material";
import EditAddress from './EditAddress.jsx';

export default function ProfilePage() {
    return (
        <Box className="flex flex-col min-h-dvh">
            <NavBar/>
            <EditAddress/>
            <Footer/>
        </Box>
    )
}