import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa"


function Snip() {

    const { id } = useParams();
    const [snip, setSnip] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/snip/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
             .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to get snip");
                }
                return response.json();
            })
            .then((data) => setSnip(data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!snip) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button onClick={() =>
                navigate(`/snip/${snip._id}/edit`)}>
            <FaEdit size={20}/>
            </button>
            <h1>{snip.content}</h1>
            <p>{snip.notes}</p>
            <p>{snip.type.join(", ")}</p>
        </div>
    );
}

export default Snip;