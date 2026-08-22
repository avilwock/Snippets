import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button/Button"

function EditProject() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ project_name, setProjectName] = useState("");
    const [ description, setDescription] = useState("");
    const [ color, setColor] = useState("");
    const [genre, setGenre] = useState("");

    useEffect (() => {
        const fetchProject = async () => {
        console.log("EDIT PROJECT ID:", id);

        try {
            const response = await fetch(`/api/project/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("GET response:", response);

            const data = await response.json();

            console.log("GET data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to get project");
            }

            setProjectName(data.project_name || "");
            setDescription(data.description || "");
            setColor(data.color || "#000000");
            setGenre(data.genre || []);
        } catch (error) {
            console.error("Error getting project:", error);
        }
    };

    fetchProject();
    }, [id]);

    const handleGenreChange=(e) => {
        const {value,checked} =e.target;

        if (checked) {
            setGenre([...genre, value]);
        } else {
            setGenre(genre.filter((item) => item !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/project/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    project_name,
                    description,
                    color,
                    genre
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update project");
            }

            console.log("Project updated:", data);
            navigate(`/project/${id}`);
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };


  return (
    <div>
        <h1>Edit Project</h1>

        <form onSubmit={handleSubmit}>
            <label>
                Project Name
                <input
                    type="text"
                    value={project_name}
                    onChange = {(e) => setProjectName(e.target.value)}
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
            <label>
                    Color
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </label>

                <label>
                    Genre
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Fantasy"
                        checked={genre.includes("Fantasy")}
                        onChange={handleGenreChange}
                    />
                    Fantasy
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Science-Fiction"
                        checked={genre.includes("Science-Fiction")}
                        onChange={handleGenreChange}
                    />
                    Science-Fiction
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Mystery"
                        checked={genre.includes("Mystery")}
                        onChange={handleGenreChange}
                    />
                    Mystery
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Thriller & Suspense"
                        checked={genre.includes("Thriller & Suspense")}
                        onChange={handleGenreChange}
                    />
                    Thriller & Suspense
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Horror"
                        checked={genre.includes("Horror")}
                        onChange={handleGenreChange}
                    />
                    Horror
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Historical Fiction"
                        checked={genre.includes("Historical Fiction")}
                        onChange={handleGenreChange}
                    />
                    Historical Fiction
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Romance"
                        checked={genre.includes("Romance")}
                        onChange={handleGenreChange}
                    />
                    Romance
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="TTRPG"
                        checked={genre.includes("TTRPG")}
                        onChange={handleGenreChange}
                    />
                    TTRPG
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Comedy"
                        checked={genre.includes("Comedy")}
                        onChange={handleGenreChange}
                    />
                    Comedy
                </label>

                <Button type="submit">
                    Save Changes
                </Button>
        </form>
    </div>
  )
}

export default EditProject;