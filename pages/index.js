import { useState } from "react";

export default function Home() {
  const [activePanel, setActivePanel] = useState(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function sendMessage() {
    const r = await fetch("https://trading-ai-backend-8yb4.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "soham-user-1",
        message
      })
    });

    const data = await r.json();
    setResponse(data.response);
  }

  const openPanel = (panel) => {
    if (activePanel === panel) setActivePanel(null);
    else setActivePanel(panel);
  };

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      background: "#0d0d0d"
    }}>

      {/* TRADINGVIEW CHART */}
      <iframe
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=NASDAQ:AAPL&interval=60&theme=dark"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          zIndex: 1
        }}
      />

      {/* ICON DOCK */}
      <div className="icon-dock" style={{ zIndex: 5 }}>
        <div className="icon-btn" onClick={() => openPanel("chat")}>💬</div>
        <div className="icon-btn" onClick={() => openPanel("news")}>📰</div>
        <div className="icon-btn" onClick={() => openPanel("watchlist")}>⭐</div>
        <div className="icon-btn" onClick={() => openPanel("portfolio")}>📊</div>
        <div className="icon-btn" onClick={() => openPanel("agent")}>🤖</div>
        <div className="icon-btn" onClick={() => openPanel("memory")}>🧠</div>
      </div>

      {/* FLOATING PANELS */}
      <div className={`slide-panel ${activePanel === "chat" ? "open" : ""}`}>
        <h2>AI Assistant</h2>
        <textarea
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            background: "#1a1a1a",
            border: "1px solid #333",
            color: "white",
            marginBottom: 10,
            padding: 10
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: "100%",
            padding: 10,
            background: "#2962ff",
            border: "none",
            borderRadius: 4,
            color: "white",
            cursor: "pointer"
          }}
        >
          Send
        </button>
        <div style={{
          marginTop: 20,
          padding: 10,
          background: "#111",
          borderRadius: 6,
          height: "60%",
          overflowY: "auto"
        }}>
          {response}
        </div>
      </div>

      {/* OTHER PANELS */}
      <div className={`slide-panel ${activePanel === "news" ? "open" : ""}`}>
        <h2>News</h2>
        <p>Market news will appear here.</p>
      </div>

      <div className={`slide-panel ${activePanel === "watchlist" ? "open" : ""}`}>
        <h2>Watchlist</h2>
      </div>

      <div className={`slide-panel ${activePanel === "portfolio" ? "open" : ""}`}>
        <h2>Portfolio</h2>
      </div>

      <div className={`slide-panel ${activePanel === "agent" ? "open" : ""}`}>
        <h2>Agent Monitor</h2>
      </div>

      <div className={`slide-panel ${activePanel === "memory" ? "open" : ""}`}>
        <h2>Stock Memory</h2>
      </div>

    </div>
  );
}
