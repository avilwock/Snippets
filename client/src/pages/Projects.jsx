import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import styles from "./Projects.module.css";

function Projects() {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
    fetch("/api/project", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
            })
                .then((response) => response.json())
                .then((data) => setProjects(data))
                .catch((error) => console.error(error));
        }, []);

    return (
        <div>
            <div className={styles.projectsHeader}>
                <h1>Projects</h1>

                <div className={styles.projectsActions}>
                    <Button className={styles.actionButton} onClick={() => navigate(-1)}>
                        <FaArrowLeft />
                    </Button>

                    <Button className={styles.actionButton} onClick={() => navigate("/new-project")}>
                        <FaPlusCircle />
                    </Button>
                </div>
            </div>

            <div className={styles.projectsList}>
                {projects.map((project) => (
                    <Button
                        key={project._id}
                        onClick={() => navigate(`/project/${project._id}`)}
                    >
                        <span
                            style={{
                                backgroundColor: project.color,
                                width: "20px",
                                height: "20px",
                                display: "inline-block",
                                borderRadius: "50%"
                            }}
                        />
                        <span>{project.project_name}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Projects;