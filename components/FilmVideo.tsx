"use client";

import { useEffect, useRef } from "react";

type FilmVideoProps = {
  src: string;
  poster: string;
  label: string;
};

// Plays muted while on screen and pauses when scrolled away, so the file only
// streams for visitors who reach it. Visitors who ask for reduced motion get
// the poster and press play themselves.
export function FilmVideo({ src, poster, label }: FilmVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="mm-cs-film-video"
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      controls
      preload="none"
    />
  );
}
