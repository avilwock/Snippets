import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaEdit, FaArrowLeft } from "react-icons/fa"


function Snip() {

    const { id } = useParams();
    const [snip, setSnip] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/snip/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
             .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to get snip");
                }
                return response.json();
            })
            .then((data) => {
    console.log("SNIP DATA:", data);
    console.log("SNIP PROJECT:", data.project);
    setSnip(data);
})
            .catch((error) => console.error(error));
    }, [id]);

    if (!snip) {
        return <p>Loading...</p>;
    }

    const handleDelete = async () => {

        if (!window.confirm("Are you sure you want to delete this snippet?")) {
            return;
        }

        try {
            const response = await fetch(`/api/snip/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete snippet");
            }

            navigate("/snips");

        } catch (error) {
            console.error("Error deleting snippet:", error);
        }
    };

    return (
        <div>
            <button onClick={() =>
                navigate(`/snips`)}>
            <FaArrowLeft/>
            </button>
            <button onClick={() =>
                navigate(`/snip/${snip._id}/edit`)}>
            <FaEdit size={20}/>
            </button>
            <button onClick={handleDelete}>
                Delete
            </button>
            <h1>{snip.content}</h1>
            <p>{snip.notes}</p>
            <p>{snip.type.join(", ")}</p>
            <p> Project: {snip.project ? snip.project.project_name: "No Project"}</p>
            {snip.project ? (
    <p>
        Project:{" "}
        <button onClick={() => navigate(`/project/${snip.project._id}`)}>
            {snip.project.project_name}
        </button>
    </p>
) : (
    <p>Project: No Project</p>
)}
        </div>
    );
}

export default Snip;