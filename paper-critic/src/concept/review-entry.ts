
export class ReviewEntry {
  constructor(
    public rating: number,
    public author: string,
    public content: string,
  ) {}

  static fromJSON(value: unknown): ReviewEntry {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("Review data must be a JSON object.");
    }

    const data = value as Record<string, unknown>;
    if (
      typeof data.rating !== "number" ||
      !Number.isInteger(data.rating) ||
      data.rating < 1 ||
      data.rating > 5 ||
      typeof data.author !== "string" ||
      typeof data.content !== "string"
    ) {
      throw new TypeError("Review data has invalid or missing properties.");
    }

    return new ReviewEntry(data.rating, data.author, data.content);
  }
}
