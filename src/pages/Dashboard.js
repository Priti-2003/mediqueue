import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const patientId = localStorage.getItem("userId");

  const loadAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointments/patient/${patientId}`,
      );
      setAppointments(res.data);
      setLoaded(true);
    } catch (err) {
      alert("Error loading!");
    }
  };

  return (
    <div style={styles.page}>
      <style>{`
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(20px)}
          to{opacity:1;transform:translateY(0)}
        }
        .apt-card:hover{
          transform:translateY(-4px);
          box-shadow:0 0 30px rgba(0,255,180,0.2)!important;
        }
        .btn:hover{
          transform:scale(1.03);
          box-shadow:0 0 20px rgba(0,255,180,0.4);
        }
        .grid-bg{
          position:fixed;top:0;left:0;
          width:100%;height:100%;
          background-image:
            linear-gradient(rgba(0,255,180,0.02) 1px,transparent 1px),
            linear-gradient(90deg,rgba(0,255,180,0.02) 1px,transparent 1px);
          background-size:40px 40px;
          pointer-events:none;
        }
      `}</style>

      <div className="grid-bg"></div>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoRow}>
          <span style={styles.logo}>🏥</span>
          <span style={styles.logoText}>MediQueue</span>
        </div>
        <button
          style={styles.logoutBtn}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout →
        </button>
      </div>

      <div style={styles.topLine}></div>

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.heading}>Patient Dashboard</h1>
        <p style={styles.sub}>Manage your appointments</p>

        {/* Stats */}
        <div style={styles.statsRow}>
          {[
            {
              label: "Total",
              value: appointments.length,
              color: "#00ffb4",
              icon: "📋",
            },
            {
              label: "Active",
              value: appointments.filter((a) => a.status === "BOOKED").length,
              color: "#ffaa00",
              icon: "⏳",
            },
            {
              label: "Done",
              value: appointments.filter((a) => a.status === "CONSULTED")
                .length,
              color: "#4488ff",
              icon: "✅",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{ ...styles.statCard, borderColor: s.color + "33" }}
            >
              <span style={{ fontSize: "24px" }}>{s.icon}</span>
              <span
                style={{ fontSize: "28px", fontWeight: "700", color: s.color }}
              >
                {s.value}
              </span>
              <span style={{ color: "#555", fontSize: "12px" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={styles.btnRow}>
          <button
            className="btn"
            style={styles.btnGreen}
            onClick={loadAppointments}
          >
            📋 My Appointments
          </button>
          <button
            className="btn"
            style={styles.btnOutline}
            onClick={() => (window.location.href = "/book")}
          >
            ➕ Book Appointment
          </button>
        </div>

        {/* List */}
        {!loaded ? (
          <div style={styles.emptyBox}>
            <p style={{ color: "#555" }}>Click "My Appointments" to load</p>
          </div>
        ) : appointments.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={{ fontSize: "40px" }}>🏥</p>
            <p style={{ color: "#555" }}>No appointments yet!</p>
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="apt-card"
              style={{
                ...styles.aptCard,
                borderLeft: `3px solid ${
                  apt.status === "BOOKED"
                    ? "#00ffb4"
                    : apt.status === "CANCELLED"
                      ? "#ff4444"
                      : "#4488ff"
                }`,
                transition: "all 0.3s",
              }}
            >
              <div style={styles.aptTop}>
                <span style={{ color: "#00ffb4", fontWeight: "700" }}>
                  Token #{apt.tokenNumber}
                </span>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    backgroundColor: "#00ffb411",
                    color: "#00ffb4",
                    border: "1px solid #00ffb433",
                  }}
                >
                  {apt.status}
                </span>
              </div>
              <p style={{ color: "#888", margin: "6px 0" }}>
                👨‍⚕️ Dr. {apt.doctor?.user?.fullName}
              </p>
              <p style={{ color: "#555", fontSize: "13px" }}>
                📅 {apt.appointmentDate}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#050505",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#0d0d0d",
    borderBottom: "1px solid #1a1a1a",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: { fontSize: "28px" },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#00ffb4",
    letterSpacing: "1px",
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    color: "#ff4444",
    border: "1px solid #ff444433",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
  },
  topLine: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, #00ffb4, transparent)",
  },
  content: { padding: "40px" },
  heading: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0",
  },
  sub: { color: "#444", fontSize: "14px", marginTop: "4px" },
  statsRow: {
    display: "flex",
    gap: "16px",
    margin: "24px 0",
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
    gap: "6px",
  },
  btnRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },
  btnGreen: {
    padding: "14px 28px",
    background: "linear-gradient(135deg, #00ffb4, #00cc8f)",
    color: "#050505",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  btnOutline: {
    padding: "14px 28px",
    background: "transparent",
    color: "#00ffb4",
    border: "1px solid #00ffb433",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  emptyBox: {
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#0d0d0d",
    borderRadius: "16px",
    border: "1px solid #1a1a1a",
  },
  aptCard: {
    backgroundColor: "#0d0d0d",
    border: "1px solid #1a1a1a",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "12px",
  },
  aptTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
};

export default Dashboard;
