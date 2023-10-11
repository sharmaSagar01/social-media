export const validateRegisterInput = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors = {};
  console.log(username, email, password, confirmPassword);

  if (username.trim() === "") {
    errors["username"] = "Username must not be empty";
  }

  if (email.trim() === "") {
    errors["email"] = "Email must not be empty";
  } else {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regEx)) {
      errors["email"] = "Email must be a valid email address";
    }
  }
  console.log(password, confirmPassword);
  if (password === "") {
    errors["password"] = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors["confirmPassword"] = "Password must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (email: string, password: string) => {
  const errors = {};

  if (email.trim() === "") {
    errors["email"] = "Email must not be empty";
  } else {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regEx)) {
      errors["email"] = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors["password"] = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
