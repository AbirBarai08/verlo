import { Box } from "@mui/material"
import Review from "./Review";
import ReviewForm from "./ReviewForm";

export default function ReviewPage({product}) {
    return (
        <Box className="flex grow flex-col justify-center items-center lg:flex-row mt-10 pb-10 bg-white mx-6 pt-6 rounded-lg">
            <ReviewForm product={product}/>
            <Review product={product}/>
        </Box>
    )
}