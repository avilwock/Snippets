
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaEdit, FaArrowLeft } from "react-icons/fa";

function Task() {

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/task/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => setTask(data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!task) {
        return <p>Loading...</p>;
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
                            navigate(`/tasks`)}>
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
        </div>
    );
}

export default Task;