import React, { useEffect } from "react";
import * as echarts from "echarts";

const uData = [4, 7, 2, 2, 1, 2, 3, 5];
const pData = [24, 23, 18, 29, 18, 18, 23, 26];
const xLabels = ["Jan-23", "Feb-23", "Mar-23", "Apr-23", "May-23", "Jun-23", "Jul-23", "Aug-23"];

const EstadisticSales = () => {
  useEffect(() => {
    const chartContainer = document.getElementById("barChart");
    const myChart = echarts.init(chartContainer);

    const option = {
    
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Expected", "Obtained"],
        top: 10,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: xLabels,
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Expected",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          data: pData,
        },
        {
          name: "Obtained",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          data: uData,
          itemStyle: {
            color: "green",
          },
        },
      ],
    };

    myChart.setOption(option);

    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      myChart.dispose();
    };
  }, []);

  return (
    <div className="text-center text-2xl font-semibold"
     style={{ width: "100%", height: "90%" }}>
Rental Registration
      <div id="barChart" style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
};

export default EstadisticSales;
