import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../components/Button/Button"
import styles from "./Dashboard.module.css";

import "../App.css"

function Dashboard() {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/api/project", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error(error));
    }, []);

    const priorityProjects = projects.filter(project => project.priority);

    return (
        <div>
            <h1>Dashboard</h1>
            <div  className= {styles.dashContainer}>
                <div> 
                    <Button className={styles.addButton} onClick={() => navigate('/new-project')}>
                        +
                    </Button>
                    <Button onClick={() => navigate('/projects')}>
                        Projects
                    </Button>
                </div>

                <div>
                    <Button className={styles.addButton} onClick={() => navigate('/new-snip')}>
                        +
                    </Button>
                    <Button onClick={() => navigate('/snips')}>
                        Snippets
                    </Button>
                </div>

                <div>
                    <Button className={styles.addButton} onClick={() => navigate('/new-task')}>
                        +
                    </Button>
                    <Button onClick={() => navigate('/tasks')}>
                        Tasks
                    </Button>
                </div>

                <div className={styles.priorityBorder}>
                    <h2>Priority Projects</h2>
                    <div className = {styles.buttonSort}>
                    {priorityProjects.map(project => (
                        <Button
                            key={project._id}
                            onClick={() => navigate(`/project/${project._id}`)}
                        >
                            <FaStar color ={ project.color } />
                            <span>{project.project_name}</span>
                        </Button>
                    ))}
                    </div>
                </div>

                <div>
                    <Button onClick={() => navigate('/series')}>
                        Series
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
