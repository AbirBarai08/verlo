import backgroundImg from "../../assets/backgroundImage.png";
import { Grid } from "@mui/material";

export default function SignupBackImg() {
    return (
        <>
            {/* Right: Background Image */}
            <Grid
                size={{ md: 6 }}
                sx={{
                backgroundImage:
                    `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            />
        </>
    )
}
