const clarifai = require("clarifai");

const app = new clarifai.App({
  apiKey: '1b96f91b76b04ff78a06bdbaf445e78f' //process.env.API_CLARIFAI
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
