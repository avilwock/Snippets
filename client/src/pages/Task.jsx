
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaEdit, FaArrowLeft } from "react-icons/fa";

function Task() {

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [projects, setProjects] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`/api/task/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setTask(data))
            .catch((error) => console.error(error));

        fetch("/api/project", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response=> response.json())
            .then(data => setProjects(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!task) {
        return <p>Loading...</p>;
    }

    const handleProjectChange = async (event) => {
        const projectId = event.target.value;

        try {
            const response = await fetch(`/api/task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    project: projectId || null
                })
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || "Failed to update project");
            }

            setTask(data);
        } catch (error) {
            console.error("Error updating project:", error)
        }
    }

    const handleDelete = async () => {

        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }

        try {
            const response = await fetch(`/api/task/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete task");
            }

            navigate("/tasks");

        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    if (!task) {
        return <p>Loading...</p>;
    }

    return (
        <div>
             <button onClick={() =>
                navigate(-1)}>
            <FaArrowLeft/>
            </button>
            <button onClick={() =>
                navigate(`/task/${task._id}/edit`)}>
            <FaEdit size={20}/>
            </button>
            <button onClick={handleDelete}>
                Delete
            </button>
            <h1>{task.content}</h1>
            <p>{new Date(task.due_date).toLocaleDateString()}</p>
            <p>{task.type}</p>
            <label>
            Project:
                <select
                    value={task.project?._id || ""}
                    onChange={handleProjectChange}
                >
                    <option value="">No Project</option>

                    {projects.map((project) => (
                        <option key={project._id} value={project._id}>
                            {project.project_name}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default Task;