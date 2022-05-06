const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

app.use(morgan('dev'));

const port = process.env.PORT || 4000; 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => 
    console.log('Server listening on port->', port)
);





