import { Box , Typography , Rating , Button } from "@mui/material"
import { useState , useEffect } from "react";
import ReviewDialogBox from "./ReviewDialogBox";
import FeedbackDialogBox from "./FeedbackDialogBox";
import userStore from "../../../Store/userStore";
import { useNavigate } from "react-router-dom";
import useReviewStore from "../../../Store/reviewStore";
import useProductStore from "../../../Store/productStore";

export default function ReviewForm({product}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [submitted , setSubmitted] = useState(false);
    const [feedbackOpen , setFeedbackOpen] = useState(false);
    const { isLoggedIn , fetchUser , user } = userStore();
    const { deleteFeedback , message , type , status } = useReviewStore();
    const { fetchProduct } = useProductStore();
    const feedbacks = product.feedbacks || [];
    const shouldScroll = feedbacks.length > 3;

    useEffect(() => {
        fetchUser()
    }, [fetchUser]);

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
    },[message , navigate , type , status , product._id , submitted])

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleFeedbackOpen = () => setFeedbackOpen(true);
    const handleFeedbackClose = () => setFeedbackOpen(false);

    const handleDelete = async(feedbackId) => {
        await deleteFeedback(feedbackId , product._id);
        setSubmitted(true);
        await fetchProduct(product._id);
    }

    const fetchLoginForm = () => {
        sessionStorage.setItem("redirectUrl" , window.location.pathname);
        navigate("/users/login")
    };

    return (
        <>
            <Box className="w-[100%] lg:w-[50%] mt-10 lg:mt-0 px-10">
                <Typography variant="h5" gutterBottom sx={{
                    fontWeight: "900",
                }}>
                    Reviews
                </Typography>
                <Box className="flex gap-5 mt-5">
                    <Rating
                        name="size-large"
                        readOnly
                        value={product.rating}
                        precision={0.1}
                        size="large"
                        className='product-ratings'
                    />
                    <Typography className='product-ratings-number' variant="h6" sx={{
                        fontWeight: "700"
                    }}>
                        {product.rating.toFixed(1)} out of 5
                    </Typography>
                </Box>
                <Typography className='product-ratings-number' variant="subtitle1" sx={{
                    fontWeight: "600",
                    marginTop: "0.5rem"
                }}>
                    {
                        product.reviews?.length > 0 
                            ? 
                        `(${product.reviews.length} reviews)` 
                            :
                        "No reviews yet"
                    }
                </Typography>
                <Button variant="outlined" 
                    onClick={isLoggedIn ? handleClickOpen : fetchLoginForm}
                    sx={{
                        marginTop: "1.5rem",
                        borderColor: '#ccc',
                        color: '#555',
                        backgroundColor: '#f5f5f5',
                        '&:hover': {
                            backgroundColor: '#e0e0e0',
                        },
                        height: "3rem",
                        width: "16rem"
                    }}
                >
                    Write a Review
                </Button>
                {
                    isLoggedIn && (
                        <Typography className='product-ratings-number' variant="subtitle1" sx={{
                            fontWeight: "600",
                            marginTop: "1.5rem",
                            color: "blue",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                            onClick={handleFeedbackOpen}
                        >
                            Share Your Feedback
                        </Typography>
                    )
                }
                <Box
                    sx={{
                        maxHeight: shouldScroll ? 300 : "auto",
                        overflowY: shouldScroll ? "auto" : "visible",
                        pr: 1
                    }}
                >
                    {
                        feedbacks.map((feedback , index) => (
                            <Box key={index} className="flex flex-col mt-5">
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: "700" }}>
                                    {feedback.owner.username}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    {feedback.message}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {new Intl.DateTimeFormat("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric"
                                    }).format(new Date(feedback.createdAt))}
                                </Typography>
                                {
                                    isLoggedIn && user._id === feedback.owner._id && (
                                        <Button
                                            onClick={() => handleDelete(feedback._id)}
                                            sx={{
                                                marginTop: "1rem",
                                                height: "2rem",
                                                width: "10rem",
                                                backgroundColor: '#000000',
                                                color: '#ffffff',
                                                '&:hover': {
                                                    backgroundColor: '#333333',
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    )
                                }
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <ReviewDialogBox open={open} onClose={handleClose} product={product}/>
            <FeedbackDialogBox open={feedbackOpen} onClose={handleFeedbackClose} product={product}/>
        </>
    )
}