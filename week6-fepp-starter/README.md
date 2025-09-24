## Login discussion

The purpose of userSchema.statics.login in userModel.js is to encapsulate the communication with the database and the login logic into the model method. This keeps controllers slim and makes the logic reusable if multiple controllers need it.

Inside a static method: we use this.findOne because this refers to the model itself. Inside a controller: we use User.findOne because we’ve imported the model directly. Both do the same thing; the difference depends on context.

Bcrypt is imported into the userController.js, because in this code the controller handles all the logic and the models only send table information.

```js
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // login logic start
    if (!email || !password) {
      throw Error('All fields must be filled');
    }

    const user = await User.findOne({ email });   // Mongo sends information
    if (!user) {
      throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error('Incorrect password');
    }
    // login logic end

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```
---

## Signup discussion

The purpose of userSchema.statics.signup in userModel.js is to encapsulate the communication with the database and the signup logic into the model method. This keeps controllers slim and makes the logic reusable if multiple controllers need it.

Inside a static method: we use this.create because this refers to the model itself. Inside a controller: we use User.create because we’ve imported the model directly. Both do the same thing; the difference depends on context.

Validator is imported into the userController.js, because in this code the controller handles all the logic and the models only receive table information.
```js
const validator = require('validator');

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // singup logic start
    // Validation
    if (!email || !password) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Password not strong enough');
    }

    const exists = await User.findOne({ email });   // Mongo sends information

    if (exists) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });   // Mongo recieves information
    // singup logic end

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

## Project implementation

In our project we will encapsulate the database communication into models' methods.