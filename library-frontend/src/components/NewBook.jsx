import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ADD_BOOKS, ALL_BOOKS } from "../queries";

const NewBook = (props) => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOKS, {
    refetchQueries: [{ query: ALL_BOOKS }],
  });
  if (!props.show) {
    return null;
  }
  const submit = async (event) => {
    event.preventDefault();
    addBook({
      variables: {
        title: bookTitle,
        author: bookAuthor,
        published: Number(published), // convert to number
        genres,
      },
    });
    setBookTitle("");
    setBookAuthor("");
    setPublished("");
    setGenres([]);
    setGenre("");
    console.log({
      title: bookTitle,
      author: bookAuthor,
      published: Number(published),
      genres,
    });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };
  return (
    <div>
      <h2>Add a new book</h2>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={bookTitle}
            onChange={({ target }) => setBookTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={bookAuthor}
            onChange={({ target }) => setBookAuthor(target.value)}
          />
        </div>{" "}
        <div>
          Published
          <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};
export default NewBook;
