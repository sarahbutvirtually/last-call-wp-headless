"use client";

import Link from "next/link";
import styles from "./NavBarSection.module.scss";
import Image from "next/image";

export default function NavBarClient({ navBar }) {
  console.log(navBar);

  if (!navBar) return null;

  return (
    <nav className={styles.nav}>
      <div className={styles["nav__container"]}>
        <div className={styles["nav__logo"]}>
          <div className={styles["nav__last-call"]}>
            <Image
              src={navBar.logo?.node?.sourceUrl || "/logo-placeholder.png"}
              alt={navBar.logo?.node?.altText || "Logo"}
              width={navBar.logo?.node?.mediaDetails?.width || 100}
              height={navBar.logo?.node?.mediaDetails?.height || 50}
            />
          </div>
        </div>
        <div className={styles["nav__button-container"]}>
          {/* Link accepts ID of section to go to on the current page */}
          <Link href={navBar.link} className={styles["nav__button"]} target={navBar.openInNewTab == true ? "_blank" : "_self"}>
            <span className={styles["nav__button--label"]}>{navBar.buttonLabel}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
