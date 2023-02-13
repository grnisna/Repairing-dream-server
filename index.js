const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

console.log();

app.get("/", (req, res) => {
  res.send("server is running");
});

//user : allUser
//pass : 8IFQMQJr1tFXWUdg

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1tgaxyp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("repairing_dream").collection("services");
    const orderCollection = client.db("repairing_dream").collection("order");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    // find one service from database
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
    //   const query = {_id: new ObjectId(id)} (if has mongodb id)
      const result = await serviceCollection.findOne(query);
      res.send(result);
    });

    // order post 
    app.post('/order', async(req,res)=>{
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(order);
    });

    // get orders for specific email address 
    app.get('/orders', async(req,res) =>{
      let query = {};
      const activeUser = req.query.email;
      if(activeUser){
        query={
          email: activeUser
        }
      };
      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });


    // delete one order 
    app.delete('/orders/:id', async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    })












  } finally {
  }
}

run().catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`port is running `, port);
});
