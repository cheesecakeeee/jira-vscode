module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jira" && req.body.password === "123") {
      return res.status(200).json({
        user: {
          token: "11111",
        },
      });
    } else {
      res.status(400).json({
        message: "用户名或密码错误",
      });
    }
  }
};
