import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

function PieChart(prop) {
    const otherval = 100 - (prop.valuesForPie.carbohydrate[1] - prop.valuesForPie.fat[1]
                            - prop.valuesForPie.protein[1] - prop.valuesForPie.sugar[1]);
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
        },
        // {
        //   color: "#A9A9A9"
        // }
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
        top: 10,
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
          ["Sugar", "Percentage"],
          ["Carbohydrate", prop.valuesForPie.carbohydrate[1]],
          ["Sugar", prop.valuesForPie.sugar[1]],
          ["Protein", prop.valuesForPie.protein[1]],
          ["Fat", prop.valuesForPie.fat[1]],
          // ["Other", otherval],
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