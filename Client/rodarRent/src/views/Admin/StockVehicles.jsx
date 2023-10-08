import React from "react";
import car from "../../assets/img/car.png";

function StockVehicles(data) {
  const infoStock = data?.data.map((e) => e.id);
  return (
    <div className="flex items-center justify-center text-center">
    <img className="w-20 h-10 mr-2" src={car} alt={car} />

      <div>
        <h2 className="text-2xl font-semibold">Stock Cars</h2>
        <div className="text-3xl mt-2">
          {!data ? "" : `Total: ${infoStock.length} cars`}
        </div>
        <hr className="border-t-2 border-gray-300 w-3/4 mx-auto my-6" />
      </div>
    </div>
  );
}

export default StockVehicles;
