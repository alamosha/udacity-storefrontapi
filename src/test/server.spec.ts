import supertest from "supertest";
import app from "../server";

const req = supertest(app);

describe("Testing API endpoints", () => {
  it("Get / Endpoint", async () => {
    const response = await req.get("/");
    expect(response.statusCode).toBe(200)
  });
});
