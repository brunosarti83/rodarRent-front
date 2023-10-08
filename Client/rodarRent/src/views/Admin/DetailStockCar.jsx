import React from "react";
import audi from "../../assets/img/brandsLogos/audi.svg";
import chevrolet from "../../assets/img/brandsLogos/chevrolet.png";
import fiat from "../../assets/img/brandsLogos/fiat.svg";
import ford from "../../assets/img/brandsLogos/ford.svg";
import honda from "../../assets/img/brandsLogos/honda.png";
import hyundai from "../../assets/img/brandsLogos/hyundai.png";
import jeep from "../../assets/img/brandsLogos/jeep.svg";
import mercedes from "../../assets/img/brandsLogos/mercedes.png";
import nissan from "../../assets/img/brandsLogos/nissan.svg";
import tesla from "../../assets/img/brandsLogos/tesla.png";
import toyota from "../../assets/img/brandsLogos/toyota.png";
import vw from "../../assets/img/brandsLogos/vw.png";

function DetailStockCar(data) {
  console.log(data);
  const allBrand = data?.data?.map((e) => e.brand);

  const audiCount = allBrand.filter((brand) => brand === "Audi").length;
  const chevroletCount = allBrand.filter((brand) => brand === "Chevrolet").length;
  const fiatCount = allBrand.filter((brand) => brand === "Fiat").length;
  const fordCount = allBrand.filter((brand) => brand === "Ford").length;
  const hondaCount = allBrand.filter((brand) => brand === "Honda").length;
  const hyundaiCount = allBrand.filter((brand) => brand === "Hyundai").length;
  const jeepCount = allBrand.filter((brand) => brand === "Jeep").length;
  const mercedesCount = allBrand.filter((brand) => brand === "Mercedes Benz").length;
  const nissanCount = allBrand.filter((brand) => brand === "Nissan").length;
  const teslaCount = allBrand.filter((brand) => brand === "Tesla").length;
  const toyotaCount = allBrand.filter((brand) => brand === "Toyota").length;
  const vwCount = allBrand.filter((brand) => brand === "Volkswagen").length;

  return (
    <div className="grid grid-cols-6">
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={audi} alt={audi} />
        <p>Stock: {audiCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={chevrolet} alt={chevrolet} />
        <p>Stock: {chevroletCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={fiat} alt={fiat} />
        <p>Stock: {fiatCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={ford} alt={ford} />
        <p>Stock: {fordCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={honda} alt={honda} />
        <p>Stock: {hondaCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={hyundai} alt={hyundai} />
        <p>Stock: {hyundaiCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={jeep} alt={jeep} />
        <p>Stock: {jeepCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={mercedes} alt={mercedes} />
        <p>Stock: {mercedesCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={nissan} alt={nissan} />
        <p>Stock: {nissanCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={tesla} alt={tesla} />
        <p>Stock: {teslaCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={toyota} alt={toyota} />
        <p>Stock: {toyotaCount}</p>
      </div>
      <div className="text-center flex flex-col items-center justify-center">
        <img className="w-10 h-10" src={vw} alt={vw} />
        <p>Stock: {vwCount}</p>
      </div>
    </div>
  );
}

export default DetailStockCar;
