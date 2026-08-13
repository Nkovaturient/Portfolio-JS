import { useState, useEffect, useRef } from "react";

// ─── Theme tokens ─────────────────────────────────────────────
const THEMES = {
  NEON: {
    id: "NEON",
    label: "Neon",
    bg: "#080810",
    panelBg: "#0d0d1a",
    panelBorder: "#00ff9d",
    accent1: "#00ff9d",
    accent2: "#ff2d78",
    accent3: "#7b61ff",
    text: "#e8fff4",
    textMuted: "#6b7db3",
    headerFont: "'Orbitron', monospace",
    bodyFont: "'JetBrains Mono', monospace",
    tagBg: "#0a1a12",
    tagText: "#00ff9d",
    bubbleBg: "#0d1a2a",
    bubbleBorder: "#00ff9d",
    statusColors: { IN_PROGRESS: "#7b61ff", TESTED: "#ff9d00", PROVEN: "#00ff9d" },
    halftone: false,
    scanlines: true,
    cornerStyle: "0px",
    panelShadow: "0 0 20px #00ff9d33, 0 0 40px #00ff9d11",
    speechTail: "#00ff9d",
  },
  RETRO: {
    id: "RETRO",
    label: "Retro",
    bg: "#f5e6c8",
    panelBg: "#fffdf0",
    panelBorder: "#1a1a1a",
    accent1: "#e8000a",
    accent2: "#0057b7",
    accent3: "#f5c518",
    text: "#1a1a1a",
    textMuted: "#555",
    headerFont: "'Bangers', cursive",
    bodyFont: "'Comic Neue', cursive",
    tagBg: "#f5c518",
    tagText: "#1a1a1a",
    bubbleBg: "#fffdf0",
    bubbleBorder: "#1a1a1a",
    statusColors: { IN_PROGRESS: "#0057b7", TESTED: "#f5c518", PROVEN: "#e8000a" },
    halftone: true,
    scanlines: false,
    cornerStyle: "4px",
    panelShadow: "4px 4px 0 #1a1a1a",
    speechTail: "#1a1a1a",
  },
  MANGA: {
    id: "MANGA",
    label: "Manga",
    bg: "#f0f0f0",
    panelBg: "#ffffff",
    panelBorder: "#111",
    accent1: "#111",
    accent2: "#555",
    accent3: "#888",
    text: "#111",
    textMuted: "#666",
    headerFont: "'Bangers', cursive",
    bodyFont: "'Comic Neue', cursive",
    tagBg: "#111",
    tagText: "#fff",
    bubbleBg: "#ffffff",
    bubbleBorder: "#111",
    statusColors: { IN_PROGRESS: "#888", TESTED: "#444", PROVEN: "#111" },
    halftone: false,
    scanlines: false,
    cornerStyle: "0px",
    panelShadow: "3px 3px 0 #111",
    speechTail: "#111",
  },
};

const TOOLS = ["CLAUDE", "CHATGPT", "GROK", "GEMINI", "CURSOR", "OTHER"];
const STATUSES = ["IN_PROGRESS", "TESTED", "PROVEN"];
const TAGS = [
  "RAG", "EMBEDDINGS", "FINE_TUNING", "LLM_INFERENCE", "PROMPT_ENGINEERING", "AGENTS",
  "DEFI", "ETHEREUM_AI", "WEB3", "SMART_CONTRACTS", "TOKENOMICS",
  "PRODUCTIVITY", "CODE_GEN", "DATA_ANALYSIS", "AUTOMATION",
  "PROVENANCE", "PROOF_OF_WORK", "TEST_DRIVEN", "KV_OPTIMIZATION", "AI_TUNING",
];

const TOOL_ICONS = {
  CLAUDE: "🟠", CHATGPT: "🟢", GROK: "⚡", GEMINI: "💎", CURSOR: "🖱️", OTHER: "🔮",
};

const STATUS_LABELS = {
  IN_PROGRESS: "In Progress", TESTED: "Tested", PROVEN: "Proven ✓",
};

