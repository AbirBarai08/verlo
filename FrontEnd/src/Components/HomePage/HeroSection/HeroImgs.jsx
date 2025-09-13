import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination , Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './HeroImgs.css';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function HeroImgs({ heroImgs }) {
    const navigate = useNavigate();

    const handleSubmit = (heroImg) => {
        const query = new URLSearchParams();

        if(heroImg.targatedProduct) query.append("product" , heroImg.targatedProduct);
        if(heroImg.catagory) query.append("catagory" , heroImg.catagory);
        if(heroImg.discountType) query.append("discountType" , heroImg.discountType);
        if(heroImg.discountValue) query.append("discountValue" , heroImg.discountValue);

        navigate(`/products/search?${query.toString()}`)
    }

    return (
        <Box className="relative mt-8 bg-white mx-4 sm:mx-12 md:mx-16 lg:mx-20 rounded-lg shadow-md hero-wrapper">
            <Swiper
                className="w-full max-w-full"
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{delay : 5000}}
                >
                {
                    heroImgs.map(heroImg => (
                        <SwiperSlide key={heroImg._id}>
                            <Box>
                                <Box className="w-full h-[200px] lg:h-[300px] xl:h-[400px] overflow-hidden rounded-lg shadow-md cursor-pointer" onClick={() => handleSubmit(heroImg)}>
                                    <img src={heroImg.image.url} alt={heroImg.title} className="w-full h-full object-fill"></img>
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>  
    )
}