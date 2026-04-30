import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getWallet, addMoney } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Wallet.css";

const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000];

export default function Wallet() {
  const { token } = useAuth();
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const fetchBalance = () => {
    getWallet(token)
      .then((data) => setBalance(data.wallet_balance ?? 0))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBalance(); }, [token]);

  const handleAdd = async () => {
    const parsed = parseFloat(amount);
    if (!parsed || parsed <= 0) {
      setMsg({ type: "error", text: "Enter a valid amount." });
      return;
    }
    setAdding(true);
    setMsg({ type: "", text: "" });
    const res = await addMoney(token, parsed);
    setAdding(false);
    if (res.message) {
      setMsg({ type: "success", text: `₹${parsed.toLocaleString()} added successfully!` });
      setAmount("");
      fetchBalance();
    } else {
      setMsg({ type: "error", text: res.error || "Failed to add money." });
    }
  };

  return (
    <div className="page-wrap">
      <Navbar />
      <div className="container wallet-container">

        {/* Header */}
        <div className="wallet-header">
          <div>
            <div className="tag">My Finances</div>
            <h1 className="wallet-title">Wallet</h1>
            <p className="wallet-sub">Add funds to contribute to events</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="wallet-balance-card">
          <span className="wallet-balance-label">Available Balance</span>
          {loading ? (
            <div className="wallet-balance-skeleton" />
          ) : (
            <span className="wallet-balance-amount">
              ₹{Number(balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          )}
          <span className="wallet-balance-note">Ready to use for contributions</span>
        </div>

        {/* Add Money Card */}
        <div className="wallet-add-card">
          <h2 className="wallet-add-title">Add Money</h2>

          {msg.text && (
            <div className={msg.type === "error" ? "error-msg" : "success-msg"}>
              {msg.text}
            </div>
          )}

          {/* Quick amounts */}
          <div className="wallet-quick-label">Quick add</div>
          <div className="wallet-quick-amounts">
            {QUICK_AMOUNTS.map((q) => (
              <button
                key={q}
                className={`wallet-quick-btn ${amount == q ? "active" : ""}`}
                onClick={() => setAmount(String(q))}
              >
                ₹{q.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Custom amount input */}
          <div className="wallet-input-row">
            <div className="wallet-input-wrap">
              <span className="wallet-input-prefix">₹</span>
              <input
                type="number"
                min="1"
                placeholder="Enter custom amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="wallet-input"
              />
            </div>
            <button
              className="btn-primary wallet-add-btn"
              onClick={handleAdd}
              disabled={adding || !amount}
            >
              {adding ? "Adding..." : "Add Money →"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}