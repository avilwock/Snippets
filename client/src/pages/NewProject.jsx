import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button/Button"
import { FaArrowLeft } from "react-icons/fa"

function NewProject() {
  const [project_name, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');
  const [genre, setGenre] = useState([]);

  const navigate=useNavigate();

  const handleGenreChange = (e) => {
    const {value, checked} = e.target;

    if (checked) {
        setGenre([...genre,value]);
    } else {
        setGenre(genre.filter((item) => item !== value))
    }
  }

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
            genre: genre || null
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

  return (
    <div>
      <h1>New Project</h1>
      <Button onClick={() =>
            navigate(-1)}>
        <FaArrowLeft/>
        </Button>

      <form onSubmit={handleSubmit}>
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

        <label>
          Color
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <label>
          Genre
          <label>Genre</label>

            <label>
                <input
                    type="checkbox"
                    value="Fantasy"
                    checked={genre.includes("Fantasy")}
                    onChange={handleGenreChange}
                />
                Fantasy
            </label>

            <label>
                <input
                    type="checkbox"
                    value="Science-Fiction"
                    checked={genre.includes("Science-Fiction")}
                    onChange={handleGenreChange}
                />
                Science-Fiction
            </label>

            <label>
                <input
                    type="checkbox"
                    value="Mystery"
                    checked={genre.includes("Mystery")}
                    onChange={handleGenreChange}
                />
                Mystery
            </label>

            <label>
                <input
                    type="checkbox"
                    value="Thriller & Suspense"
                    checked={genre.includes("Thriller & Suspense")}
                    onChange={handleGenreChange}
                />
                Thriller & Suspense
            </label>

            <label>
                <input
                    type="checkbox"
                    value="Horror"
                    checked={genre.includes("Horror")}
                    onChange={handleGenreChange}
                />
                Horror
            </label>

            <label>
                <input
                    type="checkbox"
                    value="Historical Fiction"
                    checked={genre.includes("Historical Fiction")}
                    onChange={handleGenreChange}
                />
                Historical Fiction
            </label>

            <label>
                <input
                    type="checkbox"
                    value="Romance"
                    checked={genre.includes("Romance")}
                    onChange={handleGenreChange}
                />
                Romance
            </label>

            <label>
                <input
                    type="checkbox"
                    value="TTRPG"
                    checked={genre.includes("TTRPG")}
                    onChange={handleGenreChange}
                />
                TTRPG
            </label>

            <label>
                <input
                    type="checkbox"
                    value="Comedy"
                    checked={genre.includes("Comedy")}
                    onChange={handleGenreChange}
                />
                Comedy
            </label>
        </label>

        <Button type="submit">
                Add Project
            </Button>
      </form>
    </div>
  );
}

export default NewProject;