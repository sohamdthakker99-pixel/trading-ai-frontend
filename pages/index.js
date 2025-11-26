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
    <div style={{ background: "#0d0d0d", height: "100vh" }}>

      {/* TRADINGVIEW FULL SCREEN */}
      <iframe
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=NASDAQ:AAPL&interval=60&theme=dark"
        style={{ width: "100%", height: "100%", border: "none" }}
      />

      {/* ICON DOCK */}
      <div className="icon-dock">
        <div className="icon-btn" onClick={() => openPanel("chat")}>💬</div>
        <div className="icon-btn" onClick={() => openPanel("news")}>📰</div>
        <div className="icon-btn" onClick={() => openPanel("watch")}>⭐</div>
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

      {/* NEWS PANEL */}
      <div className={`slide-panel ${activePanel === "news" ? "open" : ""}`}>
        <h2>News</h2>
        <p>Live market news coming soon...</p>
      </div>

      {/* WATCHLIST */}
      <div className={`slide-panel ${activePanel === "watch" ? "open" : ""}`}>
        <h2>Watchlist</h2>
        <p>Manage your tickers here.</p>
      </div>

      {/* PORTFOLIO */}
      <div className={`slide-panel ${activePanel === "portfolio" ? "open" : ""}`}>
        <h2>Portfolio</h2>
        <p>Your positions will appear here.</p>
      </div>

      {/* AGENT STATUS */}
      <div className={`slide-panel ${activePanel === "agent" ? "open" : ""}`}>
        <h2>Agent Monitor</h2>
        <p>Your agent status will appear here.</p>
      </div>

      {/* MEMORY */}
      <div className={`slide-panel ${activePanel === "memory" ? "open" : ""}`}>
        <h2>Stock Memory</h2>
        <p>All remembered information goes here.</p>
      </div>
    </div>
  );
}