function generateHash() {
  return "0x" + Math.random().toString(16).slice(2, 10).toUpperCase() +
    Date.now().toString(16).slice(-6).toUpperCase();
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

// ─── Speech Bubble ───────────────────────────────────────────
function SpeechBubble({ text, theme, style = {} }) {
  const t = THEMES[theme];
  return (
    <div style={{
      position: "relative",
      background: t.bubbleBg,
      border: `2px solid ${t.bubbleBorder}`,
      borderRadius: theme === "NEON" ? "8px" : "16px",
      padding: "10px 14px",
      fontFamily: t.bodyFont,
      fontSize: "12px",
      color: t.text,
      lineHeight: 1.5,
      marginBottom: "8px",
      ...style,
    }}>
      {text}
      <div style={{
        position: "absolute",
        bottom: "-10px",
        left: "20px",
        width: 0,
        height: 0,
        borderLeft: "8px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: `10px solid ${t.speechTail}`,
      }} />
    </div>
  );
}

// ─── Tag Pill ────────────────────────────────────────────────
function TagPill({ label, theme, onClick, selected }) {
  const t = THEMES[theme];
  return (
    <span
      onClick={onClick}
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: theme === "NEON" ? "2px" : "12px",
        background: selected ? t.accent1 : t.tagBg,
        color: selected ? (theme === "NEON" ? "#000" : t.tagText) : t.tagText,
        border: `1px solid ${selected ? t.accent1 : t.panelBorder}`,
        fontSize: "10px",
        fontFamily: t.bodyFont,
        fontWeight: selected ? "700" : "400",
        cursor: onClick ? "pointer" : "default",
        margin: "2px",
        letterSpacing: "0.5px",
        transition: "all 0.15s",
      }}
    >
      {label}
    </span>
  );
}

