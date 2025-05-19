const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log("Connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name is too short"],
    required: [true, "Name is required"],
  },
  number: {
    type: String,
    minlength: [8, "Number is not valid"],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
    },
    message: (props) => `${props.value} is not a valid phone number!`,
    required: [true, "Number is required"],
  },
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
