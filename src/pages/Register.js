import React, { useState } from "react";
import axios from "axios";
import { commonStyles } from "../theme";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "PATIENT",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      setIsError(false);
      setMessage("Account created! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 1500);
    } catch (err) {
      setIsError(true);
      setMessage("Registration failed!");
    }
    setLoading(false);
  };

  const fields = [
    { name: "fullName", placeholder: "Full Name", type: "text", icon: "👤" },
    { name: "email", placeholder: "Email Address", type: "email", icon: "📧" },
    { name: "password", placeholder: "Password", type: "password", icon: "🔒" },
    { name: "phone", placeholder: "Phone Number", type: "text", icon: "📱" },
  ];

  return (
    <div style={styles.page}>
      <style>{commonStyles}</style>
      <div className="grid-bg"></div>
      <div className="scanline"></div>

      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      <div style={styles.center}>
        <div className="card-hover" style={styles.card}>
          <div style={styles.topBorder}></div>

          {/* Logo */}
          <div style={styles.logoRow}>
            <span style={{ fontSize: "36px" }}>🏥</span>
            <div>
              <h1 style={styles.logoText}>MediQueue</h1>
              <p style={styles.tagline}>CREATE YOUR ACCOUNT</p>
            </div>
          </div>

          <div style={styles.divider}></div>

          <h2 style={styles.heading}>Join MediQueue 🚀</h2>

          {fields.map((f) => (
            <div key={f.name} className="ibox" style={styles.ibox}>
              <span style={styles.icon}>{f.icon}</span>
              <input
                style={styles.input}
                type={f.type}
                name={f.name}
                placeholder={f.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Role */}
          <div className="ibox" style={styles.ibox}>
            <span style={styles.icon}>🎭</span>
            <select
              name="role"
              style={{ ...styles.input, cursor: "pointer" }}
              onChange={handleChange}
            >
              <option value="PATIENT">🤒 Patient</option>
              <option value="DOCTOR">👨‍⚕️ Doctor</option>
              <option value="ADMIN">👑 Admin</option>
            </select>
          </div>

          <button
            className="btn-main"
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "⏳ Creating..." : "Create Account →"}
          </button>

          {message && (
            <div
              style={{
                ...styles.msg,
                backgroundColor: isError ? "#1a0505" : "#050d12",
                border: `1px solid ${isError ? "#ff4444" : "#00d4ff"}`,
                color: isError ? "#ff6b6b" : "#00d4ff",
              }}
            >
              {isError ? "❌" : "✅"} {message}
            </div>
          )}

          <p style={styles.link}>
            Already registered?{" "}
            <a href="/" style={styles.anchor}>
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
      "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
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
      "radial-gradient(circle, rgba(0,255,180,0.07) 0%, transparent 70%)",
    bottom: "-100px",
    right: "-100px",
    pointerEvents: "none",
  },
  orb3: {
    position: "fixed",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(123,47,255,0.05) 0%, transparent 70%)",
    top: "30%",
    right: "10%",
    pointerEvents: "none",
  },
  center: { position: "relative", zIndex: 5 },
  card: {
    backgroundColor: "#0d0d0d",
    border: "1px solid #1a1a1a",
    borderRadius: "20px",
    padding: "44px",
    width: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "relative",
    boxShadow: "0 0 40px rgba(0,212,255,0.08)",
    animation: "fadeIn 0.7s ease, glowCyan 4s infinite",
  },
  topBorder: {
    position: "absolute",
    top: 0,
    left: "15%",
    width: "70%",
    height: "2px",
    background: "linear-gradient(90deg,transparent,#7b2fff,transparent)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  logoText: {
    fontSize: "26px",
    fontWeight: "900",
    color: "#00ffb4",
    fontFamily: "'Orbitron', sans-serif",
    letterSpacing: "2px",
    margin: 0,
  },
  tagline: {
    color: "#00d4ff",
    fontSize: "9px",
    letterSpacing: "3px",
    opacity: 0.7,
    marginTop: "4px",
  },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg,transparent,#1a1a1a,transparent)",
  },
  heading: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "700",
    fontFamily: "'Exo 2', sans-serif",
  },
  ibox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: "12px",
    padding: "4px 16px",
  },
  icon: { fontSize: "18px", marginRight: "12px" },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "15px",
    padding: "13px 4px",
    fontFamily: "'Exo 2', sans-serif",
  },
  btn: {
    padding: "16px",
    background: "linear-gradient(135deg, #7b2fff, #5500cc)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    letterSpacing: "1px",
    fontFamily: "'Exo 2', sans-serif",
    boxShadow: "0 0 20px rgba(123,47,255,0.3)",
  },
  msg: {
    padding: "14px",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    textAlign: "center",
    color: "#444",
    fontSize: "14px",
  },
  anchor: {
    color: "#00d4ff",
    textDecoration: "none",
    fontWeight: "700",
  },
};

export default Register;
