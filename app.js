const express = require('express');
const app = express();
const router = require('./router/router');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(cors());

app.listen(8080, function(request, response) {
    console.log("Runing on Port 8080")
});