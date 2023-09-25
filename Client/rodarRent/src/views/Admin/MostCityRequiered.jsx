import React, { useEffect } from "react";
import * as echarts from "echarts";

const MostCityRequiered = () => {
  useEffect(() => {
    // Datos de población de 4 ciudades (ejemplo)
    const data = [
      { name: "Aiport Mendoza", value: 4, color: "blue" },
      { name: "Oficce Mendoza", value: 8, color: "green" },
      { name: "MainOficce Bs As", value: 6, color: "red" },
      { name: "Aeroparque Bs As", value: 2, color: "yellow" },
    ];

    const chartContainer = document.getElementById("pieChart");
    const myChart = echarts.init(chartContainer);

    const option = {
      title: {
        text: "Most Requested Cities",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "horizontal",
        left: 10,
        top:30,
        // bottom: 90,
        data: data.map((item) => item.name),
      },
      series: [
        {
          name: "Locations",
          type: "pie",
          radius: ["20%", "40%"], 
          center: ["50%", "60%"], 
          data: data.map((item) => ({
            name: item.name,
            value: item.value,
            itemStyle: {
              color: item.color,
            },
          })),
          emphasis: {
            scale: true,
            scaleSize: 7,
            scaleRipple: true,
          },
          label: {
            show: true,
            position: "outside",
            formatter: "{b}: {d}%",
          },
        },
      ],
    };

    myChart.setOption(option);

    // Manejo de eventos de redimensionamiento
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
    <div className="w-full h-full">
      <div id="pieChart" className="w-full h-80"></div>
    </div>
  );
};

export default MostCityRequiered;
