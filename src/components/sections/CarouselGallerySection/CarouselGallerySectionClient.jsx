"use client";

import styles from "./CarouselGallerySection.module.scss";
import Image from "next/image";

export default function CarouselGallerySectionClient({ imgArray }) {
  console.log(imgArray);

  if (!imgArray || !imgArray.length) return null;

  return (
    <section className={styles.carouselGallery}>
      {imgArray.map((img, index) => (
        <div key={index} className={styles["carouselGallery__item"]}>
          <Image
            src={img.sourceUrl}
            alt={img.altText || `Carousel image ${index + 1}`}
            width={img.mediaDetails?.width || 300}
            height={img.mediaDetails?.height || 200}
            className={styles["carouselGallery__image"]}
          />
        </div>
      ))}
    </section>
  );
}

