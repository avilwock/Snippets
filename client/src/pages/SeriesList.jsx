import Button from "../components/Button/Button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

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
        <Button onClick ={() => navigate('/new-series')}> + </Button>

        {seriesList.map((series) => (
            <Button
                key={series._id}
                onClick={() => navigate(`/series/${series._id}`)}
            >

            {series.seriesTitle}

            </Button>
        ))}
        </div>
    )
}

export default SeriesList;