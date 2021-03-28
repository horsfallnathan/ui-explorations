import React, { useEffect, useRef, useState } from "react";
import { GoogleCharts } from "google-charts";

export default function ChartComponent() {
  // pre-define chart as a ref outside the draw function scope, to make it accessible to other functions
  const chartRef = useRef();

  // initialize client selection
  const [clientChoice, setClientChoice] = useState([1, 380]);
  const chartData = [
    [0, 0],
    [0.25, 100],
    [0.5, 190],
    [0.75, 300],
    [1, 380],
    [1.25, 460],
    [1.5, 500],
    [1.75, 500],
    [2, 495],
  ];
  /**
   * Creates html string for custom tooltip function.
   * - !!XSS risk if data is generated from client input
   * @param {number} xval x value from chart
   * @param {number} yval fy value from chart
   * @returns html string
   */
  const createTooltipHTML = (xval, yval) => {
    return `<div class="custom-tooltip">
    <p>X:${xval}</p>
    <p>Y:${yval}</p>
    </div>
    `;
  };
  /**
   * Draw function with chart configurations
   */
  const draw = () => {
    const line_chart_data = new GoogleCharts.api.visualization.DataTable();
    line_chart_data.addColumn("number", "Spend Fraction");
    line_chart_data.addColumn("number", "Social_Facebook");
    line_chart_data.addColumn({
      type: "string",
      role: "tooltip",
      p: { html: true },
    });
    line_chart_data.addRows(
      chartData.map((item) => [
        item[0],
        item[1],
        createTooltipHTML(item[0], item[1]),
      ])
    );
    // line_chart_data.
    const line_chart_options = {
      animation: { easing: "in" },
      tooltip: { isHtml: true },
      colors: ["#4338ca"],
      enableInteractivity: true,
      curveType: "function",
      chartArea: {
        width: "100%",
        left: 50,
        height: "100%",
        top: 50,
        bottom: 50,
      },
      legend: { position: "top", textStyle: { color: "#f0f0f0" } },
      hAxis: {
        title: "Fraction of actual spend",
        gridlines: { count: 8, color: "#3b3b3b" },
        baselineColor: "#b8b8b8",
        textStyle: {
          color: "#b8b8b8",
        },
        titleTextStyle: {
          color: "#f0f0f0",
        },
      },
      backgroundColor: {
        fill: "#252525",
      },
      vAxis: {
        gridlines: { color: "#3b3b3b" },
        minorGridlines: { color: "#3b3b3b" },
        baselineColor: "#b8b8b8",
        textStyle: {
          color: "#b8b8b8",
        },
      },
    };

    /**
     * Instantiate chart and attach to the DOM element
     */
    chartRef.current = new GoogleCharts.api.visualization.LineChart(
      document.getElementById("chart")
    );

    /**
     * Add listener for initial selection
     */
    GoogleCharts.api.visualization.events.addOneTimeListener(
      chartRef.current,
      "ready",
      initSelect
    );

    /**
     * Add listener for subsequent selections
     */
    GoogleCharts.api.visualization.events.addListener(
      chartRef.current,
      "select",
      selectHandler
    );

    /**
     * Pass data and chart options to private draw method
     */
    chartRef.current.draw(line_chart_data, line_chart_options);
  };

  /**
   * Recieve and save client's chart selection
   */
  const selectHandler = () => {
    const selection = chartRef.current.getSelection()[0];
    if (selection) {
      setClientChoice(chartData[selection.row]);
    }
  };

  /**
   * Initial selection if chart should be updated with client's previous choice.
   */
  const initSelect = () => {
    chartRef.current.setSelection([{ column: 1, row: 4 }]);
  };

  useEffect(() => {
    // Draw chart on page load
    GoogleCharts.load(draw);
  }, []);

  return (
    <div className="form-cont">
      <div>
        <h4>
          Your choice is: X: {clientChoice[0]}, Y: {clientChoice[1]}
        </h4>
      </div>
      <div id="chart" style={{ width: "500px", height: "300px" }}></div>
    </div>
  );
}
