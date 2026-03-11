import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── Custom Hooks ──────────────────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useTypewriter(words, speed = 90, pause = 2200, deleteSpeed = 55) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) {
            setIsPausing(true);
            setTimeout(() => {
              setIsPausing(false);
              setIsDeleting(true);
            }, pause);
          }
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );
    return () => clearTimeout(timeout);
  }, [
    text,
    wordIndex,
    isDeleting,
    isPausing,
    words,
    speed,
    pause,
    deleteSpeed,
  ]);

  return text;
}

function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const isFloat = String(target).includes(".");
    const num = parseFloat(target);
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(isFloat ? (eased * num).toFixed(1) : Math.floor(eased * num));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(isFloat ? num.toFixed(1) : num);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const profile = {
  name: "Sowndhar T M",
  roles: ["Front-End Developer", "React Developer", "UI Engineer"],
  bio: "Frontend Developer with 1+ year of experience building responsive, scalable web applications using React, JavaScript, and modern UI frameworks. Passionate about writing clean, maintainable code and building user-centric products.",
  email: "sowndhar469@gmail.com",
  phone: "+91 9003571816",
  location: "Coimbatore, India",
  github: "https://github.com/sowndhar8",
  linkedin: "linkedin.com/in/sowndhar-t-m-706980220",
};

const skills = {
  Frontend: {
    color: "#6366f1",
    items: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  "Frameworks & Tools": {
    color: "#a78bfa",
    items: ["Next.js", "Firebase", "Git", "REST API Integration"],
  },
  "State Management": { color: "#38bdf8", items: ["Redux"] },
  Other: {
    color: "#34d399",
    items: ["Responsive Design", "Component Architecture", "API Handling"],
  },
};

const experience = [
  {
    role: "Frontend Developer",
    company: "Vineatz Technologies",
    period: "02/2025 – Present",
    location: "Coimbatore",
    projects: [
      {
        name: "Accrix – Money Management Website",
        points: [
          "Developed 20+ reusable React components reducing code duplication by 30%",
          "Integrated 15+ REST endpoints and improved data fetch performance using memoization and lazy loading",
          "Optimized UI rendering and reduced load time by restructuring reusable components",
          "Collaborated with backend developers to ensure smooth API integration",
        ],
      },
      {
        name: "Devavratha – Loan Borrowing Platform",
        points: [
          "Developed dynamic loan application modules (Gold, Mortgage, Personal & Home Loans)",
          "Implemented live gold price updates using API integration",
          "Built reusable form components with validation logic",
          "Ensured cross-browser compatibility and mobile responsiveness",
        ],
      },
    ],
  },
];

const projects = [
  {
    name: "Loan Eligibility & EMI Calculator",
    description:
      "Dynamic EMI calculator with real-time interest and tenure computation using React state management. Multi-step loan application forms with full validation logic.",
    tags: ["React", "JavaScript", "State Management", "Forms"],
    github: "https://github.com/sowndhar8",
  },
  {
    name: "GitHub Profile Analyzer",
    description:
      "Integrates the GitHub REST API to fetch and display user profiles and public repositories dynamically. Visualizes repository language distribution with interactive charts.",
    tags: ["React", "GitHub API", "Charts", "REST API"],
    github: "https://github.com/sowndhar8",
  },
  {
    name: "E-Commerce Platform",
    description:
      "Full-featured shopping application with product listings, cart, wishlist, checkout, and order tracking. Integrates Firebase for auth and data, Ant Design for UI components.",
    tags: ["React", "Firebase", "Tailwind CSS", "Ant Design", "React Router"],
    github: "https://github.com/sowndhar8/E-Commerce",
  },
  {
    name: "Guvenix Tech Website",
    description:
      "Multi-page company website with services, portfolio, and contact sections. Features smooth Framer Motion animations, EmailJS contact form, and Leaflet interactive map.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Leaflet", "EmailJS"],
    github: "https://github.com/sowndhar8/guvenix",
  },
  {
    name: "Vikramaadhithya Website",
    description:
      "Corporate website with careers, products, services, and portfolio pages. Built with React Router for navigation and Framer Motion for polished page transitions.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "React Router"],
    github: "https://github.com/sowndhar8/Vikramaadhithya",
  },
];

const education = [
  {
    degree: "MCA",
    institution: "SRM Institute of Science and Technology",
    period: "01/2023 – 01/2025",
    location: "Chennai",
    score: "9.6 CGPA",
  },
  {
    degree: "B.Sc (Computer Science)",
    institution: "Bharathidasan College of Arts and Science",
    period: "06/2019 – 03/2022",
    location: "Erode",
    score: "77%",
  },
];

