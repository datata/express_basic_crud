const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Tasks App!');
});

app.use(require('./routes'));

app.listen(port, () =>
    console.log('Server listening on port->', port)
);





