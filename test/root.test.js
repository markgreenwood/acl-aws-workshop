const assert = require("assert");
const R = require("ramda");
const server = require("../server");

describe("GET /", () => {
  let response;

  beforeEach(async () => {
    const request = {
      method: "GET",
      url: "/",
    };
    response = await server.inject(request).then(R.prop("payload"));
  });

  it("should return 'Hello, World!'", () => {
    assert.equal(response, "Hello, World!");
  });
});
