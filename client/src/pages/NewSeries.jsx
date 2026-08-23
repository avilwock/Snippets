import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button"

function NewSeries() {

    const [seriesTitle, setSeriesTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/series', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    seriesTitle,
                    description
                })
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create series')
            }

            navigate ('/dashboard');
        } catch (error) {
            console.error("Error creating series:", error);
        }
    };

    return (
        <div>
            <h1>Add Series</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Series Title
                    <input
                    type="text"
                    value={seriesTitle}
                    onChange={(e) => setSeriesTitle(e.target.value)}
                    required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                 <Button type="submit">
                Add Series
            </Button>
            </form>
           
        </div>
    )
}

export default NewSeries;