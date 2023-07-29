const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://pc-builder:fHG8k7nDAvemNvUb@cluster0.zkovl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const productCollection = client.db("pc-builder").collection("products");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/products/featured", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query).limit(6);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/category/:name", async (req, res) => {
      const { name } = req.params;

      const query = { category: name };
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/selectProduct/:name", async (req, res) => {
      const { name } = req.params;

      const query = { category: name };
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/products/:id", async (req, res) => {
      const { id } = req.params;

      const nid = new ObjectId(id);
      const query = { _id: nid };

      const cursor = productCollection.findOne(query);
      const product = await cursor;
      res.send(product);
    });
  } finally {
  }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello from node mongo pc builder server");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
