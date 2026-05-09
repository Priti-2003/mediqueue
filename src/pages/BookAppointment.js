import React, { useState } from "react";
import axios from "axios";

function BookAppointment() {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const patientId = localStorage.getItem("userId");

  const handleBook = async () => {
    if (!doctorId || !date) {
      setIsError(true);
      setMessage("Please fill all fields!");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/appointments/book",
        { patientId, doctorId, date, notes },
      );
      setIsError(false);
      setToken(res.data.tokenNumber);
      setMessage("Appointment booked successfully!");
    } catch (err) {
      setIsError(true);
      setMessage("Booking failed! Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@300;400;600&display=swap');

        @keyframes fadeIn {
          from{opacity:0;transform:translateY(30px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes glow {
          0%{box-shadow:0 0 20px rgba(0,255,180,0.15)}
          50%{box-shadow:0 0 50px rgba(0,255,180,0.35)}
          100%{box-shadow:0 0 20px rgba(0,255,180,0.15)}
        }
        @keyframes tokenPop {
          0%{transform:scale(0);opacity:0}
          60%{transform:scale(1.15)}
          100%{transform:scale(1);opacity:1}
        }
        @keyframes spin {
          to{transform:rotate(360deg)}
        }
        @keyframes scanline {
          0%{top:0%}
          100%{top:100%}
        }
        .book-card{
          animation: fadeIn 0.7s ease, glow 3s infinite;
          transition: transform 0.3s ease;
        }
        .book-card:hover{
          transform: translateY(-8px) scale(1.01);
        }
        .ibox{
          transition: all 0.3s;
          border: 1px solid #1a1a1a !important;
        }
        .ibox:focus-within{
          border: 1px solid #00ffb4 !important;
          box-shadow: 0 0 20px rgba(0,255,180,0.15);
          background: #0d1a14 !important;
        }
        .book-btn{
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .book-btn:hover{
          transform: scale(1.04);
          box-shadow: 0 0 40px rgba(0,255,180,0.6);
        }
        .book-btn:active{
          transform: scale(0.98);
        }
        .token-card{
          animation: tokenPop 0.6s cubic-bezier(0.34,1.56,0.64,1);
        }
        .step{
          transition: all 0.3s;
        }
        .step:hover{
          transform: translateX(4px);
          border-color: #00ffb4 !important;
        }
        .grid-bg{
          position:fixed;top:0;left:0;
          width:100%;height:100%;
          background-image:
            linear-gradient(rgba(0,255,180,0.025) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,255,180,0.025) 1px,transparent 1px);
          background-size:50px 50px;
          pointer-events:none;
          z-index:0;
        }
        .scanline{
          position:fixed;
          left:0;width:100%;height:2px;
          background:linear-gradient(90deg,transparent,rgba(0,255,180,0.1),transparent);
          animation: scanline 4s linear infinite;
          pointer-events:none;
          z-index:1;
        }
      `}</style>

      <div className="grid-bg"></div>
      <div className="scanline"></div>

      {/* Orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span style={styles.logoEmoji}>🏥</span>
          <span style={styles.logoText}>MediQueue</span>
          <span style={styles.logoBadge}>BETA</span>
        </div>
        <button
          style={styles.backBtn}
          onClick={() => (window.location.href = "/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      <div style={styles.topLine}></div>

      {/* Main */}
      <div style={styles.main}>
        {/* Left Info Panel */}
        <div style={styles.infoPanel}>
          <h2 style={styles.infoTitle}>How it works</h2>
          {[
            {
              n: "01",
              t: "Enter Doctor ID",
              d: "Find your doctor and enter their ID number",
            },
            {
              n: "02",
              t: "Pick a Date",
              d: "Choose your preferred appointment date",
            },
            {
              n: "03",
              t: "Describe Symptoms",
              d: "Brief note about your health concern",
            },
            {
              n: "04",
              t: "Get Token",
              d: "Receive your queue token instantly",
            },
          ].map((s) => (
            <div key={s.n} className="step" style={styles.step}>
              <span style={styles.stepNum}>{s.n}</span>
              <div>
                <p style={styles.stepTitle}>{s.t}</p>
                <p style={styles.stepDesc}>{s.d}</p>
              </div>
            </div>
          ))}

          <div style={styles.infoBox}>
            <p style={styles.infoBoxText}>
              💡 Tip: Save your token number to track your position in the live
              queue
            </p>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="book-card" style={styles.card}>
          <div style={styles.topBorder}></div>

          {/* Card Header */}
          <div style={styles.cardHeader}>
            <div style={styles.cardIcon}>📅</div>
            <div>
              <h2 style={styles.cardTitle}>Book Appointment</h2>
              <p style={styles.cardSub}>Get your token in seconds</p>
            </div>
          </div>

          <div style={styles.divider}></div>

          {/* Doctor ID */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <span style={styles.labelDot}></span>
              DOCTOR ID
            </label>
            <div className="ibox" style={styles.ibox}>
              <span style={styles.iicon}>👨‍⚕️</span>
              <input
                style={styles.input}
                type="number"
                placeholder="e.g. 1, 2, 3..."
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              />
            </div>
          </div>

          {/* Date */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <span style={styles.labelDot}></span>
              APPOINTMENT DATE
            </label>
            <div className="ibox" style={styles.ibox}>
              <span style={styles.iicon}>📅</span>
              <input
                style={styles.input}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Notes */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>
              <span style={styles.labelDot}></span>
              SYMPTOMS / NOTES
            </label>
            <div
              className="ibox"
              style={{ ...styles.ibox, alignItems: "flex-start" }}
            >
              <span style={{ ...styles.iicon, marginTop: "14px" }}>📝</span>
              <textarea
                style={{ ...styles.input, height: "90px", resize: "none" }}
                placeholder="Describe your symptoms briefly..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* Button */}
          <button
            className="book-btn"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
            }}
            onClick={handleBook}
            disabled={loading}
          >
            {loading ? (
              <span>⏳ Booking...</span>
            ) : (
              <span>🎫 Book My Token →</span>
            )}
          </button>

          {/* Message */}
          {message && !token && (
            <div
              style={{
                ...styles.msg,
                backgroundColor: isError ? "#1a0505" : "#051a10",
                border: `1px solid ${isError ? "#ff4444" : "#00ffb4"}`,
                color: isError ? "#ff6b6b" : "#00ffb4",
              }}
            >
              {isError ? "❌" : "✅"} {message}
            </div>
          )}

          {/* Token Display */}
          {token && (
            <div className="token-card" style={styles.tokenCard}>
              <div style={styles.tokenHeader}>
                <span style={styles.tokenHeaderText}>🎉 BOOKING CONFIRMED</span>
              </div>
              <p style={styles.tokenLabel}>YOUR TOKEN NUMBER</p>
              <div style={styles.tokenNum}>#{token}</div>
              <div style={styles.tokenInfo}>
                <div style={styles.tokenInfoItem}>
                  <span style={styles.tokenInfoLabel}>Date</span>
                  <span style={styles.tokenInfoValue}>{date}</span>
                </div>
                <div style={styles.tokenInfoDivider}></div>
                <div style={styles.tokenInfoItem}>
                  <span style={styles.tokenInfoLabel}>Status</span>
                  <span style={{ ...styles.tokenInfoValue, color: "#00ffb4" }}>
                    BOOKED ✓
                  </span>
                </div>
              </div>
              <p style={styles.tokenTip}>⏰ Please arrive 10 minutes early</p>
              <button
                style={styles.queueBtn}
                onClick={() => (window.location.href = "/queue")}
              >
                📊 Track Live Queue →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#050505",
    fontFamily: "'Inter', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  orb1: {
    position: "fixed",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,255,180,0.05) 0%, transparent 70%)",
    top: "-200px",
    left: "-200px",
    pointerEvents: "none",
    zIndex: 0,
  },
  orb2: {
    position: "fixed",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,100,255,0.05) 0%, transparent 70%)",
    bottom: "-150px",
    right: "-150px",
    pointerEvents: "none",
    zIndex: 0,
  },
  orb3: {
    position: "fixed",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(100,0,255,0.04) 0%, transparent 70%)",
    top: "50%",
    right: "30%",
    pointerEvents: "none",
    zIndex: 0,
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
    gap: "10px",
  },
  logoEmoji: { fontSize: "26px" },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#00ffb4",
    fontFamily: "'Rajdhani', sans-serif",
    letterSpacing: "2px",
  },
  logoBadge: {
    fontSize: "9px",
    padding: "2px 6px",
    backgroundColor: "#00ffb411",
    color: "#00ffb4",
    borderRadius: "4px",
    border: "1px solid #00ffb433",
    letterSpacing: "1px",
  },
  backBtn: {
    padding: "8px 18px",
    backgroundColor: "transparent",
    color: "#00ffb4",
    border: "1px solid #00ffb422",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.3s",
  },
  topLine: {
    height: "1px",
    position: "relative",
    zIndex: 10,
    background: "linear-gradient(90deg,transparent,#00ffb4,transparent)",
  },
  main: {
    display: "flex",
    gap: "40px",
    padding: "50px 60px",
    maxWidth: "1100px",
    margin: "0 auto",
    position: "relative",
    zIndex: 5,
  },
  infoPanel: {
    width: "320px",
    flexShrink: 0,
  },
  infoTitle: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "24px",
    letterSpacing: "1px",
  },
  step: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    padding: "16px",
    backgroundColor: "#0d0d0d",
    border: "1px solid #1a1a1a",
    borderRadius: "12px",
    marginBottom: "12px",
    cursor: "default",
  },
  stepNum: {
    fontSize: "22px",
    fontWeight: "900",
    color: "#00ffb4",
    opacity: 0.4,
    fontFamily: "'Rajdhani', sans-serif",
    minWidth: "32px",
  },
  stepTitle: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0 0 4px 0",
  },
  stepDesc: {
    color: "#444",
    fontSize: "12px",
    margin: 0,
  },
  infoBox: {
    marginTop: "20px",
    padding: "16px",
    backgroundColor: "#00ffb408",
    border: "1px solid #00ffb422",
    borderRadius: "12px",
  },
  infoBoxText: {
    color: "#00ffb4",
    fontSize: "13px",
    margin: 0,
    opacity: 0.8,
    lineHeight: "1.6",
  },
  card: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    border: "1px solid #1a1a1a",
    borderRadius: "20px",
    padding: "36px",
    display: "flex",
    flexDirection: "column",
    gap: "22px",
    position: "relative",
  },
  topBorder: {
    position: "absolute",
    top: 0,
    left: "15%",
    width: "70%",
    height: "2px",
    background: "linear-gradient(90deg,transparent,#00ffb4,transparent)",
    borderRadius: "2px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  cardIcon: {
    fontSize: "40px",
    padding: "10px",
    backgroundColor: "#00ffb411",
    borderRadius: "12px",
    border: "1px solid #00ffb422",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },
  cardSub: { color: "#444", fontSize: "13px", marginTop: "4px" },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg,transparent,#1a1a1a,transparent)",
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#444",
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: "600",
  },
  labelDot: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    backgroundColor: "#00ffb4",
    display: "inline-block",
  },
  ibox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: "12px",
    padding: "4px 16px",
  },
  iicon: { fontSize: "18px", marginRight: "12px" },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "15px",
    padding: "13px 4px",
    fontFamily: "'Inter', sans-serif",
  },
  button: {
    padding: "16px",
    background: "linear-gradient(135deg, #00ffb4, #00cc8f)",
    color: "#050505",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    letterSpacing: "1px",
    marginTop: "4px",
  },
  msg: {
    padding: "14px",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "14px",
  },
  tokenCard: {
    backgroundColor: "#060f0a",
    border: "1px solid #00ffb433",
    borderRadius: "16px",
    padding: "28px",
    textAlign: "center",
    boxShadow: "0 0 40px rgba(0,255,180,0.15)",
  },
  tokenHeader: {
    backgroundColor: "#00ffb411",
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "16px",
    border: "1px solid #00ffb422",
  },
  tokenHeaderText: {
    color: "#00ffb4",
    fontSize: "12px",
    letterSpacing: "2px",
    fontWeight: "700",
  },
  tokenLabel: {
    color: "#444",
    fontSize: "11px",
    letterSpacing: "3px",
    marginBottom: "8px",
  },
  tokenNum: {
    fontSize: "64px",
    fontWeight: "900",
    color: "#00ffb4",
    letterSpacing: "2px",
    margin: "8px 0",
    lineHeight: "1",
    fontFamily: "'Rajdhani', sans-serif",
    textShadow: "0 0 30px rgba(0,255,180,0.5)",
  },
  tokenInfo: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "16px 0",
    padding: "16px",
    backgroundColor: "#0d0d0d",
    borderRadius: "10px",
    border: "1px solid #1a1a1a",
  },
  tokenInfoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  tokenInfoLabel: {
    color: "#444",
    fontSize: "11px",
    letterSpacing: "1px",
  },
  tokenInfoValue: {
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
  },
  tokenInfoDivider: {
    width: "1px",
    backgroundColor: "#1a1a1a",
  },
  tokenTip: {
    color: "#444",
    fontSize: "12px",
    marginBottom: "16px",
  },
  queueBtn: {
    padding: "12px 24px",
    backgroundColor: "transparent",
    color: "#00ffb4",
    border: "1px solid #00ffb433",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s",
  },
};

export default BookAppointment;
