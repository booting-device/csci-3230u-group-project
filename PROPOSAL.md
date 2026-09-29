# Papercritic - Proposal 

## Topic 
Papercritic is a book discovery platform for readers who want to connect with other readers and organize their books. Users can sort their books in different categories such as "want to read", "currently reading", and "completed". Similar apps are Goodreads and The Storygraph, Goodreads being the largest book tracking platform in the world. Papercritic will be focused on book discovery and personal reading organization, users will be able to search for books with similar tastes, see a synopsys or description, leave reviews and ratings. 


## Data Source 

We are sourcing our data from the Internet Archive's <a href="https://openlibrary.org/developers/api">Open Library</a>. 

Trimmed JSON sample

```json
{
  "author_key": "OL27448W",
  "title": "The Lord of the Rings",
  "author_name": ["J. R. R. Tolkien"],
  "first_publish_year": 1954,
  "cover_i": 258027
}
```



## Comparators 

| Existing app | Similar functionality | How our app will differ |
|---|---|---|
| [Goodreads](https://www.goodreads.com/) | Book discovery, reading lists, recommendations, and community reviews | Papercritic will focus on personal reading organization without requiring an account. Reviews and reading lists will stay in the user’s browser. |
| [The StoryGraph](https://thestorygraph.com/) | Reading tracking, statistics, and recommendations based on reading preferences | Papercritic will have a smaller scope, centred on title/author search, subject filtering, reading statuses, and personal reviews. |


## Scaled feature plan  
| Owner | Feature | End-to-end responsibility |
|---|---|---|
| name | **Book Search and Discovery** | Build the book search, filters, sorting, and results. Get data from the API. Test searching, filtering, and keyboard use. |
| name | **Book Details** | Build a page showing the book’s description, genre, and publication details. Test that the page will still work if there are any missing information. |
| name | **Personal Bookshelves** | Build a page where users can save, remove books, update their reading status, or create their customized bookshelf. |
| name | **Ratings and Reviews** | Build a form where users can add, edit, or delete their ratings and reviews.  |









