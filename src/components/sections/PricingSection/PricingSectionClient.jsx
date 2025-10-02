"use client";

import styles from "./PricingSection.module.scss";
import Image from "next/image";

export default function PricingSectionClient({ pricingCards }) {

  if(!pricingCards) return null;

  return (
    <section className={styles["pricing"]} id="pricing">
      <div className={styles["pricing__container"]}>
        <div className={styles["pricing__headerContainer"]}>
          <h1 className={styles["pricing__heading"]}>Packages</h1>
        </div>
        <div className={styles["pricing__cardContainer"]}>
          {(pricingCards || []).map((card, index) => {
            const fields = card?.pricingCardFields || {};
            const isPopular = Boolean(fields?.mostPopular);
            const deliverables = fields?.deliverables?.edges || [];
            const cardClass = `${styles["pricing__card"]} ${isPopular ? styles["most-popular"] : ""}`.trim();

            return (
              <div key={index} className={cardClass}>
                {isPopular ? (
                  <Image
                    alt="most-popular-flag"
                    width={120}
                    height={120}
                    className={styles["pricing__mostPopularFlag"]}
                    src="/most-popular.svg"
                  />
                ) : null}

                <div className={styles["pricing__card--top"]}>
                  <div className={styles["pricing__card--headerContainer"]}>
                    <h5 className={styles["pricing__card--heading"]}>{fields?.subhead}</h5>
                    <div className={styles["pricing__card--priceContainer"]}>
                      <h1 className={styles["pricing__card--price"]}>${fields?.pricePerHour}</h1>
                      <h4 className={styles["pricing__card--perHour"]}>/hr</h4>
                    </div>
                  </div>
                  <div className={styles["pricing__list"]}>
                    {deliverables.map((deliverable, idx) => (
                      <div className={styles["pricing__list--item"]} key={idx}>
                        <Image
                          width={10}
                          height={40}
                          alt="sparkle"
                          className={styles["pricing__sparkle-4"]}
                          src="/sparkle.svg"
                        />
                        <p className={styles["pricing__list--text"]}>{deliverable?.node?.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles["pricing__actions"]}>
                  <button className={styles["pricing__actions--button"]}>
                    <p className={styles["pricing__actions--buttonLabel"]}>Reserve Your Spot</p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles["pricing__disclaimer"]}>
        <p className={styles["pricing__disclaimer--text"]}>
          Alcohol purchase available via partner or BYOB. We’ll provide a clear list.
        </p>
      </div>
    </section>
  );
}

