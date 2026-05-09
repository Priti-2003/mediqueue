import React, { useState } from "react";
import axios from "axios";
import { commonStyles } from "../theme";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      setIsError(false);
      setMessage("Welcome " + res.data.fullName + "!");
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.role);
      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } catch (err) {
      setIsError(true);
      setMessage("Invalid credentials!");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <style>{commonStyles}</style>
      <div className="grid-bg"></div>
      <div className="scanline"></div>

      {/* Orbs */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      <div style={styles.orb3}></div>

      <div style={styles.center}>
        <div className="card-hover" style={styles.card}>
          <div style={styles.topBorder}></div>

          {/* Logo */}
          <div style={styles.logoRow}>
            <span
              style={{
                fontSize: "40px",
                animation: "float 3s ease-in-out infinite",
                display: "inline-block",
              }}
            >
              🏥
            </span>
            <div>
              <h1 style={styles.logoText}>MediQueue</h1>
              <p style={styles.tagline}>SMART HOSPITAL QUEUE SYSTEM</p>
            </div>
          </div>

          <div style={styles.divider}></div>

          <h2 style={styles.heading}>Welcome Back 👋</h2>
          <p style={styles.sub}>Sign in to continue</p>

          {/* Email */}
          <div className="ibox" style={styles.ibox}>
            <span style={styles.icon}>📧</span>
            <input
              style={styles.input}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {/* Password */}
          <div className="ibox" style={styles.ibox}>
            <span style={styles.icon}>🔒</span>
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <button
            className="btn-main"
            style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "⏳ Signing in..." : "Sign In →"}
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
            Don't have an account?{" "}
            <a href="/register" style={styles.anchor}>
              Register here
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
      "radial-gradient(circle, rgba(0,255,180,0.07) 0%, transparent 70%)",
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
      "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)",
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
    top: "50%",
    right: "20%",
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
    gap: "18px",
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
    background: "linear-gradient(90deg,transparent,#00d4ff,transparent)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  logoText: {
    fontSize: "28px",
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
    fontSize: "22px",
    fontWeight: "700",
    fontFamily: "'Exo 2', sans-serif",
  },
  sub: { color: "#444", fontSize: "14px", marginTop: "-10px" },
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
    background: "linear-gradient(135deg, #00d4ff, #0099cc)",
    color: "#050505",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "800",
    cursor: "pointer",
    letterSpacing: "1px",
    fontFamily: "'Exo 2', sans-serif",
    boxShadow: "0 0 20px rgba(0,212,255,0.3)",
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

export default Login;
