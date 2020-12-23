import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import App from '../server.js';
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
let data;
let id;
const uri = process.env.ATLAS_URI;

describe('Sandwich API endpoint tests: ingredient', function() {
    it('It should GET all the ingredients', done => {
        chai.request(App)
            .get('/ingredients')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(586);
                done();
            });
    });
    it('It should NOT GET all the ingredients', done => {
        chai.request(App)
            .get('/ingredient')
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
    it('It should GET a ingredient by ID', done => {
        const ingredientID = '5fb6ec2c74615f41ace9cd9e';
        chai.request(App)
            .get('/ingredients/' + ingredientID)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
                response.body.should.have.property('name').eq('Chicken');
                done();
            });
    });
    it('It should NOT GET a ingredient by ID', done => {
        const ingredientID = 'false';
        chai.request(App)
            .get('/ingredients/' + ingredientID)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
    });
    it('It should DELETE an existing ingredient', done => {
        const ingredientID = '5fb6ec2c74615f41ace9cdb4';
        chai.request(App)
            .delete('/ingredients/delete/' + ingredientID)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });
    it('It should POST a new ingredient', done => {
        data = {
            name: 'Biryani Masala'
        };
        const res = request(App)
            .post('/ingredients/add')
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }

            expect(res.body).to.equal('Ingredient added!');
            done();
        });
    });
    it('It should update a ingredient', function(done) {
        id = '5fb6ec2c74615f41ace9cdb1';
        data = {
            name: 'Beef Gravies'
        };
        const res = request(App)
            .post(`/ingredients/update/${id}`)
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }
            expect(res.body).to.equal('Ingredient updated!');
            done();
        });
    });
    it('It should update a ingredient 2', function(done) {
        id = '5fb6ec2c74615f41ace9cdb1';
        data = {
            name: 'Beef Gravy'
        };
        const res = request(App)
            .post(`/ingredients/update/${id}`)
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }
            expect(res.body).to.equal('Ingredient updated!');
            done();
        });
    });
});
