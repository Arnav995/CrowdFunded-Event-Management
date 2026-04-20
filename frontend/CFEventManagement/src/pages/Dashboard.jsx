import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUserEvents, getMyTransactions } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const { token, user } = useAuth();
  const [events, setEvents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [tab, setTab] = useState("events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUserEvents(token), getMyTransactions(token)])
      .then(([evs, txs]) => {
        setEvents(Array.isArray(evs) ? evs : []);
        setTransactions(Array.isArray(txs) ? txs : []);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const totalContributed = transactions.reduce((s, t) => s + Number(t.amount || 0), 0);

  return (
    <div className="page-wrap">
      <Navbar />
      <div className="dash-page">
        <div className="container">
          <div className="dash-header">
            <div>
              <span className="section-tag">My Account</span>
              <h1 className="dash-title">Dashboard</h1>
              <p className="dash-sub">Welcome back, <strong>{user?.name || "User"}</strong></p>
            </div>
            <Link to="/create-event" className="btn btn-primary">+ Create Event</Link>
          </div>

          <div className="kpi-grid" style={{ marginBottom: "var(--space-8)" }}>
            <div className="kpi-card">
              <div className="kpi-value">{events.length}</div>
              <div className="kpi-label">Events Created</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-value">{transactions.length}</div>
              <div className="kpi-label">Contributions Made</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-value">₹{totalContributed.toLocaleString()}</div>
              <div className="kpi-label">Total Contributed</div>
            </div>
          </div>

          <div className="tabs" style={{ marginBottom: "var(--space-6)" }}>
            <button className={`tab-btn ${tab === "events" ? "active" : ""}`} onClick={() => setTab("events")}>
              My Events
            </button>
            <button className={`tab-btn ${tab === "transactions" ? "active" : ""}`} onClick={() => setTab("transactions")}>
              My Contributions
            </button>
          </div>

          {loading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>
          ) : tab === "events" ? (
            events.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎭</div>
                <h3>No events yet</h3>
                <p>You haven't created any events. Start one today!</p>
                <Link to="/create-event" className="btn btn-primary">Create your first →</Link>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th><th>Status</th><th>Target</th>
                      <th>Raised</th><th>Deadline</th><th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(e => (
                      <tr key={e.event_id}>
                        <td className="td-bold">{e.title}</td>
                        <td><span className={`badge badge-${e.status}`}>{e.status}</span></td>
                        <td>₹{Number(e.target_amount).toLocaleString()}</td>
                        <td className="td-amount">₹{Number(e.current_amount || 0).toLocaleString()}</td>
                        <td className="td-muted">{new Date(e.deadline).toLocaleDateString("en-IN")}</td>
                        <td><Link to={`/events/${e.event_id}`} className="td-link">View →</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            transactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💸</div>
                <h3>No contributions yet</h3>
                <p>Browse events and support a cause you believe in.</p>
                <Link to="/" className="btn btn-primary">Browse events</Link>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event Supported</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, i) => (
                      <tr key={t.contribution_id ?? i}>
                        <td className="td-muted">
                          {t.created_at 
                            ? new Date(t.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" }) 
                            : "—"}
                        </td>
                        <td className="td-bold">
                          <Link to={`/events/${t.event_id}`} className="td-link" style={{ fontWeight: 600 }}>
                            {t.event_title || `Event #${t.event_id}`}
                          </Link>
                        </td>
                        <td>
                          <span className={`badge badge-${t.status || 'default'}`}>
                            {t.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="td-amount" style={{ textAlign: "right", color: "var(--color-primary)", fontWeight: 700 }}>
                          ₹{Number(t.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}