// ─── Status Badge ────────────────────────────────────────────
function StatusBadge({ status, theme }) {
  const t = THEMES[theme];
  const color = t.statusColors[status];
  return (
    <span style={{
      padding: "3px 10px",
      background: theme === "NEON" ? `${color}22` : color,
      color: theme === "NEON" ? color : (theme === "RETRO" && status === "TESTED" ? "#1a1a1a" : "#fff"),
      border: `1.5px solid ${color}`,
      borderRadius: theme === "NEON" ? "2px" : "4px",
      fontSize: "10px",
      fontFamily: t.bodyFont,
      fontWeight: "700",
      letterSpacing: "1px",
      textTransform: "uppercase",
    }}>
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── Comic Panel (Entry Card) ─────────────────────────────────
function ComicPanel({ entry, theme, onEdit, onDelete }) {
  const t = THEMES[theme];
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: t.panelBg,
      border: `3px solid ${t.panelBorder}`,
      borderRadius: t.cornerStyle,
      boxShadow: t.panelShadow,
      padding: "0",
      position: "relative",
      overflow: "hidden",
      transition: "box-shadow 0.2s",
      ...(t.halftone ? {
        backgroundImage: `radial-gradient(circle, ${t.panelBorder}18 1px, transparent 1px)`,
        backgroundSize: "8px 8px",
      } : {}),
    }}>
      {/* Scanline overlay for neon */}
      {t.scanlines && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }} />
      )}

      {/* Panel header bar */}
      <div style={{
        background: theme === "NEON" ? `${t.accent1}18` : t.accent1,
        borderBottom: `3px solid ${t.panelBorder}`,
        padding: "8px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>{TOOL_ICONS[entry.tool]}</span>
          <span style={{
            fontFamily: t.headerFont,
            fontSize: theme === "NEON" ? "13px" : "15px",
            color: theme === "NEON" ? t.accent1 : (theme === "RETRO" ? "#fff" : t.text),
            fontWeight: "900",
            letterSpacing: theme === "NEON" ? "2px" : "1px",
            textTransform: "uppercase",
          }}>
            {entry.title}
          </span>
        </div>
        <StatusBadge status={entry.status} theme={theme} />
      </div>

      <div style={{ padding: "12px 14px", position: "relative", zIndex: 1 }}>
        {/* Speech bubble for prompt */}
        <div style={{ marginBottom: "10px" }}>
          <div style={{
            fontSize: "9px",
            fontFamily: t.bodyFont,
            color: t.textMuted,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}>PROMPT</div>
          <SpeechBubble
            text={entry.prompt.length > 120 && !expanded
              ? entry.prompt.slice(0, 120) + "…"
              : entry.prompt}
            theme={theme}
          />
        </div>

        {/* Output */}
        {entry.output && (
          <div style={{ marginBottom: "10px" }}>
            <div style={{
              fontSize: "9px", fontFamily: t.bodyFont, color: t.textMuted,
              letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px",
            }}>OUTPUT / RESULT</div>
            <div style={{
              background: theme === "NEON" ? "#0a1a0a" : (theme === "RETRO" ? "#f0f8e8" : "#f8f8f8"),
              border: `1.5px solid ${t.panelBorder}`,
              borderRadius: "4px",
              padding: "8px 10px",
              fontFamily: t.bodyFont,
              fontSize: "11px",
              color: t.text,
              lineHeight: 1.6,
              maxHeight: expanded ? "none" : "60px",
              overflow: "hidden",
            }}>
              {entry.output}
            </div>
          </div>
        )}

        {/* Tags */}
        {entry.tags?.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            {entry.tags.map(tag => (
              <TagPill key={tag} label={tag} theme={theme} />
            ))}
          </div>
        )}

        {/* Meta footer */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${t.panelBorder}40`,
          paddingTop: "8px",
          gap: "8px",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontFamily: t.bodyFont, fontSize: "9px", color: t.textMuted }}>
              {entry.tool} · {formatDate(entry.createdAt)}
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "8px",
              color: theme === "NEON" ? t.accent3 : t.textMuted,
              opacity: 0.7,
            }}>
              {entry.provenanceHash}
            </span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "transparent",
                border: `1px solid ${t.panelBorder}60`,
                color: t.textMuted,
                borderRadius: "3px",
                padding: "3px 8px",
                fontSize: "10px",
                fontFamily: t.bodyFont,
                cursor: "pointer",
              }}
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
            <button
              onClick={() => onEdit(entry)}
              style={{
                background: "transparent",
                border: `1px solid ${t.accent3}`,
                color: t.accent3,
                borderRadius: "3px",
                padding: "3px 8px",
                fontSize: "10px",
                fontFamily: t.bodyFont,
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(entry.id)}
              style={{
                background: "transparent",
                border: `1px solid ${t.accent2}`,
                color: t.accent2,
                borderRadius: "3px",
                padding: "3px 8px",
                fontSize: "10px",
                fontFamily: t.bodyFont,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Entry Form Modal ─────────────────────────────────────────
function EntryForm({ theme, onSave, onClose, editEntry = null, aiLoading, onAIAssist }) {
  const t = THEMES[theme];
  const [form, setForm] = useState(editEntry || {
    title: "", prompt: "", output: "", tool: "CLAUDE", status: "IN_PROGRESS",
    tags: [], modelVersion: "", context: "",
  });

  const toggle = (tag) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(x => x !== tag) : [...f.tags, tag],
    }));
  };

  const inputStyle = {
    width: "100%",
    background: theme === "NEON" ? "#070712" : "#fff",
    border: `2px solid ${t.panelBorder}`,
    borderRadius: t.cornerStyle || "4px",
    color: t.text,
    fontFamily: t.bodyFont,
    fontSize: "12px",
    padding: "8px 10px",
    boxSizing: "border-box",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontFamily: t.headerFont,
    fontSize: theme === "NEON" ? "11px" : "12px",
    color: t.accent1,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "4px",
    marginTop: "12px",
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }}>
      <div style={{
        background: t.panelBg,
        border: `3px solid ${t.panelBorder}`,
        borderRadius: t.cornerStyle,
        boxShadow: t.panelShadow,
        width: "min(680px, 95vw)",
        maxHeight: "90vh",
        overflow: "auto",
        padding: "24px",
      }}>
        <div style={{
          fontFamily: t.headerFont,
          fontSize: theme === "NEON" ? "18px" : "22px",
          color: t.accent1,
          letterSpacing: theme === "NEON" ? "4px" : "2px",
          textTransform: "uppercase",
          marginBottom: "16px",
          borderBottom: `2px solid ${t.panelBorder}`,
          paddingBottom: "12px",
        }}>
          {editEntry ? "✏️ Edit Panel" : "✚ New Playbook Entry"}
        </div>

        <label style={labelStyle}>Title</label>
        <input style={inputStyle} value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="What did you figure out?" />

        <label style={labelStyle}>Prompt / Use Case</label>
        <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
          value={form.prompt}
          onChange={e => setForm(f => ({ ...f, prompt: e.target.value }))}
          placeholder="The exact prompt or use case that worked..." />

        {/* AI Assist button */}
        <button
          onClick={() => onAIAssist(form, (suggestion) => setForm(f => ({ ...f, ...suggestion })))}
          disabled={aiLoading || !form.prompt}
          style={{
            marginTop: "8px",
            background: theme === "NEON" ? `${t.accent1}22` : t.accent3,
            border: `1.5px solid ${t.accent1}`,
            color: theme === "NEON" ? t.accent1 : (theme === "RETRO" ? "#1a1a1a" : t.text),
            borderRadius: t.cornerStyle || "4px",
            padding: "6px 14px",
            fontSize: "11px",
            fontFamily: t.bodyFont,
            cursor: "pointer",
            fontWeight: "700",
            letterSpacing: "1px",
            opacity: (!form.prompt || aiLoading) ? 0.5 : 1,
          }}
        >
          {aiLoading ? "🤖 AI thinking…" : "🤖 AI: Suggest Tags + Output"}
        </button>

        <label style={labelStyle}>Output / Result</label>
        <textarea style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
          value={form.output}
          onChange={e => setForm(f => ({ ...f, output: e.target.value }))}
          placeholder="What it produced, or why it was effective..." />

        <label style={labelStyle}>Tool</label>
        <select style={inputStyle} value={form.tool}
          onChange={e => setForm(f => ({ ...f, tool: e.target.value }))}>
          {TOOLS.map(t => <option key={t}>{t}</option>)}
        </select>

        <label style={labelStyle}>Model Version</label>
        <input style={inputStyle} value={form.modelVersion}
          onChange={e => setForm(f => ({ ...f, modelVersion: e.target.value }))}
          placeholder="e.g. claude-sonnet-4-6, gpt-4o, gemini-2.5-pro" />

        <label style={labelStyle}>Status</label>
        <select style={inputStyle} value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
          {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>

        <label style={labelStyle}>Tags</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", marginBottom: "8px" }}>
          {TAGS.map(tag => (
            <TagPill key={tag} label={tag} theme={theme}
              selected={form.tags.includes(tag)}
              onClick={() => toggle(tag)} />
          ))}
        </div>

        <label style={labelStyle}>Context / Notes</label>
        <textarea style={{ ...inputStyle, minHeight: "50px", resize: "vertical" }}
          value={form.context}
          onChange={e => setForm(f => ({ ...f, context: e.target.value }))}
          placeholder="Setup notes, constraints, background..." />

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={() => onSave(form)}
            style={{
              flex: 1,
              background: t.accent1,
              border: `2px solid ${t.panelBorder}`,
              color: theme === "NEON" ? "#000" : "#fff",
              borderRadius: t.cornerStyle || "4px",
              padding: "10px",
              fontSize: "13px",
              fontFamily: t.headerFont,
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            {editEntry ? "Update Panel" : "Add to Playbook"}
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 0,
              background: "transparent",
              border: `2px solid ${t.accent2}`,
              color: t.accent2,
              borderRadius: t.cornerStyle || "4px",
              padding: "10px 20px",
              fontSize: "13px",
              fontFamily: t.headerFont,
              letterSpacing: "2px",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("NEON");
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [filterTool, setFilterTool] = useState("ALL");
  const [filterTag, setFilterTag] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [aiLoading, setAiLoading] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const t = THEMES[theme];

  // ── Persistent storage ──────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage.get("playbook_entries");
        if (result?.value) setEntries(JSON.parse(result.value));
        const themeResult = await window.storage.get("playbook_theme");
        if (themeResult?.value) setTheme(themeResult.value);
        setStorageReady(true);
      } catch {
        setStorageReady(true);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function saveEntries(newEntries) {
    setEntries(newEntries);
    try {
      await window.storage.set("playbook_entries", JSON.stringify(newEntries));
    } catch { }
  }

  async function saveTheme(th) {
    setTheme(th);
    try { await window.storage.set("playbook_theme", th); } catch { }
  }

  // ── AI Assist ───────────────────────────────────────────────
  async function handleAIAssist(form, callback) {
    setAiLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `You are an AI assistant helping categorize a GenAI playbook entry. Given this prompt/use-case, respond ONLY with a JSON object (no markdown, no backticks):
{
  "output": "Brief description of what this use case produces and why it works",
  "tags": ["TAG1", "TAG2"],
  "modelVersion": "suggested model if inferable",
  "status": "IN_PROGRESS|TESTED|PROVEN"
}

Available tags: ${TAGS.join(", ")}

Prompt/Use-case: "${form.prompt}"
Tool: ${form.tool}
Title: ${form.title || "(none yet)"}`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      callback(parsed);
    } catch (e) {
      callback({ output: "AI assist failed — fill manually." });
    }
    setAiLoading(false);
  }

  // ── CRUD ────────────────────────────────────────────────────
  function handleSave(form) {
    if (!form.title || !form.prompt) return;
    if (editEntry) {
      const updated = entries.map(e =>
        e.id === editEntry.id ? { ...e, ...form, updatedAt: new Date().toISOString() } : e
      );
      saveEntries(updated);
    } else {
      const newEntry = {
        ...form,
        id: crypto.randomUUID?.() || Date.now().toString(),
        createdAt: new Date().toISOString(),
        provenanceHash: generateHash(),
      };
      saveEntries([newEntry, ...entries]);
    }
    setShowForm(false);
    setEditEntry(null);
  }

  function handleDelete(id) {
    saveEntries(entries.filter(e => e.id !== id));
  }

  function handleEdit(entry) {
    setEditEntry(entry);
    setShowForm(true);
  }

  // ── Filter ──────────────────────────────────────────────────
  const filtered = entries.filter(e => {
    if (filterTool !== "ALL" && e.tool !== filterTool) return false;
    if (filterStatus !== "ALL" && e.status !== filterStatus) return false;
    if (filterTag !== "ALL" && !e.tags?.includes(filterTag)) return false;
    return true;
  });

  // ── Stats ───────────────────────────────────────────────────
  const stats = {
    total: entries.length,
    proven: entries.filter(e => e.status === "PROVEN").length,
    tools: [...new Set(entries.map(e => e.tool))].length,
    tags: [...new Set(entries.flatMap(e => e.tags || []))].length,
  };

  if (loading) {
    return (
      <div style={{ background: "#080810", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Orbitron', monospace", color: "#00ff9d", fontSize: "14px", letterSpacing: "4px" }}>
          INITIALIZING PLAYBOOK…
        </span>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Bangers&family=JetBrains+Mono:wght@400;700&family=Comic+Neue:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${t.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.accent1}66; border-radius: 3px; }
        select option { background: ${t.panelBg}; color: ${t.text}; }
      `}</style>

      <div style={{ background: t.bg, minHeight: "100vh", padding: "0 0 40px 0", transition: "background 0.3s" }}>

        {/* ── Masthead ─────────────────────────────────────── */}
        <div style={{
          borderBottom: `3px solid ${t.panelBorder}`,
          background: theme === "NEON" ? `${t.accent1}08` : (theme === "RETRO" ? t.accent1 : t.panelBg),
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <div>
            <div style={{
              fontFamily: t.headerFont,
              fontSize: "clamp(18px, 4vw, 28px)",
              color: theme === "NEON" ? t.accent1 : (theme === "RETRO" ? "#fff" : t.text),
              letterSpacing: theme === "NEON" ? "6px" : "3px",
              textTransform: "uppercase",
              lineHeight: 1,
            }}>
              ⚡ Gen AI Playbook
            </div>
            <div style={{
              fontFamily: t.bodyFont,
              fontSize: "10px",
              color: theme === "NEON" ? t.accent3 : (theme === "RETRO" ? "#ffffffaa" : t.textMuted),
              letterSpacing: "2px",
              marginTop: "3px",
            }}>
              Prompts · Use Cases · Provenance · Proof of Work
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Theme toggle */}
            {["NEON", "RETRO", "MANGA"].map(th => (
              <button
                key={th}
                onClick={() => saveTheme(th)}
                style={{
                  background: theme === th ? THEMES[th].accent1 : "transparent",
                  border: `2px solid ${THEMES[th].accent1}`,
                  color: theme === th ? (th === "NEON" ? "#000" : "#fff") : THEMES[th].accent1,
                  borderRadius: "3px",
                  padding: "5px 10px",
                  fontSize: "10px",
                  fontFamily: t.bodyFont,
                  fontWeight: "700",
                  letterSpacing: "1.5px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                }}
              >
                {THEMES[th].label}
              </button>
            ))}

            <button
              onClick={() => { setEditEntry(null); setShowForm(true); }}
              style={{
                background: t.accent1,
                border: `2px solid ${t.panelBorder}`,
                color: theme === "NEON" ? "#000" : "#fff",
                borderRadius: t.cornerStyle || "4px",
                padding: "7px 16px",
                fontSize: "12px",
                fontFamily: t.headerFont,
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: "900",
              }}
            >
              + New Panel
            </button>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 20px 0" }}>

          {/* ── Stats bar ──────────────────────────────────── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            marginBottom: "20px",
          }}>
            {[
              { label: "Total Entries", value: stats.total, color: t.accent1 },
              { label: "Proven", value: stats.proven, color: t.statusColors?.PROVEN || t.accent1 },
              { label: "Tools Used", value: stats.tools, color: t.accent3 },
              { label: "Tag Types", value: stats.tags, color: t.accent2 },
            ].map(stat => (
              <div key={stat.label} style={{
                background: t.panelBg,
                border: `2px solid ${stat.color}`,
                borderRadius: t.cornerStyle,
                padding: "10px 14px",
                boxShadow: theme === "NEON" ? `0 0 12px ${stat.color}22` : t.panelShadow,
              }}>
                <div style={{
                  fontFamily: t.headerFont,
                  fontSize: "clamp(20px, 4vw, 28px)",
                  color: stat.color,
                  lineHeight: 1,
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: t.bodyFont,
                  fontSize: "9px",
                  color: t.textMuted,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── Filters ────────────────────────────────────── */}
          <div style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "20px",
            alignItems: "center",
          }}>
            <span style={{ fontFamily: t.bodyFont, fontSize: "10px", color: t.textMuted, letterSpacing: "1px", textTransform: "uppercase" }}>Filter:</span>
            {[
              { label: "Tool", value: filterTool, setter: setFilterTool, options: ["ALL", ...TOOLS] },
              { label: "Status", value: filterStatus, setter: setFilterStatus, options: ["ALL", ...STATUSES] },
              { label: "Tag", value: filterTag, setter: setFilterTag, options: ["ALL", ...TAGS] },
            ].map(f => (
              <select
                key={f.label}
                value={f.value}
                onChange={e => f.setter(e.target.value)}
                style={{
                  background: t.panelBg,
                  border: `1.5px solid ${t.panelBorder}`,
                  color: t.text,
                  fontFamily: t.bodyFont,
                  fontSize: "10px",
                  padding: "5px 8px",
                  borderRadius: t.cornerStyle || "4px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {f.options.map(o => (
                  <option key={o} value={o}>
                    {o === "ALL" ? `All ${f.label}s` : STATUS_LABELS[o] || o}
                  </option>
                ))}
              </select>
            ))}
            <span style={{
              fontFamily: t.bodyFont,
              fontSize: "9px",
              color: t.textMuted,
              marginLeft: "4px",
            }}>
              {filtered.length} of {entries.length} panels
            </span>
          </div>

          {/* ── Comic Panel Grid ───────────────────────────── */}
          {filtered.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              border: `2px dashed ${t.panelBorder}`,
              borderRadius: t.cornerStyle,
              background: t.panelBg,
            }}>
              <div style={{
                fontFamily: t.headerFont,
                fontSize: "24px",
                color: t.accent1,
                letterSpacing: "3px",
                marginBottom: "12px",
              }}>
                {entries.length === 0 ? "EMPTY PLAYBOOK" : "NO MATCHING PANELS"}
              </div>
              <div style={{ fontFamily: t.bodyFont, fontSize: "12px", color: t.textMuted }}>
                {entries.length === 0
                  ? "Add your first use case, prompt, or experiment. Every panel is proof of work."
                  : "Adjust your filters to see entries."}
              </div>
              {entries.length === 0 && (
                <button
                  onClick={() => { setEditEntry(null); setShowForm(true); }}
                  style={{
                    marginTop: "20px",
                    background: t.accent1,
                    border: "none",
                    color: theme === "NEON" ? "#000" : "#fff",
                    padding: "10px 24px",
                    fontFamily: t.headerFont,
                    fontSize: "14px",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: t.cornerStyle || "4px",
                  }}
                >
                  ✚ Create First Panel
                </button>
              )}
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "16px",
            }}>
              {filtered.map(entry => (
                <ComicPanel
                  key={entry.id}
                  entry={entry}
                  theme={theme}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* ── Footer provenance ──────────────────────────── */}
          {entries.length > 0 && (
            <div style={{
              marginTop: "30px",
              padding: "12px 16px",
              border: `1px solid ${t.panelBorder}40`,
              borderRadius: t.cornerStyle,
              background: t.panelBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: t.textMuted, letterSpacing: "1px" }}>
                PLAYBOOK_STORE · {entries.length} entries · persistent via Artifact storage
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: t.accent3, letterSpacing: "1px" }}>
                Supabase schema: prisma/schema.prisma · client: src/prisma.client.ts
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Form Modal ─────────────────────────────────────── */}
      {showForm && (
        <EntryForm
          theme={theme}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditEntry(null); }}
          editEntry={editEntry}
          aiLoading={aiLoading}
          onAIAssist={handleAIAssist}
        />
      )}
    </>
  );
}
