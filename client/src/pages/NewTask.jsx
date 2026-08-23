import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button/Button";

function NewTask() {
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [dueDate, setDueDate] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    content,
                    type,
                    due_date: dueDate
                })
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Failed to create task');
            }

            console.log('Task created', data.task);

            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div>
            <h1>New Task</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Content
                    <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </label>

                <label>
                    Type
                    <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    >
                        <option value=""> Select a Type</option>
                        <option value="Research">Research</option>
                        <option value="Drafting">Drafting</option>
                        <option value="Editing">Editing</option>
                        <option value="Publishing">Publishing</option>
                        <option value="General">General</option>

                    </select>
                </label>
                <label>
                    Due Date
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </label>

                <Button type="submit">
                    Add Task
                </Button>
            </form>
        </div>
    )

}

export default NewTask;