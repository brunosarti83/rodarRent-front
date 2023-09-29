import React, { useEffect } from "react";
import * as echarts from "echarts";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../helpers/routes";

export const GrafInfo = () => {

  const querySummary = useQuery(["booking", "summary"], () =>
    fetch(`${API_BASE_URL}/booking/summary`).then((res) => res.json())
  );

  useEffect(() => {
    if (querySummary.isLoading || querySummary.isError) return;

    const chartContainer = document.getElementById("hireCancel");
    const hireCancel = echarts.init(chartContainer);

    const colorMappings = {
      verde: "blue",
      rojo: "red",
      amarillo: "yellow",
      azul: "green",
    };

    const data = querySummary?.data?.map((e) => ({
      name: e.stateBooking,
      value: e.count,
      itemStyle: {
        color: colorMappings[e.color] || "gray",
      },
    }));

    const options = {
      grid: {},
      title: {
        text: "State Registry",
        textStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color:"black",
          textAlign:"center"
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
          left: 85,
          top: 40,
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
          data: data,
        },
      ],
    };

    hireCancel.setOption(options);

    return () => {
      hireCancel.dispose();
    };
  }, [querySummary?.data]);

  return (
    <div className="h-full">
      <div id="hireCancel" className=" h-72"></div>
    </div>
  );
};
