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
        <div className=' bg-white transition duration-300 dark:bg-slate-900 text-black dark:text-gray-100 h-noNavDesktop lg:h-noNavLaptop flex flex-col' >
            <div className='flex'>
                <div data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine" data-aos-duration='1000' data-aos-delay='300' className='font-poppins pl-28 pt-10 w-2/5'>
                    <div className='text-landingDesktop lg:text-landingLaptop  font-extrabold' >
                        <h1>Premium</h1>
                        <h1>Car Rental</h1>
                        <h1>In Argentina</h1>
                        <volkswagen/>
                    </div>
                    <p>We offer professional car rental  in our range of high-end vehicles.</p>
                </div>
                <div data-aos="fade-zoom-in" data-aos-duration="2000" data-aos-delay="1500" className='relative w-3/5 h-landingDesktop lg:h-landingLaptop overflow-x-hidden' >
                    <img className='absolute scale-110  top-52  lg:top-40 left-64' src={landingImage} alt="" />
                </div>
            </div>
            <div data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-offset="0" className='flex flex-grow-1 items-center p-2  justify-between'>
                {brandLogos.map((brand, index) => (
                    <div className='w-36  lg:w-32' key={index} >
                        <img className=' w-full' key={index} src={brand.src} alt={brand.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Landing