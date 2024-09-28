import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { initialData } from "./data"; // Import data from data.js

const DynamicStockChart = () => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const getNewPoint = (i, data) => {
      const lastPoint = data[data.length - 1];

      if (i === 0 || i % 10 === 0) {
        return [
          lastPoint[0] + 60000,
          lastPoint[4],
          lastPoint[4],
          lastPoint[4],
          lastPoint[4],
        ];
      }
      const updatedLastPoint = data[data.length - 1];
      const newClose = Highcharts.correctFloat(
        lastPoint[4] + Highcharts.correctFloat(Math.random() - 0.5, 2),
        4,
      );

      return [
        updatedLastPoint[0],
        data[data.length - 2][4],
        newClose >= updatedLastPoint[2] ? newClose : updatedLastPoint[2],
        newClose <= updatedLastPoint[3] ? newClose : updatedLastPoint[3],
        newClose,
      ];
    };

    const options = {
      title: {
        text: "Time Based Bars",
      },
      xAxis: {
        overscroll: 500000,
        range: 4 * 200000,
        gridLineWidth: 1,
      },
      rangeSelector: {
        buttons: [
          {
            type: "minute",
            count: 15,
            text: "15m",
          },
          {
            type: "hour",
            count: 1,
            text: "1h",
          },
          {
            type: "all",
            text: "All",
          },
        ],
        selected: 1,
        inputEnabled: false,
      },
      navigator: {
        series: {
          color: "#000000",
        },
      },
      series: [
        {
          type: "candlestick",
          color: "#FF7F7F",
          upColor: "#90EE90",
          lastPrice: {
            enabled: true,
            label: {
              enabled: true,
              backgroundColor: "#FF7F7F",
            },
          },
          data: initialData, // Use imported data here
        },
      ],
      chart: {
        events: {
          load: function () {
            const chart = this,
              series = chart.series[0];

            let i = 0;

            setInterval(() => {
              const data = series.options.data;
              const newPoint = getNewPoint(i, data);
              const lastPoint = data[data.length - 1];

              // Add new point or update last one
              if (lastPoint[0] !== newPoint[0]) {
                series.addPoint(newPoint);
              } else {
                series.options.data[data.length - 1] = newPoint;
                series.setData(data);
              }
              i++;
            }, 100);
          },
        },
      },
    };

    // Set options for the chart
    setOptions(options);
  }, []);

  return (
    <div>
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

export default DynamicStockChart;
