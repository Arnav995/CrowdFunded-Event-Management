import { Link } from "react-router-dom";
import "./EventCard.css";

export default function EventCard({ event }) {
  const target = Number(event.target_amount);
  const raised = Number(event.current_amount || 0);
  const pct = Math.min(100, target > 0 ? (raised / target) * 100 : 0);
  
  // Calculate days left
  const daysLeft = Math.max(0, Math.ceil((new Date(event.deadline) - new Date()) / (1000 * 60 * 60 * 24)));

  return (
    <Link to={`/events/${event.event_id}`} className="card event-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      <div>
        <div className="ec-header" style={{ marginBottom: "var(--s3)" }}>
          <span className={`badge badge-${event.status}`}>
            {event.status === 'approved' ? 'LIVE' : event.status}
          </span>
          <span className="ec-days">{daysLeft}d left</span>
        </div>
        
        <div className="ec-body" style={{ marginBottom: "var(--s6)" }}>
          {/* Title - Switched to h6, bumped up to 1.6rem for a bigger, bolder presence */}
          <h6 
            className="ec-title" 
            style={{ 
              fontSize: "1.9rem", 
              fontWeight: "800", 
              lineHeight: "1.2", 
              marginBottom: "var(--s2)",
              letterSpacing: "-0.02em",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.4em" // Auto-scales with the new 1.6rem font size
            }}
          >
            {event.title}
          </h6>
          
          {/* Description - Clamped to exactly 3 lines */}
          <p 
            className="ec-desc" 
            style={{ 
              fontSize: "var(--text-sm)", 
              color: "var(--text-muted)", 
              lineHeight: "1.5",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {event.description}
          </p>
        </div>
      </div>

      <div className="ec-footer" style={{ marginTop: "auto" }}>
        <div style={{ marginBottom: "var(--s1)" }}>
          <span className="ec-raised" style={{ fontSize: "var(--text-lg)", fontWeight: "800", color: "var(--text)" }}>
            ₹{raised.toLocaleString()}
          </span>
          <span style={{ fontSize: "var(--text-xs)", color: "var(--text-muted)", marginLeft: "var(--s1)" }}>
            raised of ₹{target.toLocaleString()}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--s3)" }}>
          <div className="progress-track" style={{ flex: 1, height: "6px", background: "var(--surface-off)", borderRadius: "var(--r-full)", overflow: "hidden" }}>
            <div 
              className="progress-fill-bar" 
              style={{ width: `${pct}%`, height: "100%", background: "var(--accent)", borderRadius: "var(--r-full)", transition: "width 0.8s ease" }} 
            />
          </div>
          <span className="ec-pct" style={{ color: "var(--accent)", fontWeight: "700", fontSize: "var(--text-sm)", minWidth: "40px", textAlign: "right" }}>
            {Math.round(pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}