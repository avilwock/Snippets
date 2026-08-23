import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Button from "../components/Button/Button"
import { FaEdit } from "react-icons/fa"

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

    if (!project) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{project.project_name}</h1>
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