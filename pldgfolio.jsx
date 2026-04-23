const { useState, useEffect, useRef } = React;

const INNER_PROJECTS = [
  {
    id: 'js-libp2p',
    name: 'js-libp2p',
    shortName: 'js-libp2p',
    fullName: 'libp2p/js-libp2p-examples',
    partner: 'Libp2p',
    color: '#4ECDC4',
    glow: 'rgba(78,205,196,0.55)',
    emoji: '⚡',
    description:
      'Hands-on examples demonstration of JavaScript libp2p modules — the modular P2P networking stack powering the decentralized web. Contributed protocol stream handling and WebRTC integrations.',
    tags: ['TypeScript', 'P2P', 'WebRTC', 'Protocols'],
    contributions: [
      'Protocol stream handling',
      'Js-libp2p Examples integration',
      'Bug triaging & fixes',
      'Documentation improvements',
    ],
    cohorts: ['Cohort 2', 'Cohort 3', 'Cohort 4', 'Cohort 5'],
  },
  {
    id: 'py-libp2p',
    name: 'py-libp2p',
    shortName: 'py-libp2p',
    fullName: 'libp2p/py-libp2p',
    partner: 'Libp2p',
    color: '#45B7D1',
    glow: 'rgba(69,183,209,0.55)',
    emoji: '🐍',
    description:
      'Python implementation of libp2p. Contributed to WebRTC Transport (WebRTC Private to Private and WebRTC Private to Public) support in py-libp2p.',
    tags: [
      'Python',
      'WebRTC',
      'aiortc',
      'DTLS',
      'Noise Handshake',
      'ICE Config',
      'Multiplexer',
    ],
    contributions: [
      'WebRTC: Private to Private and Private to Public',
      'Noise Handshake in webrtc',
      'Yamux multiplexer streaming in webrtc',
      'Kad-DHT improvements',
      'Interop tests',
      'Examples integration',
    ],
    cohorts: ['Cohort 4', 'Cohort 5', 'Cohort 6'],
  },
  {
    id: 'universal-connectivity',
    name: 'universal-conn',
    shortName: 'univ-conn',
    fullName: 'libp2p/universal-connectivity-workshop',
    partner: 'Libp2p',
    color: '#96CEB4',
    glow: 'rgba(150,206,180,0.55)',
    emoji: '🔗',
    description:
      'Hands-on workshop bridging libp2p across every language and runtime. Built curriculum, code examples, and cross-platform connectivity demonstrations.',
    tags: ['Workshop', 'Education', 'Multi-lang', 'Connectivity'],
    contributions: [
      'Workshop curriculum',
      'Live code examples',
      'Cross-platform testing',
      'Peer connectivity demos',
    ],
    cohorts: ['Cohort 4', 'Cohort 5'],
  },
  {
    id: 'helia',
    name: 'helia',
    shortName: 'helia',
    fullName: 'ipfs/helia',
    partner: 'IPFS / Helia',
    color: '#FFEAA7',
    glow: 'rgba(255,234,167,0.55)',
    emoji: '☀️',
    description:
      'Lean, composable TypeScript IPFS — the next generation of content addressable storage. Contributed to UnixFS operations and content routing.',
    tags: ['TypeScript', 'IPFS', 'CID', 'UnixFS'],
    contributions: [
      'Helia-Angular setup',
      'Debugging SSR-mode in Helia-Angular',
    ],
    cohorts: ['Cohort 2'],
  },
  {
    id: 'upload-service',
    name: 'upload-service',
    shortName: 'upload-svc',
    fullName: 'storacha/upload-service',
    partner: 'Storacha',
    color: '#C39BD3',
    glow: 'rgba(195,155,211,0.55)',
    emoji: '☁️',
    description:
      'Decentralized upload service on Storacha/w3up using UCAN-based authorization for permissionless, trustless storage.',
    tags: ['Storacha', 'UCAN', 'CAR files', 'console.storacha'],
    contributions: ['Documentation Update'],
    cohorts: ['Cohort 5'],
  },
  {
    id: 'console-toolkit',
    name: 'console-toolkit',
    shortName: 'console-tk',
    fullName: 'storacha/console-toolkit',
    partner: 'Storacha',
    color: '#F9E79F',
    glow: 'rgba(249,231,159,0.55)',
    emoji: '🛠️',
    description:
      'A Plug-n-play toolkit for Storacha Console operations — managing decentralized storage spaces, capability delegation, and access control across partnered dapps.',
    tags: ['Toolkit', 'Storacha', 'Dev Tools', 'TypeScript'],
    contributions: [
      'Dmail/Web3Mail Toolkit Support',
      'Space management',
      'Delegation flows',
      'Access control',
    ],
    cohorts: ['Cohort 4', 'Cohort 5'],
  },
];

