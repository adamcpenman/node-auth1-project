module.exports = (req, res, next) => {
  return (req, res, next) => {
  if (req.session && req.session.user) {
      next();
  } else {
    res.status(401).json({ message: "you can't sit with us"})
  }
  }
}
