import { Task } from "../models/Task.js"

export const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
                    _id: req.params.id,
                    user: req.user._id
                });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);

    } catch (error) {
        console.error("Error getting task:", error);

        res.status(500).json({
            message: "Failed to get task"
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user._id
        });

        res.status(200).json(tasks);

    } catch (error) {
        console.error("Error getting tasks:", error);

        res.status(500).json({
            message: "Failed to get tasks"
        })
    }
}

export const addTask = async(req, res) => {
    try {

        const task = await Task.create({
            ...req.body,
            user:req.user._id})
        res.status(201).json({
            task
        })
    } catch (error) {
        console.error("Error creating task:", error);

        res.status(500).json({
            message: "Error creating task"
        })
    }
}

export const editTask = async(req, res) => {
    try {
        const { id } = req.params;

        const updatedTask = await Task.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id
            },
            { $set:req.body },
            { returnDocument: "after" }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error editing task:", error);

        res.status(500).json({
            message: "Failed to edit task"
        })
    }
};

export const deleteTask = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!deletedTask) {
            return res.status(404).json({
                message:"Task not found or you do not have permission to delete it"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task: deletedTask
        })
    } catch (error) {
        console.error("Error deleting task:", error);

        res.status(500).json({
            message: "Failed to delete task"
        })
    }
}
