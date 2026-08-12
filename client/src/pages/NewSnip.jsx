import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button/Button";

function NewSnip() {
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [notes, setNotes] = useState('');

    const navigate = useNavigate();

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
                    type,
                    notes
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

                <label>
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
    );
}

export default NewSnip;