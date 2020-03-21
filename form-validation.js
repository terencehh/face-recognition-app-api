// Industry practices states that instant validation is king for complicated form requests. However since this app is very basic and does not require much validation, we return validation only upon button submit instead.

const checkSignIn = (email, password) => {
  if (!email || !password) {
    return "Please fill in all fields and try again.";
  }

  return "Success";
};

const checkRegister = (fname, lname, email, password, confirmPass) => {
  if (!fname || !lname || !email || !password || !confirmPass) {
    return "Please fill in all fields and try again.";
  }

  if (password !== confirmPass) {
    return "Please make sure your two passwords match.";
  }

  const passCheck = validPassword(password);
  if (passCheck !== "Success") {
    return passCheck;
  }

  const emailCheck = validEmail(email);
  if (emailCheck !== "Success") {
    return emailCheck;
  }

  return "Success";
};

const validEmail = email => {
  // regex taken from https://www.w3resource.com/javascript/form/email-validation.php
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return "Success";
  }
  return "Please enter a valid email address.";
};

// EXTREMELY BASIC - SUBJECT TO IMPROVEMENTS IN FUTURE
const validPassword = password => {
  if (password.length < 6) {
    return "Please enter a valid password - Password must contain at least six characters.";
  }
  return "Success";
};

// for checking names upon register - DEVELOP IN FUTURE
const validName = name => { };

module.exports = {
  checkSignIn,
  checkRegister
};
