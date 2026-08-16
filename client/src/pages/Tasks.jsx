import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Tasks() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
    fetch("/api/task", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
            })
                .then((response) => response.json())
                .then((data) => setTasks(data))
                .catch((error) => console.error(error));
        }, []);

    return (
        <div>
            <h1>Tasks</h1>

            <Button onClick={() => navigate('/new-task')}>
                +
            </Button>

            {tasks.map((task) => (
            <Button
                key={task._id}
                onClick={() => navigate(`/task/${task._id}`)}
            >
                

                {task.content}
            </Button>
        ))}
        </div>
    );
}

export default Tasks;