const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
console.log(process.env.SECRET);

loginRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username });

    const passwordCorrect =
      user && (await bcrypt.compare(password, user.passwordHash));

    if (!passwordCorrect) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
    response.status(200).send({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "internal server error" });
  }
});

module.exports = loginRouter;
