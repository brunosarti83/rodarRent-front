import landingImage from "../../assets/img/landingImage.webp";
import ford from "../../assets/img/brandsLogos/ford.svg";
import bentley from "../../assets/img/brandsLogos/bentley.svg";
import bmw from "../../assets/img/brandsLogos/bmw.svg";
import bugatti from "../../assets/img/brandsLogos/buggatti.svg";
import jeep from "../../assets/img/brandsLogos/jeep.svg";
import lambo from "../../assets/img/brandsLogos/lambo.svg";
import landRover from "../../assets/img/brandsLogos/landRover.svg";
import nissan from "../../assets/img/brandsLogos/nissan.svg";
import kia from "../../assets/img/brandsLogos/kia.svg";
import ferrari from "../../assets/img/brandsLogos/ferrari.svg";

function Landing() {
  let brandLogos = [
    { name: "ford", src: ford },
    { name: "bentley", src: bentley },
    { name: "bmw", src: bmw },
    { name: "bugatti", src: bugatti },
    { name: "jeep", src: jeep },
    { name: "lambo", src: lambo },
    { name: "land-rover", src: landRover },
    { name: "nissan", src: nissan },
    { name: "kia", src: kia },
    { name: "ferrari", src: ferrari },
  ];

  return (
    <div className=" bg-white transition duration-300 dark:bg-slate-900 text-black dark:text-gray-100 h-[calc(100vh-112px)] flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="w-full font-poppins 2xl:pl-20 xl:pl-16 lg:pl-14 md:pl-10 xs:pl-2 pt-10 lg:pt-16 sm:w-3/6"
        >
          <div className="w-full 2xl:text-landing2Xl xl:text-landingXl lg:text-landingLg md:text-landingMd sm:text-landingMd xs:text-landingMobile font-extrabold">
            <h1>Premium</h1>
            <h1>Car Rental</h1>
            <h1>In Argentina</h1>
          </div>
          <p>
            We offer professional car rental in our range of high-end vehicles.
          </p>
        </div>
        <div
          data-aos="fade-zoom-in"
          data-aos-duration="2000"
          data-aos-delay="1500"
          className="relative w-full sm:w-3/6 md:h-landingMd xs:h-landingXs overflow-hidden"
        >
          <img
            className="absolute 2xl:scale-125 xl:scale-150 lg:scale-150 md:scale-200 xs:scale-200 bottom-16 left-52 md:left-56  xs:left-45 "
            src={landingImage}
            alt=""
          />
        </div>
      </div>
      <div
        className=" 2xl:h-32 xl:h-32 lg:h-32 md:w-auto flex flex-row 2xl:flex-nowrap xl:flex-nowrap lg:flex-nowrap md:flex-wrap xs:flex-wrap items-center justify-evenly"
        >
        {brandLogos.map((brand, index) => (
          <div
            className="2xl:w-full xl:w-full lg:w-full md:w-1/5 xs:w-1/4 "
            key={index}
          >
            <img
              className="w-full"
              key={index}
              src={brand.src}
              alt={brand.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
