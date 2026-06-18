const signup = async (req, res) => {
  res.json({ message: "Signup endpoint" });
};
const login = async (req, res) => {
  res.json({ message: "Login endpoint" });
};
module.exports = {
  signup,
  login,
};