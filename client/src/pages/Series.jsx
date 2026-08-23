
import { useEffect, useState } from "react";
import { useParams, useNavigate }from "react-router-dom";
import { FaEdit } from "react-icons/fa"

function Series() {

    const { id } = useParams();
    const [series, setSeries] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch (`/api/series/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => response.json())
        .then((data) => setSeries(data))
        .catch((error) => console.error(error));
    }, [id])

    if (!series) {
        return <p>Loading...</p>;
    }

    return(
        <div>
            <h1>{series.seriesTitle}</h1>
            <button onClick={() => 
                navigate(`/series/${series._id}/edit`)}>
                <FaEdit size={20}/>
                </button>

                <p>{series.description}</p>
        </div>
    )
}

export default Series;