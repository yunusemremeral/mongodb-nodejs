const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

//Mongo declerations
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yunusemremeral:password@cluster0.briui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true});
let database, table;

const setUp = async () => {
    await client.connect();
    database = client.db("mySurvey");
    table = database.collection("testTablo");
}

app.listen(process.env.PORT);
app.use(express.static('public'));
app.use(express.json({ limit: '2mb' }));

 
app.post('/store', async (request, response) => {
    await setUp()
    const data = request.body;
    const result = await table.insertOne({
        "gender": data.gender,
        "education": data.education,
        "age": data.age,
        "title": data.title,
        "experience": data.experience,
        "projects": data.projects,

    });
    response.send("okok")
})

app.get('/showStats', async (req, res) => {
    await setUp()
    const result = await table.find({}).toArray();
    console.log(result)
    res.send(result);
})
