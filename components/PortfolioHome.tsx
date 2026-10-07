"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { getProjectById } from "@/content/portfolio";
import HeroRoom from "@/components/HeroRoom";

const caseIds = [
  "escape-director",
  "waiver-director",
  "escape-this-frederick",
  "level-up-vr",
  "hardware",
] as const;

const cases = caseIds
  .map((id) => getProjectById(id))
  .filter((project) => project !== null);

const caseOutcomes: Record<string, string[]> = {
  "escape-director": [
    "8,000+ live sessions",
    "99.95% uptime",
    "Offline-first rooms",
  ],
  "waiver-director": ["Multi-tenant SaaS", "Immutable audit trails"],
  "escape-this-frederick": ["2× conversion", "Lighthouse 52 → 97"],
  "level-up-vr": ["#1 local search", "Figma to Webflow"],
  hardware: ["Arduino · Pi · PLCs", "No manual resets"],
};

const proof = [
  "9 years shipping",
  "8,000+ live sessions",
  "99.95% uptime",
  "3 of 4 production MCP servers",
  "7 min → under 1 min",
  "−90% analyst task time",
  "2× conversion",
  "Lighthouse 52 → 97",
  "Open-source Arduino SDK",
];

const toolkit = [
  {
    label: "Applied AI",
    tools: "LLM agents · MCP servers · RAG · tool calling · LLM evaluation",
  },
  {
    label: "Full stack",
    tools:
      "TypeScript · React · Next.js · SvelteKit · Node · FastAPI · PostgreSQL · Redis",
  },
  {
    label: "Delivery",
    tools: "Docker · Kubernetes · Argo CD · CI/CD · Vitest · Playwright",
  },
  {
    label: "Hardware",
    tools: "Arduino · Raspberry Pi · PLCs · C++ · sensors",
  },
] as const;

const facts = [
  { value: "9 yrs", label: "Shipping software" },
  { value: "2", label: "SaaS products founded" },
  { value: "B.S. CS", label: "Summa cum laude" },
] as const;

const experience = [
  {
    period: "Apr 2026 — Now",
    role: "AI Agents Software Engineer",
    company: "U.S. Department of Defense",
    summary:
      "Built 3 of the 4 production MCP servers for an enterprise LLM platform, own code review across its 15 agent-tooling repositories, and shipped an air-gapped desktop IDE for AI coding agents.",
  },
  {
    period: "Jan 2025 — Apr 2026",
    role: "Technical Lead",
    company: "U.S. Department of Defense",
    summary:
      "Architected a self-service ingestion platform for 100,000+ entity datasets, cut 10,000-entity processing from 7 minutes to under 1, and made builds 6× faster with CI/CD and GitOps. Earned a division performance award.",
  },
  {
    period: "Aug 2024 — Jan 2025",
    role: "Software Engineer",
    company: "U.S. Department of Defense",
    summary:
      "Replaced a legacy system with a workflow application that cut analyst task time 90%. Delivered 3 months early, and four partner agencies requested it.",
  },
  {
    period: "Mar 2026 — Now",
    role: "Founder & Lead Software Engineer",
    company: "Waiver Director",
    summary:
      "Turning the Escape This waiver tool into a multi-tenant guest-CRM SaaS that captures every participant, with immutable audit trails, booking and email integrations, and Stripe billing.",
  },
  {
    period: "May 2023 — Now",
    role: "Founder & Lead Software Engineer",
    company: "Escape Director",
    summary:
      "Built and operate an escape-room SaaS with offline-first room operation, an LLM analytics assistant chosen through a 4-model evaluation harness, and an open-source Arduino SDK for physical props.",
  },
  {
    period: "Nov 2024 — Now",
    role: "Contract Software Engineer",
    company: "eMediCall",
    summary:
      "Delivered a React Native mobile app for medical messaging with Google sign-in, camera workflows, and push notifications.",
  },
  {
    period: "Jul 2017 — Aug 2024",
    role: "Software Engineer & Manager",
    company: "Escape This Frederick",
    summary:
      "Redesigned the customer experience, doubled conversion, reduced bounce rate by 35%, and engineered Arduino and PLC puzzles that eliminated manual resets.",
  },
  {
    period: "May 2022 — Aug 2022",
    role: "Software Engineer Intern, Preview Team",
    company: "Box",
    summary:
      "Built social-link unfurling for every file type, upgraded React and Redux analytics menus, and expanded automated QA with Cucumber and WebdriverIO.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function SectionHeading({
  index,
  label,
  title,
  id,
  children,
}: {
  index: string;
  label: string;
  title: string;
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mm-heading">
      <p className="mm-label">
        <span>{index}</span> {label}
      </p>
      <h2 id={id}>{title}</h2>
      {children}
    </header>
  );
}

