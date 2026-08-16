import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Snips() {

    const navigate = useNavigate();
    const [snips, setSnips] = useState([]);

    useEffect(() => {
    fetch("/api/snip", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
            })
                .then((response) => response.json())
                .then((data) => setSnips(data))
                .catch((error) => console.error(error));
        }, []);

    return (
        <div>
            <h1>Snips</h1>

            <Button onClick={() => navigate('/new-snip')}>
                +
            </Button>

            {snips.map((snip) => (
            <Button
                key={snip._id}
                onClick={() => navigate(`/snip/${snip._id}`)}
            >
                

                {snip.content}
            </Button>
        ))}
        </div>
    );
}

export default Snips;