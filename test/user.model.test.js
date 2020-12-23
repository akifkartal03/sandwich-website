import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
import App from "../server.js";
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
let data;
let id;
const uri = process.env.ATLAS_URI;

describe("Sandwich API endpoint tests: user", function () {
  it("It should GET all users", (done) => {
    chai
      .request(App)
      .get("/users")
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        response.body.length.should.be.eq(2);
        done();
      });
  });
  it("It should NOT GET all users", (done) => {
    chai
      .request(App)
      .get("/user")
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
  it("It should GET a user by ID", (done) => {
    const userID = "5fe38c9c7940f700c0e06809";
    chai
      .request(App)
      .get("/users/" + userID)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id");
        response.body.should.have.property("username");
        response.body.should.have.property("name").eq("Mehdi");
        done();
      });
  });
  it("It should NOT GET a user by ID", (done) => {
    const userID = "false";
    chai
      .request(App)
      .get("/users/" + userID)
      .end((err, response) => {
        response.should.have.status(400);
        done();
      });
  });
  it("It should GET a user by username", (done) => {
    const username = "eagle";
    chai
      .request(App)
      .get("/users/get/" + username)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        response.body.should.have.property("_id");
        response.body.should.have.property("username");
        response.body.should.have.property("name").eq("Akif");
        done();
      });
  });
  it("It should DELETE an existing user", (done) => {
    const userID = "5fe394616c64ee23ec3a53be";
    chai
      .request(App)
      .delete("/users/delete/" + userID)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
  it("It should POST a new user", (done) => {
    const data = {
      name: "Akif",
      surname: "Kartal",
      username: "eagle",
      password: "123",
      favoriteRecipes: [],
    };
    const res = request(App).post("/users/add").send(data);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }

      expect(res.body).to.equal("User added!");
      done();
    });
  });
  it("It should update a user", function (done) {
    id = "5fe38c9c7940f700c0e06809";
    data = {
      name: "Mehdi",
      surname: "Kurt",
      username: "sanane",
      password: "deneme",
      favoriteRecipes: [],
    };
    const res = request(App).post(`/users/update/${id}`).send(data);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("User updated!");
      done();
    });
  });
  it("It should update a user 2", function (done) {
    id = "5fe38c9c7940f700c0e06809";
    data = {
      name: "Mehdi",
      surname: "Kurtcebe",
      username: "kurt",
      password: "123",
      favoriteRecipes: [],
    };
    const res = request(App).post(`/users/update/${id}`).send(data);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("User updated!");
      done();
    });
  });
});
