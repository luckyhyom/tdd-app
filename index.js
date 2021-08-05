const express = require('express');

const mongoose = require('mongoose');

const productRoutes = require('./routes.js');
// const productController = require('./controller/product.js');

const app = express();

const PORT = 8080;

mongoose.connect(`mongodb+srv://hyomin:Iiv9H3tSRoF4NnpJ@tdd-app.hr6xq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(res=>console.log('good')).catch(console.log);

app.use(express.json());

// app.get('/',productController.createProduct);

app.use('/api/product',productRoutes);

app.use( (error, req, res, next) => {
    res.status(500).json(error.message);
});
app.listen(PORT);


module.exports = app;