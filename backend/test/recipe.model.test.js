import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
import App from "../server.js";

let data;
let id;
const uri = process.env.ATLAS_URI;

describe("Sandwich API endpoint tests: recipe", function () {
  // open database
 /* before(function (done) {
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

  it("add a recipe", function (done) {
    data = {
    img: "https://i.ibb.co/9vbDqnr/2774889-810x458.jpg",   
	  name: "Poğaça",
	  directions: "Hamur yap, pişir",
	  ingredients: [{ name: "Un" }, { name: "Su" }, { name: "Kabartma Tozu" }],
	  category: { name: "Hamur işi" }
    };

    const res = request(App).post("/recipes/add").send(data);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Recipe added!");
      done();
    });
  });

  it("get all recipes", function (done) {
    const res = request(App).get("/recipes");

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      id = res.body[0]._id;
      expect(res.body.length).to.equal(1);
      expect(res.body[0].name).to.equal("Poğaça");
      done();
    });
  });

  it("update a recipe", function (done) {
    data = {
    img: "https://i.ibb.co/9vbDqnr/2774889-810x458.jpg",  
	  name: "Poğaça",
	  directions: "Hamur yap, fırında pişir",
	  ingredients: [{ name: "Un" }, { name: "Su" }, { name: "Kabartma Tozu" }],
	  category: { name: "Hamur işi" }
    };

    const res = request(App).post(`/recipes/update/${id}`).send(data);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Recipe updated!");
      done();
    });
  });

  it("delete a recipe", function (done) {
    const res = request(App).delete(`/recipes/delete/${id}`);

    res.expect(200).end(function (err, res) {
      if (err) {
        return done(err);
      }
      expect(res.body).to.equal("Recipe deleted.");
      done();
    });
  });

  // after all tests are finished drop database and close connection
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });*/
});
