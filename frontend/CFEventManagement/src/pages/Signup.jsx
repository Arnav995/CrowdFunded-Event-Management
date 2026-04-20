import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";
import "./Auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const data = await signupUser(name, email, password);
      if (data.error) { setError(data.error); }
      else {
        setSuccess("Account created! Redirecting…");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch { 
      setError("Server error. Please try again."); 
    }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <Link to="/" className="auth-brand">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect x="2" y="2" width="24" height="24" rx="6" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 14 L14 8 L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 8 L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="8" cy="19" r="2" fill="currentColor"/>
            <circle cx="20" cy="19" r="2" fill="currentColor"/>
          </svg>
          CF Events
        </Link>

        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Join the community today</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full name</label>
            <input id="name" type="text" className="form-input" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input id="email" type="email" className="form-input" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input id="password" type="password" className="form-input" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? "Creating…" : "Create account →"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}