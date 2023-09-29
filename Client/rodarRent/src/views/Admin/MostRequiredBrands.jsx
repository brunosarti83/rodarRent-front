import { PieChart } from "@mui/x-charts/PieChart";
// import { useQuery } from "react-query";
// import { API_BASE_URL } from "../../helpers/routes";


const data = [
  { label: "Mercedes Benz", value: 15 },
  { label: "Volkswagen", value: 13 },
  { label: "Chevrolet", value: 8 },
  { label: "Ford", value: 8 },
  { label: "Audi", value: 7 },
  { label: "Nissan", value: 4 },
];

export default function MostRequiredBrands() {

//   const brandRequired = useQuery(["mostRequiredBrands"], () =>
//   fetch("http://localhost:3001/booking/mostRequiredBrands").then((res) => res.json())
// );

// console.log(brandRequired.data)

// const data = brandRequired?.data.map((e)=>({
//   label:e.model, 
//   value:e.count
// }))
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mt-4">Most Required Brands</h2>
      <div className="mt-4">
        <PieChart
          series={[
            {
              data: data,
              innerRadius: 0,
              outerRadius: 150,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -90,
              endAngle: 90,
              cx: 180,
              cy: 148,
            },
          ]}
          height={180}
          width={480}
        />
      </div>
    </div>
  );
}
