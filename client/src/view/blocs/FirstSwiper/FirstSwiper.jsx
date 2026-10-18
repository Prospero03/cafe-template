import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay} from 'swiper/modules'

if (typeof window !== 'undefined'){
    require('./FisrtSwiper.scss')
    require('swiper/css')
}

const FirstSwiper = () => {
  return (
    <div className='first-swiper'>
        <Swiper
            className='first-swiper__swiper'
            modules={[Autoplay]}
            autoplay= {{ delay:5000 }}
            loop
            centeredSlides
            breakpoints={{
                1440:{
                    slidesPerView:1.5,
                    spaceBetween:24
                    
                },
                1080:{
                    slidesPerView:1.3,
                    spaceBetween:24
                },
                360:{
                    slidesPerView:1.1,
                    spaceBetween:24
                }
            }}
            >
            <SwiperSlide className='first-swiper__slide'>
                <div>ONE</div>
            </SwiperSlide>
            <SwiperSlide className='first-swiper__slide'>
                <div>TWO</div>
            </SwiperSlide>
            <SwiperSlide className='first-swiper__slide'>
                <div>THREE</div>
            </SwiperSlide>
            <SwiperSlide className='first-swiper__slide'>
                <div>FOUR</div>
            </SwiperSlide>
            <SwiperSlide className='first-swiper__slide'>
                <div>FIVE</div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default FirstSwiper