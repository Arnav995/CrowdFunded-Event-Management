import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import {
  getAdminStats,
  getPendingEvents,
  getAllEvents,
  approveEvent,
  rejectEvent,
  checkExpired,
  getAllTransactions
} from "../services/api"
import { useAuth } from "../context/AuthContext"
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState(null)
  const [pendingEvents, setPendingEvents] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [transactions, setTransactions] = useState([])
  const [tab, setTab] = useState("pending")
  const [loading, setLoading] = useState(true)
  const [actionMsg, setActionMsg] = useState("")

  useEffect(() => {
    if (!token) return
    setLoading(true)
    Promise.all([
      getAdminStats(token),
      getPendingEvents(token),
      getAllEvents(token),
      getAllTransactions(token)
    ])
      .then(([s, pending, all, txs]) => {
        setStats(s)
        setPendingEvents(Array.isArray(pending) ? pending : [])
        setAllEvents(Array.isArray(all) ? all : [])
        setTransactions(Array.isArray(txs) ? txs : [])
      })
      .catch(err => {
        console.error("Dashboard Load Error:", err)
        setActionMsg("Failed to load admin data.")
      })
      .finally(() => setLoading(false))
  }, [token])

  const handleApprove = async (event_id) => {
    try {
      const res = await approveEvent(event_id, token)
      if (res.message) {
        setActionMsg(`✅ Event #${event_id} approved!`)
        setPendingEvents(prev => prev.filter(e => e.event_id !== event_id))
        const newStats = await getAdminStats(token)
        setStats(newStats)
      } else {
        setActionMsg(res.error || "Approval failed")
      }
    } catch { setActionMsg("Server error during approval.") }
  }

  const handleReject = async (event_id) => {
    try {
      const res = await rejectEvent(event_id, token)
      if (res.message) {
        setActionMsg(`Event #${event_id} rejected.`)
        setPendingEvents(prev => prev.filter(e => e.event_id !== event_id))
      } else {
        setActionMsg(res.error || "Rejection failed")
      }
    } catch { setActionMsg("Server error during rejection.") }
  }

  const handleCheckExpired = async () => {
    try {
      const res = await checkExpired(token)
      setActionMsg(res.message || "Expiration check complete")
    } catch { setActionMsg("Check expired failed.") }
  }

  return (
    <div className="page-wrap">
      <Navbar />
      <div className="admin-page">
        <div className="container">

          {/* Header */}
          <div className="admin-header">
            <div>
              <span className="section-tag">Admin Panel</span>
              <h1 className="admin-title">Admin Dashboard</h1>
            </div>
            <button className="btn btn-outline" onClick={handleCheckExpired}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
              Mark Expired
            </button>
          </div>

          {/* Action Message */}
          {actionMsg && (
            <div
              className={`alert ${actionMsg.includes("✅") ? "alert-success" : "alert-error"}`}
              style={{ marginBottom: "var(--space-6)" }}
            >
              {actionMsg}
            </div>
          )}

          {/* KPI Cards */}
          {!loading && stats && (
            <div className="kpi-grid" style={{ marginBottom: "var(--space-8)" }}>
              {[
                { label: "Total Users",  value: stats.total_users },
                { label: "Total Events", value: stats.total_events },
                { label: "Approved",     value: stats.approved_events },
                { label: "Funded",       value: stats.funded_events },
                { label: "Total Raised", value: `₹${Number(stats.total_money || 0).toLocaleString()}` },
              ].map(s => (
                <div className="kpi-card" key={s.label}>
                  <div className="kpi-value">{s.value ?? 0}</div>
                  <div className="kpi-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="tabs" style={{ marginBottom: "var(--space-6)" }}>
            <button className={`tab-btn ${tab === "pending" ? "active" : ""}`} onClick={() => setTab("pending")}>
              Pending ({pendingEvents.length})
            </button>
            <button className={`tab-btn ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
              All Events
            </button>
            <button className={`tab-btn ${tab === "transactions" ? "active" : ""}`} onClick={() => setTab("transactions")}>
              Transactions ({transactions.length})
            </button>
          </div>

          {/* Tab Content */}
          {loading ? (
            <div className="spinner-wrap"><div className="spinner" /></div>

          ) : tab === "pending" ? (
            pendingEvents.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">✅</div>
                <h3>All caught up!</h3>
                <p>No events pending review.</p>
              </div>
            ) : (
              <div className="pending-list">
                {pendingEvents.map(e => (
                  <div className="pending-card card" key={e.event_id}>
                    <div className="pending-info">
                      <div className="pending-meta">
                        <span className="badge badge-pending">pending</span>
                        <span className="pending-id">#{e.event_id}</span>
                        <span className="pending-date">Deadline: {new Date(e.deadline).toLocaleDateString("en-IN")}</span>
                      </div>
                      <h3 className="pending-title">{e.title}</h3>
                      <p className="pending-desc">{e.description?.slice(0, 140)}…</p>
                      <span className="pending-target">Target: ₹{Number(e.target_amount).toLocaleString()}</span>
                    </div>
                    <div className="pending-actions">
                      <button className="btn btn-success" onClick={() => handleApprove(e.event_id)}>✓ Approve</button>
                      <button className="btn btn-danger" onClick={() => handleReject(e.event_id)}>✗ Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            )

          ) : tab === "all" ? (
            allEvents.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎪</div>
                <h3>No events yet</h3>
                <p>Events created by users will appear here.</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr><th>#</th><th>Title</th><th>Status</th><th>Target</th><th>Raised</th><th>Deadline</th></tr>
                  </thead>
                  <tbody>
                    {allEvents.map(e => (
                      <tr key={e.event_id}>
                        <td className="td-muted">#{e.event_id}</td>
                        <td className="td-bold">{e.title}</td>
                        <td><span className={`badge badge-${e.status}`}>{e.status}</span></td>
                        <td>₹{Number(e.target_amount).toLocaleString()}</td>
                        <td className="td-amount">₹{Number(e.current_amount || 0).toLocaleString()}</td>
                        <td className="td-muted">{new Date(e.deadline).toLocaleDateString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          ) : tab === "transactions" ? (
            transactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💸</div>
                <h3>No transactions yet</h3>
                <p>Contributions will appear here once users start funding events.</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Event</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t, i) => (
                      <tr key={t.contribution_id ?? i}>
                        <td className="td-muted">#{t.contribution_id}</td>
                        <td className="td-bold">{t.user_name}</td>
                        <td className="td-muted">{t.email}</td>
                        <td>
                          <Link to={`/events/${t.event_id}`} className="td-link">
                            {t.event_title}
                          </Link>
                        </td>
                        <td className="td-amount">₹{Number(t.amount).toLocaleString()}</td>
                        <td className="td-muted">
                          {new Date(t.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : null}

        </div>
      </div>
    </div>
  )
}