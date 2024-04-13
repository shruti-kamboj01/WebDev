
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import Course_Card from './Course_Card';


const Course_Slider = ({Courses}) => {
  
//  console.log("course",Courses)

  return (
    <div className='text-white'>
    {Courses.length > 0 ? (
      <Swiper navigation={true} 
     slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
   
   className="mySwiper">
       {Courses?.map((course,i) => (
        <SwiperSlide>
           <Course_Card course={course} Height={"h-[220px]"}/>
        </SwiperSlide>
       ))}
       
       
      </Swiper>
    ) :
     (<p className="text-xl text-richblack-5">No course Found</p>)
    }
    

    </div>
  )
}

export default Course_Slider
