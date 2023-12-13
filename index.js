const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


// middleWares
app.use(cors())
app.use(express.json())




const uri = "mongodb+srv://personal-portfolio:L1hJVZeDFMm5QGQp@cluster0.f30vajg.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
      const messageCollection = client.db('portfolio').collection('message')

      app.post("/message", async (req, res) => {
          const message = req.body;
          const result = await messageCollection.insertOne(message)
          res.send(result)
      })

      app.get("/message", async (req, res) => {
          const result = await messageCollection.find().toArray()
          res.send(result)
      })
      
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("hello portfolio")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
  

// 
// 