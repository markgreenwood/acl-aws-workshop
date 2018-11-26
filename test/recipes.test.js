const assert = require("assert");
const { expect } = require("chai");
const R = require("ramda");

const server = require("../server");

const parseResponse = R.pipe(
  R.prop("payload"),
  JSON.parse
);

describe("The recipes API route", () => {
  let response;

  beforeEach(async () => {
    const request = {
      method: "GET",
      url: "/api/recipes",
    };

    response = await server.inject(request).then(parseResponse);
  });

  it("should return a list of recipes", () => assert(Array.isArray(response.recipes)));

  it("should return three items", () => {
    assert.equal(R.length(response.recipes), 3);
  });

  it("should return three specific items", () => {
    expect(response.recipes).to.have.members(["Chili", "Banh Mi", "Penne Puttanesca"]);
  });
});
