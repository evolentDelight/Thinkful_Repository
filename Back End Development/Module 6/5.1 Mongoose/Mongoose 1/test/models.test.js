const {expect} = require("chai");
const mongoose = require("mongoose");
const Book = require("../src/models/book");

mongoose.Promise = global.Promise;

describe("Test Models", () => {
  beforeEach(() =>
    mongoose.connect(
      "mongodb://localhost/test", 
      {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    )
  );
  
  afterEach(done =>
    mongoose.connection.db.dropDatabase(() => 
      mongoose.connection.close(done)
    )
  );
    
  const createBook = async () => {
    const attrs = {
      title: "Don Quixote",
      description: "A book by Miguel de Cervantes",
      author: "Miguel de Cervantes",
      cost: 20
    };
    const book = await new Book(attrs);
    expect(book.title).to.equal(attrs.title, "Error saving book's title");
    expect(book.description).to.equal(attrs.description, "Error saving book's description");
    expect(book.author).to.equal(attrs.author, "Error saving book's author");
    expect(book.cost).to.equal(attrs.cost, "Error saving book's cost")
    return book;
  };
  
  describe("Creating", () => {
    describe("Book", () =>
      it("should create a book", createBook)
    );
  });
});