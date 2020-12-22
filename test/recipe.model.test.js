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

describe('Sandwich API endpoint tests: recipe', function() {
    it('It should GET all the recipes', done => {
        chai.request(App)
            .get('/recipes')
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.be.eq(18);
                done();
            });
    });
    it('It should NOT GET all the recipes', done => {
        chai.request(App)
            .get('/recipe')
            .end((err, response) => {
                response.should.have.status(404);
                done();
            });
    });
    it('It should GET a recipie by ID', done => {
        const recipieID = '5fb6ebdd74615f41ace9cd80';
        chai.request(App)
            .get('/recipes/' + recipieID)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');
                response.body.should.have.property('name');
                response.body.should.have
                    .property('name')
                    .eq('Apple Frangipan Tart');
                done();
            });
    });
    it('It should NOT GET a recipe by ID', done => {
        const recipieID = 'false';
        chai.request(App)
            .get('/recipes/' + recipieID)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            });
    });
    it('It should DELETE an existing recipe', done => {
        const recipieID = '5fde9c71837cb74224cea867';
        chai.request(App)
            .delete('/recipes/delete/' + recipieID)
            .end((err, response) => {
                response.should.have.status(200);
                done();
            });
    });
    it('It should POST a new recipe', done => {
        const data = {
            imgURL:
                'https://www.themealdb.com/images/media/meals/1520081754.jpg',
            name: 'Roast fennel and Aubergine Paella',
            directions:
                'Put the fennel, aubergine, pepper and courgette in a roasting tray. Add a glug of olive oil, season with salt and pepper and toss around to coat the veggies in the oil. Roast in the oven for 20 minutes, turning a couple of times until the veg are pretty much cooked through and turning golden. Meanwhile, heat a paella pan or large frying pan over a low-medium heat and add a glug of olive oil. Sauté the onion for 8-10 minutes until softened. Increase the heat to medium and stir in the rice, paprika and saffron. Cook for around 1 minute to start toasting the rice, then add the white wine. Reduce by about half before stirring in two-thirds of the stock. Reduce to a simmer and cook for 10 minutes without a lid, stirring a couple of times. Stir in the peas, add some seasoning, then gently mix in the roasted veg. Pour over the remaining stock, arrange the lemon wedges on top and cover with a lid or some aluminium foil. Cook for a further 10 minutes. To ensure you get the classic layer of toasted rice at the bottom of the pan, increase the heat to high until you hear a slight crackle. Remove from the heat and sit for 5 minutes before sprinkling over the parsley and serving.',
            ingredients: [
                'Baby Aubergine',
                'Fennel',
                'Red Pepper',
                'Courgettes',
                'Onion',
                'Paella Rice',
                'Paprika',
                'Saffron',
                'White Wine',
                'Vegetable Stock',
                'Frozen Peas',
                'Lemon',
                'Parsley',
                'Salt',
                'Black Pepper'
            ],
            ingredients_quantities: [
                '6 small',
                '4 small',
                '1 thinly sliced',
                '1 medium',
                '1 finely chopped',
                '300 g',
                '1 tsp',
                'Pinch',
                '200 ml',
                '700 ml',
                '100 g',
                '1 chopped',
                '',
                'Pinch',
                'Pinch'
            ],
            category: ['Vegan', 'Vegetable']
        };
        const res = request(App)
            .post('/recipes/add')
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }

            expect(res.body).to.equal('Recipe added!');
            done();
        });
    });
   it('It should update a recipe', function(done) {
        id = '5fcafae3f03f01952d830805';
        data = {
            imgURL:
                'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4532303.jpg&w=595&h=595&c=sc&poi=face&q=85',
            name: 'Turkish Chicken Kebab',
            directions:
                'Whisk yogurt, lemon juice, olive oil, ketchup, garlic, red pepper flakes, salt, cumin, black pepper, paprika, and cinnamon together in a bowl. Place chicken thigh halves into the yogurt marinade and coat them thoroughly on all sides. Cover bowl with plastic wrap and refrigerate 2 to 8 hours. Preheat an outdoor grill for medium-high heat and lightly oil the grate. Using 2 skewers for each kebab, thread half of the chicken thighs onto each pair of skewers making a fairly thick "log" shape. Place kebabs on grill. Do not try to turn them until they begin to unstick from the grill, 3 or 4 minutes. Turn kebabs and grill the other side 3 or 4 minutes; turn. Continue cooking and turning until chicken is no longer pink in the center and the juices run clear, about 6 minutes. An instant-read thermometer inserted into the center should read at least 74 degrees C.',
            ingredients: [
                'Yogurt',
                'Lemon Juice',
                'Olive Oil',
                'Tomato Ketchup',
                'Garlic Clove',
                'Red Pepper',
                'Kosher Salt',
                'Ground Cumin',
                'Black Pepper',
                'Paprika',
                'Ground Cinnamon',
                'Chicken Thighs'
            ],
            ingredients_quantities: [
                '1 cup',
                '2 tbsp',
                '2 tbsp',
                '2 tbsp',
                '6',
                '1 tbsp',
                '1 tbsp',
                '1.5 tsp',
                '1 tsp',
                '1 tsp',
                '1/8 tsp',
                '1 kg'
            ],
            category: ['Chicken', 'Starter']
        };
        const res = request(App)
            .post(`/recipes/update/${id}`)
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }
            expect(res.body).to.equal('Recipe updated!');
            done();
        });
    });
    it('It should update a recipe 2', function(done) {
        id = '5fcafae3f03f01952d830805';
        data = {
            imgURL:
                'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4532303.jpg&w=595&h=595&c=sc&poi=face&q=85',
            name: 'Turkish Chicken Kebabs',
            directions:
                'Whisk yogurt, lemon juice, olive oil, ketchup, garlic, red pepper flakes, salt, cumin, black pepper, paprika, and cinnamon together in a bowl. Place chicken thigh halves into the yogurt marinade and coat them thoroughly on all sides. Cover bowl with plastic wrap and refrigerate 2 to 8 hours. Preheat an outdoor grill for medium-high heat and lightly oil the grate. Using 2 skewers for each kebab, thread half of the chicken thighs onto each pair of skewers making a fairly thick "log" shape. Place kebabs on grill. Do not try to turn them until they begin to unstick from the grill, 3 or 4 minutes. Turn kebabs and grill the other side 3 or 4 minutes; turn. Continue cooking and turning until chicken is no longer pink in the center and the juices run clear, about 6 minutes. An instant-read thermometer inserted into the center should read at least 74 degrees C.',
            ingredients: [
                'Yogurt',
                'Lemon Juice',
                'Olive Oil',
                'Tomato Ketchup',
                'Garlic Clove',
                'Red Pepper',
                'Kosher Salt',
                'Ground Cumin',
                'Black Pepper',
                'Paprika',
                'Ground Cinnamon',
                'Chicken Thighs'
            ],
            ingredients_quantities: [
                '1 cup',
                '2 tbsp',
                '2 tbsp',
                '2 tbsp',
                '6',
                '1 tbsp',
                '1 tbsp',
                '1.5 tsp',
                '1 tsp',
                '1 tsp',
                '1/8 tsp',
                '1 kg'
            ],
            category: ['Chicken', 'Starter']
        };
        const res = request(App)
            .post(`/recipes/update/${id}`)
            .send(data);

        res.expect(200).end(function(err, res) {
            if (err) {
                return done(err);
            }
            expect(res.body).to.equal('Recipe updated!');
            done();
        });
    });
});
