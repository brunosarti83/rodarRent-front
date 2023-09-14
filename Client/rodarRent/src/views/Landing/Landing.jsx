import landingImage from '../../assets/img/landingImage.webp'
import ford from '../../assets/img/brandsLogos/ford.svg'
import bentley from '../../assets/img/brandsLogos/bentley.svg'
import bmw from '../../assets/img/brandsLogos/bmw.svg';
import bugatti from '../../assets/img/brandsLogos/buggatti.svg'
import jeep from '../../assets/img/brandsLogos/jeep.svg'
import lambo from '../../assets/img/brandsLogos/lambo.svg'
import landRover from '../../assets/img/brandsLogos/landRover.svg'
import nissan from '../../assets/img/brandsLogos/nissan.svg'
import kia from '../../assets/img/brandsLogos/kia.svg'
import ferrari from '../../assets/img/brandsLogos/ferrari.svg'
import fiat from '../../assets/img/brandsLogos/fiat.svg'

function Landing() {

    let brandLogos = [
        { name: 'ford', src: ford },
        { name: 'bentley', src: bentley },
        { name: "bmw", src: bmw },
        { name: 'bugatti', src: bugatti },
        { name: "jeep", src: jeep },
        { name: "lambo", src: lambo },
        { name: "land-rover", src: landRover },
        { name: 'nissan', src: nissan },
        { name: "kia", src: kia },
        { name: 'ferrari', src: ferrari },
        { name: "fiat", src: fiat }
    ]
    
    return (
        <div className=' bg-white transition duration-300 dark:bg-slate-900 text-black dark:text-gray-100 min-h-[calc(100vh-112px)] flex flex-col justify-between' >
            <div className='flex'>
                <div data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine" data-aos-duration='1000' data-aos-delay='300' className='font-poppins 2xl:pl-20 xl:pl-16 lg:pl-14 md:pl-10 pt-10 lg:pt-16 w-3/6'>
                    <div className='2xl:text-landing2Xl xl:text-landingXl lg:text-landingLg md:text-landingMd  font-extrabold' >
                        <h1>Premium</h1>
                        <h1>Car Rental</h1>
                        <h1>In Argentina</h1>
                    </div>
                    <p>We offer professional car rental  in our range of high-end vehicles.</p>
                </div>
                <div data-aos="fade-zoom-in" data-aos-duration="2000" data-aos-delay="1500" className='relative w-3/6 2xl:h-landingDesktop xl:h-landingLaptop lg:h-landingLaptop md:h-landingMd overflow-x-hidden' >
                    <img className='absolute 2xl:scale-125 xl:scale-150 lg:scale-150 md:scale-175 2xl:top-64 xl:top-68 lg:top-68 md:top-80 left-52 md:left-48 ' src={landingImage} alt="" />
                </div>
            </div>
            <div  className='flex items-center justify-evenly'>
                {brandLogos.map((brand, index) => (
                    <div className='w-44' key={index} >
                        <img className='w-full' key={index} src={brand.src} alt={brand.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Landing