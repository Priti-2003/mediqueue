import React, { useState, useEffect } from "react";
import axios from "axios";
import { commonStyles } from "../theme";

function QueueTracker() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [myToken, setMyToken] = useState("");
  const [searched, setSearched] = useState(false);

  const loadQueue = async () => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointments/doctor/${doctorId}/queue`,
      );
      setQueue(res.data);
      setSearched(true);
    } catch (err) {
      alert("Error loading queue!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (doctorId && searched) {
      const interval = setInterval(loadQueue, 30000);
      return () => clearInterval(interval);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId, searched]);

  const waiting = queue.filter(
    (a) => a.status === "BOOKED" || a.status === "WAITING",
  );

  const myPosition = myToken
    ? waiting.findIndex((a) => a.tokenNumber === parseInt(myToken)) + 1
    : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case "BOOKED":
        return "#00ffb4";
      case "WAITING":
        return "#ffaa00";
      case "IN_CONSULTATION":
        return "#00d4ff";
      case "CONSULTED":
        return "#7b2fff";
      case "CANCELLED":
        return "#ff4444";
      default:
        return "#444";
    }
  };

  return (
    <div style={styles.page}>
      <style>
        {commonStyles}
        {`
        @keyframes pulse {
          0%{transform:scale(1)}
          50%{transform:scale(1.05)}
          100%{transform:scale(1)}
        }
        @keyframes blink {
          0%{opacity:1} 50%{opacity:0.3} 100%{opacity:1}
        }
        @keyframes slideIn {
          from{opacity:0;transform:translateX(-20px)}
          to{opacity:1;transform:translateX(0)}
        }
        .queue-item {
          animation: slideIn 0.4s ease;
          transition: all 0.3s;
        }
        .queue-item:hover {
          transform: translateX(6px);
          border-color: #00d4ff !important;
        }
        .live-dot {
          animation: blink 1.5s infinite;
        }
        .my-token {
          animation: pulse 2s infinite;
        }
      `}
      </style>

      <div className="grid-bg"></div>
      <div className="scanline"></div>
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span style={styles.logoEmoji}>🏥</span>
          <span style={styles.logoText}>MediQueue</span>
          <span style={styles.liveBadge}>
            <span className="live-dot" style={styles.liveDot}></span>
            LIVE
          </span>
        </div>
        <button
          style={styles.backBtn}
          onClick={() => (window.location.href = "/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      <div style={styles.topLine}></div>

      <div style={styles.content}>
        {/* Title */}
        <div style={styles.titleSection}>
          <h1 style={styles.title}>📊 Live Queue Tracker</h1>
          <p style={styles.titleSub}>
            Real-time queue updates every 30 seconds
          </p>
        </div>

        {/* Search Section */}
        <div style={styles.searchCard}>
          <div style={styles.topBorder}></div>
          <h3 style={styles.searchTitle}>Find Your Queue</h3>

          <div style={styles.searchRow}>
            {/* Doctor ID */}
            <div className="ibox" style={styles.ibox}>
              <span style={styles.icon}>👨‍⚕️</span>
              <input
                style={styles.input}
                type="number"
                placeholder="Enter Doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              />
            </div>

            {/* My Token */}
            <div className="ibox" style={styles.ibox}>
              <span style={styles.icon}>🎫</span>
              <input
                style={styles.input}
                type="number"
                placeholder="My Token Number"
                value={myToken}
                onChange={(e) => setMyToken(e.target.value)}
              />
            </div>

            <button
              className="btn-main"
              style={styles.searchBtn}
              onClick={loadQueue}
            >
              {loading ? "⏳" : "🔍 Track"}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        {searched && (
          <div style={styles.statsRow}>
            {[
              {
                label: "Total Tokens",
                value: queue.length,
                color: "#00ffb4",
                icon: "📋",
              },
              {
                label: "Waiting",
                value: waiting.length,
                color: "#ffaa00",
                icon: "⏳",
              },
              {
                label: "Consulted",
                value: queue.filter((a) => a.status === "CONSULTED").length,
                color: "#7b2fff",
                icon: "✅",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  ...styles.statCard,
                  borderColor: s.color + "33",
                }}
              >
                <span style={{ fontSize: "28px" }}>{s.icon}</span>
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: "900",
                    color: s.color,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    color: "#444",
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* My Position */}
        {myToken && searched && myPosition > 0 && (
          <div className="my-token" style={styles.myPositionCard}>
            <div style={styles.myPositionTop}>
              <span style={styles.myPositionLabel}>
                🎫 YOUR POSITION IN QUEUE
              </span>
            </div>
            <div style={styles.myPositionNum}>{myPosition}</div>
            <p style={styles.myPositionSub}>
              {myPosition === 1
                ? "🚨 You are NEXT! Please be ready!"
                : `${myPosition - 1} patient(s) ahead of you`}
            </p>
            <div style={styles.waitTime}>
              ⏱ Est. wait: ~{myPosition * 10} minutes
            </div>
          </div>
        )}

        {/* Queue List */}
        {searched && (
          <div style={styles.queueSection}>
            <div style={styles.queueHeader}>
              <h3 style={styles.queueTitle}>Queue List</h3>
              <button style={styles.refreshBtn} onClick={loadQueue}>
                🔄 Refresh
              </button>
            </div>

            {queue.length === 0 ? (
              <div style={styles.emptyBox}>
                <p style={{ fontSize: "40px" }}>🏥</p>
                <p style={{ color: "#555", marginTop: "10px" }}>
                  No appointments in queue
                </p>
              </div>
            ) : (
              queue.map((apt, i) => (
                <div
                  key={apt.id}
                  className="queue-item"
                  style={{
                    ...styles.queueItem,
                    borderLeft: `3px solid ${getStatusColor(apt.status)}`,
                    backgroundColor:
                      myToken && apt.tokenNumber === parseInt(myToken)
                        ? "#0a1a0a"
                        : "#0d0d0d",
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  {/* Token */}
                  <div style={styles.tokenBadge}>
                    <span
                      style={{
                        color: getStatusColor(apt.status),
                        fontFamily: "'Orbitron', sans-serif",
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      #{apt.tokenNumber}
                    </span>
                    {myToken && apt.tokenNumber === parseInt(myToken) && (
                      <span style={styles.youBadge}>YOU</span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={styles.queueInfo}>
                    <p style={styles.patientName}>
                      👤 {apt.patient?.fullName || "Patient"}
                    </p>
                    <p style={styles.aptDate}>📅 {apt.appointmentDate}</p>
                  </div>

                  {/* Status */}
                  <div
                    style={{
                      ...styles.statusBadge,
                      color: getStatusColor(apt.status),
                      borderColor: getStatusColor(apt.status) + "44",
                      backgroundColor: getStatusColor(apt.status) + "11",
                    }}
                  >
                    {apt.status}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#050505",
    fontFamily: "'Exo 2', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  orb1: {
    position: "fixed",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
    top: "-150px",
    left: "-150px",
    pointerEvents: "none",
  },
  orb2: {
    position: "fixed",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(123,47,255,0.06) 0%, transparent 70%)",
    bottom: "-100px",
    right: "-100px",
    pointerEvents: "none",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    backgroundColor: "#0a0a0a",
    borderBottom: "1px solid #151515",
    position: "relative",
    zIndex: 10,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoEmoji: { fontSize: "26px" },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#00ffb4",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "2px",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    backgroundColor: "#ff000011",
    border: "1px solid #ff000033",
    borderRadius: "20px",
    color: "#ff4444",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
  },
  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#ff4444",
    display: "inline-block",
  },
  backBtn: {
    padding: "8px 18px",
    backgroundColor: "transparent",
    color: "#00d4ff",
    border: "1px solid #00d4ff22",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
  },
  topLine: {
    height: "1px",
    background: "linear-gradient(90deg,transparent,#00d4ff,transparent)",
    position: "relative",
    zIndex: 10,
  },
  content: {
    padding: "40px 60px",
    position: "relative",
    zIndex: 5,
    maxWidth: "900px",
    margin: "0 auto",
  },
  titleSection: { marginBottom: "30px" },
  title: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
    fontFamily: "'Orbitron', sans-serif",
  },
  titleSub: { color: "#444", fontSize: "14px", marginTop: "8px" },
  searchCard: {
    backgroundColor: "#0d0d0d",
    border: "1px solid #1a1a1a",
    borderRadius: "16px",
    padding: "28px",
    marginBottom: "24px",
    position: "relative",
  },
  topBorder: {
    position: "absolute",
    top: 0,
    left: "15%",
    width: "70%",
    height: "2px",
    background: "linear-gradient(90deg,transparent,#00d4ff,transparent)",
  },
  searchTitle: {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  searchRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  ibox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: "12px",
    padding: "4px 16px",
    flex: 1,
  },
  icon: { fontSize: "18px", marginRight: "10px" },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "15px",
    padding: "12px 4px",
    fontFamily: "'Exo 2', sans-serif",
  },
  searchBtn: {
    padding: "14px 24px",
    background: "linear-gradient(135deg, #00d4ff, #0099cc)",
    color: "#050505",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  statsRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    border: "1px solid",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  myPositionCard: {
    backgroundColor: "#050f0a",
    border: "2px solid #00ffb433",
    borderRadius: "16px",
    padding: "28px",
    textAlign: "center",
    marginBottom: "24px",
    boxShadow: "0 0 40px rgba(0,255,180,0.15)",
  },
  myPositionTop: {
    marginBottom: "12px",
  },
  myPositionLabel: {
    color: "#00ffb4",
    fontSize: "12px",
    letterSpacing: "2px",
    fontWeight: "700",
  },
  myPositionNum: {
    fontSize: "72px",
    fontWeight: "900",
    color: "#00ffb4",
    fontFamily: "'Orbitron', sans-serif",
    textShadow: "0 0 30px rgba(0,255,180,0.5)",
    lineHeight: "1",
  },
  myPositionSub: {
    color: "#888",
    fontSize: "14px",
    marginTop: "8px",
  },
  waitTime: {
    marginTop: "12px",
    padding: "8px 20px",
    backgroundColor: "#00ffb411",
    border: "1px solid #00ffb422",
    borderRadius: "20px",
    display: "inline-block",
    color: "#00ffb4",
    fontSize: "13px",
  },
  queueSection: { marginTop: "8px" },
  queueHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  queueTitle: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "600",
  },
  refreshBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#00d4ff",
    border: "1px solid #00d4ff33",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
  },
  emptyBox: {
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#0d0d0d",
    borderRadius: "16px",
    border: "1px solid #1a1a1a",
  },
  queueItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0d0d0d",
    border: "1px solid #1a1a1a",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "10px",
  },
  tokenBadge: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: "80px",
  },
  youBadge: {
    padding: "2px 8px",
    backgroundColor: "#00ffb422",
    color: "#00ffb4",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "1px",
    border: "1px solid #00ffb433",
  },
  queueInfo: { flex: 1, paddingLeft: "20px" },
  patientName: {
    color: "#888",
    fontSize: "14px",
    margin: "0 0 4px 0",
  },
  aptDate: { color: "#444", fontSize: "12px", margin: 0 },
  statusBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "1px",
  },
};

export default QueueTracker;
