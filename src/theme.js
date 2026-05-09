export const commonStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600;700&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }

  body {
    background-color: #050505;
    font-family: 'Exo 2', sans-serif;
    color: #ffffff;
  }

  @keyframes fadeIn {
    from{opacity:0;transform:translateY(20px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes glowCyan {
    0%{box-shadow:0 0 20px rgba(0,212,255,0.15)}
    50%{box-shadow:0 0 50px rgba(0,212,255,0.3)}
    100%{box-shadow:0 0 20px rgba(0,212,255,0.15)}
  }
  @keyframes scanline {
    0%{top:0%} 100%{top:100%}
  }
  @keyframes float {
    0%{transform:translateY(0px)}
    50%{transform:translateY(-8px)}
    100%{transform:translateY(0px)}
  }

  .grid-bg {
    position:fixed;top:0;left:0;
    width:100%;height:100%;
    background-image:
      linear-gradient(rgba(0,255,180,0.02) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,212,255,0.02) 1px,transparent 1px);
    background-size:50px 50px;
    pointer-events:none;z-index:0;
  }
  .scanline {
    position:fixed;left:0;
    width:100%;height:2px;
    background:linear-gradient(90deg,transparent,rgba(0,212,255,0.1),transparent);
    animation:scanline 5s linear infinite;
    pointer-events:none;z-index:1;
  }
  .card-hover {
    transition:transform 0.3s ease,box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform:translateY(-8px) scale(1.01);
    box-shadow:0 0 60px rgba(0,212,255,0.3)!important;
  }
  .ibox {
    transition:all 0.3s;
    border:1px solid #1a1a1a!important;
  }
  .ibox:focus-within {
    border:1px solid #00d4ff!important;
    box-shadow:0 0 20px rgba(0,212,255,0.2);
    background:#050d12!important;
  }
  .btn-main {
    transition:all 0.3s ease;
  }
  .btn-main:hover {
    transform:scale(1.04);
    box-shadow:0 0 40px rgba(0,212,255,0.5)!important;
  }
  .btn-main:active {
    transform:scale(0.98);
  }
`;
