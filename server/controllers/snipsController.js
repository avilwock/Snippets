import { Snip } from "../models/Snips.js"

export const getSnip = async (req, res) => {
    try {
        const snip = await Snip.findOne({
                    _id: req.params.id,
                    user: req.user._id
                });

        if (!snip) {
            return res.status(404).json({
                message: "Snip not found"
            });
        }

        res.status(200).json(snip);

    } catch (error) {
        console.error("Error getting snip:", error);

        res.status(500).json({
            message: "Failed to get snip"
        });
    }
};

export const getSnips = async (req, res) => {
    try {
        const snips = await Snip.find({
            user: req.user._id
        });

        res.status(200).json(snips);

    } catch (error) {
        console.error("Error getting snips:", error);

        res.status(500).json({
            message: "Failed to get snips"
        })
    }
}

export const addSnip = async(req, res) => {
    try {

        const snip = await Snip.create({
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

        const updatedSnip = await Snip.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id
            },
            { $set:req.body },
            { returnDocument: "after" }
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

        const deletedSnip = await Snip.findOneAndDelete({
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
