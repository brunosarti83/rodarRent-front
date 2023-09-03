import aboutUsImage from '../../assets/img/aboutUs.webp'

const AboutUs = () => {
    return (
        <div className=' 2xl:h-noNavDesktop lg:h-noNavLaptop flex flex-col p-14 items-center font-poppins transition duration-300 dark:bg-slate-900 dark:text-gray-100' >
            <h1 data-aos='zoom-in' data-aos-duration='2000' className='text-landingDesktop ' >Hi, we are RodarRent!</h1>
            <p data-aos='fade-up' data-aos-duration='2000' data-aos-delay='500' className=' w-3/5 text-2xl mt-7 ' >We take pride in presenting a luxury car rental experience that surpasses all expectations.
                Founded with a passion for premium mobility and a commitment to excellence in mind.</p>
            <img data-aos='zoom-in'  data-aos-duration='2000' data-aos-delay='1000' src={aboutUsImage} alt="multipleCarsImage" />
        </div>
    )
}

export default AboutUs