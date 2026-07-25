import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Timeline", "Contact"];

const SKILLS_DATA = [
  { icon: "💻", title: "Languages", tags: ["Java", "Python", "C", "PHP", "Kotlin", "JavaScript"] },
  { icon: "🎨", title: "Frontend", tags: ["React", "HTML5", "CSS3", "Bootstrap", "JavaScript"] },
  { icon: "⚙️", title: "Frameworks & Tools", tags: ["Flask", "Django", "MERN", "Git/GitHub", "Docker", "Postman"] },
  { icon: "🗄️", title: "Databases & Cloud", tags: ["MySQL", "Oracle", "MongoDB", "Firebase", "Google Cloud", "AWS", "Render", "REST APIs"] },
  { icon: "📱", title: "Android", tags: ["Kotlin", "Jetpack Compose", "Android Studio"] },
  { icon: "🧠", title: "AI / Gen AI", tags: ["Generative AI", "Machine Learning", "Pre-trained Model Integration", "Ethical Hacking"] },
];

const EXPERIENCE = [
  {
    role: "SDE @ Abhyutthanam Digital",
    company: "Abhyutthanam Digital",
    period: "July 2026 – Present",
    color: "#4ade80",
    points: [],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Abhyutthanam Digital",
    period: "June 2025 – November 2025",
    color: "#6366f1",
    points: [
      "Contributed to a multi-tenant LMS used by schools for academics and administration.",
      "Built core modules: student/teacher onboarding, course creation, assignments, tests, result publishing.",
      "Implemented RBAC for admin, teacher, student, and parent roles for secure, privacy-compliant access.",
      "Integrated REST APIs with a React frontend for dashboards, attendance, notices, and analytics.",
      "Optimized MySQL queries to reduce query time on high-volume school data.",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "Abhyutthanam Digital",
    period: "June 2024 – August 2024",
    color: "#a855f7",
    points: [
      "Developed REST APIs using PHP and MySQL for user management, course mapping, and progress tracking.",
      "Designed normalized DB schema for classes, sections, subjects, exams, and fee records.",
      "Implemented server-side validation, error handling, and logging for stable backend services.",
      "Collaborated with frontend team to integrate APIs and resolve performance edge cases.",
    ],
  },
];

// Sourced from github.com/Sidd-Tiwari repositories
const PROJECTS = [
  {
    emoji: "🏫",
    bg: "#1e1b4b",
    title: "Springdale School ERP",
    desc: "Full-stack school ERP split into a Java backend and a TypeScript frontend — handling classes, sections, exams, fees, and academic records for a multi-tenant school system.",
    tags: ["Java", "TypeScript", "React", "REST APIs"],
    repos: [
      { label: "Backend", url: "https://github.com/Sidd-Tiwari/springdale-erp-backend" },
      { label: "Frontend", url: "https://github.com/Sidd-Tiwari/school-erp-frontend-ts" },
    ],
  },
  {
    emoji: "🏠",
    bg: "#3b0764",
    title: "Hostel Management System (HMS)",
    desc: "Full-stack hostel management platform with a Java backend and TypeScript frontend, covering room allocation, resident records, and admin workflows.",
    tags: ["Java", "TypeScript", "React", "MySQL"],
    repos: [
      { label: "Backend", url: "https://github.com/Sidd-Tiwari/hms-backend" },
      { label: "Frontend", url: "https://github.com/Sidd-Tiwari/hms-frontend" },
    ],
  },
  {
    emoji: "💬",
    bg: "#052e16",
    title: "Real-Time Chat Application",
    desc: "A real-time chat application built using Spring Boot, WebSocket, and STOMP that enables instant message delivery between connected users, with JWT auth, multiple chat rooms, and private messaging.",
    tags: ["Java 21+", "Spring Boot", "STOMP", "JWT", "WebSockets"],
    repos: [{ label: "GitHub", url: "https://github.com/Sidd-Tiwari/Real-Time-Chat-Application" }],
  },
  {
    emoji: "🏨",
    bg: "#78350f",
    title: "Hotel Management System",
    desc: "Java-based hotel management system covering room booking, guest records, and billing workflows for front-desk operations.",
    tags: ["Java", "MySQL"],
    repos: [{ label: "GitHub", url: "https://github.com/Sidd-Tiwari/Hotel-Management-System" }],
  },
  {
    emoji: "🔁",
    bg: "#0f172a",
    title: "RecoFlow",
    desc: "A Java-based workflow/recommendation engine project exploring rule-driven flow processing.",
    tags: ["Java"],
    repos: [{ label: "GitHub", url: "https://github.com/Sidd-Tiwari/recoflow" }],
  },
  {
    emoji: "🧾",
    bg: "#78350f",
    title: "GST Calculator App",
    desc: "Android app using Kotlin & Jetpack Compose for real-time GST calculation, with dynamic rate selection, bi-directional calculations, and clean GST breakdowns.",
    tags: ["Kotlin", "Jetpack Compose", "Android"],
    repos: [{ label: "GitHub", url: "https://github.com/Sidd-Tiwari/gst-calculator" }],
  },
  {
    emoji: "👋",
    bg: "#1e1b4b",
    title: "Farewell",
    desc: "A TypeScript web app for organizing and sharing a farewell / send-off event experience.",
    tags: ["TypeScript", "React"],
    repos: [{ label: "GitHub", url: "https://github.com/Sidd-Tiwari/farewell" }],
  },
  {
    emoji: "🤖",
    bg: "#052e16",
    title: "Working LLM",
    desc: "An experimental JavaScript project exploring how to wire up and work with LLMs in an application context.",
    tags: ["JavaScript", "LLM"],
    repos: [{ label: "GitHub", url: "https://github.com/Sidd-Tiwari/working-llm" }],
  },
];

// Timeline: competition/mentorship achievements + certifications verified from
// LinkedIn "Licenses & certifications" (chronological order, oldest to newest)
const TIMELINE = [
  { year: "2023", icon: "🤖", type: "Achievement", title: "IIT Kanpur TechFest Robotics – Runner-up", desc: "Designed and programmed an autonomous robot for task-based challenges at Techkriti 23." },
  { year: "2023–24", icon: "🎓", type: "Program", title: "IEEE Mentee", desc: "Selected as mentee in IEEE India Council Industry-Academia Young Professionals Committee (IAYPC)." },
  { year: "2024", icon: "🥇", type: "Achievement", title: "Algorithmic Arena & Code Mesh – Winner", desc: "Won the PRISM 24 competitive programming contest organized by University of Lucknow." },
  { year: "2024", icon: "🏆", type: "Achievement", title: "Innovative Arena Hackathon – 2nd Runner-up", desc: "Among 6,000 participants at GLA Mathura. Built a sentiment analysis prototype using Python, the pretrained j-hartmann model, and Google/Kaggle datasets." },
  { year: "Nov 2024", icon: "📜", type: "Certification", title: "Spoken Tutorial", desc: "Indian Institute of Technology, Bombay · Skills: MySQL, PHP." },
  { year: "Dec 2024", icon: "🛡️", type: "Certification", title: "Ethical Hacking", desc: "Hacking Club · Skills: Ethical Hacking." },
  { year: "Jan 2025", icon: "📜", type: "Certification", title: "SQL (Advanced)", desc: "HackerRank · Skills: SQL." },
  { year: "Apr 2025", icon: "🏆", type: "Achievement", title: "Road Safety Hackathon", desc: "National Highways Authority of India · Certificate of Participation." },
  { year: "Dec 2025", icon: "☁️", type: "Certification", title: "AWS Certified Developer-Associate Certificate", desc: "Infosys Springboard · Skills: Amazon EC2, Amazon Web Services (AWS), +2 skills." },
  { year: "Feb 2026", icon: "📜", type: "Certification", title: "Software Engineer Certificate", desc: "HackerRank · Skills: MySQL, REST APIs, +1 skill." },
  { year: "May 2026", icon: "📜", type: "Certification", title: "Software Engineering and Agile Software Development", desc: "Infosys Springboard · Skills: Agile Software Development." },
  { year: "May 2026", icon: "🧠", type: "Certification", title: "Generative Models for Developers", desc: "Infosys Springboard · Skills: Gen AI models." },
  { year: "Jun 2026", icon: "🧠", type: "Certification", title: "AI Upskilling", desc: "Qualcomm · Skills: Machine Learning & Pre-trained Model Integration." },
  { year: "2026", icon: "🧠", type: "Certification", title: "Claude 101", desc: "Anthropic · Skills: Gen AI." },
];

function Tag({ children, color }) {
  return (
    <span style={{ background: color ? `rgba(${color},0.12)` : "rgba(99,102,241,0.1)", border: `1px solid ${color ? `rgba(${color},0.3)` : "rgba(99,102,241,0.25)"}`, color: color ? `rgb(${color})` : "#818cf8", borderRadius: 6, padding: "0.18rem 0.65rem", fontSize: "0.73rem", whiteSpace: "nowrap", fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>
      {children}
    </span>
  );
}

function InputField({ placeholder, value, onChange, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ background: "#13131f", border: `1px solid ${focused ? "#6366f1" : "#1e1e2e"}`, borderRadius: 10, padding: "0.85rem 1.1rem", color: "#e2e2f0", fontSize: "0.93rem", fontFamily: "inherit", outline: "none", width: "100%" }} />
  );
}

function SectionHeader({ tag, title, sub, center }) {
  return (
    <div style={{ marginBottom: "2.5rem", textAlign: center ? "center" : "left" }}>
      <div style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#818cf8", marginBottom: "0.6rem", fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>
        <span style={{ color: "#4ade80" }}>&gt;</span> {tag}
      </div>
      <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, margin: "0 0 0.75rem", color: "#e2e2f0" }}>{title}</h2>
      {sub && <p style={{ color: "#64748b", maxWidth: 480, margin: center ? "0 auto" : 0 }}>{sub}</p>}
    </div>
  );
}

