import {Fragment} from "react";
import styles from "./book-actions.module.css";

interface BookActionsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function BookActions({isFavorite, onToggleFavorite}: BookActionsProps) {
  return (
    <div className={styles["book-actions"]}>
      <fieldset className={styles["star-rating"]}>
        <legend>Rate this book</legend>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Fragment key={rating}>
            <input
              id={`rating-${rating}`}
              name="rating"
              type="radio"
              value={rating}
              aria-label={`${rating} stars`}
            />
            <label htmlFor={`rating-${rating}`} title={`${rating} stars`}>
              ★
            </label>
          </Fragment>
        ))}
      </fieldset>
      <button
        className={`${styles["favorite-button"]} ${
          isFavorite ? styles["is-favorite"] : ""
        }`}
        type="button"
        aria-pressed={isFavorite}
        onClick={onToggleFavorite}
      >
        <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
        {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}
