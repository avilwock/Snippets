import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"
import styles from "../pages/Snips.module.css"

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

        <div className={styles.topButtons}>
            <Button onClick={() => navigate(-1)}>
                <FaArrowLeft />
            </Button>

            <Button onClick={() => navigate("/new-snip")}>
                +
            </Button>
        </div>

        <div className={styles.snipsContainer}>
            {snips.map((snip) => (
                <Button
                    className={styles.snipbuttons}
                    key={snip._id}
                    onClick={() => navigate(`/snip/${snip._id}`)}
                >
                    {snip.content}
                </Button>
            ))}
        </div>
    </div>
    );
}

export default Snips;