"use client";

import styles from "./FAQSection.module.scss";
import Image from "next/image";
import { useState } from "react";

export default function FAQSectionClient({ faqs }) {
  
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles["faq"]} id="faq">
      <div className={styles["faq__container"]}>
        <div className={styles["faq__section-title"]}>
          <h2 className={styles["faq__heading"]}>FAQs</h2>
        </div>
        <div className={styles["faq__accordionList"]}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            const answerId = `faq-answer-${i}`;
            return (
              <div key={i} style={{ backgroundColor: item.backgroundColor ? item.backgroundColor : "#fff" }} className={`${styles["faq__accordion--item"]} ${isOpen ? styles["open"] : ""}`}>
                <button
                  className={styles["faq__questionContainer"]}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{ backgroundColor: item.backgroundColor ? item.backgroundColor : "#fff" }}
                >
                  <h4 style={{ color: item?.textColor || "#000" }} className={styles["faq__question"]}>{item.question}</h4>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className={`${styles["faq__icon"]} ${isOpen ? styles["open"] : ""}`}
                  >
                    <line x1="8" y1="3" x2="8" y2="13" stroke={item?.textColor || "#000"} strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="3" y1="8" x2="13" y2="8" stroke={item?.textColor || "#000"} strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
                <div className={`${styles["faq__answerWrap"]} ${isOpen ? styles["open"] : ""}`} id={answerId} role="region" style={{ backgroundColor: item?.backgroundColor || "#fff" }}>
                  <div className={styles["faq__answer"]}>
                    <p className={styles["faq__text"]} style={{ color: item?.textColor || "#000" }}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

