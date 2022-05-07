const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config();
const sequelize = require('./database/config');

app.use(morgan('dev'));
app.use(express.json());

const db = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return 'error'
      }
}

db();

let tasks = [
    {
        id: 1,
        name: 'Task 1',
        completed: false
    },
    {
        id: 2,
        name: 'Task 2',
        completed: false
    }
];

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Tasks App!');
});

app.get('/tasks', (req, res) => {
    if(tasks.length < 1) 
        return res.status(201).json({data:{message: 'No tasks found'}});
    
    return res.json(tasks);
});

app.post('/task', (req, res) => {
    const { name, completed } = req.body;

    if(!name || !completed)
        return res.status(400).json({data:{message: 'Please provide name and completed'}});

    arrayLength = tasks.length;

    const lastId = tasks[arrayLength - 1].id;

    const task = {
        id: lastId + 1 ,
        name,
        completed
    };

    tasks.push(task);

    return res.status(201).json({data: task});
});

app.put('/task/:id', (req, res) => {
    const { id } = req.params;
    const { name, completed } = req.body;

    const task = tasks.find(task => task.id === parseInt(id));
    
    if(!task) 
        return res.status(404).json({data:{message: 'Task not found'}});    
    
    task.name = name;
    task.completed = completed;

    return res.json(task);
});

app.delete('/task/:id', (req, res) => {    
    const task = tasks.find(task => task.id === parseInt(req.params.id));

    if(!task)
        return res.status(404).json({data:{message: 'Task not found'}});

    tasks.splice(tasks.indexOf(task), 1);

    return res.json({data: {message: 'Task deleted'}});
});

app.get('/task/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id));

    if(!task)
        return res.status(404).json({data:{message: 'Task not found'}});

    return res.status(200).json(task);
});

app.get('/tasks/destroy', (req, res) => {
    tasks = [];

    return res.json({data: {message: 'All tasks deleted'}});
});


app.listen(port, () =>
    console.log('Server listening on port->', port)
);





