const { app, httpServer } = require("../../index");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { generateToken } = require("../controllers/authController");
const api = supertest(app);
//Genero autenticacion
const { userPremium, badUser } = require("../mocks/usersMock");

describe("http codes", () => {
  test("login with bad credentials has to  return 400", async () => {
    await api.post("/auth/login").send(badUser).expect(400);
  });

  test("login with good credentials has to  return 200", async () => {
    await api.post("/auth/login").send(userPremium).expect(200);
  });
});

describe("data return ", () => {
  test("success login returns user ", async () => {
    const { body } = await api
      .post("/auth/login")
      .send(userPremium)
      .expect(200);

    expect(body).toHaveProperty("user");
  });

  test("success login returns token ", async () => {
    const { body } = await api
      .post("/auth/login")
      .send(userPremium)
      .expect(200);

    expect(body).toHaveProperty("token");
  });

  test("error in login returns json with msg", async () => {
    const { body } = await api.post("/auth/login").send(badUser).expect(400);

    expect(body).toHaveProperty("msg");
  });
});

describe("jwt test", () => {
  test("generate toke has to return valid token", async () => {
    const payload = { _id: "6163b55f65de7b3f5d770f74" };
    const token = await generateToken(payload);
    expect(token).not.toBeFalsy();
  });
});

afterAll(async () => {
  mongoose.connection.close();
  httpServer.close();
});
