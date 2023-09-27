import { PieChart } from "@mui/x-charts/PieChart";
import { Fullscreen } from "@mui/icons-material";

const data = [
  { label: "Tesla", value: 4 },
  { label: "BMW", value: 5 },
  { label: "Mercedes Benz", value: 3 },
  { label: "Audi", value: 2 },
  { label: "Toyota", value: 2 },
  { label: "Jeep", value: 1 },
];

export default function MostRequiredBrands() {
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
