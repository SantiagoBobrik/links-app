const { app, httpServer } = require("../../index");
const mongoose = require("mongoose");
const supertest = require("supertest");
const api = supertest(app);
const linkMock = require("../mocks/mockLink");
const { userPremium, noPremiumUser } = require("../mocks/usersMock");
const login = async (user) => {
  const res = await api.post("/auth/login").send(user);

  return res.body.token;
};

describe("Premium validation", () => {
  test("no premium account return status code 400", async () => {
    const token = await login(noPremiumUser);
    const { res } = await api
      .post("/links")
      .send(linkMock[0])
      .set("Authorization", "Bearer " + token)
      .expect(400);
  });

  test(" premium account return status code 200", async () => {
    const token = await login(userPremium);
    const { res } = await api
      .post("/links")
      .send(linkMock[0])
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });
});
afterAll(async () => {
  mongoose.connection.close();
  httpServer.close();
});
