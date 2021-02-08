import { createMocks } from "node-mocks-http";

import createUser from "../create_user";

describe("Create user endpoint", () => {
  it("should respond with upper case body when POSTING", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        firstName: "Will",
        lastName: "Maradiaga",
      },
    });
    await createUser(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData().message).toEqual("WILL MARADIAGA");
  });

  it("should respond when method is not implemented", async () => {
    const { req, res } = createMocks({
      method: "PUT",
      body: {
        firstName: "Will",
        lastName: "Maradiaga",
      },
    });
    await createUser(req, res);

    expect(res._getStatusCode()).toBe(401);
  });
});
