"use client";

import styles from "./HowItWorksSection.module.scss";
import { useState, useEffect } from "react";

export default function HowItWorksSectionClient({ section = [] }) {

  const [activeTab, setActiveTab] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => {
      const matches = "matches" in e ? e.matches : (e).matches;
      setIsMobile(matches);
    };
  
    handleChange(mql);
  
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    } else if ("addListener" in mql && typeof (mql).addListener === "function") {
      (mql).addListener(handleChange);
      return () => (mql).removeListener(handleChange);
    }
  }, []);

  useEffect(() => {
    if (!isMobile && activeTab == null) {
      setActiveTab(1);
    }
  }, [isMobile, activeTab]);

  return (
    <section className={styles["howItWorks"]} id="howItWorks">
      <div className={styles["howItWorks__container"]}>
        <div className={styles["howItWorks__sectionTitles--top"]}>
          <h6 className={styles["howItWorks__headingLeft"]}>How it works</h6>
          <h6 className={styles["howItWorks__headingRight"]}>How it works</h6>
        </div>
        <div className={styles["howItWorks__content"]}>
          {section.map((item, index) => {
            const id = Number(item?.stepNumber) || index + 1;
            const isActive = activeTab === id;

            return (
              <div
                key={id}
                className={`${styles["howItWorks__content--tab"]} ${
                  isActive ? styles["howItWorks__active--tab"] : styles["howItWorks__inactive--tab"]
                }`}
              >
                <button
                  type="button"
                  className={`${styles["howItWorks__content--button"]} ${
                    isActive ? styles["howItWorks__active--button"] : styles["howItWorks__inactive--button"]
                  }`}
                  onClick={() => {
                    if (isMobile && isActive) setActiveTab(null);
                    else setActiveTab(id);
                  }}
                  aria-expanded={isActive}
                >
                  <h5 className={styles["howItWorks__content--number"]}>0{id}</h5>
                  <h5 className={styles["howItWorks__content--header"]}>{item?.stepTitle}</h5>
                </button>
                <div
                  className={`${styles["howItWorks__content--copy"]} ${
                    isActive ? styles["howItWorks__active--copy"] : styles["howItWorks__inactive--copy"]
                  }`}
                >
                  <h3 className={styles["howItWorks__content--sectionHeading"]}>{item?.stepTitle}</h3>
                  <p className={styles["howItWorks__content--sectionBody"]}>{item?.stepDescription}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles["howItWorks__sectionTitles--top"]}>
          <h6 className={styles["howItWorks__headingLeft"]}>How it works</h6>
          <h6 className={styles["howItWorks__headingRight"]}>How it works</h6>
        </div>
      </div>
    </section>
  );
}

