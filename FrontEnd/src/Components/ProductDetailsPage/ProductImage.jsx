import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { useState , useEffect } from 'react';
import './ProductImage.css';
import LikeButton from "../HomePage/AllProducts/LikeButton.jsx";

export default function ProductImage({product}) {
    const [productImg, setProductImg] = useState();

    useEffect(() => {
        if (product?.images?.[0]?.url) {
            setProductImg(product.images[0].url);
        }
    }, [product.images]);

    return (
        <Box className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-6">
            <Box className="relative w-[75%] sm:w-[60%] xl:w-1/2 h-[360px] overflow-hidden rounded-xl border border-gray-200 shadow-md">
                <img
                    className="w-full h-full object-fill rounded-md"
                    src={productImg}
                    alt={`${product.name} image`}
                />
                <LikeButton product={product} />
            </Box>

            <Box className="w-[75%] md:w-[60%] xl:w-1/2 flex items-center justify-center product-image-wrapper">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={5}
                    slidesPerView={5}
                    navigation
                    className="w-full"
                    scrollbar={{ draggable: true }}
                >
                    {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                component="img"
                                src={image.url}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-18 h-20 object-fill rounded-md cursor-pointer ${
                                    productImg === image.url ? 'border-2 border-black' : ''
                                }`}
                                onMouseEnter={() => setProductImg(image.url)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    )
}