import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import App from '../server';
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

let data;
let id;
const uri = process.env.ATLAS_URI;

describe('Sandwich API endpoint tests: category', function() {
    it('It should GET all the categories', done => {
        chai.request(App)
            .get('/categories')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(17);
                done();
            });
    });
    it('It should NOT GET all the categories', done => {
        chai.request(App)
            .get('/categorie')
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
    it('It should GET a category by ID', done => {
        const categoryID = '5fb6ec7674615f41ace9cfef';
        chai.request(App)
            .get('/categories/' + categoryID)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
                response.body.should.have.property('name').eq('Beef');
                done();
            });
    });
    it('It should NOT GET a category by ID', done => {
        const categoryID = 'false';
        chai.request(App)
            .get('/categories/' + categoryID)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
    });
    it('It should DELETE an existing category', done => {
        const categoryID = '5fe3b2e00d5a862b74341cd2';
        chai.request(App)
            .delete('/categories/delete/' + categoryID)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });
    it('It should POST a new category', done => {
        data = {
            name: 'Vegan'
        };
        const res = request(App)
            .post('/categories/add')
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }

            expect(res.body).to.equal('Category added!');
            done();
        });
    });
    it('It should update a category', function(done) {
        id="5fcae110c33f7637484b84bc";
        data = {
            name: 'Vegatables'
        };
        const res = request(App)
            .post(`/categories/update/${id}`)
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }
            expect(res.body).to.equal('Category updated!');
            done();
        });
    });
    it('It should update a category 2', function(done) {
      id="5fcae110c33f7637484b84bc";
      data = {
          name: 'Vegatable'
      };
      const res = request(App)
          .post(`/categories/update/${id}`)
          .send(data);

      res.expect(200).end(function(err, res) {
          if (err) {
              return done(err);
          }
          expect(res.body).to.equal('Category updated!');
          done();
      });
  });
});
