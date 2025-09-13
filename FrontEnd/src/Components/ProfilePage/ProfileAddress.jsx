import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfileAddress({ type , id }) {
    const navigate = useNavigate();

    return (
        <Button
            type="submit"
            variant="outlined"
            fullWidth
            onClick={() => {
                type === "Add" ? navigate("/users/addaddress" , { state: { id } }) : navigate("/users/editaddress" , { state: { id } })
            }}
            sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                fontSize: '1rem',
                color: '#fff',
                borderColor: '#fff',
                borderRadius: 2,
                textTransform: 'none',
                letterSpacing: '0.03em',
                transition: 'all 0.3s ease',
                '&:hover': {
                backgroundColor: '#222',
                borderColor: '#aaa',
                boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                },
            }}
        >
            {type} Address
        </Button>
    )
}