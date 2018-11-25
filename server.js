const Hapi = require("hapi");
const Path = require("path");
const Good = require("good");
const Inert = require("inert");

const pkg = require("./package.json");

const theServer = new Hapi.Server({
  port: 9000,
  routes: {
    files: {
      relativeTo: Path.join(__dirname, "public"),
    },
  },
});

const registerPlugins = async server => {
  server.register([
    {
      plugin: Good,
      options: {
        ops: { interval: 1000 },
        reporters: {
          myConsoleReporter: [
            {
              module: "good-squeeze",
              name: "Squeeze",
              args: [{ log: "*", response: "*", request: "*" }],
            },
            {
              module: "good-console",
            },
            "stdout",
          ],
        },
      },
    },
    Inert,
  ]);
  return server;
};

const setupRoutes = server => {
  server.route([
    {
      method: "GET",
      path: "/{path*}",
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true,
          index: true,
        },
      },
    },
    {
      method: "GET",
      path: "/",
      handler: () => "Hello, World!",
    },
    {
      method: "GET",
      path: "/healthcheck",
      handler: () => {
        const { name, version } = pkg;
        const response = {
          name,
          version,
          status: "OK",
        };
        return response;
      },
    },
    {
      method: "GET",
      path: "/api/recipes",
      handler: () => ({ recipes: [] }),
    },
  ]);
};

(async () => {
  try {
    await registerPlugins(theServer).then(setupRoutes);

    if (!module.parent) {
      theServer.start();
      console.log(`Server started on ${theServer.info.host}:${theServer.info.port}`);
    }

    return theServer;
  } catch (err) {
    console.log(err);
    return process.exit(1);
  }
})();

module.exports = theServer;
