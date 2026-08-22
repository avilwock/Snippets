import { Series } from "../models/Series.js"

export const getSeries = async (req,res) => {
    try {
        const series = await Series.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!series) {
            return res.status(404).json({
                message: "Series not found"
            });
        }

        res.status(200).json(series);
    } catch (error) {
        console.error("Error getting series:", error);

        res.status(500).json({
            message: "Failes to get series"
        });
    }
}

export const getSeriesList = async (req, res) => {
    try {
        const series = await Series.find({
            user: req.user._id
        });

        res.status(200).json(series);

    } catch (error) {
        console.error("Error getting series:", error);

        res.status(500).json({
            message: "Failed to get series"
        })
    }
}

export const addSeries = async(req, res) => {
    try {

        const series = await Series.create({
            ...req.body,
            user:req.user._id})
        res.status(201).json({
            series
        })
    } catch (error) {
        console.error("Error creating series:", error);

        res.status(500).json({
            message: "Error creating series"
        })
    }
}

export const editSeries = async(req, res) => {
    try {
        const { id } = req.params;

        const updatedSeries = await Series.findOneAndUpdate(
            {
                _id: id,
                user: req.user._id
            },
            { $set:req.body },
            { returnDocument: "after" }
        );

        if (!updatedSeries) {
            return res.status(404).json({
                message: "Series not found"
            })
        }

        res.status(200).json(updatedSeries);
    } catch (error) {
        console.error("Error editing series:", error);

        res.status(500).json({
            message: "Failed to edit series"
        })
    }
};

export const deleteSeries = async(req, res) => {
    try {
        const { id } = req.params;

        const deletedSeries = await Series.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!deletedSeries) {
            return res.status(404).json({
                message:"Series not found or you do not have permission to delete it"
            });
        }

        res.status(200).json({
            message: "Series deleted successfully",
            series: deletedSeries
        })
    } catch (error) {
        console.error("Error deleting series:", error);

        res.status(500).json({
            message: "Failed to delete series"
        })
    }
}