import React, { useEffect } from "react";
import * as echarts from "echarts";

const uData = [20, 22, 27, 17, 20, 20];
const pData = [24, 22, 28, 22, 24, 28];
const xLabels = ["Oct-23", "Nov-23", "Dec-23", "Jan-24", "Feb-24", "Mar-24"];

export const FutureSales = () => {
  useEffect(() => {
    const chartContainer = document.getElementById("futureSalesChart");
    const futureSalesChart = echarts.init(chartContainer);

    const options = {
      grid: {
        top: 50,
        right: 10,
        bottom: 20,
      },
      title: {
        text: "Future Sales",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        left: "center",
        top: "5%",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Expected", "Obtained"],
        top: "15%",
      },
      xAxis: {
        type: "category",
        data: xLabels,
      },
      yAxis: {
        type: "value",
        min:15,
      },
      series: [
        {
          name: "Expected",
          type: "line",
          data: pData,
        },
        {
          name: "Obtained",
          type: "line",
          data: uData,
          itemStyle: {
            color: "green",
          },
        },
      ],
    };

    futureSalesChart.setOption(options);

    // Escucha el evento de redimensionamiento de la ventana para ajustar el tamaño del gráfico
    window.addEventListener("resize", () => {
      futureSalesChart.resize();
    });

    return () => {
      futureSalesChart.dispose();
    };
  }, []);

  return (
    <div id="futureSalesChart" style={{ width: "100%", height: "300px" }}></div>
  );
};
