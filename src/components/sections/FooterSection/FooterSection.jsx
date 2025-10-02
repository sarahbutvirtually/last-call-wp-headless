import styles from "./FooterSection.module.scss";
import Image from "next/image";

export default function FooterSection() {
  return (
    <div className={styles.footer}>
      <div className={styles["footer__container"]}>
        <div className={styles["footer__content"]}>
          <div className={styles["footer__logo"]}>
            <Image src="/red-wordmark.svg" alt="Logo" width={200} height={50} />
          </div>
          <div className={styles["footer__nav"]}>
            <h6 className={styles["footer__nav--item"]}>Packages</h6>
            <h6 className={styles["footer__nav--item"]}>How it Works</h6>
            <h6 className={styles["footer__nav--item"]}>FAQ</h6>
            <h6 className={styles["footer__nav--item"]}>Get a Quote</h6>
          </div>
        </div>
      </div>
      <div className={styles["footer__credits"]}>
        <div className={styles["footer__divider"]}></div>
        <div className={styles["footer__row"]}>
          <p className={styles["footer__copyright"]}>All Rights Reserved.</p>
          <div className={styles["footer__footerLinks"]}>
            <p className={styles["footer__footerLinks--link"]}>Privacy Policy</p>
            <p className={styles["footer__footerLinks--link"]}>Terms of Service</p>
            <p className={styles["footer__footerLinks--link"]}>Cookies Settings</p>
          </div>
        </div>
      </div>
    </div>
  );
}