// Terminal-style hero signature element with a typing effect
function TerminalCard() {
  const lines = [
    { cmd: "whoami", out: "siddharth-tiwari" },
    { cmd: "cat role.txt", out: "Full-Stack Java & Python Developer" },
    { cmd: "ls skills/", out: "java  python  react  spring-boot  android  mysql" },
    { cmd: "echo $STATUS", out: "open_to_opportunities :: 2026_graduate" },
  ];
  const [visible, setVisible] = useState(0);
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (visible >= lines.length) return;
    const full = lines[visible].cmd;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        setTimeout(() => { setVisible(v => v + 1); setTyped(""); }, 350);
      }
    }, 45);
    return () => clearInterval(t);
    // eslint-disable-next-line
  }, [visible]);

  return (
    <div style={{ background: "rgba(10,10,20,0.85)", border: "1px solid #24243a", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(99,102,241,0.15)", fontFamily: "'JetBrains Mono',ui-monospace,monospace", backdropFilter: "blur(6px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.7rem 1rem", background: "#0d0d1a", borderBottom: "1px solid #1e1e2e" }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f56" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#27c93f" }} />
        <span style={{ marginLeft: 10, fontSize: "0.72rem", color: "#64748b" }}>siddharth@portfolio: ~</span>
      </div>
      <div style={{ padding: "1.25rem 1.4rem", fontSize: "0.86rem", lineHeight: 1.9, minHeight: 170 }}>
        {lines.slice(0, visible).map((l, i) => (
          <div key={i}>
            <span style={{ color: "#4ade80" }}>➜</span> <span style={{ color: "#818cf8" }}>~</span> {l.cmd}
            <div style={{ color: "#94a3b8" }}>{l.out}</div>
          </div>
        ))}
        {visible < lines.length && (
          <div>
            <span style={{ color: "#4ade80" }}>➜</span> <span style={{ color: "#818cf8" }}>~</span> {typed}
            <span style={{ borderRight: "2px solid #e2e2f0", marginLeft: 1, animation: "blink 1s step-start infinite" }} />
          </div>
        )}
      </div>
    </div>
  );
}

// Subtle animated tech background: grid + drifting code glyphs + scanline
function TechBackground() {
  const glyphs = ["</>", "{ }", "01", "10", "fn()", "npm", "git", "Σ", "&&", "=>", "[]", "SQL"];
  const items = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    glyph: glyphs[i % glyphs.length],
    left: (i * 6.3) % 100,
    delay: (i * 1.7) % 20,
    duration: 18 + (i % 5) * 4,
    size: 12 + (i % 4) * 4,
  }));
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(99,102,241,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.055) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
      }} />
      {items.map(it => (
        <span key={it.id} style={{
          position: "absolute", left: `${it.left}%`, top: "-5%",
          fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: it.size,
          color: "rgba(129,140,248,0.16)", animation: `drift ${it.duration}s linear ${it.delay}s infinite`,
        }}>{it.glyph}</span>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [hovered, setHovered] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const year = new Date().getFullYear();

  const scrollTo = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  const handleSend = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    const subject = form.subject || `Portfolio Contact from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:tiwarisid022018@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    await new Promise(r => setTimeout(r, 900));
    setSending(false);
    setSent(true);
  };

  const canSend = form.name && form.email && form.message && !sending;

  return (
    <div style={{ background: "#07070f", minHeight: "100vh", color: "#e2e2f0", fontFamily: "system-ui,-apple-system,sans-serif", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @keyframes drift { 0% { transform: translateY(0); opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { transform: translateY(115vh); opacity: 0; } }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
      `}</style>
      <TechBackground />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: 120, background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.05), transparent)", animation: "scanline 9s linear infinite" }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(7,7,15,0.88)", backdropFilter: "blur(18px)", borderBottom: "1px solid #1e1e2e", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 4%" }}>
        <span style={{ fontWeight: 900, fontSize: "1.1rem", background: "linear-gradient(135deg,#818cf8,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>&lt;Siddharth /&gt;</span>
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500 }}>{l}</button>
          ))}
          <button onClick={() => scrollTo("Contact")} style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", border: "none", color: "white", padding: "0.45rem 1.1rem", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}>Hire Me</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "8rem 5% 4rem", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "20%", right: "8%", width: 500, height: 500, background: "radial-gradient(circle,rgba(99,102,241,0.13) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "10%", width: 350, height: 350, background: "radial-gradient(circle,rgba(168,85,247,0.1) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem", alignItems: "center", width: "100%" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)", color: "#818cf8", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              <span style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
              Open to opportunities · 2026 Graduate
            </div>
            <h1 style={{ fontSize: "clamp(2.4rem,5.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 1.2rem" }}>
              Hi, I'm{" "}
              <span style={{ background: "linear-gradient(135deg,#818cf8,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Siddharth Tiwari</span>
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "#94a3b8", marginBottom: "1rem" }}>Full-Stack Java & Python Developer · LMS & ERP Systems · React · REST APIs</p>
            <p style={{ fontSize: "0.95rem", color: "#64748b", maxWidth: 580, marginBottom: "2.5rem", lineHeight: 1.8 }}>
              Building production-grade LMS/ERP platforms, full-stack web tools, and Android apps. Strong foundation in backend architecture, scalable databases, and clean frontend experiences.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <button onClick={() => scrollTo("Projects")} style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "white", border: "none", padding: "0.85rem 2rem", borderRadius: 12, fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>View Projects →</button>
              <a href="mailto:tiwarisid022018@gmail.com" style={{ background: "transparent", color: "#e2e2f0", border: "1px solid #1e1e2e", padding: "0.85rem 2rem", borderRadius: 12, fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>✉️ Email Me</a>
            </div>
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {[["8+", "Public Repos Active"], ["8", "Featured Projects"], ["1st", "Hackathon Winner"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: "1.8rem", fontWeight: 900, background: "linear-gradient(135deg,#818cf8,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{n}</div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <TerminalCard />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "6rem 5%", background: "#0d0d1a", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader tag="What I Know" title="Skills & Tech Stack" sub="Languages, frameworks, tools, and platforms I work with." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1.25rem" }}>
            {SKILLS_DATA.map(s => (
              <div key={s.title} onMouseEnter={() => setHovered(s.title)} onMouseLeave={() => setHovered(null)}
                style={{ background: "#13131f", border: `1px solid ${hovered === s.title ? "#6366f1" : "#1e1e2e"}`, borderRadius: 18, padding: "1.8rem", transition: "all 0.2s", transform: hovered === s.title ? "translateY(-5px)" : "none" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem" }}>{s.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>{s.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
              </div>
            ))}
          </div>
          {/* Certifications row */}
          <div style={{ marginTop: "2.5rem", background: "#13131f", border: "1px solid #1e1e2e", borderRadius: 18, padding: "1.8rem" }}>
            <div style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "1rem" }}>🎓 Certifications</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Claude 101 – Anthropic", "AI Upskilling – Qualcomm", "Generative Models for Developers – Infosys Springboard", "Agile Software Development – Infosys Springboard", "Software Engineer Certificate – HackerRank", "AWS Certified Developer-Associate – Infosys Springboard", "SQL (Advanced) – HackerRank", "Ethical Hacking – Hacking Club", "Spoken Tutorial – IIT Bombay"].map(c => <Tag key={c}>{c}</Tag>)}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHeader tag="Work History" title="Experience" sub="Current role and past internships at Abhyutthanam Digital." />
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {EXPERIENCE.map((e, i) => (
              <div key={i} style={{ background: "#0d0d1a", border: `1px solid #1e1e2e`, borderRadius: 20, padding: "2rem", borderLeft: `3px solid ${e.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>{e.role}</div>
                    <div style={{ color: e.color, fontWeight: 600, fontSize: "0.9rem" }}>{e.company}</div>
                  </div>
                  <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8", borderRadius: 8, padding: "0.3rem 0.9rem", fontSize: "0.78rem", whiteSpace: "nowrap" }}>{e.period}</div>
                </div>
                <ul style={{ paddingLeft: "1.2rem", margin: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {e.points.map((p, j) => (
                    <li key={j} style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.7 }}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 5%", background: "#0d0d1a", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader tag="My Work" title="Projects" sub="Pulled straight from github.com/Sidd-Tiwari — from full-stack ERP systems to Android tools." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
            {PROJECTS.map(p => (
              <div key={p.title} onMouseEnter={() => setHovered(p.title)} onMouseLeave={() => setHovered(null)}
                style={{ background: "#13131f", border: `1px solid ${hovered === p.title ? "#a855f7" : "#1e1e2e"}`, borderRadius: 20, overflow: "hidden", transition: "all 0.2s", transform: hovered === p.title ? "translateY(-6px)" : "none" }}>
                <div style={{ height: 140, background: `linear-gradient(135deg, ${p.bg}, #0f172a)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>{p.emoji}</div>
                <div style={{ padding: "1.4rem" }}>
                  <div style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.5rem" }}>{p.title}</div>
                  <p style={{ color: "#64748b", fontSize: "0.86rem", marginBottom: "1rem", lineHeight: 1.7 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.1rem" }}>{p.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {p.repos.map(r => (
                      <a key={r.url} href={r.url} target="_blank" rel="noreferrer" style={{ fontSize: "0.8rem", color: "#818cf8", textDecoration: "none", border: "1px solid rgba(99,102,241,0.3)", padding: "0.3rem 0.85rem", borderRadius: 7 }}>
                        {r.label} →
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE (Achievements + Certifications) */}
      <section id="timeline" style={{ padding: "6rem 5%", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionHeader tag="Recognition" title="Achievements & Certification Timeline" sub="Competitions, mentorships, and certifications, roughly in chronological order." />
          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: 8, top: 6, bottom: 6, width: 2, background: "linear-gradient(to bottom, #6366f1, #a855f7)" }} />
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ position: "relative", marginBottom: "1.6rem" }}>
                <div style={{ position: "absolute", left: -32, top: 4, width: 18, height: 18, borderRadius: "50%", background: "#0d0d1a", border: "2px solid #a855f7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem" }} />
                <div style={{ background: "#0d0d1a", border: "1px solid #1e1e2e", borderRadius: 14, padding: "1.1rem 1.4rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "1.1rem" }}>{t.icon}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',ui-monospace,monospace", fontSize: "0.75rem", color: "#4ade80" }}>{t.year}</span>
                    <span style={{ fontSize: "0.7rem", color: "#818cf8", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 6, padding: "0.1rem 0.55rem" }}>{t.type}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{t.title}</div>
                  <p style={{ color: "#64748b", fontSize: "0.84rem", lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 5%", background: "#0d0d1a", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <SectionHeader tag="Let's Talk" title="Send Me a Message" sub="Open to internships, collaborations, and full-time roles." center />

          {sent ? (
            <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 16, padding: "2.5rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
              <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.5rem" }}>Message Sent!</div>
              <p style={{ color: "#64748b" }}>Your email client opened with the pre-filled message. Talk soon!</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                style={{ marginTop: "1.5rem", background: "transparent", border: "1px solid #1e1e2e", color: "#94a3b8", padding: "0.6rem 1.5rem", borderRadius: 10, cursor: "pointer", fontSize: "0.9rem" }}>
                Send Another
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <InputField placeholder="Your Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
                <InputField placeholder="Your Email" type="email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
              </div>
              <InputField placeholder="Subject (optional)" value={form.subject} onChange={v => setForm(f => ({ ...f, subject: v }))} />
              <textarea placeholder="Your message or opportunity..." rows={6} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ background: "#13131f", border: "1px solid #1e1e2e", borderRadius: 10, padding: "0.85rem 1.1rem", color: "#e2e2f0", fontSize: "0.93rem", fontFamily: "inherit", outline: "none", width: "100%", resize: "vertical" }} />

              {/* Mail preview */}
              {(form.name || form.email || form.message) && (
                <div style={{ background: "#13131f", border: "1px solid #1e1e2e", borderRadius: 12, padding: "1rem 1.25rem", fontSize: "0.82rem", color: "#64748b" }}>
                  <div style={{ color: "#94a3b8", fontWeight: 600, marginBottom: "0.6rem" }}>✉️ Mail Preview</div>
                  {form.name && <div><span style={{ color: "#6366f1", minWidth: 65, display: "inline-block" }}>To:</span> tiwarisid022018@gmail.com</div>}
                  {(form.name || form.email) && <div><span style={{ color: "#6366f1", minWidth: 65, display: "inline-block" }}>From:</span> {form.name}{form.email ? ` <${form.email}>` : ""}</div>}
                  {form.subject && <div><span style={{ color: "#6366f1", minWidth: 65, display: "inline-block" }}>Subject:</span> {form.subject}</div>}
                  {form.message && <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #1e1e2e", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{form.message.length > 150 ? form.message.slice(0, 150) + "..." : form.message}</div>}
                </div>
              )}

              <button onClick={handleSend} disabled={!canSend}
                style={{ background: canSend ? "linear-gradient(135deg,#6366f1,#a855f7)" : "#1e1e2e", color: canSend ? "white" : "#64748b", border: "none", padding: "0.9rem 2rem", borderRadius: 12, fontWeight: 700, fontSize: "1rem", cursor: canSend ? "pointer" : "not-allowed", transition: "all 0.2s", alignSelf: "flex-start" }}>
                {sending ? "Opening email client..." : "Send Message ✦"}
              </button>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "3rem" }}>
            {[["LinkedIn", "💼", "https://linkedin.com/in/siddharth-tiwari-394451271"], ["GitHub", "⌨️", "https://github.com/Sidd-Tiwari"], ["LeetCode", "🧩", "https://leetcode.com/u/Sidd-Tiwari/"], ["Email", "✉️", "mailto:tiwarisid022018@gmail.com"]].map(([label, icon, href]) => (
              <a key={label} href={href} title={label}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#1e1e2e"}
                style={{ width: 48, height: 48, borderRadius: 12, background: "#13131f", border: "1px solid #1e1e2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", textDecoration: "none", transition: "all 0.2s" }}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "2.2rem 1rem", fontSize: "0.82rem", color: "#334155", borderTop: "1px solid #1e1e2e", position: "relative", zIndex: 1, fontFamily: "'JetBrains Mono',ui-monospace,monospace" }}>
        © {year} Siddharth Tiwari · All rights reserved · SDE @ AD
        <div style={{ marginTop: 4, fontSize: "0.72rem" }}>Designed & engineered by Siddharth Tiwari</div>
      </footer>
    </div>
  );
}
