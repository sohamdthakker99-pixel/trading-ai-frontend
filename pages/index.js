import { useState } from "react";
import AdvancedChart from "../components/AdvancedChart";
import SymbolOverview from "../components/SymbolOverview";
import MiniChart from "../components/MiniChart";
import { useTicker } from "../hooks/useTicker";

export default function Home() {
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
    <div className="layout">
      {/* LEFT: Full TradingView Chart */}
      <div className="left-chart">
        <AdvancedChart symbol={`NASDAQ:${currentTicker}`} />
      </div>

      {/* RIGHT: Symbol Overview + Watchlist */}
      <div className="right-panel">
        <SymbolOverview
          symbols={[
            ["Apple", "NASDAQ:AAPL|1D"],
            ["Google", "NASDAQ:GOOGL|1D"],
            ["Microsoft", "NASDAQ:MSFT|1D"],
          ]}
        />

        <div className="watchlist">
          <h3 style={{ color: "white", marginBottom: "12px" }}>Watchlist</h3>
          <MiniChart symbol="NASDAQ:AAPL" />
          <MiniChart symbol="NASDAQ:TSLA" />
          <MiniChart symbol="NASDAQ:AMD" />
        </div>

        {/* AI Chat Section */}
        <div style={{ marginTop: "20px", padding: "10px" }}>
          <h3 style={{ color: "white" }}>AI Assistant</h3>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about stocks..."
            style={{
              width: "100%",
              background: "#1a1a1a",
              border: "1px solid #333",
              padding: "10px",
              color: "white",
              marginBottom: "8px",
              borderRadius: "4px",
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              width: "100%",
              padding: "10px",
              background: "#2962ff",
              border: "none",
              borderRadius: "4px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Send
          </button>
          {response && (
            <div
              style={{
                marginTop: "12px",
                background: "#111",
                padding: "10px",
                borderRadius: "4px",
                color: "#ccc",
              }}
            >
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
