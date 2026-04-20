import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getEventById, getEventProgress, contribute } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [progress, setProgress] = useState(null);
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);
  const [contributing, setContributing] = useState(false);

  useEffect(() => {
    Promise.all([getEventById(id), getEventProgress(id)])
      .then(([ev, prog]) => { setEvent(ev); setProgress(prog); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleContribute = async () => {
    if (!token) { navigate("/login"); return; }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setMsg({ type: "error", text: "Please enter a valid amount." }); return;
    }
    setContributing(true); setMsg({ type: "", text: "" });
    try {
      const res = await contribute(id, Number(amount), token);
      if (res.message) {
        setMsg({ type: "success", text: res.message }); setAmount("");
        const prog = await getEventProgress(id);
        setProgress(prog);
      } else {
        setMsg({ type: "error", text: res.error || "Contribution failed." });
      }
    } catch { setMsg({ type: "error", text: "Server error." }); }
    finally { setContributing(false); }
  };

  if (loading) return <div className="page-wrap"><Navbar /><div className="spinner-wrap"><div className="spinner" /></div></div>;
  if (!event || event.error) return <div className="page-wrap"><Navbar /><div className="not-found">Event not found.</div></div>;

  const pct = progress?.percentage ?? 0;
  const daysLeft = Math.max(0, Math.ceil((new Date(event.deadline) - new Date()) / 86400000));

  return (
    <div className="page-wrap">
      <Navbar />
      <div className="container" style={{ padding: "var(--space-12) var(--space-6)" }}>
        <div className="detail-grid">
          <div className="detail-main">
            <div className="detail-badges">
              <span className={`badge badge-${event.status}`}>{event.status}</span>
              <span className="detail-days">{daysLeft} days remaining</span>
            </div>
            <h1 className="detail-title">{event.title}</h1>
            <p className="detail-desc">{event.description}</p>
            
            {/* FIXED: Beautifully spaced and aligned meta row */}
            <div 
              className="detail-meta-row" 
              style={{ 
                display: "flex", 
                gap: "var(--s10)", 
                flexWrap: "wrap", 
                marginTop: "var(--s8)",
                paddingTop: "var(--s6)",
                borderTop: "1px solid var(--border)"
              }}
            >
              <div className="meta-block" style={{ display: "flex", flexDirection: "column", gap: "var(--s1)" }}>
                <span className="meta-label" style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: "700" }}>Deadline</span>
                <span className="meta-value" style={{ fontSize: "var(--text-lg)", fontWeight: "600", color: "var(--text)" }}>
                  {new Date(event.deadline).toLocaleDateString("en-IN", { dateStyle: "long" })}
                </span>
              </div>
              <div className="meta-block" style={{ display: "flex", flexDirection: "column", gap: "var(--s1)" }}>
                <span className="meta-label" style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: "700" }}>Target</span>
                <span className="meta-value" style={{ fontSize: "var(--text-lg)", fontWeight: "600", color: "var(--text)" }}>
                  ₹{Number(event.target_amount).toLocaleString()}
                </span>
              </div>
              <div className="meta-block" style={{ display: "flex", flexDirection: "column", gap: "var(--s1)" }}>
                <span className="meta-label" style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: "700" }}>Raised</span>
                <span className="meta-value meta-raised" style={{ fontSize: "var(--text-lg)", fontWeight: "800", color: "var(--accent)" }}>
                  ₹{Number(event.current_amount || progress?.current || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <aside className="contribute-box card">
            <div className="prog-section">
              <div className="prog-numbers" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "var(--s2)" }}>
                <div>
                  <span className="prog-raised" style={{ fontSize: "var(--text-2xl)", fontWeight: "800", color: "var(--text)", letterSpacing: "-0.02em" }}>
                    ₹{Number(progress?.current ?? 0).toLocaleString()}
                  </span>
                  <span className="prog-of" style={{ fontSize: "var(--text-sm)", color: "var(--text-muted)", marginLeft: "var(--s2)" }}>
                    of ₹{Number(progress?.target ?? event.target_amount).toLocaleString()}
                  </span>
                </div>
                
                <span className="prog-pct" style={{ fontSize: "var(--text-lg)", fontWeight: "700", color: "var(--accent)" }}>
                  {Math.round(pct)}%
                </span>
              </div>

              <div className="progress-track" style={{ height: "8px", margin: "var(--s4) 0", background: "var(--surface-off)", borderRadius: "var(--r-full)", overflow: "hidden" }}>
                <div className="progress-fill-bar" style={{ width: `${pct}%`, height: "100%", background: "var(--accent)", borderRadius: "var(--r-full)", transition: "width 0.8s ease" }} />
              </div>
            </div>

            {event.status === "approved" && (
              <div className="contrib-form">
                <h3 className="contrib-heading">Back this event</h3>
                {msg.text && <div className={`alert alert-${msg.type}`} style={{ marginBottom: "var(--space-3)" }}>{msg.text}</div>}
                <div className="form-group">
                  <label className="form-label" htmlFor="contrib-amount">Amount (₹)</label>
                  <input id="contrib-amount" type="number" min="1" className="form-input"
                    placeholder="e.g. 500" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
                <button className="btn btn-primary contrib-btn" onClick={handleContribute} disabled={contributing}>
                  {contributing ? "Processing…" : token ? "Contribute →" : "Login to Contribute"}
                </button>
              </div>
            )}
            {event.status === "funded" && (
              <div className="status-badge-box funded-box">🎉 Fully Funded!</div>
            )}
            {(event.status === "failed" || event.status === "rejected") && (
              <div className="status-badge-box failed-box">⏱ Campaign Ended</div>
            )}
            {event.status === "pending" && (
              <div className="status-badge-box pending-box">⏳ Awaiting Approval</div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}