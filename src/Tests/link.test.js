const { app, httpServer } = require("../../index");
const mongoose = require("mongoose");
const supertest = require("supertest");
const api = supertest(app);

const Link = require("../models/Link");
const mockLinks = require("../mocks/mockLink");

const { userPremium } = require("../mocks/usersMock");
let token;

const findOneLink = async () => {
  const links = await Link.find({});
  return links[0];
};
//Genero autenticacion
beforeAll((done) => {
  api
    .post("/auth/login")
    .send(userPremium)
    .end((err, res) => {
      if (err) done(err);
      token = res.body.token;
      done();
    });
});

//Elimino y creo los links
beforeEach(async () => {
  mockLinks.forEach(async (elem) => {
    const link = new Link(elem);
    await link.save();
  });

  await Link.deleteMany({});
});

describe("Getters links", () => {
  test("links are returned json", async () => {
    const link = await findOneLink();

    const { body } = await api
      .get(`/links/${link._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(body).toHaveProperty("_id");
  });
});

describe("create links", () => {
  test("create one link", async () => {
    const link = mockLinks[0];
    await api
      .post(`/links`)
      .send(link)
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });

  test("link with invalid body cannot be created", async () => {
    await api
      .post(`/links`)
      .send({})
      .set("Authorization", "Bearer " + token)
      .expect(400);
  });
});

describe("Delete links", () => {
  test("delete one link", async () => {
    const linkToDelete = await findOneLink();

    await api
      .delete(`/links/${linkToDelete._id}`)
      .set("Authorization", "Bearer " + token)
      .expect(204);

    const deletedLink = await Link.findOne({ _id: linkToDelete._id });

    expect(deletedLink).toBeNull();
  });

  test("link with valid id but no exist", async () => {
    await api
      .delete(`/links/6163b55f65de7b3f5d770f74`)
      .set("Authorization", "Bearer " + token)
      .expect(400);
  });

  test("link with a invalid id cannot be create", async () => {
    await api
      .delete(`/links/pepito`)
      .set("Authorization", "Bearer " + token)
      .expect(400);
  });
});

afterAll(async () => {
  mongoose.connection.close();
  httpServer.close();
});
