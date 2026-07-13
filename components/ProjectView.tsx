"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { getProjectById, portfolioProjects } from "@/content/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectView({ projectId }: { projectId: string }) {
  const project = getProjectById(projectId);
  const reducedMotion = useReducedMotion() ?? false;

  if (!project) return null;

  const caseStudyProjects = portfolioProjects.filter(
    ({ id }) => id !== "contact",
  );
  const projectIndex = caseStudyProjects.findIndex(
    ({ id }) => id === project.id,
  );
  const nextProject =
    caseStudyProjects[(projectIndex + 1) % caseStudyProjects.length];
  const projectNumber = String(projectIndex + 1).padStart(2, "0");
  const [heroImage, ...supportingImages] = project.screenshots ?? [];
  const liveProjectHost = project.liveUrl
    ? new URL(project.liveUrl).hostname.replace(/^www\./, "")
    : null;

  return (
    <main className="signal-case">
      <section className="signal-case-hero">
        <motion.div
          className="signal-page-frame"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          <Link className="signal-case-back" href="/#work">
            <ArrowLeft aria-hidden="true" /> Selected work
          </Link>

          <div className="signal-case-heading">
            <div>
              <p className="signal-kicker">
                {projectNumber} / {project.hubSubtitle}
              </p>
              <h1>{project.title}</h1>
            </div>
            <p>{project.overview}</p>
          </div>

          {project.liveUrl && (
            <div className="signal-case-actions">
              <a
                className="signal-case-live-link"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title} at ${liveProjectHost}`}
              >
                <span className="signal-case-live-marker" aria-hidden="true" />
                <span className="signal-case-live-copy">
                  <span>Live project</span>
                  <strong>{liveProjectHost}</strong>
                </span>
                <span className="signal-case-live-arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          )}

          <dl className="signal-case-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>{project.timeline}</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd>
                {project.status === "ACTIVE"
                  ? "In active development"
                  : "Shipped"}
              </dd>
            </div>
          </dl>
        </motion.div>
      </section>

      {heroImage && (
        <motion.div
          className="signal-page-frame signal-case-hero-image"
          initial={reducedMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
        >
          <Image
            src={heroImage}
            alt={`${project.title} interface`}
            fill
            priority
            sizes="(max-width: 900px) 94vw, 1440px"
            className="object-contain"
          />
        </motion.div>
      )}

      <section className="signal-case-body">
        <div className="signal-page-frame">
          <header className="signal-case-body-heading">
            <p className="signal-kicker">Inside the build</p>
            <h2>The decisions behind the experience.</h2>
          </header>

          <div className="signal-case-sections">
            {project.sections && project.sections.length > 0 ? (
              project.sections.map((section, index) => (
                <motion.article
                  key={section.title}
                  className="signal-case-section"
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.035, ease }}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </motion.article>
              ))
            ) : (
              <article className="signal-case-section">
                <span>01</span>
                <h3>About the work</h3>
                <p>{project.overview}</p>
              </article>
            )}
          </div>

          {supportingImages.length > 0 && (
            <div className="signal-case-gallery">
              {supportingImages.map((image, index) => {
                const detail = project.screenshotDetails?.[index + 1];

                return (
                  <figure key={image} className="signal-case-gallery-item">
                    <div className="signal-case-gallery-image">
                      <Image
                        src={image}
                        alt={detail?.label ?? `${project.title} project view ${index + 2}`}
                        fill
                        sizes="(max-width: 900px) 94vw, 70vw"
                        className="object-contain"
                      />
                    </div>
                    {detail && (
                      <figcaption>
                        <span>{detail.label}</span>
                        <p>{detail.description}</p>
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          )}

          <div className="signal-case-stack">
            <p className="signal-kicker">Tools and systems</p>
            <div>
              {project.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {nextProject && (
        <Link className="signal-case-next" href={`/projects/${nextProject.id}`}>
          <span>Next case study</span>
          <strong>{nextProject.title}</strong>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      )}

      <div className="signal-case-footer">
        <Link href="/#work">
          All selected work <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
