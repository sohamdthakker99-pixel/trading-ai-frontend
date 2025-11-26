import { useEffect, useRef } from "react";

export default function MiniChart({ symbol = "NASDAQ:AAPL" }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      autosize: true,
      dateRange: "12M",
      colorTheme: "dark",
      isTransparent: false,
      locale: "en"
    });

    container.current.innerHTML = "";
    container.current.appendChild(script);
  }, [symbol]);

  return (
    <div ref={container} style={{ width: "100%", height: "120px" }} />
  );
}
