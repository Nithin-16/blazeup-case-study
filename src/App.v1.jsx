import React, { useRef, useState, useEffect } from "react";
import {
  Layers, ShieldCheck, Zap, Database, ArrowRight,
  Users, Activity, BrainCircuit, CheckCircle, Sun, Moon, X, AlertTriangle
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

// FLAT OVERLAP: Replaces the 3D scene with a clean 2D overlap
const HeroFlatScene = ({ setLightboxImg }) => (
  <div style={{ position: "relative", width: "100%", maxWidth: "900px", margin: "64px auto 0", height: "auto", minHeight: "450px" }}>

    {/* Main Dashboard (Back) */}
    <div
      className="glass-card zoomable"
      onClick={() => setLightboxImg("Admin_Framework.png")}
      title="Click to view full screen"
      style={{
        width: "85%",
        padding: "0",
        margin: "0 auto",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <div style={{ height: "48px", background: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", padding: "0 20px", gap: "8px" }}>
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56", opacity: 0.8 }}></div>
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E", opacity: 0.8 }}></div>
        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F", opacity: 0.8 }}></div>
      </div>
      <img src="Admin_Framework.png" alt="Compliance Dashboard" style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", objectPosition: "top left" }} />
    </div>

    {/* Side Sheet (Front, Overlapping flatly) */}
    <div
      className="glass-card zoomable"
      onClick={() => setLightboxImg("/BrowseFramework_SideSheet.png")}
      style={{
        position: "absolute",
        bottom: "-40px",
        right: "0",
        width: "35%",
        padding: 0,
        overflow: "hidden",
        background: "var(--bg-space)",
        border: "1px solid rgba(255,92,0,0.3)",
        boxShadow: "0 32px 64px rgba(0,0,0,0.4)"
      }}
    >
      <img src="/BrowseFramework_SideSheet.png" alt="Slide out drawer" style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  </div>
);

export default function App() {
  const mainRef = useRef();
  const [isDark, setIsDark] = useState(true);
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
      gsap.from(elem, { scrollTrigger: { trigger: elem, start: "top 85%" }, y: 60, opacity: 0, duration: 1, ease: "power3.out" });
    });
    gsap.utils.toArray('.glass-card').forEach((card) => {
      gsap.from(card, { scrollTrigger: { trigger: card, start: "top 90%" }, y: 40, opacity: 0, duration: 0.8, ease: "power2.out" });
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef}>
      <button className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="noise-overlay"></div>
      <div className="bg-glow"></div>

      <div className="container">
        {/* SECTION 1: HERO */}
        <section className="hero text-center" style={{ padding: "180px 0 120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span className="tag accent reveal-text">India's Best Design Project 2026</span>
          <h1 className="reveal-text" style={{ background: "linear-gradient(180deg, var(--text-main) 0%, var(--text-muted) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Blazeup Compliance
          </h1>
          <div className="reveal-text text-constraint">
            <p style={{ fontSize: "1.25rem" }}>
              Transforming an unrefined hackathon concept into a production-ready compliance module for an award-winning enterprise ERP.
            </p>
          </div>
          <div className="reveal-text" style={{ width: "100%" }}>
            <HeroFlatScene setLightboxImg={setLightboxImg} />
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
        <section className="sticky-split reveal-scroll">
          <div className="sticky-col">
            <h2>The Challenge & The Users</h2>
            <p>The Compliance module began as an internal Terralogic hackathon project. The functional logic existed, but the UX lacked enterprise-grade visual hierarchy.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div className="glass-card accent">
              <IconWrap IconComponent={Database} />
              <h3>The System Admin (Company Side)</h3>
              <p>Needs a dense, macro-level view of all active frameworks, penalties, and the ability to configure obligations. <strong>This case study focuses strictly on solving this macro-complexity.</strong></p>
            </div>
            <div className="glass-card">
              <IconWrap IconComponent={Users} />
              <h3>The End-User (Client Side)</h3>
              <p>Needs a low-friction, focused view of their specific pending tasks without being overwhelmed by the global setup.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: UX AUDITING & AI */}
        <section className="reveal-scroll text-center">
          <div className="text-constraint" style={{ marginBottom: "64px" }}>
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

        {/* SECTION 5: MACRO LAYOUT */}
        <section className="reveal-scroll text-center">
          <div className="text-constraint" style={{ marginBottom: "48px" }}>
            <h2>Macro Layout: Admin Dashboard</h2>
            <p>Organizing high-density compliance data without overwhelming the user.</p>
          </div>
          <div
            className="glass-card zoomable"
            onClick={() => setLightboxImg("Compliance.png")}
            style={{ padding: "0", overflow: "hidden", maxWidth: "900px", margin: "0 auto" }}
          >
            <div style={{ height: "48px", background: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid var(--glass-border)", display: "flex", alignItems: "center", padding: "0 20px", gap: "8px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56", opacity: 0.8 }}></div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E", opacity: 0.8 }}></div>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F", opacity: 0.8 }}></div>
            </div>
            <img src="Compliance.png" alt="Blazeup Compliance Dashboard" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </section>

        {/* SECTION 6: MANAGEMENT VS DISCOVERY */}
        <section className="reveal-scroll text-center">
          <div className="text-constraint" style={{ marginBottom: "64px" }}>
            <h2>Keeping Users in Context</h2>
            <p>Admins needed a way to manage their active frameworks, but also browse and adopt new ones, without losing their place in the system.</p>
          </div>
          <div className="grid-2">
            <div className="glass-card">
              <span className="tag muted">BEFORE: THE GRAVEYARD</span>
              <h3>Version 1: The Data Table</h3>
              <p>Standard data tables hid critical details and lacked a clear 'Adopt' action for new templates.</p>
              <div className="ui-placeholder zoomable" onClick={() => setLightboxImg("BrowseFramework_SideSheet_Faded.png")} style={{ padding: 0, overflow: "hidden", border: "1px dashed var(--glass-border)", height: "300px" }}>
                <img src="BrowseFramework_SideSheet_Faded.png" alt="V1 Data Table" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
              </div>
            </div>
            <div className="glass-card accent">
              <span className="tag accent">AFTER: THE SOLUTION</span>
              <h3>Framework Catalog Card</h3>
              <p>Proposed a new slide-out 'Catalog Card' built from system atoms, introducing an explicit 'Adoption State' timestamp.</p>
              <div className="ui-placeholder zoomable" onClick={() => setLightboxImg("/BrowseFramework_SideSheet.png")} style={{ padding: 0, overflow: "hidden", borderStyle: "solid", borderColor: "rgba(255,92,0,0.3)", height: "300px" }}>
                <img src="/BrowseFramework_SideSheet.png" alt="V2 Framework Catalog Card" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: CONTEXTUAL WORKFLOWS - UPDATED TO FLAT OVERLAP */}
        <section className="split-layout reveal-scroll">
          <div>
            <h2>Contextual Workflows</h2>
            <p>Creating compliance obligations requires heavy data entry. I mapped the UI to the user's cognitive load and intent.</p>
            <ul style={{ listStyle: "none", marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <li style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <ArrowRight color="var(--accent)" style={{ marginTop: "4px" }} />
                <div>
                  <h4 style={{ fontSize: "1.2rem" }}>Deep Work (Full Page)</h4>
                  <p style={{ fontSize: "0.95rem" }}>For initial setup and complex configurations (ESG mapping), utilizing maximum vertical real estate.</p>
                </div>
              </li>
              <li style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <ArrowRight color="var(--accent)" style={{ marginTop: "4px" }} />
                <div>
                  <h4 style={{ fontSize: "1.2rem" }}>Quick Additions (Drawer)</h4>
                  <p style={{ fontSize: "0.95rem" }}>For fast, mid-task additions where the user needs to reference their existing list behind the drawer.</p>
                </div>
              </li>
            </ul>
          </div>

          <div style={{ position: "relative", height: "auto", minHeight: "450px" }}>
            <div className="glass-card zoomable" onClick={() => setLightboxImg("Desk.png")} style={{ position: "absolute", top: 0, left: 0, width: "75%", height: "350px", zIndex: 1, padding: 0, overflow: "hidden" }}>
              <img src="Desk.png" alt="Full Page Form UI" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
            </div>
            <div className="glass-card accent zoomable" onClick={() => setLightboxImg("Create Obligation.png")} style={{ position: "absolute", bottom: "-30px", right: 0, width: "55%", height: "400px", zIndex: 2, padding: 0, overflow: "hidden", background: "var(--bg-space)", boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }}>
              <img src="Create Obligation.png" alt="Slide-Out Panel UI" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }} />
            </div>
          </div>
        </section>

        {/* SECTION 8: EDGE CASES */}
        <section className="reveal-scroll">
          <div className="sticky-split" style={{ alignItems: "center" }}>
            <div>
              <h2>Designing Beyond the Happy Path</h2>
              <p>A new ERP module is useless if the onboarding feels broken. I designed friendly, clear empty states that guide the Admin on what their very first action should be.</p>
            </div>
            <div className="ui-placeholder zoomable" onClick={() => setLightboxImg("/Admin_Framework_Empty State.png")} style={{ marginTop: 0, height: "300px", padding: 0, overflow: "hidden", border: "1px dashed var(--glass-border)" }}>
              <img src="/Admin_Framework_Empty State.png" alt="Empty State Dashboard" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", borderRadius: "16px" }} />
            </div>
          </div>
        </section>

        {/* SECTION 9: IMPACT */}
        <section className="reveal-scroll text-center" style={{ paddingBottom: "180px" }}>
          <div className="text-constraint" style={{ marginBottom: "64px" }}>
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
          <button style={{ position: 'absolute', top: 32, right: 32, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', padding: '8px', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setLightboxImg(null)}>
            <X size={24} />
          </button>
          <img src={lightboxImg} alt="Expanded UI Mockup" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
