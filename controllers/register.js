const validate = require("../form-validation");

const handleRegister = (db, bcrypt) => (req, res) => {
  const { firstName, lastName, email, password, confirmPass } = req.body;

  // VALIDATION CHECK FOR VALID EMAIL, NAME & PASSWORD
  validateResult = validate.checkRegister(
    firstName,
    lastName,
    email,
    password,
    confirmPass
  );

  if (validateResult !== "Success") {
    return res.status(400).json("Please make sure all fields are keyed in correctly.");
  }

  // hash the password for security
  const hash = bcrypt.hashSync(password);

  // transaction of inserting record to both login & email tables
  db.transaction(trx => {
    trx
      .insert({
        hash,
        email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("user")
          .returning("*")
          .insert({
            email: loginEmail[0],
            firstname: firstName,
            lastname: lastName,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err =>
    res
      .status(400)
      .json(
        "Unable to Register. Email already exists. Please try using a different email."
      )
  );
};

module.exports = {
  handleRegister
};
