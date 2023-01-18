exports.code = (req, res) => {
  console.log(req.body);
  res.status(201).json(req.body);
};
