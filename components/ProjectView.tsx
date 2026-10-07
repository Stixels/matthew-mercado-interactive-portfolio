"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getProjectById, portfolioProjects } from "@/content/portfolio";
import CaseFeatureSection from "@/components/CaseFeatureSection";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectView({ projectId }: { projectId: string }) {
  const project = getProjectById(projectId);
  const reducedMotion = useReducedMotion() ?? false;

  if (!project) return null;

  const projectIndex = portfolioProjects.findIndex(
    ({ id }) => id === project.id,
  );
  const nextProject =
    portfolioProjects[(projectIndex + 1) % portfolioProjects.length];
  const caseNumber = String(projectIndex + 1).padStart(2, "0");
  const [heroImage, ...supportingImages] = project.screenshots ?? [];
  const { headings } = project;
  const hasGallery = supportingImages.length > 0;
  const features = project.features ?? [];
  const chapters = [
    project.challenge && "brief",
    ...features.map((_, index) => `feature-${index}`),
    project.sections?.length && "build",
    hasGallery && "footage",
    "stack",
  ].filter(Boolean);
  // Alternate section backgrounds down the page, whichever chapters exist.
  const chapterClass = (chapter: string) =>
    `mm-section mm-cs-block${chapters.indexOf(chapter) % 2 ? " mm-section-alt" : ""}`;
  const chapterNumber = (chapter: string) =>
    String(chapters.indexOf(chapter) + 1).padStart(2, "0");
  const links = [
    project.liveUrl && {
      label: "Visit the live product",
      url: project.liveUrl,
    },
    project.docsUrl && {
      label: "Read the product guides",
      url: project.docsUrl,
    },
    ...(project.links ?? []),
  ].filter((link): link is { label: string; url: string } => Boolean(link));

  // Always keep whileInView so content that rendered hidden on the server
  // still appears once reduced motion is detected after hydration.
  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: reducedMotion ? { duration: 0 } : { duration: 0.65, ease },
  } as const;

  return (
    <main className="mm-cs">
      <section className="mm-cs-hero">
        <motion.div
          className="mm-frame"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          <Link className="mm-cs-back" href="/#work">
            <ArrowLeft aria-hidden="true" /> All case files
          </Link>

          <p className="mm-cs-file">
            <span>Case {caseNumber}</span>
            {project.hubSubtitle}
          </p>

          <div className="mm-cs-intro">
            <h1>{project.title}</h1>
            <p>{project.overview}</p>
          </div>

          <dl className="mm-cs-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{project.timeline}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                {project.status === "ACTIVE" ? "Live and growing" : "Shipped"}
              </dd>
            </div>
            {links.length > 0 && (
              <div className="mm-cs-links">
                <dt>Links</dt>
                <dd>
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} <ArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </motion.div>
      </section>

      {project.metrics && project.metrics.length > 0 && (
        <section className="mm-cs-metrics" aria-label="Results">
          <div className="mm-frame">
            <dl>
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dd>{metric.value}</dd>
                  <dt>{metric.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {heroImage ? (
        <motion.figure
          className="mm-frame mm-cs-shot mm-cs-shot-hero"
          initial={reducedMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <span className="mm-cs-shot-bar" aria-hidden="true">
            <span>CAM 01</span>
            <span>
              {project.screenshotDetails?.[0]?.label ?? project.title}
            </span>
          </span>
          <span className="mm-cs-shot-image">
            <Image
              src={heroImage}
              alt={`${project.title} interface`}
              fill
              priority
              sizes="(max-width: 900px) 94vw, 1440px"
              className="object-cover object-left-top"
            />
          </span>
        </motion.figure>
      ) : (
        project.mediaNote && (
          <div className="mm-frame">
            <p className="mm-cs-redacted">
              <span aria-hidden="true">{headings.media ?? "No footage"}</span>
              {project.mediaNote}
            </p>
          </div>
        )
      )}

      {project.challenge && (
        <section className={chapterClass("brief")} aria-labelledby="cs-brief">
          <div className="mm-frame mm-cs-split">
            <p className="mm-label">
              <span>{chapterNumber("brief")}</span> {headings.brief}
            </p>
            <motion.p id="cs-brief" className="mm-cs-brief" {...reveal}>
              {project.challenge}
            </motion.p>
          </div>
        </section>
      )}

      {features.map((feature, index) => (
        <CaseFeatureSection
          key={feature.title}
          feature={feature}
          id={`cs-feature-${index}`}
          number={chapterNumber(`feature-${index}`)}
          alt={chapters.indexOf(`feature-${index}`) % 2 === 1}
          reveal={reveal}
        />
      ))}

      {project.sections && project.sections.length > 0 && (
        <section className={chapterClass("build")} aria-labelledby="cs-build">
          <div className="mm-frame">
            <header className="mm-cs-split">
              <p className="mm-label">
                <span>{chapterNumber("build")}</span> {headings.build}
              </p>
              <h2 id="cs-build">{headings.buildTitle}</h2>
            </header>

            <ol className="mm-cs-steps">
              {project.sections.map((section, index) => (
                <motion.li key={section.title} {...reveal}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {hasGallery && (
        <section
          className={chapterClass("footage")}
          aria-labelledby="cs-gallery"
        >
          <div className="mm-frame">
            <header className="mm-cs-split">
              <p className="mm-label">
                <span>{chapterNumber("footage")}</span>{" "}
                {headings.footage ?? "Footage"}
              </p>
              <h2 id="cs-gallery">
                {headings.footageTitle ?? "Inside the product."}
              </h2>
            </header>

            <div className="mm-cs-gallery">
              {supportingImages.map((image, index) => {
                const detail = project.screenshotDetails?.[index + 1];

                return (
                  <motion.figure key={image} className="mm-cs-shot" {...reveal}>
                    <span className="mm-cs-shot-bar" aria-hidden="true">
                      <span>CAM {String(index + 2).padStart(2, "0")}</span>
                      <span>{detail?.label ?? project.title}</span>
                    </span>
                    <span className="mm-cs-shot-image">
                      <Image
                        src={image}
                        alt={
                          detail?.label ?? `${project.title} view ${index + 2}`
                        }
                        fill
                        sizes="(max-width: 900px) 94vw, 72vw"
                        className="object-contain"
                      />
                    </span>
                    {detail && (
                      <figcaption>
                        <strong>{detail.label}</strong> {detail.description}
                      </figcaption>
                    )}
                  </motion.figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className={chapterClass("stack")} aria-labelledby="cs-stack">
        <div className="mm-frame mm-cs-split">
          <p className="mm-label" id="cs-stack">
            <span>{chapterNumber("stack")}</span> {headings.stack}
          </p>
          <ul className="mm-cs-stack">
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </section>

      {nextProject && (
        <Link className="mm-cs-next" href={`/projects/${nextProject.id}`}>
          <span className="mm-frame">
            <span className="mm-cs-next-label">Next case file</span>
            <strong>{nextProject.title}</strong>
            <ArrowUpRight aria-hidden="true" />
          </span>
        </Link>
      )}
    </main>
  );
}
