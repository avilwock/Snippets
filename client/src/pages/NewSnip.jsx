import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button/Button";
import { FaArrowLeft } from "react-icons/fa"
import styles from "./NewSnip.module.css"

function NewSnip() {
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [notes, setNotes] = useState('');
    
    const [project, setProject] = useState('');
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
    fetch('/api/project', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to get projects');
            }

            return response.json();
        })
        .then((data) => {
            console.log("Projects response:", data);
            console.log("PROJECT DATA:", data);
            console.log("IS ARRAY:", Array.isArray(data));
            setProjects(data);
        })
        .catch((error) => console.error('Error getting projects:', error));
}, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/snip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content,
                    type: type ? [type]: [],
                    notes,
                    project: project || null
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create snip');
            }

            console.log('Snip created:', data.snip);

            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating snip:', error);
        }
    };

    return (
    <div>
        <h1>New Snip</h1>

        <Button
            className={styles.button}
            onClick={() => navigate(-1)}
        >
            <FaArrowLeft />
        </Button>

        <div className={styles.snipbox}>
            <form onSubmit={handleSubmit}>
                <label className={styles.field}>
                    Content
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>

                <label className={styles.field}>
                    Type
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Select a type</option>
                        <option value="Character">Character</option>
                        <option value="Setting">Setting</option>
                        <option value="Plot">Plot</option>
                        <option value="Dialogue">Dialogue</option>
                        <option value="Worldbuilding">World Building</option>
                        <option value="Scene">Scene</option>
                        <option value="Misc">Misc</option>
                    </select>
                </label>

                <label className={styles.field}>
                    Project
                    <select
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                    >
                        <option value="">No project</option>

                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.project_name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className={styles.field}>
                    Notes
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </label>

                <Button type="submit">
                    Add Snip
                </Button>
            </form>
        </div>
    </div>
);
}

export default NewSnip;