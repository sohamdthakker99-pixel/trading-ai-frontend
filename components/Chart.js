import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function Chart({ ticker = "AAPL" }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        background: { color: "#0d0d0d" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "#1e222d" },
        horzLines: { color: "#1e222d" },
      },
      timeScale: {
        borderColor: "#485c7b",
      },
      rightPriceScale: {
        borderColor: "#485c7b",
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    // Load data from Binance API
    fetch(`https://api.binance.com/api/v3/klines?symbol=${ticker}USDT&interval=1h`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(d => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        candleSeries.setData(formatted);
      });

    const handleResize = () => {
      chart.applyOptions({ width: chartRef.current.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [ticker]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
}
