import { useEffect, useRef } from "react";

export default function AdvancedChart({ symbol = "NASDAQ:AAPL" }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      autosize: true,
      interval: "D",
      theme: "dark",
      style: "1",
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      backgroundColor: "#0F0F0F",
      gridColor: "rgba(242,242,242,0.06)",
      timezone: "Etc/UTC",
      allow_symbol_change: true
    });

    container.current.innerHTML = "";
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container"
      style={{ width: "100%", height: "100%" }}
      ref={container}
    />
  );
}
