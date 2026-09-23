import Button from "../components/Button/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa"
import styles from "./SeriesList.module.css"

function SeriesList () {

    const navigate = useNavigate();
    const [seriesList, setSeriesList] = useState([]);

    useEffect(() => {
        fetch ("/api/series", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })

        .then((response) => response.json())
        .then((data) => setSeriesList(data))
        .catch((error) => console.error(error));
    }, [])
    return (
    <div>
        <h1>Series</h1>

        <div className={styles.seriesContainer}>

            <div className={styles.topButtons}>
                <Button onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </Button>

                <Button onClick={() => navigate('/new-series')}>
                    +
                </Button>
            </div>

            <div className={styles.seriesButtons}>
                {seriesList.map((series) => (
                    <Button
                        key={series._id}
                        onClick={() => navigate(`/series/${series._id}`)}
                    >
                        {series.seriesTitle}
                    </Button>
                ))}
            </div>

            </div>
        </div>
)
}

export default SeriesList;