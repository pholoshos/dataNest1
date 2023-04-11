const createHandler = require("./handlers/handler");

const dynamicRouter = (app, endPoints) => {
  endPoints.forEach((endpoint) => {
    const { method, path, handler } = endpoint;
    const _handler = createHandler(handler);

    switch (method) {
      case "GET":
        app.get(path, (req, res) => {
          _handler(req, res);
        });
        break;
      case "POST":
        app.post(path, (req, res) => {
          _handler(req, res);
        });
        break;
      case "DELETE":
        app.delete(path, (req, res) => {
          _handler(req, res);
        });
        break;
      case "UPDATE":
        app.put(path, (req, res) => {
          _handler(req, res);
        });
        break;
      default:
        app.get(path, (req, res) => {
          _handler(req, res);
        });
    }
  });
};

module.exports = dynamicRouter;
