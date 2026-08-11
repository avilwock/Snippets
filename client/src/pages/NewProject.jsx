import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewProject() {
  const [project_name, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#000000');
  const [genre, setGenre] = useState('');

  const navigate=useNavigate();

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
                    project_name: project_name,
                    description,
                    color,
                    genre: genre || null
                })
            });

            const text = await response.text();

            console.log('Response status:', response.status);
            console.log('Response:', text);

            if (!response.ok) {
                throw new Error(text.message || 'Failed to create project');
            }

            navigate('/dashboard');

            console.log('Project created:', text.project);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

  return (
    <div>
      <h1>New Project</h1>

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
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">None</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science-Fiction">Science-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller & Suspense">Thriller & Suspense</option>
            <option value="Horror">Horror</option>
            <option value="Historical Fiction">Historical Fiction</option>
            <option value="Romance">Romance</option>
            <option value="TTRPG">TTRPG</option>
          </select>
        </label>

        <button type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

export default NewProject;