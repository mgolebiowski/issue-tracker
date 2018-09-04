const index = (req, res) => {
  return res.sendFile(__dirname + "/views/index.html");
};


module.exports = {
  index
};