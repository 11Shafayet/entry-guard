require('dotenv').config();
import { Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://Shafayet:Shafayet111@cluster0.8laudjn.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const userRoutes = require('./routes/userRoutes');

async function run() {
  try {
    // await client.connect();

    const userCollection = client.db('entry-guard').collection('users');

    app.use('/user', userRoutes(userCollection));

    console.log('You successfully connected to MongoDB!');
  } finally {
    //await client.close()
  }
}

run().catch(console.dir);

app.get('/', (req: Request, res: Response) => {
  res.send('Entry Guard server is running');
});

app.listen(port, () => {
  console.log(`Entry Guard server is running at PORT: ${port}`);
});
