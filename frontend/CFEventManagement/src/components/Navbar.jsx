import { useState, useEffect } from "react";   // ← ADD this line
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getWallet } from "../services/api";    // ← ADD this line
import "./Navbar.css";


export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ↓ ADD this block
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (!token) { setBalance(null); return; }

    getWallet(token).then(data => setBalance(data.wallet_balance ?? null));

    const interval = setInterval(() => {
      getWallet(token)
        .then(data => setBalance(data.wallet_balance ?? null))
        .catch(() => setBalance(null));
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);
  // ↑ END ADD

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", paddingInline: 0 }}>
        
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 12l10 10 10-10Z"/>
              <path d="M12 22V2"/>
            </svg>
          </span>
          CF Events
        </Link>

        <div className="navbar-links desktop-only">
          <Link to="/" className={`nav-link ${isActive("/")}`}>Browse</Link>
          
          {token ? (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive("/dashboard")}`}>Dashboard</Link>

              {/* ↓ ONLY this Wallet link is changed */}
              <Link to="/wallet" className={`nav-link nav-wallet-link ${isActive("/wallet")}`}>
                <h4>Wallet:</h4>
                {balance !== null && (
                  <span className="nav-wallet-bal">
                    ₹{Number(balance).toLocaleString("en-IN")}
                  </span>
                )}
              </Link>
              {/* ↑ END change */}

              <Link to="/create-event" className={`nav-link ${isActive("/create-event")}`}>+ New Event</Link>
              {user?.role === "admin" && (
                <Link to="/admin" className={`nav-link ${isActive("/admin")}`}>Admin</Link>
              )}
              <button className="btn btn-outline btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{ marginLeft: "var(--space-2)" }}>Sign Up</Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}