import NavBar from "./HomePage/NavBar/NavBar.jsx";
import Footer from "./HomePage/Footer/Footer.jsx";
import { Box } from "@mui/material";

export default function PageLayout({ children }) {
  return (
    <Box className="flex flex-col min-h-dvh">
      <NavBar />
      {children}
      <Footer />
    </Box>
  );
}