const certifications = [
  {
    name: "Full Stack Web Developer – Java",
    issuer: "Coding Ninjas",
    period: "Nov 2022 – Oct 2023",
  },
];

// ─── Icons ─────────────────────────────────────────────────────────────────────

function IconGitHub({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconMail({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconLocation({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconFolder({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}

function IconGraduation({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function IconCert({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function IconExternalLink({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    "About",
    "Skills",
    "Experience",
    "Projects",
    "Education",
    "Contact",
  ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="container nav-container">
        <a href="#home" className="nav-logo">
          <span className="logo-bracket">&lt;</span>ST
          <span className="logo-bracket">/&gt;</span>
        </a>

        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const role = useTypewriter(profile.roles);

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-blob blob-1" />
        <div className="hero-blob blob-2" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-content">
        <p className="hero-greeting hero-anim" style={{ "--delay": "0.1s" }}>
          // Hello, world! I'm
        </p>
        <h1 className="hero-name hero-anim" style={{ "--delay": "0.25s" }}>
          {profile.name}
        </h1>
        <h2 className="hero-role hero-anim" style={{ "--delay": "0.4s" }}>
          <span className="role-bracket">&lt;</span>
          <span className="typewriter-text">{role}</span>
          <span className="typewriter-cursor" />
          <span className="role-bracket"> /&gt;</span>
        </h2>
        <p className="hero-bio hero-anim" style={{ "--delay": "0.55s" }}>
          {profile.bio}
        </p>

        <div className="hero-actions hero-anim" style={{ "--delay": "0.7s" }}>
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href={`mailto:${profile.email}`} className="btn btn-outline">
            Hire Me
          </a>
        </div>

        <div className="hero-socials hero-anim" style={{ "--delay": "0.85s" }}>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            title="GitHub"
          >
            <IconGitHub />
          </a>
          <a
            href={`https://${profile.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="social-link"
            title="LinkedIn"
          >
            <IconLinkedIn />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="social-link"
            title="Email"
          >
            <IconMail />
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-label">scroll</span>
      </div>
    </section>
  );
}

// ─── Stat Card (needs own hook instance) ──────────────────────────────────────

function StatCard({ value, label, inView, delay }) {
  const suffix = value.replace(/^[\d.]+/, "");
  const numPart = parseFloat(value);
  const count = useCounter(numPart, 1800, inView);
  return (
    <div className="stat-card slide-right" style={{ transitionDelay: delay }}>
      <span className="stat-value">
        {inView ? `${count}${suffix}` : `0${suffix}`}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────

function About() {
  const [ref, inView] = useInView();
  const stats = [
    { value: "1+", label: "Years Experience" },
    { value: "20+", label: "Components Built" },
    { value: "15+", label: "APIs Integrated" },
    { value: "9.6", label: "MCA CGPA" },
  ];

  return (
    <section id="about" className="about">
      <div className="container" ref={ref}>
        <div className={`section-header slide-left${inView ? " visible" : ""}`}>
          <span className="section-tag">// who am I</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line" />
        </div>

        <div className="about-grid">
          <div
            className={`about-text slide-left${inView ? " visible" : ""}`}
            style={{ transitionDelay: "0.15s" }}
          >
            <p>
              I'm a <strong>Frontend Developer</strong> based in Coimbatore,
              India, with a strong passion for creating beautiful, performant
              web experiences. I hold an MCA from{" "}
              <strong>SRM Institute of Science and Technology</strong> with a
              9.6 CGPA.
            </p>
            <p>
              Currently at <strong>Vineatz Technologies</strong>, I've built
              production-level financial platforms — designing reusable
              component systems, integrating REST APIs, and optimizing
              application performance for real users.
            </p>
            <p>
              Outside of work, I explore UI/UX design patterns, performance
              optimization, and system design concepts. I also enjoy
              troubleshooting computers at the hardware level.
            </p>
            <div className="about-badges">
              <span className="about-badge">
                <IconLocation /> {profile.location}
              </span>
              <span className="about-badge">
                <IconMail size={13} /> {profile.email}
              </span>
            </div>
          </div>

          <div className="about-stats">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                value={s.value}
                label={s.label}
                inView={inView}
                delay={`${0.15 + i * 0.1}s`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ────────────────────────────────────────────────────────────────────

function Skills() {
  const [ref, inView] = useInView();

  return (
    <section id="skills">
      <div className="container" ref={ref}>
        <div className={`section-header slide-left${inView ? " visible" : ""}`}>
          <span className="section-tag">// what I use</span>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-line" />
        </div>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, { color, items }], i) => (
            <div
              key={category}
              className={`skill-category slide-up${inView ? " visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <h3 className="skill-category-title" style={{ color }}>
                {category}
              </h3>
              <div className="skill-tags">
                {items.map((skill, j) => (
                  <span
                    key={skill}
                    className={`skill-tag${inView ? " tag-visible" : ""}`}
                    style={{
                      "--tag-color": color,
                      animationDelay: `${0.2 + i * 0.1 + j * 0.05}s`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ────────────────────────────────────────────────────────────────

function Experience() {
  const [ref, inView] = useInView();

  return (
    <section id="experience" className="experience">
      <div className="container" ref={ref}>
        <div className={`section-header slide-left${inView ? " visible" : ""}`}>
          <span className="section-tag">// where I've worked</span>
          <h2 className="section-title">Work Experience</h2>
          <div className="section-line" />
        </div>

        <div className="timeline">
          {experience.map((exp, i) => (
            <div
              key={i}
              className={`timeline-item slide-left${inView ? " visible" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.15}s` }}
            >
              <div className="timeline-dot" />
              <div className="exp-card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-period">{exp.period}</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                </div>
                {exp.projects.map((proj, j) => (
                  <div key={j} className="exp-project">
                    <h4 className="exp-project-name">{proj.name}</h4>
                    <ul className="exp-points">
                      {proj.points.map((pt, k) => (
                        <li key={k}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ──────────────────────────────────────────────────────────────────

function Projects() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="projects">
      <div className="container" ref={ref}>
        <div className={`section-header slide-left${inView ? " visible" : ""}`}>
          <span className="section-tag">// what I've built</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line" />
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <div
              key={i}
              className={`project-card slide-up${inView ? " visible" : ""}`}
              style={{ transitionDelay: `${0.05 + i * 0.08}s` }}
            >
              <div className="project-top">
                <span className="project-folder">
                  <IconFolder />
                </span>
                <div className="project-links">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                    title="GitHub"
                  >
                    <IconGitHub size={18} />
                  </a>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                    title="Open"
                  >
                    <IconExternalLink size={16} />
                  </a>
                </div>
              </div>
              <h3 className="project-name">{proj.name}</h3>
              <p className="project-desc">{proj.description}</p>
              <div className="project-tags">
                {proj.tags.map((t) => (
                  <span key={t} className="project-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Education ─────────────────────────────────────────────────────────────────

function Education() {
  const [ref, inView] = useInView();

  return (
    <section id="education" className="education">
      <div className="container" ref={ref}>
        <div className={`section-header slide-left${inView ? " visible" : ""}`}>
          <span className="section-tag">// my background</span>
          <h2 className="section-title">Education</h2>
          <div className="section-line" />
        </div>

        <div className="edu-grid">
          {education.map((edu, i) => (
            <div
              key={i}
              className={`edu-card slide-up${inView ? " visible" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              <div className="edu-icon">
                <IconGraduation />
              </div>
              <div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <div className="edu-meta">
                  <span>{edu.period}</span>
                  <span>{edu.location}</span>
                  <span className="edu-score">{edu.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`cert-section slide-up${inView ? " visible" : ""}`}
          style={{ transitionDelay: "0.35s" }}
        >
          <p className="cert-heading">Certifications</p>
          {certifications.map((cert, i) => (
            <div key={i} className="cert-card">
              <span className="cert-icon">
                <IconCert />
              </span>
              <div>
                <p className="cert-name">{cert.name}</p>
                <p className="cert-meta">
                  {cert.issuer} &middot; {cert.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  const [ref, inView] = useInView();

  return (
    <section id="contact">
      <div className="container" ref={ref}>
        <div className={`section-header slide-left${inView ? " visible" : ""}`}>
          <span className="section-tag">// get in touch</span>
          <h2 className="section-title">Contact</h2>
          <div className="section-line" />
        </div>

        <div
          className={`contact-wrapper slide-up${inView ? " visible" : ""}`}
          style={{ transitionDelay: "0.15s" }}
        >
          <p className="contact-text">
            I'm currently open to frontend developer roles. Whether you have a
            project idea, a job opportunity, or just want to connect — my inbox
            is always open.
          </p>
          <div className="contact-cta">
            <a
              href={`mailto:${profile.email}`}
              className="btn btn-primary btn-lg"
            >
              Say Hello
            </a>
          </div>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="contact-link-item">
              <IconMail size={16} /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="contact-link-item"
            >
              <IconGitHub size={16} /> github.com/sowndhar8
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact-link-item"
            >
              <IconLinkedIn size={16} /> LinkedIn
            </a>
            <a href={`tel:${profile.phone}`} className="contact-link-item">
              <IconPhone size={16} /> {profile.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Designed &amp; built by{" "}
          <span className="footer-name">Sowndhar T M</span>
        </p>
        <p style={{ marginTop: "0.25rem", fontSize: "0.8125rem" }}>
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
