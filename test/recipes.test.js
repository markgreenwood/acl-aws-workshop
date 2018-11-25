const assert = require("assert");
// const R = require("ramda");

const server = require("../server");

describe("The recipes API route", () => {
  let response;

  beforeEach(async () => {
    const request = {
      method: "GET",
      url: "/api/recipes",
    };

    response = await server.inject(request);
  });

  it("should return a list of recipes", () => {
    console.log(response.payload);
    return assert(Array.isArray(JSON.parse(response.payload).recipes));
  });
});
