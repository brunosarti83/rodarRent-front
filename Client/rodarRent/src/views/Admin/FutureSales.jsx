import React, { useEffect } from "react";
import * as echarts from "echarts";

const uData = [28, 23, 28, 26, 25, 24];
const pData = [26, 26, 28, 28, 30, 27];
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
        min:18,
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
