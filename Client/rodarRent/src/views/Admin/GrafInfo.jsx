import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useQuery } from "react-query";


export const GrafInfo =()=> {

//     const querySummary = useQuery(["summary"], () =>
//     fetch("http://localhost:3001/booking/summary").then((res) => res.json())
//   );

//   const dataSummary = querySummary.data

    useEffect(() => {
        const chartContainer = document.getElementById("hireCancel");
    const hireCancel = echarts.init(chartContainer);
    
    const options = {
        grid: {},
        title: {
            text: "State Registry",
            textStyle: {
                fontSize: 20,
                fontWeight: "bold",
            },
            left: "center",
            top: "10",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "25",
            bottom: "80",
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "80%"],
                avoidLabelOverlap: true,
                height: "250px",
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                left:85,
                top:40,
                label: {
                    show: false,
                    position: "center",
                },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
        },
          labelLine: {
            show: false,
        },
          data: [
              { value: 735, name: "Cancel", itemStyle: { color: "red" } },
              { value: 1048, name: "Hired", itemStyle: { color: "green" } },
            { value: 580, name: "Pending", itemStyle: { color: "yellow" } },
            { value: 480, name: "Aprobed", itemStyle: { color: "blue" } },

        ],
    },
],
};

hireCancel.setOption(options);
return () => {
    hireCancel.dispose();
};
});

return (
    <div className="h-full">
    <div id="hireCancel" className=" h-72"></div>
  </div>
)
}