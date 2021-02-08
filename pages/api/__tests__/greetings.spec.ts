import { createMocks } from "node-mocks-http";

import greetings from "../greetings";

describe("Hello [name] function", () => {
  it("should respond with query sent", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: { first_name: "WILL" },
    });
    await greetings(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().message).toEqual("Hello WILL!");
  });

  it("should respond if no name is sent", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });
    await greetings(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().message).toEqual("Hello Eren!");
  });
});
