import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button/Button"

function EditSnip() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ content, setContent ] = useState("");
    const [ notes, setNotes ] = useState("");
    const [ type, setType] = useState([]);

    useEffect (() => {
        const fetchSnip = async () => {
        console.log("EDIT SNIP ID:", id);

        try {
            const response = await fetch(`/api/snip/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("GET response:", response);

            const data = await response.json();

            console.log("GET data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Failed to get snip");
            }

            setContent(data.content|| "");
            setNotes(data.notes || "");
            console.log("TYPE FROM API:", data.type);
console.log("IS ARRAY:", Array.isArray(data.type))
            setType(data.type || []);
        } catch (error) {
            console.error("Error getting snipt:", error);
        }
    };

    fetchSnip();
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
            const response = await fetch(`/api/snip/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    content,
                    notes,
                    type,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update snip");
            }

            console.log("Snip updated:", data);
            navigate(`/snip/${id}`);
        } catch (error) {
            console.error("Error updating snip:", error);
        }
    };


  return (
    <div>
        <h1>Edit Snip</h1>

        <form onSubmit={handleSubmit}>
            <label>
                Snip
                <input
                    type="text"
                    value={content}
                    onChange = {(e) => setContent(e.target.value)}
                    required
                />
            </label>
            <label>
                Notes
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </label>


                <label>
                    Snip
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Character"
                        checked={type.includes("Character")}
                        onChange={handleTypeChange}
                    />
                    Character
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Scene"
                        checked={type.includes("Scene")}
                        onChange={handleTypeChange}
                    />
                    Scene
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Dialogue"
                        checked={type.includes("Dialogue")}
                        onChange={handleTypeChange}
                    />
                    Dialogue
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Worldbuilding"
                        checked={type.includes("Worldbuilding")}
                        onChange={handleTypeChange}
                    />
                    WorldBuilding
                    
                </label>
                    
                <label>
                    <input
                        type="checkbox"
                        value="Plot"
                        checked={type.includes("Plot")}
                        onChange={handleTypeChange}
                    />
                    Plot
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Setting"
                        checked={type.includes("Setting")}
                        onChange={handleTypeChange}
                    />
                    Setting
                </label>

                <label>
                    <input
                        type="checkbox"
                        value="Misc"
                        checked={type.includes("Misc")}
                        onChange={handleTypeChange}
                    />
                    Misc
                </label>
                <Button type="submit">
                    Save Changes
                </Button>
        </form>
    </div>
  )
}

export default EditSnip;