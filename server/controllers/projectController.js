import { Project } from "../models/Project.js"

export const addProject = async(req, res) => {
    try {

        const project = await Project.create({
            ...req.body,
            user: req.user._id})

        res.status(201).json({
            project
        });
    
    } catch (error) {
        console.error("Error creating project:", error);

        res.status(500).json({
            message: "Error creating project"
        });
    }
}

export const editProject = async(req, res) => {
    try {
        const { id } = req.params;

       const updatedProject = await Project.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id
            },
            { $set: req.body },
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error("Error editing project:", error);

        res.status(500).json({
            message: "Failed to edit project:"
        })
    }
};

export const deleteProject = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedProject = await Project.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!deletedProject) {
            return res.status(404).json({
                message: "Project not found or you do not have permission to delete it"
            });
        }

        res.status(200).json({
            message:"Project deleted successfully",
            project: deletedProject
        });
    } catch (error) {
        console.error("Error deleting project:", error);

        res.status(500).json({
            message: "Failed to delete project"
        })
    }
}