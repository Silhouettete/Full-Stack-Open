import { useState } from "react";
const BlogForm = ({ addNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((newBlog) => ({
      ...newBlog,
      [name]: value,
    }));
  };
  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    const success = await addNewBlog(newBlog);
    if (success) setNewBlog({ title: "", author: "", url: "" });
  };
  return (
    <>
      <h2>Create New Blog</h2>
      <form id="form" onSubmit={handleBlogSubmit}>
        <div>
          <label>Title : </label>
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Author : </label>
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleFormChange}
          />
        </div>
        <div>
          <label>Url : </label>
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleFormChange}
          />
        </div>
      </form>
    </>
  );
};
export default BlogForm;
