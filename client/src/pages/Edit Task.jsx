import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"
import Button from "../components/Button/Button"

function EditTask() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ content, setContent ] = useState("");
    const [ type, setType] = useState([]);
    const [ due_date, setDueDate ] = useState("");

    

    useEffect (() => {
        const fetchTask = async () => {
        console.log("EDIT TASK ID:", id);

        try {
            const response = await fetch(`/api/task/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("GET response:", response);

            const data = await response.json();

            console.log("GET data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to get task");
            }

            setContent(data.content|| "");
            setDueDate(data.due_date || "");
            
            console.log("IS ARRAY:", Array.isArray(data.type))
            setType(data.type || []);
            console.log("TYPE FROM API:", data.type);
        } catch (error) {
            console.error("Error getting task:", error);
        }
    };

    fetchTask();
    }, [id]);

    const handleTypeChange=(e) => {
        const {value,checked} =e.target;

        if (checked) {
            setType((prevType) => [...prevType, value]);
        } else {
            setType((prevType) => prevType.filter((item) => item !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/task/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    content,
                    due_date,
                    type,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update task");
            }

            console.log("Task updated:", data);
            navigate(`/task/${id}`);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };


  return (
    <div>
         <button onClick={() =>
            navigate(-1)}>
        <FaArrowLeft/>
        </button>
        <h1>Edit Task</h1>

        <form onSubmit={handleSubmit}>
            <label>
                Task
                <input
                    type="text"
                    value={content}
                    onChange = {(e) => setContent(e.target.value)}
                    required
                />
            </label>
            <label>
                Due
                <input
    type="date"
    value={due_date}
    onChange={(e) => setDueDate(e.target.value)}
/>
            </label>

                <label>
                    Task
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Research"
                        checked={type.includes("Research")}
                        onChange={handleTypeChange}
                    />
                    Research
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Drafting"
                        checked={type.includes("Drafting")}
                        onChange={handleTypeChange}
                    />
                    Drafting
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Editing"
                        checked={type.includes("Editing")}
                        onChange={handleTypeChange}
                    />
                    Editing
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Publishing"
                        checked={type.includes("Publishing")}
                        onChange={handleTypeChange}
                    />
                    Publishing
                    
                </label>
                    
                <label>
                    <input
                        type="checkbox"
                        value="General"
                        checked={type.includes("General")}
                        onChange={handleTypeChange}
                    />
                    General
                </label>
                <Button type="submit">
                    Save Changes
                </Button>
        </form>
    </div>
  )
}

export default EditTask;