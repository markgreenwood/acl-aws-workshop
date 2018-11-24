const Hapi = require("hapi");
const Good = require("good");

const pkg = require("./package.json");

const server = new Hapi.Server({ port: 9000 });

(async () => {
  try {
    await server.register([
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
    ]);

    server.route([
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
          return {
            name,
            version,
            status: "OK",
          };
        },
      },
    ]);

    await server.start();
    console.log(`Server started on ${server.info.host}:${server.info.port}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
