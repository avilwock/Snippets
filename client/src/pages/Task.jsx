
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Task() {

    const { id } = useParams();
    const [task, setTask] = useState(null);

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
            <h1>{task.content}</h1>
        </div>
    );
}

export default Task;