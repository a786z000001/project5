import { useState } from "react";

export default function AccessGate({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [input, setInput] = useState("");

  //const PASSWORD = import.meta.env.VITE_ACCESS_KEY;
  const PASSWORD = "TEST";

  if (allowed) return children;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Private Demo</h2>
      <p>This demo is access-controlled.</p>

      <input
        type="password"
        placeholder="Enter access key"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ padding: "8px", width: "240px" }}
      />

      <br /><br />

      <button
        onClick={() => {
          if (input === PASSWORD) setAllowed(true);
          else alert("Invalid access key");
        }}
        style={{ padding: "8px 16px" }}
      >
        Enter
      </button>
    </div>
  );
}
