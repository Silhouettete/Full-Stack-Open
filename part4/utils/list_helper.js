const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};
const faouriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const blog = blogs.reduce((favourite, current) => {
    favourite.likes > current.likes ? favourite : current;
  });
  return { title: blog.title, author: blog.author, likes: blog.likes };
};
const mostBlogs = (blogs) => {
  if (blogs.length == 0) return null;
  const authorCount = lodash.countBy(blogs, blog.author);
  const authorWithMostBlogs = findAuthorWithMostBlogs(authorCount);
  return {
    autor: authorWithMostBlogs,
    blogs: authorCount[authorWithMostBlogs],
  };
};
const findAuthorWithMostBlogs = (authorCount) => {
  return Object.keys(authorCount).reduce((x, y) =>
    authorCount[x] > authorCount[y] ? x : y
  );
};
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const authorsWithBlogs = lodash.countBy(blogs, blog.likes);
  const authorsWithTotalLikes = countTotalLikes(authorsWithBlogs);
  return authorsWithTotalLikes.reduce((mostLikes, current) => {
    mostLikes.likes > current ? mostLikes : current;
  });
};
const countTotalLikes = (authorsWithBlogs) => {
  return Object.entries(authorsWithBlogs).map(([author, blogs]) => {
    const totalLikes = blogs.reduce((total, blog) => total + blog.likes, 0);
    return { author: author, likes: totalLikes };
  });
};
module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  faouriteBlog,
  mostLikes,
};
