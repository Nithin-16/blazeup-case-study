import React, { useRef, useState, useEffect } from "react";
import {
  Layers, ShieldCheck, Zap, Database,
  Users, Activity, BrainCircuit, CheckCircle, Sun, Moon, X, AlertTriangle,
  ArrowLeftRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const IconWrap = ({ IconComponent }) => (
  <div className="icon-wrap">
    <IconComponent size={32} strokeWidth={1.5} />
  </div>
);

// Window chrome with macOS-style dots & subtle URL indicator
const WindowHeader = ({ url = "blazeup.internal/compliance" }) => (
  <div className="mockup-header">
    <div className="mockup-dots">
      <span className="dot red"></span>
      <span className="dot yellow"></span>
      <span className="dot green"></span>
    </div>
    <div className="mockup-address-bar">{url}</div>
  </div>
);

// HeroCompositeTeaser: Flat layered composite teaser with macOS browser chrome & overlapping side sheet
const HeroCompositeTeaser = ({ setLightboxImg }) => (
  <div className="hero-composite-teaser">
    {/* Base Layer: Compliance.png framed inside minimalist macOS browser window */}
    <div
      className="mockup-frame zoomable hero-base-layer"
      onClick={() => setLightboxImg("Compliance.png")}
      title="Click to view full screen"
    >
      <WindowHeader url="blazeup.internal/compliance/client-dashboard" />
      <img
        src="Compliance.png"
        alt="Blazeup Compliance Client Dashboard"
        className="hero-base-img"
      />
    </div>

    {/* Overlapping Layer: BrowseFramework_SideSheet.png overlapping the bottom-right corner */}
    <div
      className="zoomable hero-sidesheet-layer"
      onClick={() => setLightboxImg("BrowseFramework_SideSheet.png")}
      title="Click to view full screen"
    >
      <img
        src="BrowseFramework_SideSheet.png"
        alt="Browse Framework Side-Sheet Drawer"
        className="hero-sidesheet-img"
      />
    </div>
  </div>
);

// Interactive Before/After Comparison Slider for Client Dashboard
const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="comparison-slider glass-card" style={{ padding: 0 }}>
      {/* Floating Badges */}
      <div className="slider-badge before-badge">Before: Raw Hackathon</div>
      <div className="slider-badge after-badge">After: Production Redesign</div>

      {/* Base Image (gives container its natural height) */}
      <img src={beforeImage} alt="Raw Hackathon Dashboard" className="base-img" />

      {/* Overlay Image (clipped based on slider position) */}
      <img
        src={afterImage}
        alt="Production Dashboard"
        className="overlay-img"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Slider Line with Drag Handle */}
      <div className="slider-line" style={{ left: `${sliderPosition}%` }}>
        <div className="slider-button">
          <ArrowLeftRight size={16} strokeWidth={2.5} />
        </div>
      </div>

      {/* Range Input for swipe / drag */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="slider-handle-input"
        aria-label="Compare Raw Hackathon and Production Dashboards"
      />
    </div>
  );
};

