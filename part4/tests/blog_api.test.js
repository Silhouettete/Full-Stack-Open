const assert = require("node:assert");
const { test, after, describe, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../model/blog");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
});

describe("Getting the Blogs", () => {
  test.only("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  test("A specific is within the returned notes", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((e) => e.title);
    assert.strictEqual(titles.includes("First class tests"));
  });

  test.only("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test.only("blog with unique id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });
});

describe("Creating a new blog", () => {
  test("Should add a blog with correct content", async () => {
    const blogAtStart = await helper.blogsInDb();
    const response = await api.post("/api/blogs").send(helper.newBlog);
    const newBlog = response.body;
    const blogAtEnd = await helper.blogsInDb();
    expect(newBlog.title).toEqual(helper.newBlog.title);
    expect(newBlog.author).toEqual(helper.newBlog.author);
    expect(newBlog.url).toEqual(helper.newBlog.url);
    assert.strictEqual(blogAtEnd.length, blogAtStart.length + 1);
  });
  test("blog with missing likes property", async () => {
    const blogAtStart = await helper.blogsInDb();
    const response = await api.post("/api/blogs").send(helper.newBlog);
    const newBlog = response.body;
    const blogsAtEnd = await helper.blogsInDb();
    expect(newBlog.likes).toBe(0);
    assert.strictEqual(blogsAtEnd, blogAtStart.length + 1);
  });
  test("Adding blogs with missing url cannot be done", async () => {
    const blogAtStart = await helper.blogsInDb();
    await api.post("/api/blogs").send(helper.blogWithoutUrl).expect(400);
    const blogAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogAtEnd, blogAtStart.length);
  });
});

describe("Update the blogs", () => {
  test("update the details of an existing blog", async () => {
    const blogsAtstart = await helper.blogsInDb();
    const blogToBeUpdated = { ...blogsAtstart[0] };
    blogToBeUpdated.likes++;
    await api
      .put(`/api/blogs/${blogToBeUpdated.id}`)
      .send(blogToBeUpdated)
      .expect(200);
    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd, blogsAtstart);
    const updatedBlog = blogsAtEnd.find(
      (blog) => blog.id === blogToBeUpdated.id
    );
    expect(updatedBlog).toEqual(blogToBeUpdated);
  });
});

after(async () => {
  await mongoose.connection.close();
});
