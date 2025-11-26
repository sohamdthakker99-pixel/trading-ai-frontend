import { useState } from "react";

export default function Home() {
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

  return (
    <div style={{
      display: "flex",
      background: "#0d0d0d",
      height: "100vh",
      color: "white"
    }}>
      
      {/* LEFT SIDE — TRADINGVIEW CHART */}
      <div style={{ flex: 3, padding: 10 }}>
        <iframe
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12345&symbol=NASDAQ%3AAAPL&interval=60&theme=dark&style=1&timezone=exchange"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>

      {/* RIGHT SIDE — AI PANEL */}
      <div style={{
        flex: 1,
        borderLeft: "1px solid #222",
        padding: 20,
        display: "flex",
        flexDirection: "column"
      }}>
        
        <h2 style={{ marginBottom: 10 }}>AI Trading Copilot</h2>

        <textarea
          rows="6"
          placeholder="Ask the AI anything..."
          style={{
            width: "100%",
            padding: 10,
            background: "#1a1a1a",
            color: "white",
            border: "1px solid #333",
            borderRadius: 5
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            background: "#2962ff",
            border: "none",
            borderRadius: 5,
            color: "white",
            cursor: "pointer"
          }}
        >
          Send
        </button>

        <div
          style={{
            background: "#111",
            marginTop: 20,
            padding: 10,
            height: "100%",
            overflowY: "auto",
            borderRadius: 5
          }}
        >
          {response}
        </div>
      </div>

    </div>
  );
}