export default function PortfolioHome() {
  const reducedMotion = useReducedMotion() ?? false;
  const [featured, ...rest] = cases;

  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease },
      };

  return (
    <main className="mm-home">
      <HeroRoom />

      <div className="mm-ticker" aria-hidden="true">
        <div className="mm-ticker-track">
          {[...proof, ...proof].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section id="work" className="mm-section" aria-labelledby="work-title">
        <div className="mm-frame">
          <SectionHeading
            index="01"
            label="Case files"
            title="Built for the real world."
            id="work-title"
          >
            <p>
              Products measured by what happens after launch: faster teams,
              steadier sessions, and better guest experiences.
            </p>
          </SectionHeading>

          {featured && (
            <motion.div {...reveal}>
              <Link
                href={`/projects/${featured.id}`}
                className="mm-case mm-case-featured"
              >
                <span className="mm-case-media">
                  {featured.screenshots?.[0] && (
                    <Image
                      src={featured.screenshots[0]}
                      alt={`${featured.title} preview`}
                      fill
                      sizes="(max-width: 900px) 92vw, 58vw"
                      className="object-cover object-top"
                      priority={false}
                    />
                  )}
                  <span className="mm-case-scan" aria-hidden="true" />
                </span>
                <span className="mm-case-body">
                  <span className="mm-case-meta">
                    Case 01 · {featured.hubSubtitle}
                  </span>
                  <strong>{featured.title}</strong>
                  <span className="mm-case-overview">{featured.overview}</span>
                  <span className="mm-case-outcomes">
                    {caseOutcomes[featured.id]?.map((outcome) => (
                      <span key={outcome}>{outcome}</span>
                    ))}
                  </span>
                  <span className="mm-case-open">
                    Open case file <ArrowUpRight aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </motion.div>
          )}

          <div className="mm-case-grid">
            {rest.map((project, index) => (
              <motion.div
                key={project.id}
                {...reveal}
                transition={
                  reducedMotion
                    ? undefined
                    : { duration: 0.7, ease, delay: (index % 2) * 0.08 }
                }
              >
                <Link href={`/projects/${project.id}`} className="mm-case">
                  <span className="mm-case-media">
                    {project.screenshots?.[0] ? (
                      <Image
                        src={project.screenshots[0]}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 900px) 92vw, 44vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span className="mm-case-blueprint" aria-hidden="true">
                        {project.stack.slice(0, 3).join(" · ")}
                      </span>
                    )}
                    <span className="mm-case-scan" aria-hidden="true" />
                  </span>
                  <span className="mm-case-body">
                    <span className="mm-case-meta">
                      Case {String(index + 2).padStart(2, "0")} ·{" "}
                      {project.hubSubtitle}
                    </span>
                    <strong>{project.hubTitle ?? project.title}</strong>
                    <span className="mm-case-outcomes">
                      {caseOutcomes[project.id]?.map((outcome) => (
                        <span key={outcome}>{outcome}</span>
                      ))}
                    </span>
                  </span>
                  <ArrowUpRight className="mm-case-arrow" aria-hidden="true" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="mm-section mm-section-alt"
        aria-labelledby="about-title"
      >
        <div className="mm-frame mm-about">
          <motion.div className="mm-about-photo" {...reveal}>
            <Image
              src="/matthew-headshot.png"
              alt="Matthew Mercado"
              fill
              sizes="(max-width: 900px) 92vw, 40vw"
              className="object-cover"
            />
            <span className="mm-about-tag" aria-hidden="true">
              Subject: M. Mercado
            </span>
          </motion.div>

          <div className="mm-about-copy">
            <SectionHeading
              index="02"
              label="About Matthew"
              title="From the first sketch to the final relay."
              id="about-title"
            />
            <p className="mm-about-lead">
              Nine years of full-stack engineering, from polished, accessible
              interfaces to the infrastructure and AI agents behind them. I
              build LLM tooling for defense teams by day, run two SaaS products
              of my own, and still wire up physical puzzles for live rooms.
            </p>
            <dl className="mm-facts">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            <dl className="mm-toolkit">
              {toolkit.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.tools}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="mm-section"
        aria-labelledby="experience-title"
      >
        <div className="mm-frame mm-experience">
          <SectionHeading
            index="03"
            label="Session log"
            title="Engineering across products, platforms, and teams."
            id="experience-title"
          >
            <a
              className="mm-text-link"
              href="/matthew-mercado-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Full resume <ArrowUpRight aria-hidden="true" />
            </a>
          </SectionHeading>

          <ol className="mm-log">
            {experience.map((item) => (
              <li
                key={`${item.company}-${item.role}`}
                className={item.period.endsWith("Now") ? "is-live" : ""}
              >
                <span className="mm-log-period">{item.period}</span>
                <div className="mm-log-role">
                  <strong>{item.role}</strong>
                  <span>{item.company}</span>
                </div>
                <p>{item.summary}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="contact"
        className="mm-contact"
        aria-labelledby="contact-title"
      >
        <div className="mm-frame">
          <p className="mm-label">
            <span>04</span> Exit this room
          </p>
          <h2 id="contact-title">Let’s build something people remember.</h2>
          <a
            className="mm-contact-link"
            href="mailto:matthew@escapedirector.com"
          >
            <Mail aria-hidden="true" />
            <span>matthew@escapedirector.com</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <footer className="mm-footer">
            <span>© Matthew Mercado</span>
            <Link href="/projects/portfolio">How this site was built</Link>
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
