const { v4: uuid } = require("uuid");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Author = require("./models/Author");
const Book = require("./models/book");
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];
let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocument(),
    authorCount: () => Author.collection.countDocument(),
    allBooks: () => Book.find({}),

    allBooksByAuthors: async (root, args) => {
      if (!args.author) {
        return Book.find({}).populate("author");
      }
      const author = await Author.findOne({ name: args.author });
      if (!author) return [];
      return Book.find({ author: author._id }).populate(author);
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root._id,
    bookCount: (root) => {
      root.bookCount;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      if (!args.title || args.title.length < 5) {
        throw new GraphQLError("Book title is too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
      if (!args.name || args.name.length < 4) {
        throw new GraphQLError("Author name is too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      const author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
      }
      author.bookCount += 1;
      const newBook = new Book({ ...args, author: author._id });
      await newBook.save();
      await author.save();
      return newBook;
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
          },
        });
      }
      if (args.setBornTo < 0) {
        throw new GraphQLError("Birthday could not be negative", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      await author.save();
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username });
      return await user.save().catch((error) => {
        throw new GraphQLError(`Creating the user failed : ${error.message}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};
module.exports = resolvers;