const OUTER_PROJECTS = [
  {
    id: 'blocklock',
    name: 'blocklock-frontend-kit',
    shortName: 'blocklock',
    fullName: 'Nkovaturient/blocklock-frontend-kit',
    color: '#FFB347',
    glow: 'rgba(255,179,71,0.55)',
    emoji: '🔐',
    description:
      'Frontend kit for timed-release media using timelock encryption (branch: timed-release-media). Drand beacon integration for decentralized content gating.',
    tags: ['Timelock', 'Drand', 'Encryption', 'React'],
    contributions: [
      'Timed release UI',
      'Drand beacon integration',
      'Media decryption flow',
      'Branch: timed-release-media',
    ],
  },
  {
    id: 'llmesh',
    name: 'LLMesh',
    shortName: 'LLMesh',
    fullName: 'Nkovaturient/LLMesh',
    color: '#87CEEB',
    glow: 'rgba(135,206,235,0.55)',
    emoji: '🕸️',
    description:
      'A mesh network for LLM agents — orchestrating multiple AI models through libp2p peer-to-peer communication for distributed intelligence.',
    tags: ['AI Agents', 'libp2p', 'Orchestration', 'Multi-model'],
    contributions: [
      'Agent mesh protocol',
      'LLM routing logic',
      'P2P message passing',
      'Model coordination',
    ],
  },
  {
    id: 'rachax402',
    name: 'Rachax402',
    shortName: 'Rachax402',
    fullName: 'Nkovaturient/Rachax402',
    color: '#FF6B9D',
    glow: 'rgba(255,107,157,0.55)',
    emoji: '💸',
    description:
      'HTTP 402 micropayment gateway on the Racha protocol. Enables pay-per-request API monetization with minimal friction.',
    tags: ['HTTP 402', 'Micropayments', 'Web3', 'API Gateway'],
    contributions: [
      'Payment middleware',
      'Lightning integration',
      'Gateway logic',
      '402 response flows',
    ],
  },
  {
    id: 'secretshare',
    name: 'secretshare',
    shortName: 'secretshare',
    fullName: 'Nkovaturient/secretshare',
    color: '#98FB98',
    glow: 'rgba(152,251,152,0.55)',
    emoji: '🤫',
    description:
      "Shamir's Secret Sharing distributed via libp2p for threshold-based recovery — privacy-preserving secret distribution at the protocol level.",
    tags: ['Cryptography', 'Shamir SSS', 'libp2p', 'Privacy'],
    contributions: [
      'SSS implementation',
      'P2P key distribution',
      'Threshold recovery',
      'Encryption layer',
    ],
  },
  {
    id: 'tripmate',
    name: 'Tripmate',
    shortName: 'Tripmate',
    fullName: 'Nkovaturient/Tripmate-planner',
    color: '#F08080',
    glow: 'rgba(240,128,128,0.55)',
    emoji: '✈️',
    description:
      'AI-powered collaborative trip planning app with real-time shared itineraries, smart travel suggestions, and synced group plans.',
    tags: ['React', 'AI', 'Collaboration', 'Real-time'],
    contributions: [
      'Itinerary builder',
      'Real-time sync engine',
      'AI suggestion layer',
      'Group planning UX',
    ],
  },
  {
    id: 'ghostlock',
    name: 'Ghostlock',
    shortName: 'Ghostlock',
    fullName: 'Nkovaturient/Ghostlock-mev-reaper',
    color: '#B0B0FF',
    glow: 'rgba(176,176,255,0.55)',
    emoji: '👻',
    description:
      'MEV reaper protection using ghost lock mechanisms. Collaborated with Leny on frontrunning mitigation for DeFi transaction safety.',
    tags: ['MEV', 'DeFi', 'Ethereum', 'Base', 'Arbitrum', 'Collab: Leny'],
    contributions: [
      'Dcipher Blocklock-js',
      'MEV protection system',
      'Mempool analysis',
      'Blockclock-solidity',
      'Drand vrf',
      'Pyth-express APIs',
    ],
  },
];
const COHORT_COLORS = {
  'Cohort 2': '#4ECDC4',
  'Cohort 3': '#45B7D1',
  'Cohort 4': '#96CEB4',
  'Cohort 5': '#FFEAA7',
  'Cohort 6': '#C39BD3',
};

