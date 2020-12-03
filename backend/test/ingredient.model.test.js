import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
import App from "../server.js";

let data;
let id;
const uri = process.env.ATLAS_URI;

describe("Sandwich API endpoint tests: ingredient", function () {
  // open database
  before(function (done) {
    mongoose.connect(
      uri,
      { useNewUrlParser: true, useFindAndModify: false },
      function () {
        mongoose.connection.db.dropDatabase(function () {
          done();
        });
      }
    );
  });

  it("add a ingredient", function (done) {
    data = {
      name: "Pirinç",
    };

    const res = request(App).post("/ingredients/add").send(data);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Ingredient added!");
      done();
    });
  });

  it("get all ingredients", function (done) {
    const res = request(App).get("/ingredients");

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      id = res.body[0]._id;
      expect(res.body.length).to.equal(1);
      expect(res.body[0].name).to.equal("Pirinç");
      done();
    });
  });

  it("update a ingredient", function (done) {
    data = {
      name: "Bulgur",
    };

    const res = request(App).post(`/ingredients/update/${id}`).send(data);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Ingredient updated!");
      done();
    });
  });

  it("delete a ingredient", function (done) {
    const res = request(App).delete(`/ingredients/delete/${id}`);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Ingredient deleted.");
      done();
    });
  });

  // after all tests are finished drop database and close connection
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});
