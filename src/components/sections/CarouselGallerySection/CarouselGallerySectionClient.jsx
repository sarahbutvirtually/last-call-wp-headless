"use client";

import styles from "./CarouselGallerySection.module.scss";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function CarouselGallerySectionClient({ imgArray }) {
  console.log(imgArray);

  if (!imgArray || !imgArray.length) return null;

  // TODO: Refactor ALL of this
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [cardW, setCardW] = useState(0);
  const [gap, setGap] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [containerW, setContainerW] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector(`.${styles["gallery__content--item"]}`);
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 0;
    const cs = getComputedStyle(track);
    const gapPx = parseFloat(cs.columnGap || cs.gap || "0");
    const containerWidth = track.parentElement?.getBoundingClientRect().width ?? 0;
    const per = cardWidth > 0 ? Math.max(1, Math.floor((containerWidth + gapPx) / (cardWidth + gapPx))) : 1;
    setCardW(cardWidth);
    setGap(gapPx);
    setCardsPerView(per);
    setContainerW(containerWidth);
    // Clamp index if it fell out of range after resize
    const maxIdx = Math.max(0, imgArray.length - per);
    setIndex((i) => Math.min(i, maxIdx));
  }, [imgArray.length]);

  useEffect(() => {
    measure();
    const onResize = () => {
      requestAnimationFrame(measure);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  const maxIndex = Math.max(0, imgArray.length - cardsPerView);

  const goto = (i) => setIndex(Math.max(0, Math.min(i, maxIndex)));
  const isAtStart = index <= 0;
  const isAtEnd = index >= maxIndex;
  const next = () => goto(index + 1);
  const prev = () => goto(index - 1);

  const endPeek = 24;
  const visibleRowWidth = cardsPerView * cardW + Math.max(0, cardsPerView - 1) * gap;
  const slack = Math.max(0, containerW - visibleRowWidth);
  const extraEndOffset = imgArray.length > cardsPerView && isAtEnd ? slack + endPeek : 0;
  const translate = -(index * (cardW + gap)) + extraEndOffset;
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

