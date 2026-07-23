"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { getProjectById, portfolioProjects } from "@/content/portfolio";

const SignalRig = dynamic(() => import("@/components/SignalRig"), {
  ssr: false,
  loading: () => <div className="signal-rig-placeholder" />,
});

const selectedProjectIds = [
  "escape-director",
  "waiver-director",
  "escape-this-frederick",
  "level-up-vr",
  "portfolio",
] as const;

const selectedProjects = selectedProjectIds
  .map((id) => getProjectById(id))
  .filter((project) => project !== null);

const projectOutcomes: Record<string, string> = {
  "escape-director": "8,000+ sessions · 99.95% uptime",
  "waiver-director": "Multi-tenant product · active build",
  "escape-this-frederick": "2× conversion · Lighthouse 97",
  "level-up-vr": "#1 local search position",
  portfolio: "Responsive 3D · React + Three.js",
};

const experience = [
  {
    period: "Aug 2024 — Now",
    role: "Software Engineer",
    company: "Department of Defense",
    summary:
      "Building and maintaining software for Department of Defense programs in my current full-time role.",
  },
  {
    period: "Mar 2026 — Now",
    role: "Founder & Lead Software Engineer",
    company: "Waiver Director",
    summary:
      "Leading product architecture and engineering for a multi-tenant waiver operations platform with secure signed records, integrations, and AI-assisted content review.",
  },
  {
    period: "May 2023 — Now",
    role: "Founder & Lead Software Engineer",
    company: "Escape Director",
    summary:
      "Built and launched a full-stack escape-room management platform with real-time operations, analytics, billing, offline reliability, and connected APIs.",
  },
  {
    period: "Aug 2017 — Aug 2024",
    role: "Manager & Software Engineer",
    company: "Escape This Frederick",
    summary:
      "Redesigned the customer experience, doubled conversion, reduced bounce rate by 35%, and built software and electronic puzzle systems for live rooms.",
  },
  {
    period: "Jan 2022 — Dec 2022",
    role: "Computer Science Peer Mentor",
    company: "Mount St. Mary's University",
    summary:
      "Mentored roughly 100 Computer Science I and II students in Java, Python, debugging, and practical problem-solving.",
  },
  {
    period: "May 2022 — Aug 2022",
    role: "Software Engineer Intern, Preview Team",
    company: "Box",
    summary:
      "Improved React and Redux analytics interfaces, built dynamic link unfurling in PHP, and expanded automated QA coverage with Cucumber and WebdriverIO.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export default function PortfolioHome() {
  const storyRef = useRef<HTMLElement>(null);
  const sceneTimeline = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion() ?? false;
  const [activeStep, setActiveStep] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState(
    selectedProjects[0]?.id ?? "escape-director",
  );

  const { scrollY, scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(
    scrollYProgress,
    (value) => `${value * 100}%`,
  );

  const updateSceneTimeline = useCallback((latestScrollY: number) => {
    if (!storyRef.current) return;

    const panelCopies = Array.from(
      storyRef.current.querySelectorAll<HTMLElement>(".signal-panel-copy"),
    );
    if (panelCopies.length === 0) return;

    const stageHeight =
      storyRef.current
        .querySelector<HTMLElement>(".signal-stage")
        ?.getBoundingClientRect().height ?? 0;
    const readingCenter =
      window.innerWidth <= 1100
        ? (stageHeight + window.innerHeight) / 2
        : window.innerHeight / 2;
    const anchors = panelCopies.map((panelCopy) => {
      const rect = panelCopy.getBoundingClientRect();
      return latestScrollY + rect.top + rect.height / 2 - readingCenter;
    });

    let timeline = 0;
    if (latestScrollY >= anchors[anchors.length - 1]) {
      timeline = anchors.length - 1;
    } else if (latestScrollY > anchors[0]) {
      const segment = anchors.findIndex(
        (anchor, index) =>
          index < anchors.length - 1 &&
          latestScrollY >= anchor &&
          latestScrollY < anchors[index + 1],
      );

      if (segment >= 0) {
        const span = anchors[segment + 1] - anchors[segment];
        const localProgress =
          span > 0 ? (latestScrollY - anchors[segment]) / span : 0;
        timeline = segment + localProgress;
      }
    }

    sceneTimeline.current = timeline;
    const nextStep = Math.round(timeline);
    setActiveStep((currentStep) =>
      currentStep === nextStep ? currentStep : nextStep,
    );
  }, []);

  useMotionValueEvent(scrollY, "change", updateSceneTimeline);

  useEffect(() => {
    const updateForViewport = () => updateSceneTimeline(window.scrollY);
    updateForViewport();
    window.addEventListener("resize", updateForViewport);
    return () => window.removeEventListener("resize", updateForViewport);
  }, [updateSceneTimeline]);

  const activeProject = getProjectById(activeProjectId) ?? selectedProjects[0];

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * -2,
    };
  };

  return (
    <main className="signal-portfolio">
      <section
        ref={storyRef}
        className={`signal-story is-step-${activeStep}`}
        aria-label="How a full-stack application works"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => {
          pointer.current = { x: 0, y: 0 };
        }}
      >
        <div className="signal-stage" aria-hidden="true">
          <div className="signal-canvas">
            <SignalRig
              timeline={sceneTimeline}
              pointer={pointer}
              reducedMotion={reducedMotion}
            />
          </div>
          <div className="signal-stage-index">
            {["System", "App", "Stack", "AI", "Connect"].map((label, index) => (
              <span
                key={label}
                className={
                  index === activeStep
                    ? "is-active"
                    : index < activeStep
                      ? "is-complete"
                      : ""
                }
              >
                {label}
              </span>
            ))}
          </div>
          <div className="signal-progress-track">
            <motion.div
              className="signal-progress"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <div className="signal-panels">
          <section className="signal-panel signal-hero" id="top">
            <motion.div
              className="signal-panel-copy"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="signal-kicker">
                Matthew Mercado{" "}
                <span>Software engineer · Full-stack &amp; AI</span>
              </p>
              <h1>I build full-stack software for the real world.</h1>
              <p className="signal-intro">
                Web applications, AI-enabled systems, and integrations for
                escape rooms, VR venues, and ambitious products.
              </p>
              <div className="signal-actions">
                <a className="signal-button" href="#work">
                  View selected work <ArrowDown aria-hidden="true" />
                </a>
                <a
                  className="signal-text-link"
                  href="mailto:matthew@escapedirector.com"
                >
                  Start a conversation <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </section>

          <section className="signal-panel">
            <div className="signal-panel-copy signal-step-copy">
              <p className="signal-kicker">01 / Frontend</p>
              <h2>It starts with an interface people can trust.</h2>
              <p>
                Fast, accessible web applications turn complicated workflows
                into something clear for customers and teams.
              </p>
              <Link
                className="signal-text-link"
                href="/projects/escape-director"
              >
                See the application <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="signal-panel">
            <div className="signal-panel-copy signal-step-copy">
              <p className="signal-kicker">02 / Full stack</p>
              <h2>Every click reaches a system built to hold up.</h2>
              <p>
                APIs, authentication, data, background jobs, and operational
                safeguards work together behind the interface.
              </p>
              <Link
                className="signal-text-link"
                href="/projects/waiver-director"
              >
                See the full-stack work <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="signal-panel">
            <div className="signal-panel-copy signal-step-copy">
              <p className="signal-kicker">03 / Applied AI</p>
              <h2>AI becomes part of the product.</h2>
              <p>
                Agentic workflows audit emails and waiver templates, while
                structured generation keeps people in control of the result.
              </p>
              <Link
                className="signal-text-link"
                href="/projects/waiver-director"
              >
                See the AI work <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="signal-panel">
            <div className="signal-panel-copy signal-step-copy">
              <p className="signal-kicker">04 / Integrations</p>
              <h2>Then software meets the rest of the operation.</h2>
              <p>
                MCP servers bring bookings, messaging, analytics, and external
                APIs into one dependable chat interface.
              </p>
              <Link
                className="signal-text-link"
                href="/projects/escape-director"
              >
                See the connected system <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </section>

      <section id="work" className="signal-work" aria-labelledby="work-title">
        <div className="signal-page-frame signal-section-heading">
          <div>
            <p className="signal-kicker">Selected work</p>
            <h2 id="work-title">Built for the real world.</h2>
          </div>
          <p>
            Products measured by what happens after launch: faster teams,
            steadier sessions, and better guest experiences.
          </p>
        </div>

        <div className="signal-page-frame signal-work-layout">
          <div className="signal-project-list">
            {selectedProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`signal-project-row ${
                  activeProject?.id === project.id ? "is-active" : ""
                }`}
                onMouseEnter={() => setActiveProjectId(project.id)}
                onFocus={() => setActiveProjectId(project.id)}
              >
                <span className="signal-project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="signal-project-copy">
                  <small>{project.hubSubtitle}</small>
                  <strong>{project.hubTitle ?? project.title}</strong>
                  <span>{projectOutcomes[project.id]}</span>
                </span>
                <ArrowUpRight aria-hidden="true" />
                {project.screenshots?.[0] && (
                  <span className="signal-project-mobile-image">
                    <Image
                      src={project.screenshots[0]}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 92vw, 1px"
                    />
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="signal-work-visual" aria-live="polite">
            <AnimatePresence mode="wait">
              {activeProject?.screenshots?.[0] ? (
                <motion.div
                  key={activeProject.id}
                  className="signal-work-image"
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <Image
                    src={activeProject.screenshots[0]}
                    alt={`${activeProject.title} project preview`}
                    fill
                    sizes="(max-width: 1000px) 92vw, 52vw"
                    className="object-cover object-top"
                  />
                  <div className="signal-work-caption">
                    <span>{activeProject.role}</span>
                    <strong>{projectOutcomes[activeProject.id]}</strong>
                  </div>
                </motion.div>
              ) : (
                <div className="signal-work-image signal-work-fallback">
                  <p className="signal-kicker">Live system</p>
                  <strong>{activeProject?.title}</strong>
                  <span>
                    {projectOutcomes[activeProject?.id ?? "portfolio"]}
                  </span>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="signal-about"
        aria-labelledby="about-title"
      >
        <div className="signal-page-frame signal-about-grid">
          <motion.div
            className="signal-about-image"
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease }}
          >
            <Image
              src="/matthew-headshot.png"
              alt="Matthew Mercado"
              fill
              sizes="(max-width: 800px) 92vw, 45vw"
              className="object-cover"
            />
          </motion.div>

          <div className="signal-about-copy">
            <p className="signal-kicker">About Matthew</p>
            <h2 id="about-title">From the first sketch to the final relay.</h2>
            <p className="signal-about-lead">
              I lead with full-stack software engineering, building web
              applications and AI systems from interface to infrastructure—with
              experience in the physical systems they sometimes control.
            </p>
            <dl className="signal-capabilities">
              <div>
                <dt>Full stack</dt>
                <dd>
                  React, Next.js, Node.js, Convex, PostgreSQL, product
                  architecture
                </dd>
              </div>
              <div>
                <dt>Applied AI</dt>
                <dd>
                  Agentic APIs, LLM evaluation, structured generation, MCP
                  servers
                </dd>
              </div>
              <div>
                <dt>Physical</dt>
                <dd>
                  Arduino, Raspberry Pi, PLCs, sensors, fail-safe controls
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div id="experience" className="signal-page-frame signal-experience">
          <header className="signal-experience-heading">
            <p className="signal-kicker">Selected experience</p>
            <h3>Engineering across products, platforms, and teams.</h3>
            <a
              className="signal-resume-link"
              href="/matthew-mercado-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Full resume <ArrowUpRight aria-hidden="true" />
            </a>
          </header>
          <div>
            {experience.map((item) => (
              <div
                key={`${item.company}-${item.role}`}
                className="signal-experience-row"
              >
                <span>{item.period}</span>
                <div className="signal-experience-role">
                  <strong>{item.role}</strong>
                  <span>{item.company}</span>
                </div>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="signal-contact"
        aria-labelledby="contact-title"
      >
        <div className="signal-page-frame">
          <p className="signal-kicker">The next sequence</p>
          <h2 id="contact-title">Let’s build an experience people remember.</h2>
          <a
            className="signal-contact-link"
            href="mailto:matthew@escapedirector.com"
          >
            <Mail aria-hidden="true" />
            matthew@escapedirector.com
            <ArrowUpRight aria-hidden="true" />
          </a>
          <footer className="signal-footer">
            <span>Matthew Mercado</span>
            <span>Maryland, USA</span>
            <a
              href="https://github.com/Stixels"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/matthew-mercado-velez"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}
