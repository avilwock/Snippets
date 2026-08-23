
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa";

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

    return (
        <div>
            <button onClick={() =>
                navigate(`/task/${task._id}/edit`)}>
            <FaEdit size={20}/>
            </button>
            <h1>{task.content}</h1>
            <p>{new Date(task.due_date).toLocaleDateString()}</p>
            <p>{task.type}</p>
        </div>
    );
}

export default Task;