import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useQuery } from "react-query";


const uData = [40, 30, 20, 27, 18, 23, 34, 55];
const pData = [24, 13, 98, 39, 48, 38, 43, 66];
const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  "Aug"
];



export default function StackedBarChart() {

//   const queryBooking = useQuery(["Booking"], () =>
//     fetch("http://localhost:3001/booking/filter").then((res) => res.json())
//   );
// const allInfo = queryBooking.data.map((e)=>e.startDate)


// const months = allInfo.map(fecha => {
//   const date = new Date(fecha);
//   const numeroMes = date.getMonth() + 1;
//   return numeroMes;
// });

return (
  <div className="border-2 rounded-2xl pl-4 m-8">
    <div className="text-center text-2xl font-semibold pt-4">Previous earnings</div>
    <BarChart
      style={{ maxWidth: "80%" }}
      height={300}
      series={[
        { data: pData, label: 'Expected', id: 'pvId', stack: 'total' },
        { data: uData, label: 'Obtained', id: 'uvId', stack: 'total' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band', tickLabel: {
        angle: 90} }]} 
    />
  </div>
);
 

}