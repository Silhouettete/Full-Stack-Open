const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const emptyBlogs = [];
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];
const listWithMoreBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

test("total likes", () => {
  test("When list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
});

describe("favourite blog", () => {
  test("of empty list is null", () => {
    const result = listHelper.faouriteBlog(emptyBlogs);
    assert.strictEqual(result, null);
  });
  test("of a list with only one blog equals that blog", () => {
    const result = listHelper.faouriteBlog(listWithOneBlog);
    assert.strictEqual(result, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
  test("of a bigger list is correct", () => {
    const result = listHelper.faouriteBlog(listWithMoreBlogs);
    assert.strictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
describe("most blogs", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostBlogs(emptyBlogs);
    assert.strictEqual(result, null);
  });
  test("of a list with only one blog equals author of that blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlogs);
    assert.strictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });
  test("of a bigger list is correct", () => {
    const result = listHelper.mostBlogs(listWithMoreBlogs);
    assert.strictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
describe("most likes", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostLikes(emptyBlogs);
    assert.strictEqual(result, null);
  });
  test("of a list with only one blog equals author of that blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.strictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
  test("of a bigger list is correct", () => {
    const result = listHelper.mostLikes(listWithMoreBlogs);
    assert.strictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
