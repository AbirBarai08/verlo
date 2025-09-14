import { Button } from "@mui/material";
import googleLogo from "../../assets/googleLogo.png";

export default function SignupGoogleBtn({ type }) {
    const handleGoogleSignup = async () => {
        const prevUrl = sessionStorage.getItem("redirectUrl");
        window.location.href = `https://e-commerce-website-1-g5ui.onrender.com/users/auth/google?redirectUrl=${prevUrl}`;
    };

    return (
        <Button
            fullWidth
            onClick={handleGoogleSignup}
            sx={{
                mt: 2,
                mb: 3,
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                border: '1px solid #fff',
                color: '#fff',
                backgroundColor: '#000',
                borderRadius: 2,
                fontWeight: 500,
                fontSize: '0.95rem',
                '&:hover': {
                backgroundColor: '#222',
                borderColor: '#ccc',
                },
            }}
        >
            <img
                src={googleLogo}
                alt="Google logo"
                style={{ height: 20 }}
            />
            {type} with Google
        </Button>
    )
}