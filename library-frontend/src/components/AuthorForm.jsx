import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const authors = useQuery(ALL_AUTHORS);
  if (authors.loading) {
    return <div>loading...</div>;
  }
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onCompleted: (data) => {
      if (!data.editAuthor) {
        setError("Author not found");
      }
    },
  });
  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo: Number(born) } });
    setName("");
    setBorn("");
  };
  return (
    <div>
      <h2>Change Birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.data.allAuthors.map((a) => (
              <option key={a.id} value={a.name}>
                {" "}
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">change birth year</button>
      </form>
    </div>
  );
};
export default AuthorForm;
