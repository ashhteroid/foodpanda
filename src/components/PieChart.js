import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

function PieChart(prop) {
    const pieOptions = {
      title: "",
      pieHole: 0.6,
      slices: [
        {
          color: "#2BB673"
        },
        {
          color: "#d91e48"
        },
        {
          color: "#007fad"
        },
        {
          color: "#e9a227"
        }
      ],
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "233238",
          fontSize: 18
        }
      },
      tooltip: {
        showColorCode: true
      },
      chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%",
      },
      fontName: "Roboto",
      fontSize: 15,
    };
    return (
      <Chart
        chartType="PieChart"
        data={[
          ["Sugar", "Carbohydrate", "Fat", "Protein"],
          ["Carbohydrate", 10, 0, 0],
          ["Sugar", 14, 0, 0],
          ["Protein", 12, 0, 0],
          ["Fat", 5.5, 0, 0],
        ]}
        options={pieOptions}
        graph_id="PieChart"
        width={"100%"}
        height={"400px"}
        legend_toggle
      />
    );
  }

  export default PieChart;