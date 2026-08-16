import { useNavigate } from 'react-router-dom';
import styles from "../DashButton/DashButton.module.css";
import { FaHome } from "react-icons/fa"


function DashButton() {

    const navigate = useNavigate();

    return (
        <button className={styles.dashbutton} onClick={() => navigate('/dashboard')}>
            <FaHome />
        </button>

    )
}



export default DashButton;