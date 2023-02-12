const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

console.log() 

app.get('/', (req,res)=>{
    res.send('server is running')
})


//user : allUser
//pass : 8IFQMQJr1tFXWUdg


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1tgaxyp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        app.get('/services', async (req,res)=>{
            const serviceCollection = client.db('repairing_dream').collection('users');
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();

            res.send(services);
            
        })




    }
    finally{}
}

run().catch(error => console.log(error))




app.listen(port, ()=>{
    console.log(`port is running `, port);
})