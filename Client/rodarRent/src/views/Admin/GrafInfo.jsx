import React, { useEffect, useState } from "react";
import * as echarts from "echarts";

export const GrafInfo =()=> {

    useEffect(() => {
        const chartContainer = document.getElementById("hireCancel");
    const hireCancel = echarts.init(chartContainer);
    
    const options = {
        grid: {},
        title: {
            text: "Hired vs Cancel",
            textStyle: {
                fontSize: 24,
                fontWeight: "bold",
            },
            left: "center",
            top: "5%",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            orient: "vertical",
            left: "0%",
            bottom: "0%",
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: true,
                height: "420px",
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
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
              { value: 1048, name: "Hired", itemStyle: { color: "green" } },
            { value: 735, name: "Cancel", itemStyle: { color: "red" } },
            { value: 580, name: "Pending", itemStyle: { color: "yellow" } },
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
    <div className="matriz2-1 h-chart rounded-lg bg-white drop-shadow-md border-2">
    <div id="hireCancel" className="w-full h-full"></div>
  </div>
)
}