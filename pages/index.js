import { useState } from "react";
import Chart from "../components/Chart";

import { useTicker } from "../hooks/useTicker";
export default function Home() {
  const [activePanel, setActivePanel] = useState(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const { currentTicker, setCurrentTicker } = useTicker();
  async function sendMessage() {
    const r = await fetch("https://trading-ai-backend-8yb4.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "soham-user-1",
        message,
      }),
    });
    const data = await r.json();
    setResponse(data.response);
  }

  return (
    <div
      id="app-wrapper"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#0d0d0d",
      }}
    >
      {/* ==== CHART LAYER - Now using Lightweight Charts ==== */}
      <div
        id="chart-container"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
          width: "100%",
          height: "100%",
        }}
      >
        <Chart ticker={currentTicker} />
      </div>

      {/* ==== ICON DOCK ==== */}
      <div
        id="icon-dock"
        style={{
          position: "absolute",
          right: activePanel ? "30vw" : "0",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          zIndex: 100,
          paddingRight: "6px",
          transition: "right 0.35s ease-in-out",
        }}
      >
        {["chat", "news", "watchlist", "portfolio", "agent", "memory"].map(
          (panel, i) => (
            <div
              key={panel}
              onClick={() =>
                setActivePanel(activePanel === panel ? null : panel)
              }
              style={{
                width: "45px",
                height: "45px",
                background: "#111",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: "1px solid #222",
                fontSize: "22px",
              }}
            >
              {["💬", "📰", "⭐", "📊", "🤖", "🧠"][i]}
            </div>
          )
        )}
      </div>

      {/* ==== FLOATING SLIDE PANEL ==== */}
      <div
        id="floating-panel"
        style={{
          position: "absolute",
          top: 0,
          right: activePanel ? "0" : "-32vw",
          width: "30vw",
          maxWidth: "420px",
          height: "100vh",
          background: "rgba(15, 15, 15, 0.92)",
          backdropFilter: "blur(10px)",
          borderLeft: "1px solid #222",
          boxShadow: activePanel
            ? "-8px 0 18px rgba(0,0,0,0.6)"
            : "none",
          padding: "24px",
          transition: "right 0.35s ease-in-out",
          zIndex: 50,
          overflowY: "auto",
          color: "white",
        }}
      >
        {activePanel === "chat" && (
          <>
            <h2>AI Assistant</h2>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: "100%",
                background: "#1a1a1a",
                border: "1px solid #333",
                padding: "10px",
                color: "white",
                marginBottom: "12px",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                width: "100%",
                padding: "12px",
                background: "#2962ff",
                border: "none",
                borderRadius: "6px",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
            <div
              style={{
                marginTop: "20px",
                background: "#111",
                padding: "14px",
                minHeight: "200px",
                borderRadius: "8px",
              }}
            >
              {response}
            </div>
          </>
        )}

        {activePanel === "news" && (
          <>
            <h2>News</h2>
            <p>Market news will appear here.</p>
          </>
        )}

        {activePanel === "watchlist" && (
          <>
            <h2>Watchlist</h2>
            <p>Your saved stocks go here.</p>
            <div style={{ marginTop: "12px" }}>
              {["BTC", "ETH", "SOL", "AAPL"].map((t) => (
                <button
                  key={t}
                  onClick={() => setCurrentTicker(t)}
                  style={{
                    margin: "4px",
                    padding: "8px 16px",
                    background: currentTicker === t ? "#2962ff" : "#222",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}

        {activePanel === "portfolio" && (
          <>
            <h2>Portfolio</h2>
            <p>Your positions will appear here.</p>
          </>
        )}

        {activePanel === "agent" && (
          <>
            <h2>Agent Monitor</h2>
            <p>Active tasks and tracking will appear here.</p>
          </>
        )}

        {activePanel === "memory" && (
          <>
            <h2>Stock Memory</h2>
            <p>AI memory related to stocks appears here.</p>
          </>
        )}
      </div>
    </div>
  );
}
