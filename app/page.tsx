"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const TAGLINE = "I build full-stack products that ship to real users.";

const skillCategories = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
      { name: "Java",       icon: "devicon-java-plain colored" },
      { name: "Python",     icon: "devicon-python-plain colored" },
      { name: "C++",        icon: "devicon-cplusplus-plain colored" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React.js",     icon: "devicon-react-original colored" },
      { name: "Next.js",      icon: "devicon-nextjs-plain" },
      { name: "React Native", icon: "devicon-react-original colored" },
      { name: "Redux",        icon: "devicon-redux-original colored" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-plain colored" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    skills: [
      { name: "Spring Boot", icon: "devicon-spring-plain colored" },
      { name: "Node.js",     icon: "devicon-nodejs-plain colored" },
      { name: "Express.js",  icon: "devicon-express-original" },
      { name: "Hibernate",   icon: "devicon-hibernate-plain colored" },
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MongoDB",    icon: "devicon-mongodb-plain colored" },
      { name: "Redis",      icon: "devicon-redis-plain colored" },
      { name: "Firestore",  icon: "devicon-firebase-plain colored" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & Tools",
    skills: [
      { name: "GCP",      icon: "devicon-googlecloud-plain colored" },
      { name: "Firebase", icon: "devicon-firebase-plain colored" },
      { name: "Git",      icon: "devicon-git-plain colored" },
      { name: "Vercel",   icon: "devicon-vercel-plain" },
      { name: "Docker",   icon: "devicon-docker-plain colored" },
    ],
  },
];

export default function Home() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const tick = setInterval(() => {
        if (i < TAGLINE.length) {
          setTyped(TAGLINE.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(tick);
        }
      }, 28);
      return () => clearInterval(tick);
    }, 1100);
    return () => clearTimeout(start);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll(".observe").forEach((el) => observer.observe(el));

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const handleScroll = () => {
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100) current = s.id;
      });
      navLinks.forEach((a) => {
        (a as HTMLElement).style.color =
          a.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 640) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            aa<span>.</span>dev
          </a>

          <button
            className={`nav-toggle${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <ul className={`nav-links${menuOpen ? " is-open" : ""}`}>
            {["experience", "projects", "skills", "contact"].map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                  {id === "experience" ? "work" : id}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-top">
          <span className="hero-index">001 / PORTFOLIO</span>
          <span className="hero-avail">
            <span className="avail-dot" />
            available for hire
          </span>
        </div>

        {/* The centerpiece — two fonts, two weights, one name */}
        <div className="hero-name-block">
          <span className="name-l1">AADARSH</span>
          <span className="name-l2">Agarwal</span>
        </div>

        <div className="hero-bottom">
          <div className="hero-left-bottom">
            <div className="hero-meta">
              <span>Full Stack Developer</span>
              <span className="hero-meta-sep">·</span>
              <span>B.Tech EE, BIT Sindri</span>
              <span className="hero-meta-sep">·</span>
              <span>India · 2027</span>
            </div>
            <div className="hero-tagline">
              {typed}
              <span className={done ? "cursor-solid" : "cursor-blink"}>▋</span>
            </div>
            <div className="hero-ctas">
              <a href="mailto:aadarshsaroon001@gmail.com" className="btn-primary">
                get_in_touch()
              </a>
              <a href="/Aadarsh_resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">
                resume.pdf ↗
              </a>
              <a
                href="https://github.com/aadarshagarwal1"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                github →
              </a>
            </div>
          </div>

          <div className="hero-right-bottom">
            <div className="hero-count">03</div>
          </div>
        </div>
      </section>

      {/* ── PROFILE / STATS STRIP ── */}
      <div className="profile-strip">
        <div className="profile-cell">
          <div className="profile-avatar">
            <Image
              src="https://avatars.githubusercontent.com/u/140622088?s=400&u=831f718b607ffed439d5f878ab2df5ab86781cc4&v=4"
              alt="Aadarsh Agarwal"
              width={60}
              height={60}
              priority
            />
          </div>
          <div>
            <div className="profile-name-text">Aadarsh Agarwal</div>
            <div className="profile-role-text">SDE Intern · BIT Sindri, 2027</div>
          </div>
        </div>
        <div className="stat-cell">
          <div className="stat-val">1K+</div>
          <div className="stat-lbl">Play Store Users</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val">138%</div>
          <div className="stat-lbl">Engagement Lift</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val">2</div>
          <div className="stat-lbl">Active Internships</div>
        </div>
        <div className="stat-cell">
          <div className="stat-val">8.18</div>
          <div className="stat-lbl">CGPA / 10</div>
        </div>
      </div>

      {/* ── EDUCATION ── */}
      <div className="edu-card observe">
        <img
          src="/bit-sindri-logo.png"
          alt="BIT Sindri"
          className="edu-logo"
        />
        <div className="edu-details">
          <div className="edu-tag">// education</div>
          <div className="edu-institution">B.I.T. Sindri</div>
          <div className="edu-degree">B.Tech, Electrical Engineering</div>
          <div className="edu-meta">
            <span>Aug 2023 – 2027</span>
            <span className="edu-cgpa">8.18 / 10 CGPA</span>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      <section id="experience">
        <div className="section-label">
          <span className="section-num">01</span>
          <span className="section-title">Experience</span>
        </div>

        <div className="exp-entry observe">
          <div className="exp-entry-top">
            <div>
              <div className="exp-co">CricsHub</div>
              <div className="exp-role-line">SDE Intern</div>
            </div>
            <div className="exp-meta-right">
              <div className="exp-date">January 2026 — Present</div>
              <span className="exp-badge live">Active</span>
            </div>
          </div>
          <div className="exp-quote">
            &quot;Built two core product verticals from scratch&quot;
          </div>
          <ul className="exp-bullets">
            <li>
              Shipped a Dream11-style fantasy cricket platform — 100-credit team
              builder, Captain/VC selection, real-time leaderboards, and automated
              points engine — serving 1000+ users on Google Play Store
            </li>
            <li>
              Developed a B2C SaaS streaming tool for club-level cricket broadcasters
              with OBS overlays via WebSocket/STOMP, SSE score delivery, premium
              overlay bundles (Glass, Material, Aero), and Razorpay-powered add-ons
            </li>
            <li>
              Deployed full stack on GCP (Spring Boot microservices, PostgreSQL,
              Redis), Vercel for web, and published the React Native app to Google
              Play Store
            </li>
            <li>
              Implemented multi-operator stream lock system, Firebase Auth with Google
              OAuth2, and JWT authorization across both platforms
            </li>
          </ul>
          <div className="exp-metrics">
            <div>
              <div className="metric-v">1K+</div>
              <div className="metric-l">Play Store users</div>
            </div>
            <div>
              <div className="metric-v">300+</div>
              <div className="metric-l">Streams managed</div>
            </div>
            <div>
              <div className="metric-v">500+</div>
              <div className="metric-l">Tournaments</div>
            </div>
          </div>
          <div className="exp-stack">
            {["Spring Boot","React Native","Next.js","PostgreSQL","Redis","WebSocket","GCP","Razorpay"].map(
              (s) => <span key={s} className="stack-pill">{s}</span>
            )}
          </div>
        </div>

        <div className="exp-entry observe">
          <div className="exp-entry-top">
            <div>
              <div className="exp-co">It&#39;s Your Story</div>
              <div className="exp-role-line">Full Stack Developer Intern</div>
            </div>
            <div className="exp-meta-right">
              <div className="exp-date">November 2024 — February 2025</div>
              <span className="exp-badge past">Completed</span>
            </div>
          </div>
          <div className="exp-quote">
            &quot;Shipped StoryQuest &amp; drove measurable product growth&quot;
          </div>
          <ul className="exp-bullets">
            <li>
              Built StoryQuest end-to-end — a competitive blogging platform with
              submission pipelines, community voting, and winner announcement workflows
            </li>
            <li>
              Migrated ~100 frontend modules from JavaScript to TypeScript, eliminating
              a class of runtime errors and establishing codebase standards
            </li>
            <li>
              Integrated product analytics for user behavior tracking across the platform
            </li>
          </ul>
          <div className="exp-metrics">
            <div>
              <div className="metric-v">62%</div>
              <div className="metric-l">More stories posted</div>
            </div>
            <div>
              <div className="metric-v">138%</div>
              <div className="metric-l">Engagement increase</div>
            </div>
            <div>
              <div className="metric-v">~100</div>
              <div className="metric-l">Files migrated to TS</div>
            </div>
          </div>
          <div className="exp-stack">
            {["React.js","TypeScript","Redux","Firebase","Firestore","JWT"].map(
              (s) => <span key={s} className="stack-pill">{s}</span>
            )}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects">
        <div className="section-label">
          <span className="section-num">02</span>
          <span className="section-title">Projects</span>
        </div>

        <div className="projects-grid">
          <div className="project-card observe">
            <div className="t-bar">
              <div className="t-dots">
                <span className="dot dot-r" />
                <span className="dot dot-y" />
                <span className="dot dot-g" />
              </div>
              <span className="t-path">~/projects/attendx</span>
              <span className="t-num">01</span>
            </div>
            <div className="card-body">
              <div className="project-tag">Deployed · Private Org</div>
              <div className="project-name">AttendX</div>
              <div className="project-desc">
                Geolocation-based attendance system built as a cross-platform React
                Native app. Uses Expo Location API and Haversine formula for precise
                geofencing. Role-based interfaces for teachers and students.
              </div>
              <div className="project-hl">→ Express.js · PostgreSQL · Redis · JWT · Render</div>
            </div>
          </div>

          <div className="project-card observe">
            <div className="t-bar">
              <div className="t-dots">
                <span className="dot dot-r" />
                <span className="dot dot-y" />
                <span className="dot dot-g" />
              </div>
              <span className="t-path">~/projects/eventsphere</span>
              <span className="t-num">02</span>
            </div>
            <div className="card-body">
              <div className="project-tag">Live · Open Source</div>
              <div className="project-name">EventSphere</div>
              <div className="project-desc">
                Full-stack event booking platform with registration, form validation,
                and real-time confirmation emails. Achieved 50% reduction in page load
                time via Cloudinary CDN and lazy loading.
              </div>
              <div className="project-hl">→ 50% faster page loads</div>
              <div className="project-links">
                <a
                  href="https://github.com/aadarshagarwal1/EventSphere"
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>

          <div className="project-card observe">
            <div className="t-bar">
              <div className="t-dots">
                <span className="dot dot-r" />
                <span className="dot dot-y" />
                <span className="dot dot-g" />
              </div>
              <span className="t-path">~/contributions/ardupilot</span>
              <span className="t-num">03</span>
            </div>
            <div className="card-body">
              <div className="project-tag">Open Source · C++</div>
              <div className="project-name">ArduPilot</div>
              <div className="project-desc">
                Contributed bug fixes and documentation improvements to one of the most
                widely used open-source autopilot systems for drones and UAVs worldwide.
                PRs picked from active issues backlog.
              </div>
              <div className="project-hl">→ 3–5 Pull Requests merged &amp; open</div>
              <div className="project-links">
                <a
                  href="https://github.com/aadarshagarwal1"
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="skills-section">
        <div className="section-label">
          <span className="section-num">03</span>
          <span className="section-title">Skills</span>
        </div>

        {skillCategories.map((cat) => (
          <div key={cat.id} className="skill-row observe">
            <div className="skill-cat-label">{cat.label}</div>
            <div className="skill-items">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <i className={`${skill.icon} skill-icon`} />
                  <span className="skill-name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── LEADERSHIP ── */}
      <section id="leadership">
        <div className="section-label">
          <span className="section-num">04</span>
          <span className="section-title">Leadership</span>
        </div>

        <div className="leadership-grid">
          <div className="leadership-card observe">
            <div className="lship-header">
              <div className="lship-logo">
                <img src="/iste-logo.png" alt="ISTE logo" />
              </div>
              <div>
                <div className="lship-org">ISTE Students Chapter, BIT Sindri</div>
                <div className="lship-role">Technical Aide → Secretary</div>
                <div className="lship-date">October 2023 — Present</div>
              </div>
            </div>
            <ul className="lship-points">
              <li>Spearheaded Triveni techfest — 1000+ participants, 5000+ footfall</li>
              <li>Evaluated 600+ applications, selected 15 members</li>
              <li>Manage chapter operations, sponsorship, and society website</li>
            </ul>
          </div>

          <div className="leadership-card observe">
            <div className="lship-header">
              <div className="lship-logo">
                <img src="/ees-logo.png" alt="EES logo" />
              </div>
              <div>
                <div className="lship-org">Electrical Engineering Society, BIT Sindri</div>
                <div className="lship-role">Executive → Secretary (Finance)</div>
                <div className="lship-date">December 2024 — Present</div>
              </div>
            </div>
            <ul className="lship-points">
              <li>Oversee event budgets, sponsorship drives, fund allocation</li>
              <li>MERN stack workshop for 100+ students</li>
              <li>Built alumni network of 150+ members for mentorship</li>
            </ul>
          </div>
        </div>

        <div className="comp-list">
          {[
            { place: "2nd Place", name: "Nexus 3.0 Web Development Competition", info: "500+ registrations" },
            { place: "3rd Place", name: "Spider 3.0 Web Development Competition", info: "300+ participants" },
            { place: "Top 20",   name: "Hackatron 36-Hour Hackathon",            info: "1000+ participants" },
          ].map((c) => (
            <div key={c.name} className="comp-row observe">
              <div className="comp-place">{c.place}</div>
              <div className="comp-name">{c.name}</div>
              <div className="comp-info">{c.info}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <h2 className="contact-hl observe">
          Let&#39;s build
          <br />
          something
          <br />
          <em>real.</em>
        </h2>
        <p className="contact-sub observe">
          Open to SDE internships and full-stack roles where good engineering
          and real impact matter.
        </p>
        <div className="contact-links observe">
          <a href="mailto:aadarshsaroon001@gmail.com" className="contact-link">
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            aadarshsaroon001@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/aadarshagarwal"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            linkedin.com/in/aadarshagarwal
          </a>
          <a
            href="https://github.com/aadarshagarwal1"
            target="_blank"
            rel="noreferrer"
            className="contact-link"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            github.com/aadarshagarwal1
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-mono">
          aadarsh@portfolio:~$<span className="footer-cursor">▋</span>
        </div>
        <div className="footer-mono">© 2026 Aadarsh Agarwal</div>
        <a href="#" className="footer-back">↑ top</a>
      </footer>
    </>
  );
}
