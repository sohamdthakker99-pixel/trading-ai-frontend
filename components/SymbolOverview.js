import { useEffect, useRef } from "react";

export default function SymbolOverview({ symbols }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
      chartType: "area",
      backgroundColor: "#0F0F0F",
      fontFamily: "Trebuchet MS",
      symbols
    });

    container.current.innerHTML = "";
    container.current.appendChild(script);
  }, [symbols]);

  return <div ref={container} style={{ width: "100%", height: "100%" }} />;
}
