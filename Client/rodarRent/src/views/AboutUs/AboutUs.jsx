import aboutUsImage from '../../assets/img/aboutUs.webp'
import Reviews from '../../components/Reviews/Reviews'

const AboutUs = () => {
    return (
        <div className='w-full flex flex-col p-14 xs:p-2 items-center justify-center font-poppins transition duration-300 dark:bg-slate-900 dark:text-gray-100' >
            <h1 data-aos='zoom-in' data-aos-duration='2000' className='py-2 md:py-8 flex justify-center text-3xl md:text-landingLg lg:text-landing2Xl' >Hi, we are RodarRent!</h1>
        <div className='w-full flex flex-col items-center justify-center'>
            <p data-aos='fade-up' data-aos-duration='2000' data-aos-delay='500' className=' w-5/6 text-2xl mt-7 ' >We take pride in presenting a luxury car rental experience that surpasses all expectations.
                Founded with a passion for premium mobility and a commitment to excellence in mind.</p>
            <img data-aos='zoom-in'  data-aos-duration='2000' data-aos-delay='1000' className='w-5/6' src={aboutUsImage} alt="multipleCarsImage" />
        </div>
        <Reviews />
        </div>
    )
}

export default AboutUs