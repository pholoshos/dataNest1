const createHandler = require("./handlers/handler");

function auth(req, res, next) {
  const isAuthenticated = true;
  console.log("log:::")
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

const dynamicRouter = (app, endPoints) => {
  endPoints.forEach((endpoint) => {
    const { method, path, handler } = endpoint;
    const _handler = createHandler(handler);

    switch (method) {
      case "GET":
        app.get(path,auth, (req, res) => {
          _handler(req, res);
        });
        break;
      case "POST":
        app.post(path, auth,(req, res) => {
          _handler(req, res);
        });
        break;
      case "DELETE":
        app.delete(path, auth,(req, res) => {
          _handler(req, res);
        });
        break;
      case "UPDATE":
        app.put(path, (req,res) => {
          _handler(req, res);
        });
        break;
      default:
        app.get(path, auth,(req, res) => {
          _handler(req, res);
        });
    }
  });
};

module.exports = dynamicRouter;
