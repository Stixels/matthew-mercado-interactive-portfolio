"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { CaseFeature } from "@/content/portfolio";

type Reveal = Record<string, unknown>;

export default function CaseFeatureSection({
  feature,
  number,
  id,
  alt,
  reveal,
}: {
  feature: CaseFeature;
  number: string;
  id: string;
  alt: boolean;
  reveal: Reveal;
}) {
  return (
    <section
      className={`mm-section mm-cs-block ${alt ? "mm-section-alt" : ""}`}
      aria-labelledby={id}
    >
      <div className="mm-frame">
        <header className="mm-cs-split">
          <p className="mm-label">
            <span>{number}</span> {feature.label}
          </p>
          <div className="mm-cs-feature-heading">
            <h2 id={id}>{feature.title}</h2>
            {feature.intro && <p>{feature.intro}</p>}
          </div>
        </header>

        {feature.kind === "flow" && (
          <ol className="mm-cs-flow">
            {feature.steps.map((step, index) => (
              <motion.li key={step.name} {...reveal}>
                <span className="mm-cs-flow-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.name}</h3>
                <p>{step.detail}</p>
                {index < feature.steps.length - 1 && (
                  <ArrowRight className="mm-cs-flow-arrow" aria-hidden="true" />
                )}
              </motion.li>
            ))}
          </ol>
        )}

        {feature.kind === "compare" && (
          <motion.table className="mm-cs-compare" {...reveal}>
            <thead>
              <tr>
                <th scope="col">Measure</th>
                <th scope="col">Before</th>
                <th scope="col">After</th>
              </tr>
            </thead>
            <tbody>
              {feature.rows.map((row) => (
                <tr key={row.measure}>
                  <th scope="row">{row.measure}</th>
                  <td>{row.before}</td>
                  <td>{row.after}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
    </section>
  );
}
