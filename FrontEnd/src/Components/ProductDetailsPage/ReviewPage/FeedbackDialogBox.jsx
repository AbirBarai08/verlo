import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState , useEffect } from "react";
import useProductStore from "../../../Store/productStore";
import useReviewStore from "../../../Store/reviewStore";
import { useNavigate } from "react-router-dom";

export default function FeedbackDialogBox({ open , onClose , product }) {
    const [feedback , setFeedback] = useState("");
    const navigate = useNavigate();
    const [submitted , setSubmitted] = useState(false);
    const { fetchProduct } = useProductStore();
    const { addFeedback , message , type , status } = useReviewStore();

    useEffect(() => {
        if(submitted) {
            if(status === 200) {
                navigate("/products/" + product._id , {
                    state: {
                        message , type
                    }
                })
            }
        }
        setSubmitted(false)
    }, [message , navigate , type , status , submitted , product._id])

    const handleSubmit = async() => {
        setFeedback("");
        await addFeedback({ productId: product._id , message: feedback })
        setSubmitted(true);
        await fetchProduct(product._id);
        onClose(true);
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 600, textAlign: "center", fontFamily: "serif", fontSize: "1.5rem" }}>
                Write a FeedBack
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Box>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Your FeedBack
                        </Typography>
                        <TextField
                        name="review"
                        multiline
                        rows={4}
                        fullWidth
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Share your thoughts about the product..."
                        variant="outlined"
                        InputLabelProps={{ style: { color: '#000' } }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#ccc',
                            },
                            '&:hover fieldset': {
                                borderColor: '#000',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#000',
                            },
                            },
                        }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="outlined" sx={{
                    borderColor: '#ccc',
                    color: '#555',
                    backgroundColor: '#f5f5f5',
                    '&:hover': {
                    backgroundColor: '#e0e0e0',
                    }
                }}>
                    Cancel
                </Button>
                <Button variant="contained" sx={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    '&:hover': {
                    backgroundColor: '#333333',
                    }
                }}
                onClick={handleSubmit}>
                    Submit FeedBack
                </Button>
            </DialogActions>
        </Dialog>
    )
}