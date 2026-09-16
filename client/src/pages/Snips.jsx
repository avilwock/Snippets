import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"

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
            <h1 style ={{marginBottom: "50px"}}>Snips</h1>
            <Button onClick={() =>
                navigate(-1)}>
            <FaArrowLeft/>
            </Button>
            <Button onClick={() => navigate('/new-snip')}>
                +
            </Button>
            <br></br>

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