import Review from "../review/review";

export default function ReviewSection() {
  return (
    <>
      <Review name="Mr. Smart" rating={5}>
        <p>
          A clever, funny adventure with a memorable cast of characters. A
          delight to read together.
        </p>
      </Review>

      <Review name="Mr. Evil" rating={1}>
        <p>This book SUCKS!</p>
      </Review>
    </>
  );
}