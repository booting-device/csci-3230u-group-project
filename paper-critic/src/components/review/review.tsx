import type { ReactNode } from "react";
import styles from "./review.module.css";

export default function Review({
  name,
  rating,
  children,
}: {
  name: string;
  rating: number;
  children: ReactNode;
}) {
  return (
    <article className={styles.review}>
      <div className={styles.avatar} aria-hidden="true">
        {name.charAt(0)}
      </div>
      <div className={styles["review-content"]}>
        <div className={styles["review-heading"]}>
          <b>{name}</b>
          <div className={styles["review-rating"]} aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
              <span
                className={index < rating ? styles["star-activated"] : ""}
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
