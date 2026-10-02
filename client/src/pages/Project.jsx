import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Button from "../components/Button/Button"
import { FaEdit, FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa"
import Button from "../components/Button/Button";
import styles from "./Project.module.css"

function Project() {

    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [snips, setSnips] = useState([]);
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    console.log("ProjectID:", id);
    console.log("TASKS", tasks);

    useEffect(() => {

        const token = localStorage.getItem("token");
        fetch(`/api/project/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => setProject(data))
            .catch((error) => console.error(error));

            fetch(`/api/snips?project=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response=> response.json())
            .then(data=> setSnips(data))
            .catch(error => console.error(error));

            console.log("FETCHING TASKS:", `/api/tasks?project=${id}`);

            fetch(`/api/task?project=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setTasks(data))
                .catch(error => console.error(error));
    }, [id]);

    const handlePriorityToggle = async () => {
        const newPriority = !project.priority;

        try {
            const response = await fetch(`/api/project/${id}`, {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },

                body: JSON.stringify({
                    priority: newPriority
                })
            });
            const data = await response.json();
            setProject(data);
        } catch (error) {
            console.error(error);
        }
    }

    if (!project) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.projectContainer}>

            <div className={styles.topButtons}>
                <Button
                    className={styles.smallButton}
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                </Button>

                <Button
                    className={styles.smallButton}
                    onClick={() => navigate(`/project/${project._id}/edit`)}
                >
                    <FaEdit />
                </Button>
            </div>

            <div className={styles.headline}>
                <Button
                    className={styles.priorityButton}
                    onClick={handlePriorityToggle}
                >
                    {project.priority
                        ? <FaStar color={project.color} />
                        : <FaRegStar color={project.color} />
                    }
                </Button>

                <h1>{project.project_name}</h1>
            </div>

            <div className={styles.projectInfo}>
                <p>{project.description}</p>
                <p>{Array.isArray(project.genre)
                    ? project.genre.join(", ")
                    : project.genre}
                </p>

            </div>
            <div className={styles.projectItems}>

        <div className={styles.itemSection}>
            <h2>Snips</h2>

            <div className={styles.itemBoxes}>
                {snips.map((snip) => (
                    <div className={styles.itemBox} key={snip._id}>
                        <p>{snip.content}</p>
                    </div>
                ))}
            </div>
        </div>


            <div className={styles.itemSection}>
         <h2>Tasks</h2>

            <div className={styles.itemBoxes}>
                {tasks.map((task) => (
                    <div
                        className={styles.itemBox}
                        key={task._id}
                        onClick={() => navigate(`/task/${task._id}`)}
                    >
                        <div className={styles.taskItems}>
                            <input
                                type="checkbox"
                                onClick={(event) => event.stopPropagation()}
                            />
                            <p>{task.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    </div>

        </div>
    );
}

export default Project;