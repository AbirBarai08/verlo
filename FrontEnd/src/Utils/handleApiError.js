export default function handleApiError(err, navigate) {
    navigate("/error", {
        state: {
            errorData: {
                statusCode: err.response?.status || 500,
                message: err.response?.data?.message || "Something went wrong"
            }
        }
    });
}