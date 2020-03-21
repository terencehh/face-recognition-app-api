const handleProfileGet = db => (req, res) => {
  const { id } = req.params;

  db.select("*")
    .from("user")
    .where({ id })
    .then(user => {
      user.length
        ? res.json(user[0])
        : res.status(400).json("Error Getting User");
    });
};

module.exports = {
  handleProfileGet
};
