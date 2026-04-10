const validator = require("validator");

function validateUserData(req) {
  const { firstname, email, password } = req.body;

  if (!firstname) {
    throw new Error("First name is required.");
  }

  if (firstname.length < 3) {
    throw new Error("First name must be at least 3 characters long.");
  }

  if (!email) {
    throw new Error("Email is required.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be strong (min 8 chars, with uppercase, lowercase, number, and symbol)."
    );
  }
}

module.exports = validateUserData;