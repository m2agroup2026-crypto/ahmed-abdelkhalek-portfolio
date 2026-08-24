"use client";

import { useEffect, useState } from "react";

const capabilities = ["Digital Transformation", "Full-Stack Platforms", "AI & Automation", "CRM Architecture", "API Integrations", "Business Process Design"];

const journey = [
  { year: "01", role: "Public Relations & Media Officer", org: "Faculty of Medicine", text: "Built an early foundation in institutional communication, event coordination, stakeholder relations, and public-facing operations." },
  { year: "02", role: "Head of Public Relations", org: "Masr Al Arabia Foundation for Human Rights", text: "Led communication workflows and translated organizational objectives into structured public engagement." },
  { year: "03", role: "Administrative Director & Contracts Officer", org: "ZAD Association — Assiut", text: "Managed administration, contracts, documentation, and the operational systems behind day-to-day delivery." },
  { year: "04", role: "IT & Digital Transformation Manager", org: "M2A Group", text: "Now designing connected platforms that unite brand, data, CRM, automation, messaging, and AI." },
];

const architecture = [
  { number: "01", icon: "spark", title: "Digital Identity", text: "A unified, credible brand and digital presence across every customer touchpoint." },
  { number: "02", icon: "layers", title: "Corporate Platform", text: "A responsive, scalable website engineered as the public layer of a larger business system." },
  { number: "03", icon: "brain", title: "Lead Intelligence", text: "Website leads flow into an AI-assisted CRM instead of disappearing into disconnected inboxes." },
  { number: "04", icon: "message", title: "Connected Conversations", text: "WhatsApp and Messenger integrations bring communication into one coordinated workflow." },
  { number: "05", icon: "flow", title: "Automation Layer", text: "Event-driven workflows remove repetitive tasks and accelerate response, routing, and follow-up." },
  { number: "06", icon: "database", title: "Central Data", text: "Supabase, APIs, and structured data create a reliable operational source of truth." },
];

const stack = ["Next.js", "React", "TypeScript", "Supabase", "REST APIs", "AI Workflows", "CRM", "Automation"];
const ArrowIcon = () => <span aria-hidden="true">↗</span>;

function SystemIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    spark: <><path d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 16 9 5 9-5"/></>,
    brain: <><path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v1a3 3 0 0 0-1 5.8A3.5 3.5 0 0 0 9.5 20H12V4.5H9.5Z"/><path d="M14.5 4.5A3.5 3.5 0 0 1 18 8v1a3 3 0 0 1 1 5.8 3.5 3.5 0 0 1-4.5 5.2H12V4.5h2.5Z"/><path d="M8 9h4M12 15h4"/></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.6-4.8A7.5 7.5 0 0 1 3 12a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v3Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></>,
    flow: <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a3 3 0 0 1 3 3v6M12 18H9a3 3 0 0 1-3-3V9"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>,
  };
  return <span className="system-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg></span>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [arabic, setArabic] = useState(false);
  const [languageTransition, setLanguageTransition] = useState<"to-ar" | "to-en" | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.lang = arabic ? "ar" : "en";
    document.documentElement.dir = arabic ? "rtl" : "ltr";
  }, [arabic]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("ahmed-portfolio-theme");
    setDark(savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const switchLanguage = () => {
    if (languageTransition) return;
    const direction = arabic ? "to-en" : "to-ar";
    setLanguageTransition(direction);
    window.setTimeout(() => setArabic((value) => !value), 340);
    window.setTimeout(() => setLanguageTransition(null), 850);
  };

  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Ahmed Abdelkhalek home"><span>AA</span><b>Ahmed Abdelkhalek</b></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">Menu</button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#journey" onClick={() => setMenuOpen(false)}>Journey</a><a href="#case-study" onClick={() => setMenuOpen(false)}>Case Study</a><a href="#expertise" onClick={() => setMenuOpen(false)}>Expertise</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <button className="theme-toggle" onClick={() => { const next = !dark; setDark(next); window.localStorage.setItem("ahmed-portfolio-theme", next ? "dark" : "light"); }} aria-label={dark ? "Activate light mode" : "Activate dark mode"}>
          <span className="theme-halo"/><svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3.4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 15.4A8 8 0 0 1 8.6 4a8.1 8.1 0 1 0 11.4 11.4Z"/></svg>
        </button>
        <button className={`language-rail ${arabic ? "is-ar" : "is-en"}`} onClick={switchLanguage} aria-label={arabic ? "Switch to English" : "التحويل إلى العربية"}>
          <span className="language-glow"/><span className="language-option">EN</span><span className="language-option">ع</span><span className="language-thumb">{arabic ? "ع" : "EN"}</span>
        </button>
      </nav>

      {languageTransition && <div className={`language-wipe ${languageTransition}`} aria-hidden="true"><div className="wipe-grid"/><div className="wipe-copy"><small>INTERFACE LANGUAGE</small><strong>{languageTransition === "to-ar" ? "العربية" : "ENGLISH"}</strong><span>{languageTransition === "to-ar" ? "تجربة رقمية بلا حدود" : "DIGITAL EXPERIENCE / RELOADED"}</span></div></div>}

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Digital Transformation Engineer</p>
          <h1>{arabic ? <>ما ببنيش مجرد مواقع.<br/><em>أنا بهندس التحول.</em></> : <>Beyond websites.<br/><em>I engineer transformation.</em></>}</h1>
          <p className="hero-summary">{arabic ? "أنا أحمد عبد الخالق سيد — مطور Full-Stack ومهندس أنظمة أتمتة، أحوّل العمليات المؤسسية المعقدة إلى منصات رقمية مترابطة وقابلة للتوسع." : "I’m Ahmed Abdelkhalek Sayed — a Full-Stack Developer and Automation Systems Architect turning complex institutional operations into connected, scalable digital platforms."}</p>
          <div className="hero-actions"><a className="button primary" href="#case-study">Explore the work <ArrowIcon /></a><a className="button secondary" href="#contact">Start a conversation</a></div>
        </div>
        <div className="hero-system" aria-label="Transformation system diagram">
          <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="system-core"><span>Strategy</span><strong>Digital<br/>OS</strong><small>Build • Connect • Automate</small></div>
          <span className="node node-a">AI</span><span className="node node-b">CRM</span><span className="node node-c">API</span><span className="node node-d">DATA</span>
        </div>
        <div className="capability-strip">{capabilities.map((item) => <span key={item}>{item}</span>)}</div>
      </section>

      <section className="identity shell section">
        <div><p className="section-index">01 / Professional Identity</p><h2>Technology shaped by<br/><em>institutional insight.</em></h2></div>
        <div className="identity-copy">
          <p>{arabic ? "أجمع بين الخبرة التقنية وفهم حقيقي للإدارة والعلاقات العامة والعمليات المؤسسية. لذلك لا أبدأ من الشاشة، بل من طريقة عمل المؤسسة نفسها." : "My work sits at the intersection of technology, administration, communication, and operations. I don’t begin with screens. I begin with how the institution actually works."}</p>
          <p>{arabic ? "أحلل تدفق العمل والبيانات والقرارات، ثم أبني النظام الرقمي الذي يربطها في تجربة واحدة واضحة وقابلة للقياس." : "I map workflows, data, decisions, and customer touchpoints—then engineer the digital system that connects them into one measurable experience."}</p>
          <div className="quote">“The best digital solution doesn’t add software. It removes friction.”</div>
        </div>
      </section>

      <section id="journey" className="journey section"><div className="shell">
        <div className="section-heading"><div><p className="section-index">02 / Digital Journey</p><h2>Experience became<br/><em>architecture.</em></h2></div><p>Each chapter added a new layer: communication, governance, operations, and finally the ability to connect them through technology.</p></div>
        <div className="timeline">{journey.map((item) => <article key={item.year}><span className="timeline-number">{item.year}</span><div><p className="timeline-org">{item.org}</p><h3>{item.role}</h3><p>{item.text}</p></div></article>)}</div>
      </div></section>

      <section id="case-study" className="case-study shell section">
        <div className="case-intro"><p className="section-index">03 / Flagship Transformation</p><span className="live-pill">Live system</span><h2>M2A <em>Digital OS</em></h2><p>A connected operating system for the company—not simply a corporate website.</p><a className="text-link" href="https://m2agroupeg.com/" target="_blank" rel="noreferrer">Visit M2A Group <ArrowIcon /></a></div>
        <div className="case-statement"><span>THE CHALLENGE</span><p>Brand, leads, conversations, follow-up, and operational data lived in separate places. The goal was to design one digital architecture that could connect the full customer journey.</p></div>
        <div className="architecture-grid">{architecture.map((item) => <article key={item.number}><div className="card-top"><SystemIcon name={item.icon}/><span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        <div className="outcome"><p className="section-index">The outcome</p><h3>One ecosystem.<br/>Every interaction connected.</h3><div><span>Website</span><i>→</i><span>Lead CRM</span><i>→</i><span>Messaging</span><i>→</i><span>Automation</span><i>→</i><span>Intelligence</span></div></div>
      </section>

      <section className="selected-systems section">
        <div className="shell">
          <div className="systems-heading"><div><p className="section-index">04 / Selected Systems</p><h2>Premium interfaces.<br/><em>Serious infrastructure.</em></h2></div><p>Selected layers from the M2A transformation ecosystem—designed to work as one connected operating model.</p></div>
          <div className="premium-cards">
            <article className="premium-card card-lime"><div className="card-scan"/><div className="premium-card-top"><SystemIcon name="layers"/><span>PLATFORM / 01</span></div><div className="premium-visual"><span className="visual-ring"/><strong>WEB</strong><i>PUBLIC LAYER</i></div><div className="premium-card-copy"><h3>Corporate Digital Platform</h3><p>The customer-facing layer: responsive, structured, fast, and built to convert attention into qualified action.</p><div><span>Next.js</span><span>Responsive UX</span><span>SEO</span></div></div></article>
            <article className="premium-card card-cyan"><div className="card-scan"/><div className="premium-card-top"><SystemIcon name="brain"/><span>INTELLIGENCE / 02</span></div><div className="premium-visual"><span className="visual-ring"/><strong>AI</strong><i>LEAD ENGINE</i></div><div className="premium-card-copy"><h3>Website Lead AI CRM</h3><p>A structured lead system that captures context, coordinates follow-up, and turns enquiries into an intelligent pipeline.</p><div><span>CRM</span><span>AI Assist</span><span>Supabase</span></div></div></article>
            <article className="premium-card card-violet"><div className="card-scan"/><div className="premium-card-top"><SystemIcon name="flow"/><span>AUTOMATION / 03</span></div><div className="premium-visual"><span className="visual-ring"/><strong>OS</strong><i>EVENT LAYER</i></div><div className="premium-card-copy"><h3>Automation Command Layer</h3><p>Event-driven workflows connect messages, teams, data, and decisions while keeping every action visible.</p><div><span>APIs</span><span>Workflows</span><span>Events</span></div></div></article>
          </div>
        </div>
      </section>

      <section id="expertise" className="expertise section"><div className="shell">
        <p className="section-index">05 / Technical Expertise</p><div className="expertise-layout"><h2>From business logic<br/>to <em>working systems.</em></h2><div className="expertise-list">
          <article><span>01</span><div><h3>Platform Engineering</h3><p>Responsive web platforms built around real business goals, performance, accessibility, and maintainable architecture.</p></div></article>
          <article><span>02</span><div><h3>Automation Systems</h3><p>Workflow analysis and event-driven automations that reduce manual work and improve speed, visibility, and consistency.</p></div></article>
          <article><span>03</span><div><h3>CRM & AI Integration</h3><p>Connected lead pipelines, intelligent routing, API integrations, and AI-assisted processes that turn activity into action.</p></div></article>
        </div></div><div className="stack">{stack.map((item) => <span key={item}>{item}</span>)}</div>
      </div></section>

      <section id="contact" className="contact shell section"><p className="section-index">06 / Contact</p><div className="contact-grid">
        <div><h2>Let’s build the system<br/><em>behind your next move.</em></h2><p>Have a transformation challenge, a platform idea, or an operation that needs to work smarter? Let’s talk.</p></div>
        <div className="contact-links"><a href="mailto:ahmed@m2agruop.com"><span>Primary email</span>ahmed@m2agruop.com <ArrowIcon /></a><a href="mailto:a7madsadlion@gmail.com"><span>Personal email</span>a7madsadlion@gmail.com <ArrowIcon /></a><a href="https://wa.me/201066956222" target="_blank" rel="noreferrer"><span>WhatsApp</span>+20 106 695 6222 <ArrowIcon /></a><a href="tel:+201096588887"><span>Phone</span>+20 109 658 8887 <ArrowIcon /></a></div>
      </div></section>
      <footer className="footer shell"><div className="brand"><span>AA</span><b>Ahmed Abdelkhalek</b></div><p>Digital Transformation Engineer<br/>Cairo, Egypt</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
