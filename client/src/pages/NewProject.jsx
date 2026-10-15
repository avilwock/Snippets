import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button/Button";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../pages/NewProject.module.css";

function NewProject() {
    const [project_name, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#000000');
    const [genre, setGenre] = useState([]);

    const navigate = useNavigate();

    const handleGenreChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setGenre([...genre, value]);
        } else {
            setGenre(genre.filter((item) => item !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    project_name,
                    description,
                    color,
                    genre: genre.length ? genre : null
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create project');
            }

            console.log('Project created:', data.project);
            navigate('/dashboard');

        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const genres = [
        "Fantasy",
        "Science-Fiction",
        "Mystery",
        "Thriller & Suspense",
        "Horror",
        "Historical Fiction",
        "Romance",
        "TTRPG",
        "Comedy"
    ];

    return (
        <div>
            <h1>New Project</h1>

            <Button
                className={styles.button}
                onClick={() => navigate(-1)}
            >
                <FaArrowLeft />
            </Button>

            <div className={styles.projectbox}>
                <div className={styles.entry}>
                    <form onSubmit={handleSubmit}>
                        
                         <label>
                            Color
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </label>
                        <label>
                            Project Name
                            <input
                                type="text"
                                value={project_name}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Description
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>

                        <fieldset className={styles.genreSection}>
                            <legend>Genre</legend>

                            <div className={styles.genreGrid}>
                                {genres.map((item) => (
                                    <label
                                        key={item}
                                        className={styles.genreOption}
                                    >
                                        <input
                                            type="checkbox"
                                            value={item}
                                            checked={genre.includes(item)}
                                            onChange={handleGenreChange}
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <Button type="submit">
                            Add Project
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewProject;