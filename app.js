const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Typed intro with lazy load fallback
(function initTyped() {
  const runTyped = () => {
    if (!window.Typed) return false;
    new Typed('#typed', {
      strings: [
        'Full-stack Developer.',
        'Open Source Contributor.',
        'Explorer.',
        'Tech Enthusiast.',
        'Astrophile.',
      ],
      typeSpeed: 38,
      backSpeed: 20,
      backDelay: 1400,
      loop: true,
    });
    return true;
  };

  if (runTyped()) return;

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.10/typed.min.js';
  script.async = true;
  script.onload = () => {
    if (!runTyped()) {
      const typed = document.getElementById('typed');
      if (typed) typed.textContent = 'Full-stack Developer';
    }
  };
  script.onerror = () => {
    const typed = document.getElementById('typed');
    if (typed) typed.textContent = 'Full-stack Developer';
    console.warn('Typed.js could not be loaded; showing static text.');
  };
  document.head.appendChild(script);
})();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Starfield background
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width = window.innerWidth;
  let height = window.innerHeight;
  let pointer = { x: 0, y: 0 };

  const starCount = Math.min(180, Math.floor(width / 8));

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.4 + 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    for (const star of stars) {
      const px = star.x + (pointer.x - width / 2) * star.z * 0.02;
      const py = star.y + (pointer.y - height / 2) * star.z * 0.02;
      const alpha = 0.35 + star.z * 0.4;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(px, py, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    if (!prefersReducedMotion) {
      draw();
      requestAnimationFrame(loop);
    } else {
      draw();
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });

  resize();
  loop();
})();

// Meta-card tilt
(function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -6;
      const ry = ((x / rect.width) - 0.5) * 6;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    });
  });
})();

// Timeline illumination
(function initTimeline() {
  const nodes = document.querySelectorAll('.timeline-node');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('lit');
      }
    });
  }, { threshold: 0.3 });
  nodes.forEach(node => observer.observe(node));
})();

// Skills constellation
(function initConstellation() {
  const canvas = document.getElementById('skills-constellation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, points;
  const count = 36;

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(60,242,255,${1 - dist / 140})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    ctx.fillStyle = '#f7fbff';
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize();
  step();
})();

// Projects (static showcase with 3D cards)
(function loadProjects() {
  const track = document.getElementById('project-track');
  if (!track) return;

  const projects = [
    {
      name: 'Muse-onic',
      description: 'Local music assistant that finds and plays tracks with drand randomness and LLM hints.',
      stack: ['Python', 'Javascript', 'Electron', 'Whisper', 'Ollama', 'Local Assistant', 'n8n', 'Libp2p', 'Audio', 'mpv', 'yt-dlp'],
      url: 'https://github.com/Nkovaturient/Muse-onic',
      highlight: true
    },
    {
      name: 'Ghostlock-MEV-Reaper',
      description: 'Shield against MEV—encrypt, randomize, and settle trades fairly.',
      stack: ['TypeScript', 'DeFi', 'Web3', 'MEV', 'Crypto', 'Smart Contracts', 'Solidity', 'Ethereum', 'Randamu', 'Dcipher'],
      url: 'https://github.com/Nkovaturient/GhostLock-MEV-Reaper',
      highlight: true
    },
    {
      name: 'SecretShare',
      description: 'Delegate time-limited, usage-bound access to secrets using UCANs without revealing them.',
      stack: ['JavaScript', 'UCAN', 'Storacha', 'Lit-protocol', 'Security', 'Web3'],
      url: 'https://github.com/Nkovaturient/SecretShare',
      highlight: true
    },
    {
      name: 'VRForge',
      description: 'Split bills, spawn anime characters, or demo drand-powered randomness.',
      stack: ['JavaScript', 'drand', 'vrf', 'UI', 'APIs'],
      url: 'https://github.com/Nkovaturient/VRForge'
    },
    {
      name: 'Tripmate-Planner',
      description: 'Collaborative trip planner with smart scheduling.',
      stack: ['TypeScript', 'Maps', 'Planning', 'Web', 'Serpapi', 'Storacha', 'ElizaOS'],
      url: 'https://github.com/Nkovaturient/Tripmate-Planner'
    },
    {
      name: 'Xpensigium',
      description: 'Household expense tracker with charts and calm UX.',
      stack: ['MERN', 'Chartsj', 'JWT', 'Node', 'Tailwind CSS'],
      url: 'https://github.com/Nkovaturient/Xpensigium-Expense-Tracker-Web-App'
    },
    {
      name: 'AstrophileYard',
      description: 'Cosmic hub for stargazers—APOD, gallery, and community sharing.',
      stack: ['JavaScript', 'APIs', 'Community', 'NASA API', 'Passportjs', 'JWT', 'Express', 'Geolocation'],
      url: 'https://github.com/Nkovaturient/AstrophileYard-Web-App'
    }
  ];

  renderCards(projects);
  updateIdentityStats({ repos: 109, followers: 55 });

  function renderCards(list) {
    track.innerHTML = '';
    list.forEach(item => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${item.name}</h3>
        <p class="project-meta">${item.description}</p>
        <div class="badges">
          ${item.highlight ? '<span>★ Highlight</span>' : ''}
          ${item.stack.map(tag => `<span>${tag}</span>`).join('')}
        </div>
        <a class="button ghost" href="${item.url}" target="_blank" rel="noopener">View on GitHub</a>
      `;
      track.appendChild(card);
    });
  }

  function updateIdentityStats(data) {
    const reposEl = document.getElementById('stat-repos');
    const followersEl = document.getElementById('stat-followers');
    if (!reposEl || !followersEl) return;
    reposEl.textContent = data.repos ?? '—';
    followersEl.textContent = data.followers ?? '—';
  }
})();

// Open-source signals (recent events)
(async function loadSignals() {
  const list = document.getElementById('signal-list');
  const canvas = document.getElementById('signal-waves');
  if (!list || !canvas) return;
  const handle = 'Nkovaturient';
  const ctx = canvas.getContext('2d');
  let width, height, t = 0;

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);
  }

  function drawWaves() {
    ctx.clearRect(0, 0, width, height);
    const waves = 3;
    for (let i = 0; i < waves; i++) {
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin((x + t + i * 40) * 0.02) * (12 + i * 4);
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(60,242,255,${0.35 - i * 0.08})`;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    t += 2;
    if (!prefersReducedMotion) requestAnimationFrame(drawWaves);
  }

  resize();
  drawWaves();
  window.addEventListener('resize', resize);

  // Static highlights of active/merged PRs & key issues
  renderSignals([
    { type: 'PR (Open)', repo: 'libp2p/py-libp2p', time: 'Open', note: 'Fix QUIC stream direction, CID routing/promotion races.' },
    { type: 'PR (Open)', repo: 'storacha/console-toolkit', time: 'Open', note: 'feat(toolkit-examples): dmail + web3mail integration guide.' },
    { type: 'PR (Open)', repo: 'Repello-AI/Agent-Wiz', time: 'Open', note: 'Enhance Agent UI viz for agentic flows.' },
    { type: 'PR (Merged)', repo: 'libp2p/js-libp2p-examples', time: 'Merged', note: 'Add WebRTC private→public example via QR/signaling.' },
    { type: 'Issue (Open)', repo: 'storacha/console-toolkit', time: 'Updated', note: 'Docs & examples site for Storacha console toolkit.' },
    { type: 'Issue (In Progress)', repo: 'ipfs/helia', time: 'In Progress', note: 'Remote pinning service: aggregate error handling.' },
  ]);

  function renderSignals(items) {
    list.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'signal-item';
      div.innerHTML = `
        <h4>${item.type.replace('Event','')}</h4>
        <p class="microcopy">${item.repo}</p>
        <p class="microcopy">${item.note}</p>
        <p class="microcopy">${item.time}</p>
      `;
      list.appendChild(div);
    });
  }
})();

// Contact form with EmailJS (reuses existing service/template)
(function initContact() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  const button = document.getElementById('contact-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Transmitting…';
    button.disabled = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Signal needs name, email, and message.';
      button.disabled = false;
      return;
    }

    try {
      if (!window.emailjs) throw new Error('Email service not loaded');
      await emailjs.send('service_k6r5bm9', 'template_5zvwmti', {
        username: name,
        email,
        message,
      }, '6cpSKOFj-GdJ9gdD7');
      status.textContent = 'Signal received. I will respond shortly.';
      form.reset();
    } catch (err) {
      status.textContent = 'Signal failed to send. Try again soon.';
    } finally {
      button.disabled = false;
    }
  });
})();

// GSAP entrance if available
if (window.gsap && !prefersReducedMotion) {
  gsap.from('.hero-text > *', { y: 18, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out' });
  gsap.from('.hero-orbit', { y: 24, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' });
}
