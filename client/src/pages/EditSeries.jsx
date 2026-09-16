import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from "../components/Button/Button"
import { FaArrowLeft } from "react-icons/fa"

function EditSeries() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [seriesTitle, SetSeriesTitle] = useState("");
    const [ description, setDescription ] = useState("");

    useEffect (() => {
        const fetchSeries = async() => {
            console.log("EDIT SERIES ID:", id);

            try {
                const response = await fetch(`/api/series/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                console.log("GET response:", response);

                const data = await response.json();

                console.log("GET data", data);

                if(!response.ok) {
                    throw new Error(data.message || "Failed to get series");
                }

                SetSeriesTitle(data.seriesTitle || "");
                setDescription(data.description || "");
            } catch (error) {
                console.error("Error getting series:", error);
            }
        };

        fetchSeries();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/series/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    seriesTitle,
                    description
                })
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to update series");
            }

            console.log("Series updated:", data);
            navigate(`/series/${id}`)
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    return (
        <div>
            <button onClick={() =>
                navigate(-1)}>
            <FaArrowLeft/>
            </button>
            <h1> Edit Series </h1>
            <form onSubmit = {handleSubmit}>
                <label>
                    Series Name
                    <input
                    type="text"
                        value={seriesTitle}
                        onChange={(e) => SetSeriesTitle(e.target.value)}
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

                <Button type = "submit">
                    Save Changes
                </Button>
            </form>
        </div>
    )
}

export default EditSeries;