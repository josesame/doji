import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const StockChart = () => {
  const [options, setOptions] = useState(null);

  console.log(options);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://demo-live-data.highcharts.com/aapl-ohlcv.json",
      );
      const data = await response.json();

      const ohlc = [];
      const volume = [];
      const dataLength = data.length;
      let previousCandleClose = 0;

      for (let i = 0; i < dataLength; i++) {
        ohlc.push([
          data[i][0], // the date
          data[i][1], // open
          data[i][2], // high
          data[i][3], // low
          data[i][4], // close
        ]);

        volume.push({
          x: data[i][0], // the date
          y: data[i][5], // the volume
          color: data[i][4] > previousCandleClose ? "#466742" : "#a23f43",
          labelColor: data[i][4] > previousCandleClose ? "#51a958" : "#ea3d3d",
        });
        previousCandleClose = data[i][4];
      }

      setOptions({
        rangeSelector: {
          enabled: false,
        },
        navigator: {
          enabled: false,
        },
        title: {
          text: "Candlestick and Volume",
        },
        plotOptions: {
          series: {
            marker: {
              enabled: false,
            },
          },
          candlestick: {
            color: "#ea3d3d",
            upColor: "#51a958",
            upLineColor: "#51a958",
            lineColor: "#ea3d3d",
          },
        },
        xAxis: {
          gridLineWidth: 1,
          crosshair: {
            snap: false,
          },
        },
        yAxis: [
          {
            height: "70%",
            crosshair: {
              snap: false,
            },
            accessibility: {
              description: "price",
            },
          },
          {
            top: "70%",
            height: "30%",
            accessibility: {
              description: "volume",
            },
          },
        ],
        tooltip: {
          shared: true,
          split: false,
          useHTML: true,
          shadow: false,
          positioner: function () {
            return { x: 50, y: 10 };
          },
        },
        series: [
          {
            type: "candlestick",
            id: "aapl",
            name: "AAPL Stock Price",
            data: ohlc,
            tooltip: {
              valueDecimals: 2,
              pointFormat:
                '<b>O</b> <span style="color: {point.color}">{point.open}</span> <b>H</b> <span style="color: {point.color}">{point.high}</span><br/><b>L</b> <span style="color: {point.color}">{point.low}</span> <b>C</b> <span style="color: {point.color}">{point.close}</span><br/>',
            },
          },
          {
            type: "column",
            name: "Volume",
            data: volume,
            yAxis: 1,
            borderRadius: 0,
            groupPadding: 0,
            pointPadding: 0,
            tooltip: {
              pointFormat:
                '<b>Volume</b> <span style="color: {point.labelColor}">{point.y}</span><br/>',
            },
          },
        ],
      });
    };

    fetchData();
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

export default StockChart;
