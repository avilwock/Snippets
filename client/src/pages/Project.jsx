import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Button from "../components/Button/Button"
import { FaEdit, FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa"
import Button from "../components/Button/Button";
import styles from "./Project.module.css"

function Project() {

    const { id } = useParams();
    const [project, setProject] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/project/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => setProject(data))
            .catch((error) => console.error(error));
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
        <div>
            <button onClick={() =>
                navigate(-1)}>
            <FaArrowLeft/>
            </button>
            <div className = {styles.headline} >
                <Button className = {styles.priorityButton} onClick={handlePriorityToggle}>
                    {project.priority ? <FaStar color={project.color} /> : <FaRegStar color={project.color}/>}
                </Button>
                <h1>{project.project_name}</h1>
            </div>
            <button onClick={() =>
                navigate(`/project/${project._id}/edit`)}>
            <FaEdit size={20}/>
            </button>
            <p>{project.description}</p>
            <p>{project.genre}</p>
        </div>
    );
}

export default Project;