"use client";

import styles from "./FeaturedSection.module.scss";
import Image from "next/image";

export default function FeaturedSectionClient({ featuredImage, features = [] }) {
  return (
    <section className={styles.ourFeatures}>
      <div className={styles.ourFeatures__container}>
        {/* Features */}
        <div className={styles["ourFeatures__list"]}>
          {(features || []).map((f, i) => (
            <div key={f?.heading ?? i} className={styles["ourFeatures__list-item"]}>
              {f.icon?.node?.sourceUrl ? (
                <Image
                  className={styles["ourFeatures__list-item--image"]}
                  src={f.icon.node.sourceUrl}
                  alt={f.icon.node.altText || ""}
                  width={Number(f.icon.node.mediaDetails?.width) || 48}
                  height={Number(f.icon.node.mediaDetails?.height) || 48}
                />
              ) : null}
              <div className={styles["ourFeatures__list-item--content"]}>
                {f.heading ? <h2 className={styles["ourFeatures__heading"]}>{f.heading}</h2> : null}
                {f.bodyCopy ? (
                  <div className={styles["ourFeatures__body"]} dangerouslySetInnerHTML={{ __html: f.bodyCopy }} />
                ) : null}
              </div>
            </div>
          ))}
        </div>
        {/* Featured image */}
        <div className={styles["ourFeatures__imageContainer"]}>
          {featuredImage?.node?.sourceUrl ? (
              <figure>
                <Image
                className={styles["ourFeatures__image"]}
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText || ""}
                width={Number(featuredImage.node.mediaDetails?.width) || 1200}
                height={Number(featuredImage.node.mediaDetails?.height) || 630}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
