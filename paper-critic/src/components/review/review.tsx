import type { ReactNode } from "react";
import styles from "./review.module.css";
import type { ReviewEntry } from "../../concept/review-entry";

export default function Review({review, children}: {
  review: ReviewEntry
  children: ReactNode
}) {
  return (
    <article className={styles.review}>
      <div className={styles.avatar} aria-hidden="true">
        {review.author.charAt(0)}
      </div>
      <div className={styles["review-content"]}>
        <div className={styles["review-heading"]}>
          <b>{review.author}</b>
          <div className={styles["review-rating"]} aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span
                className={index < review.rating ? styles["star-activated"] : ""}
                key={index}
                aria-hidden="true"
              >
                ★
              </span>
            ))}
          </div>
        </div>
        {children}
      </div>
    </article>
  );
}
