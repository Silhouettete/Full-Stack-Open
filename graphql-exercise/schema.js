const typeDefs = /* GraphQL */ `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooksByAuthors(author: String, genre: String): [Book!]!
    allBooks: [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      id: String
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;
module.exports = typeDefs;
