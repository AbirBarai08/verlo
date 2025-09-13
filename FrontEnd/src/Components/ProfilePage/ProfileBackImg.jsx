import backgroundImg from "../../assets/profileBackImg.png";
import { Grid } from "@mui/material";

export default function ProfileBackImg() {
    return (
        <>
            <Grid
                size={{ md: 6 }}
                sx={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100%',
                }}
            />
        </>
    )
}