import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
import App from "../server.js";

let data;
let id;
const uri = process.env.ATLAS_URI;

describe("Sandwich API endpoint tests: category", function () {
  //connect to the database
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

  it("add a category", function (done) {
    data = {
      name: "İçecekler",
    };

    const res = request(App).post("/categories/add").send(data);
    
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Category added!");
      done();
    });
  });

  it("gets all categories", function (done) {
    const res = request(App).get("/categories");

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body.length).to.equal(14);
      expect(res.body[0].name).to.equal("Beef");
      done();
    });
  });

  it("updates a category", function (done) {
    data = {
      name: "Sıcak İçecekler",
    };

    const res = request(App).post(`/categories/update/${id}`).send(data);
    
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Category updated!");
      done();
    });
  });

  it("deletes a category", function (done) {
    const res = request(App).delete(`/categories/delete/${id}`);
    
    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Category deleted.");
      done();
    });
  });
  
  //After all tests are finished drop database and close connection
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});
