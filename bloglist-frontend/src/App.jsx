import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("an error occured");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedinUser");
    if (loggedUserJSON) {
      const user = JSON.parse(LoggedinUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("LoggedinUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername(username);
      setPassword(password);
    } catch {
      setErrorMessage("An Error occured");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(target) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(target) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
  const addNewBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <div>
      {!user ? (
        <>
          <h2>Log in to application</h2>
          <LoginForm handleLogin={handleLogin} />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button onClick={logOutUser}>Logout</button>
          </p>

          <br />
        </>
      )}
    </div>
  );
};

export default App;
