import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Project() {

    const { id } = useParams();
    const [project, setProject] = useState(null);

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

    if (!project) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{project.project_name}</h1>
            <p>{project.description}</p>
            <p>{project.genre}</p>
        </div>
    );
}

export default Project;