const { Task } = require("../models/index");

taskController = {};

taskController.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();

        if (tasks.length < 1)
            return res.status(404).json({ data: { message: 'No tasks found' } });

        return res.status(200).json({ data: tasks });

    } catch (error) {   
        console.error(error.message);
        return res.status(500).json({ error: { message: 'Server error' } });    
    }
};

taskController.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const task = await Task.findOne({ where: { id } });

        if (!task)
            return res.status(404).json({ data: { message: 'Task not found' } });

        if (title) task.title = title;
        if (completed) task.completed = completed;

        await Task.update(req.body, { where: { id } });

        return res.status(200).json({ data: { message: task } });
    } catch (error) {
        console.log("Error updating task-> ", error.message);
        return res.status(500).json({ error: { message: 'Error updating task' } });
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id } });

        if (!task)
            return res.status(404).json({ data: { message: 'Task not found' } });

        task.destroy()

        return res.status(200).json({ data: 'Task deleted' });
    } catch (error) {
        console.error("Error deleting task-> ", error.message);
        return res.status(500).json({ error: { message: 'Server error' } });
    }
};

taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const task = await Task.findOne({ where: { id } });

        if (!task)
            return res.status(404).json({ data: { message: 'Task not found' } });

        if (title) task.title = title;
        if (completed) task.completed = completed;

        await Task.update(req.body, { where: { id } });

        return res.status(200).json({ data: { message: 'Task updated' } });
    } catch (error) {
        console.log("Error updating task-> ", error.message);
        return res.status(500).json({ error: { message: 'Error updating task' } });
    }
};

taskController.createTask = async (req, res) => {
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
};

module.exports = taskController;