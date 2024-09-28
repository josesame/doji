import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const TTMSqueezeChart = () => {
  const [options, setOptions] = useState(null);

  // Function to generate oscillating TTM Squeeze-like data
  const generateTTMData = (numPoints = 100) => {
    const ttmData = [];
    let timestamp = Date.now();
    let value = 0;

    for (let i = 0; i < numPoints; i++) {
      const randomChange = (Math.random() - 0.5) * 1.5; // Random change with more volatility
      value = value + randomChange;

      // Ensure we get both positive and negative values around 0
      ttmData.push([timestamp, value]);
      timestamp += 86400000; // Move forward by one day (86400000 ms in a day)

      // Slowly reduce the amplitude of the oscillation as data progresses (optional)
      if (i % 10 === 0) value *= 0.9; // Example dampening effect to simulate real squeeze behavior
    }

    return ttmData;
  };

  // Function to calculate EMA
  const calculateEMA = (data, period = 10) => {
    const emaData = [];
    let multiplier = 2 / (period + 1);
    let previousEMA = data[0][1]; // Start with the first value as the initial EMA

    data.forEach(([timestamp, value], index) => {
      const ema = (value - previousEMA) * multiplier + previousEMA;
      emaData.push([timestamp, ema]);
      previousEMA = ema;
    });

    return emaData;
  };

  useEffect(() => {
    // Generate the dynamic TTM data
    const ttmData = generateTTMData(50); // Generate 50 data points for illustration

    // Calculate EMA for the TTM data
    const emaData = calculateEMA(ttmData, 10); // 10-period EMA

    const chartOptions = {
      chart: {
        type: "column",
        backgroundColor: "#ffffff", // Light background
      },
      title: {
        text: "The Mark Momentum Oscillator",
        style: {
          color: "#000000", // Dark text for the light theme
        },
      },
      xAxis: {
        type: "datetime",
        lineColor: "#000000",
        labels: {
          style: {
            color: "#000000",
          },
        },
      },
      yAxis: {
        title: {
          text: "Histogram",
          style: {
            color: "#000000",
          },
        },
        plotLines: [
          {
            value: 0,
            color: "#000000", // Black baseline
            width: 2,
            zIndex: 4,
          },
        ],
        labels: {
          style: {
            color: "#000000",
          },
        },
        gridLineColor: "#cccccc",
      },
      series: [
        {
          name: "Momentum",
          data: ttmData,
          color: "#90EE90", // Color for positive momentum
          negativeColor: "#FF7F7F", // Color for negative momentum
          tooltip: {
            valueDecimals: 2,
          },
        },
        {
          name: "EMA",
          type: "line",
          data: emaData,
          color: "#800080", // Purple color for EMA line
          lineWidth: 2,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
      plotOptions: {
        series: {
          borderWidth: 0,
          states: {
            hover: {
              brightness: 0.1,
            },
          },
        },
      },
      tooltip: {
        backgroundColor: "#f0f0f0",
        style: {
          color: "#000000",
        },
      },
      credits: {
        enabled: false,
      },
    };

    setOptions(chartOptions);
  }, []);

  return (
    <div style={{ height: "400px" }}>
      {options && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      )}
    </div>
  );
};

export default TTMSqueezeChart;
