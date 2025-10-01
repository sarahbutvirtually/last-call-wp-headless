import Image from "next/image";
import styles from "./ContactFormSection.module.scss";

export default function ContactFormSection() {
  return (
  <div className={styles.contactForm} id="contact">
      <div className={styles["contactForm__container"]}>
        <div className={styles["contactForm__container--form"]}>
          <div className={styles["contactForm__sectionTitle"]}>
            <h2 className={styles["contactForm__heading"]}>Let’s lock in your date</h2>
            <p className={styles["contactForm__text"]}>
              Share a few details and we’ll confirm availability within 24 hours.
            </p>
          </div>
          {/* TODO: Check form functionality with backend */}
          <form className={styles["contactForm__form"]}>
            <div className={styles["contactForm__inputContainer"]}>
              <label className={styles["contactForm__label"]} htmlFor="name">Name</label>
              <input className={styles["contactForm__input"]} id="name"></input>
            </div>
            <div className={styles["contactForm__inputContainer"]}>
              <label className={styles["contactForm__label"]} htmlFor="email">Email</label>
              <input className={styles["contactForm__input"]} id="email"></input>
            </div>
            <div className={styles["contactForm__inputContainer"]}>
              <label className={styles["contactForm__label"]} htmlFor="message">Tell us about your event!</label>
              <textarea className={styles["contactForm__input"]} id="message">Type your message...</textarea>
            </div>
            <div className={styles["contactForm__checkbox"]}>
              <input type="checkbox" className={styles["contactForm__checkbox--box"]} id="acceptTerms" />
              <label htmlFor="acceptTerms" className={styles["contactForm__label"]}>I accept the terms</label>
            </div>
            <input className={styles["contactForm__button"]} type="submit" value="Get a Quote" />
          </form>
        </div>
        <div className={styles["contactForm__imageContainer"]}>
          <Image alt="lorem" width={600} height={600} className={styles["contactForm__image"]} src="/images/coupe-clink.jpeg" />
        </div>
      </div>
    </div>
  );
}
