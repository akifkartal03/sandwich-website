const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
const app = require('../server')
const Category = require("../models/category.model")

describe("POST /category", () => {

	it("should return status 200", async () => {
    	let res = await chai
        	.request(app)
        	.post('/add')
        	.send({name: "Sıcak içercekler"})
       
    	expect(res.status).to.equal(200)
       
	})

	afterEach(async () => {
    	await Category.deleteOne({name: "Sıcak içercekler"})
	})
})