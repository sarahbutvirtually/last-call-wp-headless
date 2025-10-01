"use client";

import styles from "./CarouselGallerySection.module.scss";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CarouselGallerySectionClient({ imgArray }) {
  if (!imgArray || !imgArray.length) return null;

  // TODO: Refactor ALL of this
  
  // refs & state
  const trackRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [gapWidth, setGapWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);

  // small helpers
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));
  const safeParseGap = (s) => parseFloat(s || "0");

  // measure DOM to derive sizes & cards per view
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector(`.${styles["gallery__content--item"]}`);
    const cardW = firstCard ? firstCard.getBoundingClientRect().width : 0;
    const computed = getComputedStyle(track);
    // browsers expose gap via columnGap or gap depending on layout
    const gap = safeParseGap(computed.columnGap || computed.gap);
    const containerW = track.parentElement?.getBoundingClientRect().width ?? 0;

    // how many full cards fit in the viewport (at least 1)
    const per = cardW > 0 ? Math.max(1, Math.floor((containerW + gap) / (cardW + gap))) : 1;

    setCardWidth(cardW);
    setGapWidth(gap);
    setCardsPerView(per);
    setContainerWidth(containerW);

    // if index is outside new range, clamp it
    setIndex((cur) => {
      const maxIdx = Math.max(0, imgArray.length - per);
      return clamp(cur, 0, maxIdx);
    });
  }, [imgArray.length]);

  // attach resize observer + window resize fallback
  useEffect(() => {
    measure();

    const ro = new ResizeObserver(() => requestAnimationFrame(measure));
    if (trackRef.current) {
      // observe both track and its parent (viewport) for layout changes
      ro.observe(trackRef.current);
      if (trackRef.current.parentElement) ro.observe(trackRef.current.parentElement);
    }

    const onWindowResize = () => requestAnimationFrame(measure);
    window.addEventListener("resize", onWindowResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onWindowResize);
    };
  }, [measure]);

  // navigation helpers
  const maxIndex = Math.max(0, imgArray.length - cardsPerView);
  const goto = useCallback((i) => setIndex((_) => clamp(i, 0, maxIndex)), [maxIndex]);
  const next = useCallback(() => goto(index + 1), [goto, index]);
  const prev = useCallback(() => goto(index - 1), [goto, index]);

  const isAtStart = index <= 0;
  const isAtEnd = index >= maxIndex;

  // visual layout math
  const endPeek = 24; // visual padding at the end when fully scrolled
  const visibleRowWidth = cardsPerView * cardWidth + Math.max(0, cardsPerView - 1) * gapWidth;
  const slack = Math.max(0, containerWidth - visibleRowWidth);
  const extraEndOffset = imgArray.length > cardsPerView && isAtEnd ? slack + endPeek : 0;
  const translate = -(index * (cardWidth + gapWidth)) + extraEndOffset;

  // dots count equals possible starting positions (at least 1)
  const dots = Math.max(1, imgArray.length - cardsPerView + 1);


  return (
    <section className={styles["gallery"]} id="gallery">
      <div className={styles["gallery__container"]}>
        <div className={styles["gallery__headingContainer"]}>
          <h2 className={styles["gallery__heading"]}>Clinks and close-ups</h2>
          <p className={styles["gallery__subhead"]}>A few moments from recent celebrations.</p>
        </div>
        <div className={styles["gallery__content"]}>
          <div className={styles["gallery__content--viewport"]}>
            <div
              className={styles["gallery__content--imagesContainer"]}
              ref={trackRef}
              style={{ transform: `translateX(${translate}px)` }}
            >
              {imgArray.map((img, index) => (
                <figure key={index} className={styles["gallery__content--item"]}>
                  <Image
                    src={img.sourceUrl}
                    alt={img.altText || `Carousel image ${index + 1}`}
                    width={img.mediaDetails?.width || 300}
                    height={img.mediaDetails?.height || 200}
                    className={styles["gallery__content--image"]}
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
        <div className={styles["gallery__controls"]}>
          <div className={styles["gallery__controls--dots"]}>
            {Array.from({ length: dots }).map((_, d) => (
              <button
                key={d}
                className={`${styles["gallery__controls--dot"]} ${d === index ? styles["active"] : ""}`}
                onClick={() => goto(d)}
                aria-label={`Go to slide ${d + 1}`}
              />
            ))}
          </div>
          <div className={styles["gallery__controls--buttons"]}>
            <button
              className={`${styles["gallery__controls--arrowContainer"]} ${isAtStart ? styles["disabled"] : ""}`}
              onClick={prev}
              aria-label="Previous"
              disabled={isAtStart}
            >
              <Image alt="left arrow" width={18} height={18} className={styles["gallery__controls--arrowLeft"]} src="/arrow-left.svg" />
            </button>
            <button
              className={`${styles["gallery__controls--arrowContainer"]} ${isAtEnd ? styles["disabled"] : ""}`}
              onClick={next}
              aria-label="Next"
              disabled={isAtEnd}
            >
              <Image alt="right arrow" width={18} height={18} className={styles["gallery__controls--arrowRight"]} src="/arrow-right.svg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

