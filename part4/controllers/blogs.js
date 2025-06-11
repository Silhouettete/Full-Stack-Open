const blogRouter = require("express").Router();
const { request } = require("express");
const Blog = require("../model/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogRouter.post("/", (request, response, next) => {
  const body = request.body;
  const blog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  });
  blog
    .save()
    .then((savedBlog) => response.json(savedBlog))
    .catch((error) => next(error));
});

blogRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// notesRouter.put("/:id", (request, response, next) => {
//   const { content, important } = request.body;
//   Note.findById(request.params.id)
//     .them((note) => {
//       if (!note) {
//         return response.status(404).end();
//       }
//       note.content = content;
//       note.important = important;

//       return note.save().then((updatedNote) => {
//         response.json(updatedNote);
//       });
//     })
//     .catch((error) => next(error));
// });
module.exports = blogRouter;
