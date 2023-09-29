const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/ecommerce');
const cors = require('cors');
const express = require('express');
const app = express();

const mobileSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number
});
const connection = mongoose.model('mobiles', mobileSchema);

app.use(cors());
app.use(express.json());

app.post('/create', async (req, res) => {
    let result = await connection(req.body);
    let data = await result.save();
    res.send('Done');
})

app.get('/read', async (req, res) => {
    let result = await connection.find();
    res.send(result);
})

app.put('/update/:name', async (req, res) => {
    let result = await connection.updateOne(req.params, req.body);//,{$set:req.body});
    console.log(result);
})

app.delete('/remove/:_id', async (req, res) => {
    let result = await connection.deleteOne(req.params);
    console.log(result);
})

app.listen(2021);