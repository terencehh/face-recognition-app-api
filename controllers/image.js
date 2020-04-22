const clarifai = require("clarifai");

// API Key for Clarifai. You will need to sign up with Clarifai and retrieve an API Key to use to place here.
const app = new clarifai.App({
  apiKey: process.env.API_CLARIFAI
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.url)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to Work with API."));
};

const handleImagePut = db => (req, res) => {
  const { id } = req.body;

  db("user")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to get entries"));
};

module.exports = {
  handleImagePut,
  handleApiCall
};