function PLDGPortfolio() {
  const [selected, setSelected] = useState(null);
  const [userStats, setUserStats] = useState({});
  const [repoStats, setRepoStats] = useState({});
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [panelTab, setPanelTab] = useState('overview');
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  );
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    fetch('https://api.github.com/users/Nkovaturient')
      .then((r) => r.json())
      .then((d) =>
        setUserStats({
          name: d.name || 'Neha Kumari',
          followers: d.followers,
          repos: d.public_repos,
          avatar: d.avatar_url,
          bio: d.bio,
        })
      )
      .catch(() => setUserStats({ name: 'Neha Kumari', avatar: null }));

    [...INNER_PROJECTS, ...OUTER_PROJECTS].forEach((p) => {
      fetch(`https://api.github.com/repos/${p.fullName}`)
        .then((r) => r.json())
        .then((d) =>
          setRepoStats((prev) => ({
            ...prev,
            [p.id]: {
              stars: d.stargazers_count ?? 0,
              forks: d.forks_count ?? 0,
              lang: d.language,
              updated: d.updated_at,
              issues: d.open_issues_count ?? 0,
              description: d.description,
            },
          }))
        )
        .catch(() => {});
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ctx = canvas.getContext('2d');
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      alpha: Math.random(),
      speed: (Math.random() * 0.006 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha >= 1) {
          s.alpha = 1;
          s.speed = -Math.abs(s.speed);
        }
        if (s.alpha <= 0.05) {
          s.alpha = 0.05;
          s.speed = Math.abs(s.speed);
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha * 0.7})`;
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNodeClick = (proj) => {
    if (selected?.id === proj.id) {
      setSelected(null);
      setPaused(false);
    } else {
      setSelected(proj);
      setPaused(true);
      setPanelTab('overview');
    }
  };

  const closePanel = () => {
    setSelected(null);
    setPaused(false);
  };

  const getNodeStyle = (idx, total, radius, size) => {
    const angle = (idx / total) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    return {
      position: 'absolute',
      width: size,
      height: size,
      left: `calc(50% + ${x}px - ${size / 2}px)`,
      top: `calc(50% + ${y}px - ${size / 2}px)`,
    };
  };

  const fmtDate = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : '—';

  const isMobile = viewportWidth < 900;
  const isTablet = viewportWidth >= 900 && viewportWidth < 1280;
  const uiScale = isMobile ? 1.24 : isTablet ? 1.12 : 1;
  const orbitScale = isMobile ? 0.82 : isTablet ? 0.92 : 1;
  const scaled = (v) => Math.round(v * uiScale);

  const outerOrbitSize = Math.round(600 * orbitScale);
  const innerOrbitSize = Math.round(376 * orbitScale);
  const outerOrbitRadius = Math.round(300 * orbitScale);
  const innerOrbitRadius = Math.round(188 * orbitScale);
  const panelWidth = Math.min(
    scaled(380),
    Math.max(300, viewportWidth - (isMobile ? 24 : 52))
  );
  const panelRightInset = isMobile ? 12 : 20;
  const journeyRight = selected
    ? panelWidth + panelRightInset + 12
    : isMobile
    ? 16
    : 28;

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&family=Space+Mono&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #030a14; }
    :root { --teal: #00d4aa; --blue: #0ea5e9; --purple: #8b5cf6; }
    @keyframes spin-cw { to { transform: rotate(360deg); } }
    @keyframes spin-ccw { to { transform: rotate(-360deg); } }
    @keyframes ccw-inner { to { transform: rotate(-360deg); } }
    @keyframes cw-outer { to { transform: rotate(360deg); } }
    @keyframes center-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,212,170,0), 0 0 20px rgba(0,212,170,0.2); } 50% { box-shadow: 0 0 0 12px rgba(0,212,170,0.06), 0 0 40px rgba(0,212,170,0.35); } }
    @keyframes ring-breathe { 0%,100% { opacity: 0.12; } 50% { opacity: 0.28; } }
    @keyframes slide-in-panel { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
    @keyframes nebula-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(28px,-14px) scale(1.08); } }
    @keyframes nebula-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-18px,22px) scale(1.06); } }
    @keyframes nebula-c { 0%,100% { transform: translate(0,0) scale(1.02); } 50% { transform: translate(12px,18px) scale(1); } }
    @keyframes fadeup { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .orbit-inner-ring { animation: spin-cw 26s linear infinite; }
    .orbit-outer-ring { animation: spin-ccw 42s linear infinite; }
    .node-inner { animation: ccw-inner 26s linear infinite; }
    .node-outer { animation: cw-outer 42s linear infinite; }
    .paused .orbit-inner-ring, .paused .orbit-outer-ring,
    .paused .node-inner, .paused .node-outer { animation-play-state: paused; }
    .proj-node { transition: filter 0.2s, transform 0.2s; cursor: pointer; }
    .proj-node:hover { filter: brightness(1.2); }
    .panel-tab { background: none; border: none; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 6px 14px; border-radius: 20px; transition: all 0.2s; }
    .panel-tab.active { color: #030a14; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
    a { color: inherit; text-decoration: none; }
  `;

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: '#030a14',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Outfit', sans-serif",
        color: '#fff',
      }}
    >
      <style>{styles}</style>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Nebula blobs */}
      <div
        style={{
          position: 'absolute',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,212,170,0.07) 0%, transparent 68%)',
          top: '5%',
          left: '2%',
          animation: 'nebula-a 18s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 68%)',
          bottom: '2%',
          right: '3%',
          animation: 'nebula-b 22s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 68%)',
          top: '40%',
          right: '18%',
          animation: 'nebula-c 14s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '14px 14px' : '14px 28px',
          background: 'rgba(3,10,20,0.55)',
          backdropFilter: 'blur(14px)',
          borderBottom: '0.5px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 10 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#00d4aa',
              boxShadow: '0 0 8px #00d4aa',
            }}
          />
          <span
            style={{
              fontSize: scaled(12),
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#00d4aa',
              textTransform: 'uppercase',
            }}
          >
            PLDG Portfolio
          </span>
          <span
            style={{
              color: 'rgba(255,255,255,0.28)',
              fontSize: scaled(11),
              marginLeft: 2,
            }}
          >
            Neha Kumari · Cohort 2 → 6 || 1.3 yrs
          </span>
        </div>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <a
            href="./index.html#projects"
            style={{
              fontSize: scaled(10),
              color: 'rgba(255,255,255,0.62)',
              border: '0.5px solid rgba(255,255,255,0.2)',
              borderRadius: 20,
              padding: '3px 11px',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            Main Portfolio ←
          </a>
          {/* {userStats.repos && (
            <span
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.38)',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: '3px 10px',
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {userStats.repos} repos
            </span>
          )}
          {userStats.followers != null && (
            <span
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.38)',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 20,
                padding: '3px 10px',
                fontFamily: "'Space Mono', monospace",
              }}
            >
              {userStats.followers} followers
            </span>
          )} */}
          <a
            href="https://github.com/Nkovaturient"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: scaled(10),
              color: '#00d4aa',
              border: '0.5px solid rgba(0,212,170,0.35)',
              borderRadius: 20,
              padding: '3px 11px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              transition: 'background 0.2s',
            }}
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/neha-kumari711/"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: scaled(10),
              color: '#45B7D1',
              border: '0.5px solid rgba(69,183,209,0.35)',
              borderRadius: 20,
              padding: '3px 11px',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            LinkedIn ↗
          </a>
        </div>
      </header>

      {/* Orbital universe */}
      <div
        className={paused ? 'paused' : ''}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ring decorations */}
        <div
          style={{
            position: 'absolute',
            width: outerOrbitSize,
            height: outerOrbitSize,
            borderRadius: '50%',
            border: '0.5px solid rgba(255,255,255,0.07)',
            animation: 'ring-breathe 5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: innerOrbitSize,
            height: innerOrbitSize,
            borderRadius: '50%',
            border: '0.5px solid rgba(0,212,170,0.12)',
            animation: 'ring-breathe 4s ease-in-out infinite 1.2s',
            pointerEvents: 'none',
          }}
        />

        {/* PLDG label on inner ring */}
        <div
          style={{
            position: 'absolute',
            top: `calc(50% - ${Math.round(214 * orbitScale)}px)`,
            fontSize: scaled(10),
            color: 'rgba(0,212,170,0.55)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700,
            pointerEvents: 'none',
          }}
        >
          ✦ PLDG Tech Partners ✦
        </div>
        <div
          style={{
            position: 'absolute',
            top: `calc(50% - ${Math.round(328 * orbitScale)}px)`,
            fontSize: scaled(10),
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 600,
            pointerEvents: 'none',
          }}
        >
          ✦ Open Source ✦
        </div>

        {/* Inner orbit */}
        <div
          className="orbit-inner-ring"
          style={{
            position: 'absolute',
            width: innerOrbitSize,
            height: innerOrbitSize,
            borderRadius: '50%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          {INNER_PROJECTS.map((p, i) => {
            const nodeSize = Math.round(78 * orbitScale);
            const nodeStyle = getNodeStyle(
              i,
              INNER_PROJECTS.length,
              innerOrbitRadius,
              nodeSize
            );
            const isSelected = selected?.id === p.id;
            const isHovered = hovered === p.id;
            return (
              <div
                key={p.id}
                className="node-inner"
                style={{ ...nodeStyle, pointerEvents: 'auto' }}
              >
                <div
                  className="proj-node"
                  onClick={() => handleNodeClick(p)}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    background: isSelected
                      ? `${p.color}22`
                      : isHovered
                      ? 'rgba(255,255,255,0.07)'
                      : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${
                      isSelected
                        ? p.color
                        : isHovered
                        ? `${p.color}60`
                        : 'rgba(255,255,255,0.14)'
                    }`,
                    boxShadow: isSelected
                      ? `0 0 22px ${p.glow}, inset 0 0 12px ${p.color}18`
                      : isHovered
                      ? `0 0 14px ${p.glow}`
                      : 'none',
                    backdropFilter: 'blur(14px)',
                    transition: 'all 0.28s ease',
                  }}
                >
                  <span style={{ fontSize: scaled(24), lineHeight: 1 }}>{p.emoji}</span>
                  <span
                    style={{
                      fontSize: scaled(8.5),
                      fontWeight: 700,
                      color: p.color,
                      textAlign: 'center',
                      maxWidth: Math.round(64 * orbitScale),
                      lineHeight: 1.25,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {p.shortName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Outer orbit */}
        <div
          className="orbit-outer-ring"
          style={{
            position: 'absolute',
            width: outerOrbitSize,
            height: outerOrbitSize,
            borderRadius: '50%',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          {OUTER_PROJECTS.map((p, i) => {
            const nodeSize = Math.round(72 * orbitScale);
            const nodeStyle = getNodeStyle(
              i,
              OUTER_PROJECTS.length,
              outerOrbitRadius,
              nodeSize
            );
            const isSelected = selected?.id === p.id;
            const isHovered = hovered === p.id;
            return (
              <div
                key={p.id}
                className="node-outer"
                style={{ ...nodeStyle, pointerEvents: 'auto' }}
              >
                <div
                  className="proj-node"
                  onClick={() => handleNodeClick(p)}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    background: isSelected
                      ? `${p.color}18`
                      : isHovered
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.025)',
                    border: `0.5px solid ${
                      isSelected
                        ? p.color
                        : isHovered
                        ? `${p.color}50`
                        : 'rgba(255,255,255,0.1)'
                    }`,
                    boxShadow: isSelected
                      ? `0 0 18px ${p.glow}`
                      : isHovered
                      ? `0 0 10px ${p.glow}`
                      : 'none',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.28s ease',
                  }}
                >
                  <span style={{ fontSize: scaled(22), lineHeight: 1 }}>{p.emoji}</span>
                  <span
                    style={{
                      fontSize: scaled(8),
                      fontWeight: 700,
                      color: p.color,
                      textAlign: 'center',
                      maxWidth: Math.round(58 * orbitScale),
                      lineHeight: 1.3,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {p.shortName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center hub */}
        <div
          onClick={closePanel}
          style={{
            width: Math.round(138 * orbitScale),
            height: Math.round(138 * orbitScale),
            borderRadius: '50%',
            position: 'relative',
            zIndex: 5,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background:
              'radial-gradient(circle at 38% 32%, rgba(0,212,170,0.14), rgba(14,165,233,0.07) 55%, rgba(139,92,246,0.05))',
            border: '1px solid rgba(0,212,170,0.22)',
            backdropFilter: 'blur(22px)',
            animation: 'center-pulse 3.5s ease-in-out infinite',
          }}
        >
          {userStats.avatar ? (
            <img
              src={userStats.avatar}
              alt="Neha"
              style={{
                width: Math.round(50 * orbitScale),
                height: Math.round(50 * orbitScale),
                borderRadius: '50%',
                border: '2px solid rgba(0,212,170,0.45)',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                width: Math.round(50 * orbitScale),
                height: Math.round(50 * orbitScale),
                borderRadius: '50%',
                background: 'rgba(0,212,170,0.2)',
                border: '2px solid rgba(0,212,170,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: scaled(20),
              }}
            >
              N
            </div>
          )}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontSize: scaled(11),
                fontWeight: 800,
                color: '#00d4aa',
                letterSpacing: '0.1em',
              }}
            >
              NEHA
            </div>
            <div
              style={{
                fontSize: scaled(8.5),
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.1em',
              }}
            >
              PLDG C2→C6
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left legend */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 14 : 24,
          left: isMobile ? 14 : 28,
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
          animation: 'fadeup 0.8s ease 0.3s both',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{ width: 28, height: 1.5, background: 'rgba(0,212,170,0.6)' }}
          />
          <span
            style={{
              fontSize: scaled(11.5),
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.05em',
            }}
          >
            PLDG Tech Partners — inner orbit
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 1.5,
              background: 'rgba(255,255,255,0.22)',
            }}
          />
          <span
            style={{
              fontSize: scaled(11.5),
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.05em',
            }}
          >
            Platforms Built at PLDG — outer orbit
          </span>
        </div>
      </div>

      {/* Bottom-right cohort dots */}
      <div
        style={{
          position: 'absolute',
          bottom: isMobile ? 14 : 24,
          right: journeyRight,
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          transition: 'right 0.38s cubic-bezier(0.4,0,0.2,1)',
          animation: 'fadeup 0.8s ease 0.5s both',
        }}
      >
        <span
          style={{
            fontSize: scaled(11),
            color: 'rgba(255,255,255,0.22)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 2,
          }}
        >
          Journey
        </span>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {Object.entries(COHORT_COLORS).map(([c, col]) => (
            <div
              key={c}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: col,
                  boxShadow: `0 0 10px ${col}90`,
                }}
              />
              <span style={{ fontSize: scaled(9.5), color: 'rgba(255,255,255,0.3)' }}>
                {c.replace('Cohort ', 'C')}
              </span>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              marginLeft: 6,
            }}
          >
            <div style={{ display: 'flex', gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 4,
                    height: 10,
                    borderRadius: 2,
                    background: Object.values(COHORT_COLORS)[i],
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: scaled(9.5), color: 'rgba(255,255,255,0.3)' }}>
              1.3 yrs
            </span>
          </div>
        </div>
      </div>

      {/* Selected project panel */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            right: panelRightInset,
            top: '50%',
            transform: 'translateY(-50%)',
            width: panelWidth,
            maxHeight: '80vh',
            background: 'rgba(4,12,26,0.82)',
            backdropFilter: 'blur(26px)',
            border: `0.5px solid ${selected.color}45`,
            borderRadius: 20,
            zIndex: 40,
            animation: 'slide-in-panel 0.32s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: `0 0 50px ${selected.glow}50, 0 24px 70px rgba(0,0,0,0.6)`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Gradient top accent */}
          <div
            style={{
              height: 3,
              background: `linear-gradient(90deg, transparent, ${selected.color}, transparent)`,
              opacity: 0.7,
            }}
          />

          <div
            style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '18px 16px 18px' : '20px 22px 22px' }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 14,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: scaled(28), lineHeight: 1 }}>
                    {selected.emoji}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: scaled(18),
                        fontWeight: 700,
                        color: selected.color,
                        lineHeight: 1.2,
                      }}
                    >
                      {selected.name}
                    </div>
                    {selected.partner && (
                      <div
                        style={{
                          fontSize: scaled(10),
                          color: 'rgba(255,255,255,0.38)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          marginTop: 2,
                        }}
                      >
                        PLDG · {selected.partner}
                      </div>
                    )}
                  </div>
                </div>
                <a
                  href={`https://github.com/${selected.fullName}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: scaled(10),
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.04em',
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {selected.fullName}
                </a>
              </div>
              <button
                onClick={closePanel}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: scaled(30),
                  height: scaled(30),
                  fontSize: scaled(16),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div
              style={{
                display: 'flex',
                gap: 4,
                marginBottom: 16,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 24,
                padding: 3,
              }}
            >
              {['overview', 'contributions', 'github'].map((tab) => (
                <button
                  key={tab}
                  className={`panel-tab${panelTab === tab ? ' active' : ''}`}
                  onClick={() => setPanelTab(tab)}
                  style={{
                    flex: 1,
                    background:
                      panelTab === tab ? selected.color : 'transparent',
                    color:
                      panelTab === tab ? '#030a14' : 'rgba(255,255,255,0.4)',
                    fontSize: scaled(11),
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {panelTab === 'overview' && (
              <div style={{ animation: 'fadeup 0.2s ease' }}>
                <p
                  style={{
                    fontSize: scaled(12.5),
                    color: 'rgba(255,255,255,0.68)',
                    lineHeight: 1.75,
                    marginBottom: 14,
                  }}
                >
                  {selected.description}
                </p>

                {/* Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 5,
                    marginBottom: 14,
                  }}
                >
                  {selected.tags?.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: scaled(10),
                        padding: '3px 9px',
                        borderRadius: 20,
                        background: `${selected.color}18`,
                        border: `0.5px solid ${selected.color}40`,
                        color: selected.color,
                        letterSpacing: '0.05em',
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Cohorts */}
                {selected.cohorts?.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.28)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: 7,
                      }}
                    >
                      Active During
                    </div>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {selected.cohorts.map((c) => (
                        <span
                          key={c}
                          style={{
                            fontSize: 9,
                            padding: '3px 10px',
                            borderRadius: 20,
                            background: `${COHORT_COLORS[c]}18`,
                            border: `0.5px solid ${COHORT_COLORS[c]}40`,
                            color: COHORT_COLORS[c],
                            fontWeight: 700,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {repoStats[selected.id] &&
                  repoStats[selected.id].description && (
                    <p
                      style={{
                        fontSize: 10.5,
                        color: 'rgba(255,255,255,0.38)',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                        marginBottom: 14,
                        borderLeft: `2px solid ${selected.color}40`,
                        paddingLeft: 10,
                      }}
                    >
                      {repoStats[selected.id].description}
                    </p>
                  )}

                <a
                  href={`https://github.com/${selected.fullName}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '9px',
                    borderRadius: 12,
                    background: `${selected.color}18`,
                    border: `0.5px solid ${selected.color}40`,
                    color: selected.color,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                  }}
                >
                  View Repository ↗
                </a>
              </div>
            )}

            {/* Tab: Contributions */}
            {panelTab === 'contributions' && (
              <div style={{ animation: 'fadeup 0.2s ease' }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  What I built & contributed
                </div>
                {selected.contributions?.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      marginBottom: 10,
                      padding: '10px 12px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 10,
                      border: '0.5px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: selected.color,
                        flexShrink: 0,
                        marginTop: 4,
                        boxShadow: `0 0 5px ${selected.color}`,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11.5,
                        color: 'rgba(255,255,255,0.72)',
                        lineHeight: 1.5,
                      }}
                    >
                      {c}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 16,
                    padding: '12px 14px',
                    background: `${selected.color}0e`,
                    borderRadius: 12,
                    border: `0.5px solid ${selected.color}30`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: selected.color,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: 5,
                    }}
                  >
                    Journey Role
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.6,
                    }}
                  >
                    Learner → Builder → Collaborator across 5 PLDG cohorts,
                    applying decentralized protocols hands-on through each
                    cycle.
                  </div>
                </div>
              </div>
            )}

            {/* Tab: GitHub */}
            {panelTab === 'github' && (
              <div style={{ animation: 'fadeup 0.2s ease' }}>
                {repoStats[selected.id] ? (
                  <>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 8,
                        marginBottom: 14,
                      }}
                    >
                      {[
                        {
                          label: 'Stars',
                          value: `⭐ ${repoStats[selected.id].stars}`,
                          col: '#FFEAA7',
                        },
                        {
                          label: 'Forks',
                          value: `🍴 ${repoStats[selected.id].forks}`,
                          col: '#87CEEB',
                        },
                        {
                          label: 'Language',
                          value: repoStats[selected.id].lang || '—',
                          col: '#96CEB4',
                        },
                        {
                          label: 'Open Issues',
                          value: repoStats[selected.id].issues,
                          col: '#F08080',
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '0.5px solid rgba(255,255,255,0.07)',
                            borderRadius: 10,
                            padding: '10px 12px',
                            textAlign: 'center',
                          }}
                        >
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 700,
                              color: stat.col,
                              marginBottom: 3,
                            }}
                          >
                            {stat.value}
                          </div>
                          <div
                            style={{
                              fontSize: 9,
                              color: 'rgba(255,255,255,0.3)',
                              letterSpacing: '0.06em',
                            }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    {repoStats[selected.id].updated && (
                      <div
                        style={{
                          fontSize: 10,
                          color: 'rgba(255,255,255,0.3)',
                          marginBottom: 14,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            background: '#00d4aa',
                            display: 'inline-block',
                          }}
                        />
                        Last updated: {fmtDate(repoStats[selected.id].updated)}
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '30px 0',
                      color: 'rgba(255,255,255,0.25)',
                      fontSize: 11,
                    }}
                  >
                    <div
                      style={{ fontSize: 24, marginBottom: 8, opacity: 0.4 }}
                    >
                      ⏳
                    </div>
                    Fetching live GitHub data…
                  </div>
                )}
                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={`https://github.com/${selected.fullName}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1,
                      display: 'block',
                      textAlign: 'center',
                      padding: '9px',
                      borderRadius: 12,
                      background: `${selected.color}18`,
                      border: `0.5px solid ${selected.color}40`,
                      color: selected.color,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    Repo ↗
                  </a>
                  <a
                    href={`https://github.com/${selected.fullName}/issues`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1,
                      display: 'block',
                      textAlign: 'center',
                      padding: '9px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.04)',
                      border: '0.5px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    Issues ↗
                  </a>
                  <a
                    href={`https://github.com/${selected.fullName}/pulls`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: 1,
                      display: 'block',
                      textAlign: 'center',
                      padding: '9px',
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.04)',
                      border: '0.5px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    PRs ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const pldgRoot = document.getElementById('pldg-root');

if (pldgRoot) {
  ReactDOM.createRoot(pldgRoot).render(<PLDGPortfolio />);
}
