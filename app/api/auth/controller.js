const { User } = require("../../db/models");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const chekUser = await User.findOne({ where: { email: email } });
      if (chekUser) {
        const checkPassword = bycript.compareSync(password, chekUser.password);
        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: chekUser.id,
                email: chekUser.email,
                name: chekUser.name,
              },
            },
            "secret"
          );
          res.status(200).json({
            message: "Signin Success",
            data: token,
          });
        } else {
          res.status(403).json({ message: "Password is incorrect" });
        }
      } else {
        res.status(403).json({ message: "Invalid email" });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { email, password, confirmPassword, name } = req.body;
      if (password !== confirmPassword) {
        res.status(403).json({ message: "Password is not match" });
      }
      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail) {
        res.status(403).json({ message: "Email is already registered" });
      } else {
        const hashPassword = bycript.hashSync(password, 10);
        const createUser = await User.create({
          email: email,
          password: hashPassword,
          name: name,
          role: "admin",
        });
        delete createUser.dataValues.password;
        res.status(200).json({
          message: "Signup Success",
          data: createUser,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
};
