const chai = require("chai");
const {expect} = chai;
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const app = require("../src/app");
const dotenv = require('dotenv').config();
const Product = require("../src/product/product.model")

chai.use(chaiHttp);
mongoose.Promise = global.Promise;

const database_url = process.env.DATABASE_URL || "mongodb://localhost/test";

describe("/product", () => {
  beforeEach(() =>
    mongoose.connect(
      database_url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
  );

  afterEach(done => {
    mongoose.connection.db.dropDatabase(() =>
      mongoose.connection.close(done)
    )
  });
  //after(() => mongoose.disconnect());

  it("GET /product - should return an array of all products", async () => {
    await new Product({ name: "Example", cost: 1}).save();
    return chai.request(app)
      .get("/product")
      .then(res => {
        console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        expect(res.body[0].name).to.equal("Example");
        expect(res.body[0].cost).to.equal(1);
      });
  });

    it("POST /product - should add a new product when POST to /product", async () => {
      return chai.request(app)
        .post("/product")
        .set('content-type', 'application/json')
        .send({data: {name: 'test', cost: 1}})
        .then(res => {
          console.log(res.body);
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          expect(res.body.data.name).to.equal("test");
          expect(res.body.data.cost).to.equal(1);
        });
    });
});
