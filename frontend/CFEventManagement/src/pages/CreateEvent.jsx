import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createEvent } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./CreateEvent.css";

export default function CreateEvent() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", target_amount: "", deadline: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const update = k => e => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title || !form.target_amount || !form.deadline) {
      setMsg({ type: "error", text: "Please fill in all required fields." }); return;
    }
    setLoading(true); setMsg({ type: "", text: "" });
    try {
      const res = await createEvent(form, token);
      if (res.message) {
        setMsg({ type: "success", text: res.message + " It will be reviewed by an admin." });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setMsg({ type: "error", text: res.error || "Failed to create event." });
      }
    } catch { setMsg({ type: "error", text: "Server error." }); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-wrap">
      <Navbar />
      <div className="create-page">
        <div className="container-narrow">
          <span className="section-tag">Submit for Review</span>
          <h1 className="create-title">Create New Event</h1>
          <p className="create-sub">Your event will be reviewed by an admin before going live for funding.</p>

          <div className="card create-card">
            {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="ev-title">Event Title <span style={{color:"var(--color-error)"}}>*</span></label>
              <input id="ev-title" type="text" className="form-input" placeholder="A clear, compelling title"
                value={form.title} onChange={update("title")} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ev-desc">Description</label>
              <textarea id="ev-desc" className="form-textarea"
                placeholder="Describe your event, its purpose, and why people should fund it…"
                value={form.description} onChange={update("description")} />
            </div>

            <div className="create-row">
              <div className="form-group">
                <label className="form-label" htmlFor="ev-amt">Target Amount (₹) <span style={{color:"var(--color-error)"}}>*</span></label>
                <input id="ev-amt" type="number" min="1" className="form-input" placeholder="e.g. 50000"
                  value={form.target_amount} onChange={update("target_amount")} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="ev-dl">Deadline <span style={{color:"var(--color-error)"}}>*</span></label>
                <input id="ev-dl" type="date" className="form-input"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.deadline} onChange={update("deadline")} />
              </div>
            </div>

            <div className="create-actions">
              <button className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting…" : "Submit Event →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

