const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const { Task } = require("./models/index");

app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Tasks App!');
});

app.use(require('./routes/task'));

app.post('/task', async (req, res) => {
    try {
        const { title } = req.body;

        if (!title)
            return res.status(400).json({ data: { message: 'Title is required' } });

        const newTask = await Task.create({ title });

        return res.status(201).json({ data: newTask });
    } catch (error) {
        console.error("Error creating task-> ", error.message);
        return res.status(500).json({ error: { message: 'Error creating task' } });
    }
});

app.listen(port, () =>
    console.log('Server listening on port->', port)
);





