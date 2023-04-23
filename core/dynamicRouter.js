const createHandler = require("./handlers/handler");

function auth(req, res, next) {
  if (secure) {
    const isAuthenticated = true;
    console.log("log:::")
    if (isAuthenticated) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    next();
  }
}

const dynamicRouter = (app, endPoints) => {
  endPoints.forEach((endpoint) => {
    const { method, path, handler, requireAuth } = endpoint;
    const _handler = createHandler(handler);
    const useAuth = requireAuth ? auth : (req, res, next) => {
      next();
    };
    switch (method) {
      case "GET":
        app.get(path, useAuth, (req, res) => {
          _handler(req, res);
        });
        break;
      case "POST":
        app.post(path, useAuth, (req, res) => {
          _handler(req, res);
        });
        break;
      case "DELETE":
        app.delete(path, useAuth, (req, res) => {
          _handler(req, res);
        });
        break;
      case "UPDATE":
        app.put(path, useAuth, (req, res) => {
          _handler(req, res);
        });
        break;
      default:
        app.get(path, useAuth, (req, res) => {
          _handler(req, res);
        });
    }
  });
};

module.exports = dynamicRouter;
