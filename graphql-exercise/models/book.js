const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genre: [{ type: String }],
});
//title: "Clean Code",
//   published: 2008,
//   author: "Robert Martin",
//   id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//   genres: ["refactoring"],
