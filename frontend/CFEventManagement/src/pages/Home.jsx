import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import { getApprovedEvents } from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { token } = useAuth(); // Import the auth token

  useEffect(() => {
    getApprovedEvents()
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrap">
      <Navbar />
      <section className="home-hero">
        <div className="container">
          <span className="section-tag">Community Crowdfunding</span>
          <h1 className="hero-title">Fund events<br />that <em>matter</em></h1>
          <p className="hero-sub">
            Discover and back community-driven events. Help bring ideas to life — one contribution at a time.
          </p>
          <div className="hero-actions">
            <Link to="/create-event" className="btn btn-primary hero-cta">Start an Event</Link>
            
            {/* Only show "Sign in" if the user is NOT logged in */}
            {!token && (
              <Link to="/login" className="btn btn-outline hero-cta">Sign in</Link>
            )}
          </div>
        </div>
      </section>

      <section className="home-events">
        <div className="container">
          <div className="events-toolbar">
            <h2 className="section-heading" style={{ fontSize: "var(--text-xl)", fontWeight: "800", letterSpacing: "-0.02em" }}>Live Events</h2>
            <div className="search-wrap">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="search-input"
                placeholder="Search events…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="events-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="ec-skeleton">
                  <div className="skeleton" style={{ height: "20px", width: "60%", marginBottom: "12px" }} />
                  <div className="skeleton" style={{ height: "14px", marginBottom: "8px" }} />
                  <div className="skeleton" style={{ height: "14px", width: "80%", marginBottom: "24px" }} />
                  <div className="skeleton" style={{ height: "6px" }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🎪</div>
              <h3>No events found</h3>
              <p>{search ? "Try a different search term." : "Be the first to create one!"}</p>
              <Link to="/create-event" className="btn btn-primary">Create an event</Link>
            </div>
          ) : (
            <div className="events-grid">
              {filtered.map(event => (
                <EventCard key={event.event_id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}