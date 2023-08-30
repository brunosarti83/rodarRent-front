import landingImage from '../../assets/img/landingImage.png'
import audi from '../../assets/img/brandsLogos/audi.png'
import bentley from '../../assets/img/brandsLogos/bentley.png'
import bmw from '../../assets/img/brandsLogos/bmw.png';
import bugatti from '../../assets/img/brandsLogos/bugatti.png'
import chevrolet from '../../assets/img/brandsLogos/chevrolet.png'
import dodge from '../../assets/img/brandsLogos/dodge.png'
import mercedez from '../../assets/img/brandsLogos/mercedez.png'
import nissan from '../../assets/img/brandsLogos/nissan.png'
import porsche from '../../assets/img/brandsLogos/porsche.png'
import subaru from '../../assets/img/brandsLogos/subaru.png'
import volkswagen from '../../assets/img/brandsLogos/volkswagen.png'

function Landing() {

    let brandLogos = [
        { name: 'audi', src: audi },
        { name: 'bentley', src: bentley },
        { name: "bmw", src: bmw },
        { name: 'bugatti', src: bugatti },
        { name: "chevrolet", src: chevrolet },
        { name: "Dodge", src: dodge },
        { name: "merdez-benz", src: mercedez },
        { name: 'nissan', src: nissan },
        { name: "Porsche", src: porsche },
        { name: 'Subaru', src: subaru },
        { name: "Volkswagen", src: volkswagen }
    ]

    return (
        <div>
            <div className='flex' >
                <div className=' font-poppins pl-28 pt-10 w-2/5'>
                    <div className='text-landing font-extrabold' >
                        <h1>Premium</h1>
                        <h1>Car Rental</h1>
                        <h1>In Argentina</h1>
                    </div>
                    <p>We offer professional car rental  in our range of high-end vehicles.</p>
                </div>
                <div className='relative w-3/5 h-landing overflow-x-hidden' >
                    <img className='absolute scale-110 left-64' src={landingImage} alt="" />
                </div>
            </div>
            <div className='flex items-center justify-around p-5 h-28'>
                {brandLogos.map((brand,index)=>(
                    <div className=' w-36' key={index} >
                        <img className='w-full' key={index} src={brand.src} alt={brand.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Landing