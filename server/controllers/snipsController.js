import { Snips } from "../models/Snips.js"

export const addSnip = async(req, res) => {
    try {

        const snip = await Snips.create({
            ...req.body,
            user:req.user._id})
        res.status(201).json({
            snip
        })
    } catch (error) {
        console.error("Error creating snip:", error);

        res.status(500).json({
            message: "Error creating snip"
        })
    }
}

export const editSnip = async(req, res) => {
    try {
        const { id } = req.params;

        const updatedSnip = await Snips.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id
            },
            { $set:req.body },
            { new: true }
        );

        if (!updatedSnip) {
            return res.status(404).json({
                message: "Snip not found"
            })
        }

        res.status(200).json(updatedSnip);
    } catch (error) {
        console.error("Error editing snip:", error);

        res.status(500).json({
            message: "Failed to edit snip"
        })
    }
};

export const deleteSnip = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedSnip = await Snips.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!deletedSnip) {
            return res.status(404).json({
                message:"Snip not found or you do not have permission to delete it"
            });
        }

        res.status(200).json({
            message: "Snip deleted successfully",
            snip: deletedSnip
        })
    } catch (error) {
        console.error("Error deleting snip:", error);

        res.status(500).json({
            message: "Failed to delete snip"
        })
    }
}
