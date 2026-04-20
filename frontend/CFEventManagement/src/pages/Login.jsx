import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        login(data.token, data.user);
        navigate(data.user?.role === "admin" ? "/admin" : "/dashboard");
      } else {
        setError(data.error || "Login failed.");
      }
    } catch { setError("Server error. Please try again."); }
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

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">Sign in to your account</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
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
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        <p className="auth-switch">
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}