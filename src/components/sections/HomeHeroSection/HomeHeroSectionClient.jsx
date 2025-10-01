"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./HomeHeroSection.module.scss";
import Image from "next/image";

export default function HomeHeroSectionClient({ section, images = [] }) {
  // Basic autoplay crossfade between images that are absolutely positioned.
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const intervalMs = 4000; // time each slide is visible
  const fadeMs = 800; // CSS transition duration (should match inline style below)

  // Advance slides on a timer
  useEffect(() => {
    if (slides.length <= 1) return; // no need to rotate
    if (paused) return; // paused on hover/focus

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides.length, paused]);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  return (
    <section id="homeHero" className={styles.bookTheBar}>
      <div
        className={styles.bookTheBar__imageContainer}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-roledescription="carousel"
        aria-live="polite"
      >
        {slides.map((img, index) => {
          const isActive = index === active;
          return (
            <figure
              key={index}
              aria-hidden={!isActive}
              style={{
                opacity: isActive ? 1 : 0,
                transition: `opacity ${fadeMs}ms ease-in-out`,
                zIndex: isActive ? 2 : 1,
              }}
            >
              <Image
                priority={index === 0}
                width={3840}
                height={2160}
                className={styles.bookTheBar__image}
                src={img?.sourceUrl || ""}
                alt={img?.altText || ""}
                sizes="100vw"
              />
            </figure>
          );
        })}
      </div>
      <div className={styles.bookTheBar__content}>
        {section?.icon?.node?.sourceUrl ? (
          <Image
            width={32}
            height={35}
            className={styles.bookTheBar__icon}
            src={section.icon.node.sourceUrl}
            alt={section.icon.node.altText || ""}
          />
        ) : null}
        {section?.subhead ? <h6 className={styles.bookTheBar__subhead}>{section.subhead}</h6> : null}
        {section?.heading ? <h1 className={styles.bookTheBar__heading}>{section.heading}</h1> : null}
        {section?.bodyCopy ? <p className={styles.bookTheBar__body}>{section.bodyCopy}</p> : null}
        <div className={styles.bookTheBar__actions}>
          {section?.buttonALink ? (
            <a href={section.buttonALink} className={styles["bookTheBar__button--primary"]}>
              <p className={styles["bookTheBar__label--primary"]}>{section.buttonLabelA || "Learn More"}</p>
            </a>
          ) : null}
          {section?.buttonBLink ? (
            <a href={section.buttonBLink} className={styles["bookTheBar__button--secondary"]}>
              <p className={styles["bookTheBar__label--secondary"]}>{section.buttonLabelB || "Contact"}</p>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

