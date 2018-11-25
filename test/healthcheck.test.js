const assert = require("assert");
const R = require("ramda");
const server = require("../server");

const parseResponse = R.pipe(
  R.prop("payload"),
  JSON.parse
);

describe("healthcheck", () => {
  let response;

  beforeEach(async () => {
    const request = {
      method: "GET",
      url: "/healthcheck",
    };
    response = await server.inject(request).then(parseResponse);
  });

  it("should return a good result", () => {
    assert.ok(response);
  });

  it("should return the name of the module", () => {
    assert.equal(response.name, "acl-aws-workshop");
  });

  it("should return the version of the module", () => {
    assert.equal(response.version, "1.0.0");
  });

  it("should return a status of OK", () => {
    assert.equal(response.status, "OK");
  });
});
