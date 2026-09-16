import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"

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
            <h1>Projects</h1>
            <Button onClick={() =>
              navigate(-1)}>
            <FaArrowLeft/>
            </Button>

            <Button onClick={() => navigate('/new-project')}>
                +
            </Button>
            <br></br>
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
                ></span>

                {project.project_name}
            </Button>
        ))}
        </div>
    );
}

export default Projects;