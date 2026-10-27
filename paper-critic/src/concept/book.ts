
export class Book {
  constructor(
    public isbn: string,
    public title: string,
    public author: string,
    public cover: string,
    public description: string,
    public genres: string[],
    public publicationYear: number,
  ) {}

  static fromJSON(value: any): Book {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("Book data must be a JSON object.");
    }

    const data = value as Record<string, unknown>;
    if (
      typeof data.isbn !== "string" ||
      typeof data.title !== "string" ||
      typeof data.author !== "string" ||
      typeof data.cover !== "string" ||
      typeof data.description !== "string" ||
      !Array.isArray(data.genres) ||
      !data.genres.every((genre): genre is string => typeof genre === "string") ||
      typeof data.publicationYear !== "number" ||
      !Number.isInteger(data.publicationYear)
    ) {
      throw new TypeError("Book data has invalid or missing properties.");
    }

    return new Book(
      data.isbn,
      data.title,
      data.author,
      data.cover,
      data.description,
      data.genres,
      data.publicationYear,
    );
  }
}
