import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Snip() {

    const { id } = useParams();
    const [snip, setSnip] = useState(null);

    useEffect(() => {
        fetch(`/api/snip/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => response.json())
            .then((data) => setSnip(data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!snip) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{snip.content}</h1>
        </div>
    );
}

export default Snip;