export default function App() {
  const mainRef = useRef();
  // Default to light version as requested, toggleable to dark
  const [isDark, setIsDark] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [isDark]);

  useEffect(() => {
    if (lightboxImg) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [lightboxImg]);

  useGSAP(() => {
    gsap.from(".reveal-text", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out" });
    gsap.utils.toArray('.reveal-scroll').forEach((elem) => {
      gsap.from(elem, { scrollTrigger: { trigger: elem, start: "top 85%" }, y: 50, opacity: 0, duration: 0.9, ease: "power3.out" });
    });
    gsap.utils.toArray('.glass-card').forEach((card) => {
      gsap.from(card, { scrollTrigger: { trigger: card, start: "top 90%" }, y: 35, opacity: 0, duration: 0.8, ease: "power2.out" });
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef}>
      {/* Theme Toggle Button */}
      <button
        className="theme-toggle"
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle Theme"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Background Graphic Grid System */}
      <div className="bg-grid"></div>
      <div className="bg-grid-major"></div>
      <div className="bg-grid-blocks"></div>
      <div className="bg-grid-mask"></div>
      <div className="noise-overlay"></div>
      <div className="bg-glow"></div>

      <div className="container">
        {/* SECTION 1: HERO */}
        <section className="hero text-center" style={{ padding: "160px 0 100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="tag accent reveal-text">India's Best Design Project 2026</span>
          <h1 className="reveal-text">
            Blazeup Compliance
          </h1>
          <div className="reveal-text text-constraint">
            <p style={{ fontSize: "1.25rem" }}>
              Transforming an unrefined hackathon concept into a production-ready compliance module for an award-winning enterprise ERP.
            </p>
          </div>
          <div className="reveal-text" style={{ width: "100%" }}>
            <HeroCompositeTeaser setLightboxImg={setLightboxImg} />
          </div>
        </section>

        {/* SECTION 2: OVERVIEW & ROLE */}
        <section className="reveal-scroll">
          <div className="grid-3">
            <div className="glass-card">
              <IconWrap IconComponent={Layers} />
              <h3>The Product</h3>
              <p>Blazeup is an intelligent ERP platform designed to unify HR, Finance, CRM, and Compliance.</p>
            </div>
            <div className="glass-card">
              <IconWrap IconComponent={CheckCircle} />
              <h3>My Role</h3>
              <p>UI Design Intern. Focused on UI Execution, IA Refinement, and Design System Integration.</p>
            </div>
            <div className="glass-card">
              <IconWrap IconComponent={ShieldCheck} />
              <h3>The Constraint</h3>
              <p>All new screens and flows had to strictly adhere to the newly established Blazeup core design system.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE CHALLENGE & USERS */}
        <section className="reveal-scroll text-center">
          <div className="text-constraint text-center" style={{ marginBottom: "48px" }}>
            <h2>The Challenge & The Users</h2>
            <p>
              The Compliance module began as an internal Terralogic hackathon project. The functional logic existed, but the UX lacked enterprise-grade visual hierarchy.
            </p>
          </div>

          {/* The Stakes of Compliance */}
          <div
            className="glass-card stakes-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "40px",
              alignItems: "center",
              marginBottom: "36px"
            }}
          >
            <div className="stakes-left">
              <IconWrap IconComponent={ShieldCheck} />
              <h3>The Stakes of Compliance</h3>
              <div className="stakes-chips">
                <span className="stakes-chip">
                  <span className="stakes-chip-dot"></span>
                  $ Millions at Risk
                </span>
                <span className="stakes-chip">
                  <span className="stakes-chip-dot"></span>
                  Multi-Jurisdiction
                </span>
                <span className="stakes-chip">
                  <span className="stakes-chip-dot"></span>
                  Zero Margin for Error
                </span>
              </div>
            </div>

            <div className="stakes-right">
              <p>
                Compliance is the <strong>financial shield of an enterprise</strong>. It means tracking hundreds of legal obligations across varying jurisdictions, where a single missed deadline can cost millions in penalties.
              </p>
              <p>
                The design challenge was taking this high-stakes, dense data and making it <strong>instantly digestible</strong> without overwhelming the user.
              </p>
            </div>
          </div>

          {/* The Two Core Personas */}
          <div className="grid-2">
            <div className="glass-card">
              <IconWrap IconComponent={Database} />
              <h3>The Blazeup System Admin</h3>
              <p>The internal team responsible for global jurisdictions and the master framework catalog.</p>
            </div>
            <div className="glass-card">
              <IconWrap IconComponent={Users} />
              <h3>The Client Admin</h3>
              <p>
                The user needing a macro-level view of active frameworks and penalties. <strong>This case study focuses strictly on solving this macro-level visibility and complexity.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: UX AUDITING & AI */}
        <section className="reveal-scroll text-center">
          <div className="text-constraint text-center" style={{ marginBottom: "56px" }}>
            <h2>UX Auditing & AI-Assisted Refinement</h2>
            <p>Navigating ambiguity and using modern tools as a UX Strategist.</p>
          </div>
          <div className="grid-3">
            <div className="glass-card">
              <IconWrap IconComponent={AlertTriangle} />
              <h3>The Reality</h3>
              <p>I was handed the raw hackathon screens with zero formal documentation and no immediate product manager to consult on the business logic.</p>
            </div>
            <div className="glass-card">
              <IconWrap IconComponent={BrainCircuit} />
              <h3>The Process</h3>
              <p>Instead of stalling, I leveraged AI tools (Gemini and Claude) as UX auditing partners. I used LLMs to help me understand complex enterprise logic.</p>
            </div>
            <div className="glass-card accent">
              <IconWrap IconComponent={Zap} />
              <h3>The Execution</h3>
              <p>I ran AI-assisted trial-and-error sessions to lock in a highly optimized Information Architecture before I ever opened Figma to design the UI.</p>
            </div>
          </div>
        </section>

        {/* SECTION 5: MACRO LAYOUT: CLIENT DASHBOARD */}
        <section className="reveal-scroll text-center">
          <div className="text-constraint text-center" style={{ marginBottom: "48px" }}>
            <h2>Macro Layout: Client Dashboard</h2>
            <p>Organizing high-density client data—such as risk tiers, status distributions, and active penalties—without overwhelming the user. By restructuring the visual hierarchy of the raw hackathon build, I reduced cognitive load and surfaced critical penalty tracking immediately.</p>
          </div>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <BeforeAfterSlider beforeImage="Compliance_raw.png" afterImage="Compliance.png" />
          </div>
        </section>

        {/* SECTION 6: MANAGEMENT VS DISCOVERY */}
        <section className="reveal-scroll text-center">
          <div className="text-constraint text-center" style={{ marginBottom: "56px" }}>
            <h2>Keeping Users in Context</h2>
            <p>Admins needed a way to manage their active frameworks, but also browse and adopt new ones, without losing their place in the system.</p>
          </div>
          <div className="grid-2">
            <div className="glass-card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="tag muted">BEFORE: THE GRAVEYARD</span>
              <h3>Version 1: The Data Table</h3>
              <p style={{ minHeight: "56px" }}>Standard data tables hid critical details and lacked a clear 'Adopt' action for new templates.</p>
              <div
                className="zoomable"
                onClick={() => setLightboxImg("BrowseFramework_SideSheet_Faded.png")}
                title="Click to view full screen"
                style={{
                  marginTop: "auto",
                  height: "320px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid var(--mockup-border)",
                  background: "var(--mockup-bg)",
                  boxShadow: "var(--mockup-shadow)"
                }}
              >
                <img
                  src="BrowseFramework_SideSheet_Faded.png"
                  alt="V1 Data Table"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }}
                />
              </div>
            </div>
            <div className="glass-card accent" style={{ display: "flex", flexDirection: "column" }}>
              <span className="tag accent">AFTER: THE SOLUTION</span>
              <h3>Framework Catalog Card</h3>
              <p style={{ minHeight: "56px" }}>Proposed a new slide-out 'Catalog Card' built from system atoms, introducing an explicit 'Adoption State' timestamp.</p>
              <div
                className="zoomable"
                onClick={() => setLightboxImg("BrowseFramework_SideSheet.png")}
                title="Click to view full screen"
                style={{
                  marginTop: "auto",
                  height: "320px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 92, 0, 0.4)",
                  background: "var(--mockup-bg)",
                  boxShadow: "var(--mockup-shadow)"
                }}
              >
                <img
                  src="BrowseFramework_SideSheet.png"
                  alt="V2 Framework Catalog Card"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTEXTUAL WORKFLOWS (UPDATED FULL-WIDTH SEQUENTIAL LAYOUT) */}
        <section className="reveal-scroll">
          <div className="text-constraint text-center" style={{ marginBottom: "56px" }}>
            <h2>Contextual Workflows</h2>
            <p>Creating compliance obligations requires heavy data entry. I mapped the UI to the user's cognitive load and intent.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "56px", maxWidth: "980px", margin: "0 auto" }}>
            {/* Mode 1: Deep Work (Full Page) */}
            <div className="glass-card" style={{ padding: "36px" }}>
              <div style={{ marginBottom: "24px" }}>
                <span className="tag accent">Mode 01</span>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>Deep Work (Full Page)</h3>
                <p style={{ margin: 0, fontSize: "1.05rem" }}>
                  For initial setup and complex configurations (ESG mapping), utilizing maximum vertical real estate and focused input surfaces.
                </p>
              </div>

              <div
                className="mockup-frame zoomable"
                onClick={() => setLightboxImg("Desk.png")}
                title="Click to view full screen"
                style={{ width: "100%" }}
              >
                <WindowHeader url="blazeup.internal/compliance/frameworks/deep-configure" />
                <img
                  src="Desk.png"
                  alt="Full Page Form UI - Deep Work"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>

            {/* Mode 2: Quick Additions (Drawer) */}
            <div className="glass-card" style={{ padding: "36px" }}>
              <div style={{ marginBottom: "24px" }}>
                <span className="tag accent">Mode 02</span>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "8px" }}>Quick Additions (Drawer)</h3>
                <p style={{ margin: 0, fontSize: "1.05rem" }}>
                  For fast, mid-task additions where the user needs to reference their existing list behind the drawer without losing navigational context.
                </p>
              </div>

              <div
                className="mockup-frame zoomable"
                onClick={() => setLightboxImg("Create Obligation.png")}
                title="Click to view full screen"
                style={{ width: "100%" }}
              >
                <WindowHeader url="blazeup.internal/compliance/quick-add-drawer" />
                <img
                  src="Create Obligation.png"
                  alt="Slide-Out Panel UI - Quick Additions"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: EDGE CASES */}
        <section className="reveal-scroll">
          <div className="sticky-split" style={{ alignItems: "center" }}>
            <div>
              <span className="tag accent">Empty States</span>
              <h2>Designing Beyond the Happy Path</h2>
              <p>A new ERP module is useless if the onboarding feels broken. I designed friendly, clear empty states that guide the Admin on what their very first action should be.</p>
            </div>
            <div
              className="mockup-frame zoomable"
              onClick={() => setLightboxImg("Admin_Framework_Empty State.png")}
              title="Click to view full screen"
              style={{ width: "100%" }}
            >
              <WindowHeader url="blazeup.internal/compliance/empty-state" />
              <img
                src="Admin_Framework_Empty State.png"
                alt="Empty State Dashboard"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* SECTION 9: IMPACT */}
        <section className="reveal-scroll text-center" style={{ paddingBottom: "160px" }}>
          <div className="text-constraint text-center" style={{ marginBottom: "56px" }}>
            <h2>Impact & Takeaways</h2>
            <p>The optimized IA and revamped UI were successfully integrated into the main Blazeup platform, ensuring the Compliance module matched the award-winning quality of the broader ERP.</p>
          </div>
          <div className="grid-3">
            <div className="glass-card">
              <IconWrap IconComponent={Activity} />
              <h3>Engineering Approval</h3>
              <p>The UI was approved for immediate integration due to strict adherence to the existing Blazeup component library.</p>
            </div>
            <div className="glass-card">
              <IconWrap IconComponent={Layers} />
              <h3>Standardized Input</h3>
              <p>Reduced the friction of configuring new frameworks by unifying the data entry flow contexts.</p>
            </div>
            <div className="glass-card">
              <IconWrap IconComponent={BrainCircuit} />
              <h3>AI as a UX Partner</h3>
              <p>Learned to accelerate feature prioritization and domain research using LLMs when formal documentation is absent.</p>
            </div>
          </div>
        </section>

      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <button
            style={{
              position: 'absolute',
              top: 28,
              right: 28,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              padding: '10px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onClick={() => setLightboxImg(null)}
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>
          <img
            src={lightboxImg}
            alt="Expanded UI Mockup"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
